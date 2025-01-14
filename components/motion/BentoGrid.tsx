import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
  } from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { AnimatedBeamMultipleOutputDemo } from "./AnimatedBeam";
import RetroGrid from "../ui/retro-grid";
import Image from "next/image";
import Ripple from "../ui/ripple";
  
  
  
  const features = [
    {
      name: "Track any Event",
      description: "Receive instant notifications when someone signs up or makes a successful payment. KittyAt ensures you are alerted for all critical events.",
      background: (
        <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
      ),
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3 lg:h-[400px]",
    },
    {
      name: "Detailed analytics",
      description: "Gain in-depth insights into your data with comprehensive analytics. Monitor trends, track performance, and make informed decisions with ease.",
      background: <RetroGrid/>,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 lg:h-[400px]",
    },
    {
      name: "Notifications",
      description: "Stay informed with real-time notifications for all critical events. Get alerts for signups, payments, and other important activities to ensure you never miss a beat.",
      background: <Ripple/>,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-4 lg:h-[400px]",
    },
  ];
    
  export function Bento() {
    return (
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    );
  }
  