"use client"

import { Card } from "@/components/ui/card"
import { client } from "@/lib/client"
import { Plan } from "@prisma/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { ArrowRight, BarChart, Folder } from "lucide-react"
import { useRouter } from "next/navigation"

export const UpgradePageContent = ({ plan }: { plan: Plan }) => {
  const router = useRouter()

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post()
      return await res.json()
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    },
  })

  const { data: usageData } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const res = await client.project.getUsage.$get()
      return await res.json()
    },
  })

  return (
    <div className="max-w-3xl flex flex-col gap-10">
  <div className="space-y-2">
    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-brand-600 bg-clip-text text-transparent">
      {plan === "PRO" ? "Pro Plan" : "Free Plan"}
    </h1>
    <p className="text-lg text-gray-600 max-w-prose leading-relaxed">
      {plan === "PRO" 
        ? "Thank you for supporting PingPanda. Enjoy your enhanced capabilities and priority support." 
        : "Unlock premium features and higher limits by upgrading today."}
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card className="bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <p className="text-base font-semibold text-gray-700">Total Events</p>
        <div className="p-2 bg-brand-100 rounded-lg">
          <BarChart className="size-5 text-brand-600" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-gray-900">
          <span className="text-brand-600">{usageData?.eventsUsed || 0}</span>
          <span className="text-gray-400 mx-1.5">/</span>
          <span>{usageData?.eventsLimit?.toLocaleString() || 100}</span>
        </p>
        <p className="text-sm text-gray-500 font-medium">
          Events this period
        </p>
      </div>
    </Card>

    <Card className="bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <p className="text-base font-semibold text-gray-700">Categories</p>
        <div className="p-2 bg-purple-100 rounded-lg">
          <Folder className="size-5 text-purple-600" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-gray-900">
          <span className="text-purple-600">{usageData?.categoriesUsed || 0}</span>
          <span className="text-gray-400 mx-1.5">/</span>
          <span>{usageData?.categoriesLimit?.toLocaleString() || 3}</span>
        </p>
        <p className="text-sm text-gray-500 font-medium">
          Active categories
        </p>
      </div>
    </Card>
  </div>

  <div className="flex flex-wrap items-center gap-2 text-sm">
    <p className="text-gray-500">
      Usage reset {usageData?.resetDate ? (
        <span className="font-medium text-gray-700">
          {format(usageData.resetDate, "MMM d, yyyy")}
        </span>
      ) : (
        <span className="inline-block w-20 h-4 bg-gray-200 animate-pulse rounded-md" />
      )}
    </p>
    {plan !== "PRO" && (
      <button
        onClick={() => createCheckoutSession()}
        className="ml-2 inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 transition-colors group font-semibold"
      >
        <span className="border-b border-transparent group-hover:border-brand-600 transition-all">
          Upgrade to Pro
        </span>
        <ArrowRight className="size-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
      </button>
    )}
  </div>
</div>
  )
}