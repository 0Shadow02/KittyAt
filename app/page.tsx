import { Heading } from "@/components/Heading";
import { TextEffect } from "@/components/ui/text-effect";
import { TextShimmer } from "@/components/motion-ui/TextShimmerColor";
import { CheckSquare2Icon } from "lucide-react";
import ShinyButton from "@/components/motion/ShinyButton";
import { BackgroundBeams } from "@/components/motion/BackgroundBeam";
import Navbar from "@/components/Navbar";
import DiscordUi from "@/components/Discord-ui";
import { AnimatedList } from "@/components/ui/animated-list";
import DiscordMessage from "@/components/DiscordMessage";
import { Bento } from "@/components/motion/BentoGrid";
import { LoginButton } from "@/components/auth/loginbutton";
import { MovingCard } from "@/components/InfiniteMovingCard";
import CodeCard from "@/components/CodeCard";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { MacbookScrollKit } from "@/components/motion-ui/macbookscroll";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { SparklesCore } from "@/components/ui/sparkles";
import { InView } from "@/components/ui/in-view";

function Page() {
  return (
    <div className="relative min-h-screen w-full bg-black bg-opacity-95 flex flex-col overflow-x-hidden">
      <Navbar />
      
      {/* First Section with Background Beams */}
      <section className="relative flex flex-col items-center justify-center py-24 sm:py-32 text-center w-full px-3.5 md:px-20 z-10 overflow-hidden">
        <BackgroundBeams className="absolute inset-0 pointer-events-none z-0" />
        
        <div className="mb-4 relative z-20">
          <div className="h-[10rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="md:text-7xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20">
              KittyAt
            </h1>
            <div className="w-[40rem] h-20 relative">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
            </div>
          </div>
          <Heading>
            <span>
              <TextEffect per="char" preset="fade-in-blur">
                Real-Time Insights for Cloud-Based Services
              </TextEffect>
            </span>
            <span>
              <TextShimmer
                duration={1.2}
                className="py-4 [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
              >
                Delivered to Your Discord
              </TextShimmer>
            </span>
          </Heading>
        </div>
        
        <p className="flex flex-col justify-center items-center text-lg text-gray-600 dark:text-gray-300 max-w-prose text-center relative z-20">
          KittyAt provides effortless monitoring for your web application. Stay
          instantly informed about
          <span className="font-semibold text-foreground text-lg">
            revenue triggers, customer conversions, and key user interactions
          </span>
          through automated alerts.
        </p>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mt-10 mx-auto relative z-20">
          {[
            "Real-time Discord alerts for critical events",
            "One-time purchase, lifetime usage",
            "Comprehensive event monitoring",
            "Seamless system integration",
            "Customizable alert thresholds",
            "Advanced analytics dashboard",
          ].map((item, index) => (
            <li
              key={index}
              className="flex gap-3 items-center p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-2 rounded-full bg-blue-100/50 dark:bg-blue-900/20">
                <CheckSquare2Icon className="size-6 text-blue-500 dark:text-blue-400" />
              </div>
              <span className="text-slate-800 dark:text-slate-200 font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 relative z-20">
          <LoginButton asChild>
            <ShinyButton>Start for Free Today</ShinyButton>
          </LoginButton>
        </div>
      </section>

      {/* Rest of the Page Content */}
      <div className="relative z-20 w-full overflow-hidden">
        <MacbookScrollKit />
      </div>

      <InView
        viewOptions={{ once: true, margin: '0px 0px -250px 0px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.09 },
          },
        }}
      >
        <section className="relative bg-transparent pb-4">
          <div className="absolute inset-x-0 bottom-40 top-36 bg-[#3659B1]" />
          <div className="relative mx-auto">
            <DiscordUi>
              <AnimatedList>
                <DiscordMessage
                  avatarSrc="/asset-profile-picture.jpeg"
                  avatarAlt="KittyAt Avt"
                  username="KittyAt"
                  timestamp="Today at 10:10AM"
                  badgeText="SignUp"
                  badgeColor="#43b581"
                  title="👤 New user signed up"
                  content={{
                    name: "Amatsu ryu",
                    email: "amatsu39@email.com",
                  }}
                />
                <DiscordMessage
                  avatarSrc="/asset-profile-picture.jpeg"
                  avatarAlt="KittyAt Avt"
                  username="KittyAt"
                  timestamp="Today at 01:45PM"
                  badgeText="Revenue"
                  badgeColor="#faa61a"
                  title="💰 Payment received"
                  content={{
                    amount: "$100.00",
                    email: "dark2093@email.com",
                    plan: "PRO",
                  }}
                />
                <DiscordMessage
                  avatarSrc="/asset-profile-picture.jpeg"
                  avatarAlt="KittyAt Avt"
                  username="KittyAt"
                  timestamp="Today at 6:20PM"
                  badgeText="Milestone"
                  badgeColor="#5865f2"
                  title="🚀 Revenue Milestone Achieved"
                  content={{
                    recurringRevenue: "$10,000 USD",
                    growth: "+12.3%",
                  }}
                />
              </AnimatedList>
            </DiscordUi>
          </div>
        </section>

        <section className="flex w-full flex-col items-center justify-center sm:py-24 text-center px-4 md:px-20 relative z-10">
          <div className="flex flex-col items-center justify-center gap-12 sm:gap-16 mx-4 sm:mx-16 md:mx-16">
            <LampContainer>
              <div>
                <h2 className="text-center text-2xl font-semibold text-blue-500">
                  Intuitive Monitoring
                </h2>
                <Heading>
                  <TextShimmer
                    duration={1.2}
                    className="py-4 [--base-color:theme(colors.gray.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.gray.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
                  >
                    Stay ahead with real-time insights
                  </TextShimmer>
                </Heading>
              </div>
            </LampContainer>
            <div className="flex flex-col items-center justify-center gap-12 sm:gap-16 mx-4 sm:mx-16 md:mx-16">
              <div>
                <Bento />
                <CodeCard />
              </div>
            </div>
          </div>
        </section>
      </InView>

      <section className="w-screen">
        <MovingCard />
      </section>
    </div>
  );
}

export default Page;