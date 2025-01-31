import prisma from "@/lib/prismadb";
import { j } from "./__internals/j";
import { HTTPException } from "hono/http-exception";
import { auth } from "@/auth";

const authMiddleware = j.middleware(async ({ c, next }) => {
  const authHeader = c.req.header("Authorization");

  if (authHeader) {
    const apiKey = authHeader.split(" ")[1]; // bearer <API_KEY>

    const user = await prisma.user.findUnique({
      where: { apiKey },
    });

    if (user) {
      return next({ user });
    }
  }

  // const auth = await currentUser();
  const Auth = await auth();

  if (!Auth?.user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { id: Auth.user.id },
  });

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  return next({ user });
});

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const baseProcedure = j.procedure;
export const publicProcedure = baseProcedure;
export const privateProcedure = publicProcedure.use(authMiddleware);
