import  DashboardPage  from "@/components/Dashboard-page"

import { redirect } from "next/navigation"
import { auth } from "@/auth"
import prisma from "@/lib/prismadb"
import { DiscordIdSettings } from "./settings-page-content"

const Page = async () => {
  const session = await auth()

  if (!session?.user) {
    redirect("/sign-in")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <DashboardPage title="Discord Id Settings">
      <DiscordIdSettings discordId={user.discordId ?? ""} />
    </DashboardPage>
  )
}

export default Page