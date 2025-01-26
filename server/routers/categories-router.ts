import  prisma  from "@/lib/prismadb";
import { router } from "../__internals/router";
import { privateProcedure, publicProcedure } from "../procedures";
import { startOfMonth } from "date-fns";

export const categoryRouter = router({
    getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
        try {
            const categories = await prisma.eventCategory.findMany({
                where: {
                    userId: ctx.user.id
                },
                select: {
                    id: true,
                    name: true,
                    emoji: true,
                    color: true,
                    updatedAt: true,
                    createdAt: true,
                },
                orderBy: { updatedAt: "desc" }
            });
             
            const categoriesWithCounts = await Promise.all(
                categories.map(async (category) => {
                    const now = new Date();
                    const firstDayOfMonth = startOfMonth(now);

                    const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
                        prisma.event.findMany({
                            where: {
                                EventCategory: { id: category.id },
                                createdAt: { gte: firstDayOfMonth },
                            },
                            select: {
                                fields: true
                            },
                            distinct: ["fields"]
                        }).then((events) => {
                            const fieldNames = new Set<string>();
                            events.forEach((event) => {
                                Object.keys(event.fields as object).forEach((fieldName) => {
                                    fieldNames.add(fieldName);
                                });
                            });
                            return fieldNames.size;
                        }),
                        prisma.event.count({
                            where: {
                                EventCategory: { id: category.id },
                                createdAt: { gte: firstDayOfMonth },
                            },
                        }),
                        prisma.event.findFirst({
                            where: { EventCategory: { id: category.id } },
                            orderBy: { createdAt: "desc" },
                            select: { createdAt: true }
                        })
                    ]);

                    return {
                        ...category,
                        uniqueFieldCount,
                        eventsCount,
                        lastPing: lastPing?.createdAt || null
                    };
                })
            );

            return c.json({
                categories: categoriesWithCounts.map(category => ({
                    ...category,
                    createdAt: category.createdAt.toISOString(),
                    updatedAt: category.updatedAt.toISOString()
                }))
            });
        } catch (error) {
            console.error("Error fetching event categories:", error);
            return c.json({
                categories: [],
                error: "An unexpected error occurred",
                message: error.message,
                stack: error.stack,
                type: "UnknownError"
            }, 500);
        }
    })
});