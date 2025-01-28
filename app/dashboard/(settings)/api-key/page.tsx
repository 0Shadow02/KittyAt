import  DashboardPage  from "@/components/Dashboard-page"
import { redirect } from "next/navigation"
import { ApiKeySettings } from "./api-key-settings"
import { auth } from "@/auth"
import prisma from "@/lib/prismadb"

const Page = async () => {
  const session = await auth()

  if (!session?.user) {
    redirect("/sign-in")
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  })

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <DashboardPage title="API Key">
      <ApiKeySettings apiKey={user.apiKey ?? ""} />
    </DashboardPage>
  )
}

export default Page