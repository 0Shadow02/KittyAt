import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';



export default async function middleware(req: Request) {
  const { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } = await import("@/routes");

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("Missing AUTH_SECRET environment variable");
  }

  const token = await getToken({ req, secret });
  const isLoggedIn = !!token;

  const nextUrl = new URL(req.url);

 // Bypass authentication for static assets and specific API routes
 if (
  nextUrl.pathname.startsWith('/_next/') ||
  nextUrl.pathname.includes('.') && !nextUrl.pathname.endsWith('.html') ||
  nextUrl.pathname.startsWith("/api/v1/events") ||
  nextUrl.pathname === "/api/verify-password"
) {
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
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl)
    );
  }

  return undefined;
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};