"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import AnimatedBackground from "./ui/animated-background";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuSquare } from "lucide-react";
import { LoginButton } from "./auth/loginbutton";

export default function () {
  return (
    <>
      <Desktop />
      <Mobile />
    </>
  );
}

const items = [
  { label: "Home", link: "/" },
  { label: "Help", link: "#bottom-of-page" },
  { label: "Pricing", link: "/pricing" },
];

const Desktop = () => {
  return (
    <div className="hidden border-separate bg-background md:block lg:block bg-slate-200 dark:bg-black ">
      <nav className="w-full flex justify-between items-center px-8 h-[55px] min-h-[50px] ">
        <div className=" text-3xl font-bold font-mono text-foreground">
          KittyAt
        </div>
        <div className=" flex">
          <AnimateNavbaeItems />
        </div>
        <div>
          <LoginButton>
            <Button variant={"secondary"}>Get started</Button>
          </LoginButton>
        </div>
      </nav>
    </div>
  );
};

const Mobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="block border-b border-border/50 bg-background md:hidden lg:hidden dark:bg-black px-2">
      <nav className="container flex items-center justify-between h-[60px]">
        <div className="text-3xl font-bold font-mono text-foreground hover:text-primary transition-colors duration-300">
          KittyAt
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent/50 focus-visible:ring-0 transition-all duration-200"
            >
              <MenuSquare className="h-8 w-8 text-foreground/80 hover:text-primary transition-colors duration-300" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="top"
            className="w-full h-screen rounded-b-2xl shadow-xl backdrop-blur-lg bg-background/95 border-none"
          >
            <div className="flex flex-col h-full pt-24 pb-8 space-y-8">
              <div className="flex flex-col items-center gap-8">
                {items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-3xl font-medium transition-colors relative hover:text-primary",
                      pathname === item.link
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                    {pathname === item.link && (
                      <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full animate-pulse" />
                    )}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col items-center gap-6 mt-12">
                <div className="flex items-center gap-6">
                  <LoginButton>
                    <Button
                      variant="secondary"
                      className="px-8 text-lg rounded-full hover:bg-primary/90 transition-colors duration-300"
                    >
                      Get Started
                    </Button>
                  </LoginButton>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
const NavbarItem = ({
  link,
  label,
  clickCallback,
}: {
  link: string;
  label: string;
  clickCallback?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex w-full items-center mt-1">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-xl text-muted-foreground block font-medium font-serif",
          isActive ? "text-foreground" : "hover:text-foreground"
        )}
        onClick={() => {
          if (clickCallback) clickCallback();
        }}
      >
        {label}
      </Link>
      <div className="absolute -bottom-[8px] left-1/2 h-[1px] w-[100%] -translate-x-1/2 rounded-xl bg-foreground"></div>
    </div>
  );
};

const AnimateNavbaeItems = () => {
  return (
    <AnimatedBackground
      className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
      transition={{
        type: "spring",
        bounce: 0.4,
        duration: 0.5,
      }}
      enableHover
    >
      {items.map((item, index) => {
        const pathname = usePathname();
        const isActive = pathname === item.link;
        return (
          <Link
            href={item.link}
            key={index}
            data-id={item}
            type="button"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start px-12 py-0.5 text-md font-medium transition-colors duration-300",
              isActive
                ? "text-foreground"
                : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            )}
          >
            {item.label}
            {isActive && (
              <div className="absolute -bottom-[8px] left-1/2 h-[2px] w-[60%] -translate-x-1/2 rounded-xl bg-foreground md:block"></div>
            )}
          </Link>
        );
      })}
    </AnimatedBackground>
  );
};
