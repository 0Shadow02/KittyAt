import  DashboardPage  from "@/components/Dashboard-page"
import { redirect } from "next/navigation"
import { UpgradePageContent } from "./upgrade-page-content"
import prisma from "@/lib/prismadb"
import { auth } from "@/auth"

const Page = async () => {
  const  session = await auth()

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
    <DashboardPage title="Pro Membership">
      <UpgradePageContent plan={user.plan} />
    </DashboardPage>
  )
}

export default Page