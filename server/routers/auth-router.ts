import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";
import { auth } from "@/auth";
import prisma from "@/lib/prismadb";

export const dynamic = "force-dynamic";

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
    const session = await auth();

    if (!session?.user) {
      return c.json({ isSynced: false });
    }

    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
    });

    console.log("USER IN DB:", user);

    if (!user) {
      await prisma.user.create({
        data: {
          quotaLimit: 100,
          id: session.user.id,
          email: session.user.email,
        },
      });
    }

    return c.json({ isSynced: true });
  }),
});
