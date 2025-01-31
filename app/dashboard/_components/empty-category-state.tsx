import { Card } from "@/components/ui/card";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { WavyBackground } from "@/components/ui/wavy-background";
import { client } from "@/lib/client";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const EmptyCategoryState = ({
  categoryName,
}: {
  categoryName: string;
}) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["category", categoryName, "hasEvents"],
    queryFn: async () => {
      const res = await client.category.pollCategory.$get({
        name: categoryName,
      });

      return await res.json();
    },
    refetchInterval(query) {
      return query.state.data?.hasEvents ? false : 1000;
    },
  });

  const hasEvents = data?.hasEvents;

  useEffect(() => {
    if (hasEvents) router.refresh();
  }, [hasEvents, router]);

  const codeSnippet = `await fetch('http://localhost:3000/api/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    category: '${categoryName}',
    fields: {
      field1: 'value1', // for example: user id
      field2: 'value2' // for example: user email
    }
  })
})`;

  return (
    <>
      <Card className="relative hidden flex-1 md:flex flex-col items-center justify-center w-full h-full p-28 bg-black backdrop-blur-sm border border-gray-800/50 rounded-2xl shadow-xl shadow-blue-900/30 hover:shadow-blue-800/40 transition-all duration-300 overflow-hidden">
        <WavyBackground>
          <div className="relative">
            <div className="relative z-10 flex flex-col items-center mb-12 space-y-3">
              <h2 className="text-4xl  font-bold text-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent tracking-tight">
                Craft Your First{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  {categoryName}
                </span>{" "}
                Event
              </h2>
              <p className="text-sm text-gray-400 max-w-md text-center leading-6 mt-2">
                Begin your journey by integrating with our powerful tracking API
              </p>
            </div>

            <div className="relative z-10 w-[650px] max-w-3xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

              <div className="relative border border-gray-700/50 bg-gray-900 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <div className="size-3 rounded-full bg-red-400/90" />
                    <div className="size-3 rounded-full bg-yellow-400/90" />
                    <div className="size-3 rounded-full bg-green-400/90" />
                  </div>
                  <span className="text-gray-300 text-xs font-mono tracking-wide flex items-center">
                    <Code className="size-4 mr-2 text-blue-300" />
                    <span className="text-gray-200">your-first-event.ts</span>
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomDark}
                    customStyle={{
                      margin: 0,
                      padding: "1.75rem",
                      fontSize: "0.875rem",
                      lineHeight: "1.6",
                      fontFamily:
                        "IBM Plex Mono, Menlo, Monaco, Consolas, monospace",
                      background: "hsl(220, 13%, 18%)",
                    }}
                    codeTagProps={{
                      className: "glow-text",
                      style: { display: "block", overflowX: "auto" },
                    }}
                  >
                    {codeSnippet}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 flex flex-col items-center gap-6 animate-fade-in-up">
              {/* Status Indicator */}
              <div className="group relative flex items-center gap-3 bg-gray-900/90 backdrop-blur-lg px-5 py-3 rounded-full border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                <div className="relative flex items-center">
                  <div className="absolute -inset-2 bg-emerald-400/20 blur-lg animate-pulse-slow" />
                  <div className="size-3 bg-emerald-400/80 rounded-full animate-pulse" />
                </div>
                <span className="text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent pr-1">
                  Awaiting your first event...
                </span>
              </div>

              {/* Help Section */}
              <div className="text-center space-y-4">
                <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/60">
                  <span className="text-xs font-mono text-gray-400/80 tracking-wide">
                    // Assistance Portal
                  </span>
                </div>

                <div className="flex gap-5 justify-center transform transition-all">
                  <a
                    href="#"
                    className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
                    <BookOpen className="size-5 text-blue-300 shrink-0" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                      Documentation
                    </span>
                    <div className="ml-2 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex size-6 items-center justify-center rounded-full bg-blue-600/20">
                        <ArrowUpRight className="size-3.5 text-blue-300/80" />
                      </div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
                    <LifeBuoy className="size-5 text-purple-300/90 shrink-0" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-pink-200 bg-clip-text text-transparent">
                      Support Hub
                    </span>
                    <div className="ml-2 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex size-6 items-center justify-center rounded-full bg-purple-600/20">
                        <ArrowUpRight className="size-3.5 text-purple-300/80" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="absolute inset-0 opacity-20 pt-52">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow delay-1000" />
            </div>

            <div className="relative flex flex-col items-center gap-6 mt-10 mb-5 z-10">
              {/* Logo with hover effect */}
              <div className="flex items-center gap-3 transform transition-all group-hover:-translate-y-1">
                <div className="relative p-2 bg-gradient-to-br from-purple-600/30 to-blue-500/20 rounded-xl backdrop-blur-sm border border-purple-700/50">
                  <DiscordLogoIcon className="size-7 text-purple-400 transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 via-gray-300 to-gray-200 bg-clip-text text-transparent tracking-tight">
                  Connect Discord for{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                    Live Alerts
                  </span>
                </h3>
              </div>

              {/* Enhanced button with shine effect */}
              <button
                onClick={() =>
                  (window.location.href = "/dashboard/discord-settings")
                }
                className="relative overflow-hidden flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-500 to-purple-600 hover:from-purple-500 hover:via-blue-400 hover:to-purple-500 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-purple-900/30"
              >
                {/* Animated background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute -inset-8 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-shine rotate-12" />
                </div>

                <span className="text-sm font-medium text-gray-100 relative z-10 tracking-wide">
                  Connect Discord Account
                </span>
                <ArrowRight className="size-5 text-gray-200 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              {/* Enhanced description with animated border */}
              <div className="relative mt-4 px-6 py-4 rounded-xl border border-purple-900/50 bg-gray-900/40 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-xl border-[1px] border-white/5" />
                <p className="text-sm text-gray-300/90 text-center leading-6 max-w-md">
                  Connect your Discord account to receive{" "}
                  <span className="text-purple-300/90">
                    real-time notifications
                  </span>{" "}
                  and <span className="text-blue-300/90">status updates</span>{" "}
                  directly in your favorite channels
                </p>
              </div>

              {/* Glowing badge */}
              <div className="absolute -top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-900/40 backdrop-blur border border-purple-700/50 text-xs font-medium text-purple-300/90">
                <Sparkles className="size-4 text-purple-300/80" />
                <span>Discord Id</span>
              </div>
            </div>
          </div>
        </WavyBackground>
      </Card>
      <Card className="w-full md:hidden max-w-md mx-auto p-4 flex flex-col items-center text-center">
      <h2 className="text-lg font-medium tracking-tight text-gray-950">
        Create your first {categoryName} event
      </h2>
      <p className="text-sm text-gray-600 mb-4 max-w-xs">
        Get started by sending a request to our tracking API:
      </p>

      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 px-3 py-2 flex justify-between items-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-xs">your-first-event.js</span>
        </div>
        
        <SyntaxHighlighter
          language="javascript"
          style={atomDark}
          customStyle={{
            borderRadius: "0px",
            margin: 0,
            padding: "0.75rem",
            fontSize: "0.75rem",
            lineHeight: "1.4",
          }}
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-600">Listening to incoming events...</span>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Need help? Check out our {" "}
          <a href="#" className="text-blue-600 hover:underline">documentation</a> or {" "}
          <a href="#" className="text-blue-600 hover:underline">contact support</a>.
        </p>
      </div>
    </Card>
    </>
  );
};
