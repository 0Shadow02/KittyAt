
import { auth } from "@/auth";
import DashboardPage from "@/components/Dashboard-page";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";
import { CategoryAnalyticsContent } from "@/app/dashboard/_components/analytics-page";


interface PageProps {
  params: {
    name: string | string[] | undefined;
  };
}

const Page = async ({ params }: PageProps) => {
  const { name } = await params;

  if (typeof name !== "string") return notFound();

  const UserSession = await auth();

  if (!UserSession) {
    return notFound();
  }

  const user = await prisma.user.findUnique({
    where: { id: UserSession.user?.id },
  });

  if (!user) return notFound();

  const category = await prisma.eventCategory.findUnique({
    where: {
      name_userId: {
        name: name,
        userId: user.id,
      },
    },
    include: {
      events: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1000 // Adjust based on your needs
      },
      _count: {
        select: {
          events: true,
        },
      },
    },
  });

  if (!category) return notFound();

  const hasEvents = category._count.events > 0;

  const renderEmoji = (emoji: string) => {
    const isImageUrl = emoji.startsWith("http://") || emoji.startsWith("https://") || emoji.startsWith("/");
    if (isImageUrl) {
      return <img src={emoji} alt="emoji" className="inline-block w-10 h-10" />;
    }
    return emoji;
  };

  return (
    <DashboardPage 
      title={<>{category.emoji ? renderEmoji(category.emoji) : ""} {category.name} Analytics</>}
    >
      <CategoryAnalyticsContent 
        hasEvents={hasEvents} 
        category={category}
        events={category.events}
      />
    </DashboardPage>
  );
};

export default Page;