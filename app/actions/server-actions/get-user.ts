"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prismadb"

export const Useredetails = async () => {
  const session = await auth()
  const Useredata = await prisma.user.findUnique({
    where :{
      id : session?.user?.id
    }
  })
  return Useredata
}

