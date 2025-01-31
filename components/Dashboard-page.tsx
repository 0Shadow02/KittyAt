"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardPageProps {
  title: string | React.ReactNode;
  children?: React.ReactNode;
  hideBackButton?: boolean;
  cta?: React.ReactNode;
}
const DashboardPage = ({
  title,
  children,
  hideBackButton,
  cta,
}: DashboardPageProps) => {
  const navigate = useRouter();
  return (
    <section className=" flex-1 h-full w-full flex flex-col">
      <header className="px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5 border-b rounded-lg border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            {!hideBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate.push("/dashboard")}
                className="
                    group  
                    p-2    
                    hover:bg-gray-100  
                    transition-colors  
                    rounded-md  
                    focus-visible:outline-none  
                    focus-visible:ring-2  
                    focus-visible:ring-gray-300  
                    focus-visible:ring-offset-1  
                  "
              >
                <ArrowLeft
                  className="
                      h-6 w-6 
                      text-gray-700 
                      group-hover:text-gray-900  
                      transition-colors 
                      flex-shrink-0  
                    "
                />
              </Button>
            )}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 truncate">
              {title}
            </h1>
          </div>

          {cta && <div className="flex items-center gap-2 sm:gap-3">{cta}</div>}
        </div>
      </header>
      <main className="flex-1 w-full overflow-y-auto scroll-smooth">
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-none">
          <div className="space-y-4 sm:space-y-6 w-full">
            <div className="w-full space-y-4 sm:space-y-6">{children}</div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default DashboardPage;
