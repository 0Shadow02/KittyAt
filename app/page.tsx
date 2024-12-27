import { ModeToggle } from "@/components/ThemeSwitcherBtn"
import {Heading} from "@/components/Heading"
import { TextEffect } from "@/components/ui/text-effect"
import { TextShimmer } from "@/components/motion-ui/TextShimmerColor"
import { CheckSquare2Icon } from "lucide-react"
import ShinyButton from "@/components/motion/ShinyButton"



function page() {
  return  (
    <div className="relative h-screen w-full flex flex-col">
      <ModeToggle />
      <section className="flex flex-col items-center justify-center py-24 sm:py-32 text-center w-full px-3.5 md:px-20" >
        <div className="my-10">
          <Heading>
            <span>
              <TextEffect per='char' preset='fade-in-blur'>
                Real-Time Insights for Cloud-Based Services
              </TextEffect>
            </span>
              
            <span>
              <TextShimmer
                duration={1.2}
                className="py-4 [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
              >
                Sent to Your Discord
              </TextShimmer>
            </span>
           
          </Heading>
         </div>
            <p className=" flex  flex-col justify-center items-center text-lg text-gray-600 dark:text-gray-300 max-w-prose text-center text-pretty">
              KittyAt is the easiest way to monitor your SaaS , Get instant notification for{" "}
              {" "}
            <span className=" font-semibold text-foreground text-lg">
              sales, new users, or any other event
            </span> 
              </p>
          <ul className=" font-semibold space-y-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 text-left flex flex-col items-start">
            {[
              "Real-time Discord alerts for critical events",
              "Buy once , use forever",
              "Track sales, new users, or any other event"
            ].map((item,index)=> (
              <li key={index} className=" flex gap-1.5 items-center text-left">
                <CheckSquare2Icon className=" size-5 shrink-0 text-blue-500"/>
                {item}
              </li>
            ))}
          </ul>
          <div>
          <ShinyButton>
           Start free from today
          </ShinyButton>

    
          </div>
           
      </section>
    </div>
  );
};

export default page


