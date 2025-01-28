"use client"

import EncryptButton from "@/components/motion-ui/encryption"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { IconShieldExclamation } from "@tabler/icons-react"
import { CheckIcon, ClipboardIcon, InfoIcon, KeyIcon } from "lucide-react"
import { useState } from "react"

export const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  return (
    <Card className="max-w-xl w-full p-8 rounded-2xl shadow-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">
  <div className="space-y-6">
    {/* Header Section */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-full bg-gradient-to-br from-blue-100/80 to-blue-50">
          <KeyIcon className="h-6 w-6 text-blue-600 transform transition-transform duration-300 hover:scale-110" />
        </div>
        <Label className="text-gray-800 font-semibold text-lg bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          API Key Manager
        </Label>
      </div>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-110" />
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-xs p-3 rounded-lg border border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg text-sm"
          side="top"
        >
          <span className="text-gray-600 font-medium">Security Note:</span>
          <p className="mt-1 text-gray-500">This key provides full access to your account resources.</p>
        </TooltipContent>
      </Tooltip>
    </div>

    {/* Input Section */}
    <div className="group relative">
      <Input
        type="password"
        value={apiKey}
        readOnly
        className="pr-14 font-mono bg-white/80 border-2 border-gray-200 rounded-xl hover:border-gray-300 
                 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all
                 text-gray-700 placeholder-gray-400 shadow-sm"
        style={{ backdropFilter: 'blur(4px)' }}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <Button
          variant="ghost"
          onClick={copyApiKey}
          className="rounded-xl p-2 hover:bg-blue-50/80 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {copySuccess ? (
            <CheckIcon className="h-6 w-6 text-blue-500 animate-bounce-in" />
          ) : (
            <ClipboardIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
          )}
        </Button>
      </div>
    </div>

    {/* Security Alert */}
    <div className="mt-4 p-4 rounded-lg border border-amber-100 bg-amber-50/50 backdrop-blur-sm flex items-start gap-3">
      <div className="p-1.5 bg-amber-100 rounded-full">
        <IconShieldExclamation className="h-5 w-5 text-amber-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-amber-800">Critical Security Advisory</p>
        <p className="mt-1 text-sm text-amber-700/80 leading-relaxed">
          This key grants full account access. Never share it publicly, 
          expose in client-side code, or commit to version control.
        </p>
      </div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 -z-10 w-full h-full rounded-2xl bg-gradient-to-r from-brand-100/10 to-brand-50/20" />
  </div>
</Card>
  )
}