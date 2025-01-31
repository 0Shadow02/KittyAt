import React from "react";
import { MacbookScroll } from "../ui/macbook-scroll";
import Link from "next/link";

export function MacbookScrollKit() {
  const src = `/chart.png`; 

  return (
    <div className="overflow-hidden bg-black w-screen h-[2000px]">
      <MacbookScroll
        title={
          <span style={{
            display: "inline-block",
            textAlign: "center",
          }}>
            <span style={{
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: "bold",
              fontSize: "2rem",
              lineHeight: "1.2",
              animation: "gradient-x 5s ease infinite",
              backgroundSize: "200% 200%",
            }}>
              Monitor real-time event analytics.
            </span>
            <br />
            <span style={{
              color: "#6b7280",
              fontSize: "1rem",
              fontWeight: "500",
              marginTop: "0.5rem",
              display: "block",
              transition: "color 0.3s ease",
            }}>
              No delays, just insights.
            </span>
          </span>
          
        }
        badge={
          <Link href="https://twitter.com/Shadow992791168">
            <Badge className="h-10 w-10 transform -rotate-12" />
          </Link>
        }
        src={src || null} 
        showGradient={false}
      />
    </div>
  );
}

const Badge = ({ className }: { className?: string }) => {
  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              filter: drop-shadow(0 0 5px rgba(29, 161, 242, 0.7));
            }
            50% {
              filter: drop-shadow(0 0 15px rgba(29, 161, 242, 1));
            }
            100% {
              filter: drop-shadow(0 0 5px rgba(29, 161, 242, 0.7));
            }
          }
        `}
      </style>
      <img
        src={"/twitter-x-seeklogo-2.svg"}
        alt="Twitter X Logo"
        className={className}
        style={{
          filter: "drop-shadow(0 0 10px rgba(29, 161, 242, 0.7))",
          animation: "pulse 2s infinite",
        }}
      />
    </>
  );
};
