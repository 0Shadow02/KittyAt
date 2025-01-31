import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

interface AuthRequest {
  nextUrl: URL;
  auth?: any;
}

export default auth(async (req: AuthRequest): Promise<void | Response> => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Allow Next.js static files
  const isStaticAsset = nextUrl.pathname.startsWith('/_next/') || 
                       nextUrl.pathname.includes('.') && 
                       !nextUrl.pathname.endsWith('.html');
  
  // Bypass authentication for static assets and specific API route
  if (isStaticAsset || nextUrl.pathname.startsWith("/api/v1/events")) {
    return;
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl)
    );
  }

  return undefined;
});