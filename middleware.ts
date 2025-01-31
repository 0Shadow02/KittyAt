import { isBypassRoute } from "@/routes";
import { getToken } from "next-auth/jwt";

export const runtime = "edge";

export default async function middleware(req: Request) {
  const { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } = await import("@/routes");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;

  const nextUrl = new URL(req.url);

  // Bypass authentication for static assets and specific API route
  if (isBypassRoute(nextUrl)) {
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
}