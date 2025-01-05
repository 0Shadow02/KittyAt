
import { Heading } from "@/components/Heading";
import { TextEffect } from "@/components/ui/text-effect";
import { TextShimmer } from "@/components/motion-ui/TextShimmerColor";
import { ArrowRightIcon, CheckSquare2Icon } from "lucide-react";
import ShinyButton from "@/components/motion/ShinyButton";
import { BackgroundBeams } from "@/components/motion/BackgroundBeam";
import Navbar from "@/components/Navbar";
import DiscordUi from "@/components/Discord-ui";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import DiscordMessage from "@/components/DiscordMessage";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { AnimatedBeamMultipleOutputDemo } from "@/components/motion/AnimatedBeam";

function Page() {
  return (
    <div className="relative h-screen w-full flex flex-col">
      <Navbar/>
      

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
          KittyAt provides the simplest way to monitor your SaaS. Receive instant notifications for{" "}
          <span className="font-semibold text-foreground text-lg">
            sales, new users, and other significant events.
          </span>
        </p>
        <ul className="font-semibold space-y-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 text-left flex flex-col items-start">
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
        </ul>
        <div className="mt-8">
          <ShinyButton>Start for Free Today</ShinyButton>
        </div>
      </section>
      <section className="relative bg-transparent pb-4">
      <div className="absolute inset-x-0 bottom-40 top-36 bg-[#3659B1]" />
      <div className="relative mx-auto">
       
          <DiscordUi>
             <AnimatedList>
               <DiscordMessage avatarSrc="/asset-profile-picture.jpeg" avatarAlt="KittyAt Avt"
               username="KittyAt" timestamp="Today at 10:10AM"
               badgeText="SignUp"
               badgeColor="#43b581"
               title="👤 New user signed up"
               content={{
                name: "Dave Jr cros",
                email:"Dave01_cros@email.com",
               }} />
                <DiscordMessage avatarSrc="/asset-profile-picture.jpeg" avatarAlt="KittyAt Avt"
               username="KittyAt" timestamp="Today at 01:45PM"
               badgeText="Revenue"
               badgeColor="#faa61a"
               title="💰 Payment received"
               content={{
                 amount:"$100.00",
                 email:"joe_vans22@email.com",
                 plan:"PRO",
               }} />
                <DiscordMessage avatarSrc="/asset-profile-picture.jpeg" avatarAlt="KittyAt Avt"
               username="KittyAt" timestamp="Today at 6:20PM"
               badgeText="Milestone"
               badgeColor="#5865f2"
               title="🚀 Revenue Milestone Achieved"
               content={{
                  recurringRevenue: "$10,000 USD",
                  growth: "+12.3%",
               }} />
             </AnimatedList>
          </DiscordUi>
         
      </div>
      </section>

      <section className=" relative py-24 sm:py32 ">
        <div className=" flex flex-col items-center justify-center gap-16 sm:gap-20">
            <div>
               <h2 className=" text-center text-base/7 font-semibold text-blue-500">
                  Intuitive Monitoring
               </h2>
               <Heading>
               {/* <TextShimmer
                duration={1.2}
                className="py-4 [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
              >
                Stay ahead with real-time insights
              </TextShimmer>    */}
              <TextShimmer
                duration={1.2}
                className="py-4 
                  [--base-color:theme(colors.gray.800)] 
                  [--base-gradient-color:theme(colors.gray.300)] 
                  dark:[--base-color:theme(colors.white)] 
                  dark:[--base-gradient-color:theme(colors.gray.200)]"
              >
                Stay ahead with real-time insights
              </TextShimmer>
                </Heading>
            </div>
            <div className="flex flex-col items-center justify-center gap-16 sm:gap-20 mx-32">
                 <div>
                  <AnimatedBeamMultipleOutputDemo/>
                 </div>
            </div>
        </div>
              
      </section>




      
      <BackgroundBeams className="pointer-events-none z-0" />
    </div>
  );
}

export default Page;






