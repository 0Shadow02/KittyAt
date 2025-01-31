import { addMonths, startOfMonth } from "date-fns"
import { router } from "../__internals/router"
import { privateProcedure } from "../procedures"

import { FREE_QUOTA, PRO_QUOTA } from "@/config"
import { z } from "zod"
import prisma from "@/lib/prismadb"

export const projectRouter = router({
  getUsage: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx

    const currentDate = startOfMonth(new Date())

    const quota = await prisma.quota.findFirst({
      where: {
        userId: user.id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      },
    })

    const eventCount = quota?.count ?? 0

    const categoryCount = await prisma.eventCategory.count({
      where: { userId: user.id },
    })

    const limits = user.plan === "PRO" ? PRO_QUOTA : FREE_QUOTA

    const resetDate = addMonths(currentDate, 1)

    return c.superjson({
      categoriesUsed: categoryCount,
      categoriesLimit: limits.maxEventCategories,
      eventsUsed: eventCount,
      eventsLimit: limits.maxEventsPerMonth,
      resetDate,
    })
  }),

  setDiscordID: privateProcedure
    .input(z.object({ discordId: z.string().max(20) }))
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx
      const { discordId } = input

      await prisma.user.update({
        where: { id: user.id },
        data: { discordId },
      })

      return c.json({ success: true })
    }),
})