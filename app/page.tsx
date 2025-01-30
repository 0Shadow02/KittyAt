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
import { Codeblock } from "@/components/Code-Block";
import CodeCard from "@/components/CodeCard";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { MacbookScrollKit } from "@/components/motion-ui/macbookscroll";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

function Page() {
  return (
    <div className="relative h-screen w-screen flex flex-col bg-slate-200 dark:bg-black overflow-x-hidden">
      <Navbar />

       
      <section className="flex flex-col items-center justify-center py-24 sm:py-32 text-center w-full px-3.5 md:px-20 relative z-10">
        <div className="my-10">
     

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
        <p className="flex flex-col justify-center items-center text-lg text-gray-600 dark:text-gray-300 max-w-prose text-center">
    KittyAt provides effortless monitoring for your web application. Stay instantly informed about  
    <span className="font-semibold text-foreground text-lg">
        revenue triggers, customer conversions, and key user interactions
    </span>
    through automated alerts.
</p>
        {/* <ul className="font-semibold space-y-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 text-left flex flex-col items-start">
          {[
            "Real-time Discord alerts for critical events",
            "One-time purchase, lifetime usage",
            "Monitor sales, new users, and other events",
            "Easy integration with your existing systems",
            "Customizable alert settings",
            "Detailed analytics and reporting",
          ].map((item, index) => (
            <li key={index} className="flex gap-1.5 items-center text-left">
              <CheckSquare2Icon className="size-5 shrink-0 text-blue-500" />
              {item}
            </li>
          ))}
        </ul> */}
         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mt-10 mx-auto">
      {[
        "Real-time Discord alerts for critical events",
        "One-time purchase, lifetime usage",
        "Comprehensive event monitoring",
        "Seamless system integration",
        "Customizable alert thresholds",
        "Advanced analytics dashboard",
      ].map((item, index) => (
        <li key={index} className="flex gap-3 items-center p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-2 rounded-full bg-blue-100/50 dark:bg-blue-900/20">
            <CheckSquare2Icon className="size-6 text-blue-500 dark:text-blue-400" />
          </div>
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            {item}
          </span>
        </li>
      ))}
    </ul>
        <div className="mt-8">
          <LoginButton asChild>
            <ShinyButton>Start for Free Today</ShinyButton>
          </LoginButton>
        </div>
      </section>
      

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
      

      <section className="flex flex-col items-center bg-black justify-center  sm:py-24 text-center px-4 md:px-20 relative z-10">
        <div className="flex flex-col items-center justify-center gap-12 sm:gap-16">
        <LampContainer >
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
      <section>
        <MacbookScrollKit/>
      </section>
      </section>
      <section className="w-screen">
        <MovingCard />
      </section>

      <BackgroundBeams className="pointer-events-none z-0" />
    </div>
  );
}

export default Page;
