import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";  // Import getToken to get JWT directly from cookies
import { apiAuthPrefix, publicRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default async function middleware(req:any) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });  // Get the JWT token from the request
  const isLoggedIn = !!token;  // Check if there's a token, indicating that the user is logged in

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;  // Skip the API auth routes

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));  // Redirect if logged in
    }
    return NextResponse.next();  // Proceed if not logged in
  }

  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + (nextUrl.search || ""));
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl)  // Redirect to login if not logged in and not a public route
    );
  }

  return NextResponse.next();  // Proceed for other cases
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
