import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { apiAuthPrefix, publicRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default async function middleware(req:NextRequest) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;

  console.log("Token exists:", isLoggedIn);  // Log token existence

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("Redirecting to the default login redirect:", DEFAULT_LOGIN_REDIRECT);
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // Redirect if logged in
    }
    return NextResponse.next(); // Proceed if not logged in
  }

  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + (nextUrl.search || ""));
    console.log("Redirecting to login with callbackUrl:", callbackUrl); // Log the callback URL
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next(); // Proceed for other cases
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
