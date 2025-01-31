"use client";

import EncryptButton from "@/components/motion-ui/encryption";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HyperText } from "@/components/ui/hyper-text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconShieldExclamation } from "@tabler/icons-react";
import { CheckIcon, ClipboardIcon, InfoIcon, KeyIcon } from "lucide-react";
import { useState } from "react";

export const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Card className="max-w-xl w-full p-8 rounded-2xl shadow-xl border border-gray-100/80 bg-gradient-to-br from-white to-gray-50/70 backdrop-blur-sm relative overflow-hidden transform transition-all duration-300 hover:shadow-3xl hover:-translate-y-0.5">
      {/* Multi-colored Glow Effects */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -top-32 left-0 w-64 h-64 bg-purple-200/15 rounded-full blur-3xl animate-pulse delay-100" />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0D0iMTAwJSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')]" />

      <div className="space-y-6 relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="p-2.5 rounded-full bg-gradient-to-br from-blue-100/80 to-blue-50 shadow-inner transition-all duration-300 hover:shadow-lg hover:from-blue-100 hover:to-blue-100/80 hover:-translate-y-0.5">
              <KeyIcon className="h-6 w-6 text-blue-600 transition-transform duration-300 hover:scale-110 hover:-rotate-12 motion-reduce:transform-none" />
            </div>
            <h2 className="text-gray-800 font-semibold text-xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tight bg-[length:200%_auto] animate-text-shine">
              API Key Manager
            </h2>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 hover:-rotate-12 motion-reduce:transform-none" />
            </TooltipTrigger>
            <TooltipContent
              className="max-w-xs p-4 rounded-xl border border-gray-200/80 bg-white/95 backdrop-blur-sm shadow-xl text-sm animate-in fade-in-0 zoom-in-95"
              side="top"
            >
              <span className="text-gray-600 font-medium">Security Note:</span>
              <p className="mt-1 text-gray-500 leading-snug">
                This key provides full access to your account resources.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* API Key Display Section */}
        <div className="group relative transform transition-all duration-300 hover:-translate-y-0.5">
          <div
            className="pr-14 font-mono bg-white/90 border-2 border-gray-200/80 rounded-xl hover:border-gray-300 
       focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100/30 transition-all
       text-gray-700 placeholder-gray-400 shadow-inner py-2.5 px-4 min-h-[44px] flex items-center
       backdrop-blur-sm hover:shadow-md"
          >
            <HyperText
              className="tracking-widest font-normal select-none text-transparent bg-clip-text 
        bg-gray-800 bg-[length:200%_auto] bg-left
        transition-[background-position] duration-1000 ease-in-out group-hover:bg-right"
            >
              {apiKey
                .split("")
                .map(() => "•")
                .join("")}
            </HyperText>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button
              variant="ghost"
              onClick={copyApiKey}
              className="rounded-xl p-2 hover:bg-blue-50/80 active:bg-blue-100/50 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              {copySuccess ? (
                <CheckIcon className="h-6 w-6 text-blue-500 animate-pop-in" />
              ) : (
                <ClipboardIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Security Warning Section */}
        <div
          className="mt-4 p-4 rounded-xl border border-amber-100/80 bg-gradient-to-br from-amber-50/60 to-amber-50/30 backdrop-blur-sm flex items-start gap-3
           animate-fade-in-up hover:shadow-sm transition-shadow duration-300"
        >
          <div className="p-1.5 bg-gradient-to-br from-amber-100/90 to-amber-50/80 rounded-full shadow-inner">
            <IconShieldExclamation className="h-5 w-5 text-amber-600/90 animate-heartbeat" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-900/90">
              Critical Security Advisory
            </p>
            <p className="mt-1.5 text-sm text-amber-800/80 leading-snug">
              This key grants full account access. Never share it publicly,
              expose in client-side code, or commit to version control.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 rounded-2xl border-[0.5px] border-white/50 pointer-events-none" />
      <div className="absolute top-0 right-0 -z-10 w-full h-full rounded-2xl bg-gradient-to-r from-blue-100/10 to-blue-50/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-100/10 rounded-full blur-2xl" />
    </Card>
  );
};
