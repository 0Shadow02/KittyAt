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
import { MacbookScrollKit } from "@/components/motion-ui/macbookscroll";
import { SparklesCore } from "@/components/ui/sparkles";
import { InView } from "@/components/ui/in-view";
import { Footer } from "@/components/footer";

function Page() {
  return (
    <div className="relative min-h-screen w-full bg-black bg-opacity-95 flex flex-col overflow-x-hidden">
      <Navbar />
      <section className="relative flex flex-col items-center justify-center py-16 sm:py-24 lg:py-32 text-center w-full px-4 md:px-8 lg:px-20 z-10 overflow-hidden">
        <BackgroundBeams className="absolute inset-0 pointer-events-none z-0" />

        <div className="mb-4 relative z-20 w-full max-w-7xl mx-auto">
          <div className="h-[8rem] sm:h-[10rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center text-white relative z-20 px-2">
              KittyAt
            </h1>
            <div className="w-full max-w-[40rem] h-20 relative">
              <div className="absolute inset-x-0 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full sm:w-3/4 blur-sm" />
              <div className="absolute inset-x-0 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full sm:w-3/4" />
              <div className="absolute inset-x-0 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/2 sm:w-1/4 blur-sm" />
              <div className="absolute inset-x-0 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/2 sm:w-1/4" />

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
          <Heading className="px-4">
            <span>
              <TextEffect per="char" preset="fade-in-blur">
                Real-Time Web Application Monitoring
              </TextEffect>
            </span>
            <span>
              <TextShimmer
                duration={1.2}
                className="py-2 sm:py-4 [--base-color:theme(colors.blue.700)] [--base-gradient-color:theme(colors.blue.400)]"
              >
                Delivered to Your Discord
              </TextShimmer>
            </span>
          </Heading>
        </div>

        <p className="flex flex-col justify-center items-center text-base sm:text-lg text-gray-300 max-w-prose text-center relative z-20 px-4">
          KittyAt provides effortless monitoring for your web application. Stay
          instantly informed about
          <span className="font-semibold text-foreground text-base sm:text-lg">
            revenue triggers, customer conversions, and key user interactions
          </span>
          through automated alerts.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-6xl mt-8 sm:mt-10 mx-auto relative z-20 px-4">
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
              className="flex gap-2 sm:gap-3 items-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-1.5 sm:p-2 rounded-full bg-blue-900/20">
                <CheckSquare2Icon className="size-5 sm:size-6 text-blue-400" />
              </div>
              <span className="text-sm sm:text-base text-slate-200 font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 sm:mt-8 relative z-20">
          <LoginButton asChild>
            <ShinyButton>Start for Free Today</ShinyButton>
          </LoginButton>
        </div>
      </section>

      <div className="relative z-20 w-full overflow-hidden px-4">
        <MacbookScrollKit />
      </div>

      <InView
        viewOptions={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <section className="relative bg-transparent pb-4 px-4">
          <div className="absolute inset-x-0 bottom-40 top-36 bg-[#3659B1]" />
          <div className="relative mx-auto max-w-7xl">
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
      </InView>

      <InView
        viewOptions={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
          },
        }}
      >
        <section className="flex w-full flex-col items-center justify-center sm:py-24 text-center px-4 md:px-8 lg:px-20 relative z-10">
          <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 mx-4 sm:mx-8 md:mx-16">
            <LampContainer className="w-full">
              <div className="px-4">
                <h2 className="text-center text-xl sm:text-2xl font-semibold text-blue-500">
                  Intuitive Monitoring
                </h2>
                <Heading className="text-3xl sm:text-4xl md:text-5xl">
                  <TextShimmer
                    duration={1.2}
                    className="py-2 sm:py-4 [--base-color:theme(colors.gray.700)] [--base-gradient-color:theme(colors.blue.400)]"
                  >
                    Stay ahead with real-time insights
                  </TextShimmer>
                </Heading>
              </div>
            </LampContainer>
            <div className="w-full max-w-7xl">
              <Bento />
              <CodeCard />
            </div>
          </div>
        </section>
      </InView>

      <section className="w-screen overflow-hidden px-4">
        <MovingCard />
      </section>

      <Footer id="bottom-of-page" />
    </div>
  );
}

export default Page;
