import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth: isLoggedIn } = req;
  const path = nextUrl.pathname;

  if (path.startsWith(apiAuthPrefix)) return;
  
  if (authRoutes.includes(path) && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (!isLoggedIn && !publicRoutes.includes(path)) {
    const callbackUrl = encodeURIComponent(path + nextUrl.search);
    return Response.redirect(new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl));
  }
});

export const config = {
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
