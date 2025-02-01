import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { handleAuth } from "./lib/authUtils";

const { auth } = NextAuth(authConfig);


export default auth((req) => {
  return handleAuth(req, apiAuthPrefix, publicRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT);
});


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};