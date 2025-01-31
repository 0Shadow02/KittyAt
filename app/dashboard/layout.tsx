"use client";

import { Modal } from "@/components/modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Gem, Home, Key, LucideIcon, Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { Useredetails } from "../actions/server-actions/get-user";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { FaDiscord } from "react-icons/fa";
import { IconType } from "react-icons";
import ProfileDropdown from "@/components/profiledropdown";
import { LogoutButton } from "@/components/auth/logout-button";

interface SidebarItem {
  href: string;
  icon: LucideIcon | IconType;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [{ href: "/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
  },
  {
    category: "Settings",
    items: [
      { href: "/dashboard/api-key", icon: Key, text: "API Key" },
      {
        href: "/dashboard/discord-settings",
        icon: FaDiscord,
        text: "Discord Settings",
      },
    ],
  },
];
const UserInfoSkeleton = () => (
  <div className="flex flex-col">
    <hr className="my-4 border-t border-gray-700" />
    <div className="bg-gray-800 border border-gray-700 p-2  rounded-lg">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-8 w-8 rounded-full bg-gray-700 border border-gray-600"></div>
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-gray-600 rounded-full border-2 border-gray-900" />
        </div>
        <div className="text-left">
          {/* {/* <div className="h-4 bg-gray-600 rounded w-24 mb-1"></div> */}
          <div className="h-4 bg-gray-600 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ["userDetails"],
    queryFn: Useredetails,
  });

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useRouter();
  return (
    <div className="space-y-6 relative z-20 flex flex-col h-full bg-gradient-to-t from-slate-600 via-slate-700 to-slate-900 border-r border-gray-700 p-6">
      {/* logo */}
      <div className="hidden sm:block">
        <div className="text-2xl font-bold text-gray-100">
          <span className="flex items-center space-x-3">
            <span className="bg-clip-text text-3xl font-medium tracking-tight ">
              KittyAt
            </span>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-slate-200">
              <img
                src="/asset-profile-picture.jpeg"
                className="h-full w-full object-cover"
                alt="Kitty Avatar"
              />
            </div>
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1 font-medium tracking-wider">
          DIGITAL WORKSPACE
        </p>
      </div>

      {/* navigation items */}
      <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-6">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-3 pl-1">
                {category}
              </p>
              <div className="space-y-1">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start group flex items-center gap-x-3 rounded-lg px-3 py-2.5",
                      "text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white",
                      "transition-colors duration-200",
                      "border border-transparent hover:border-gray-600"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="size-5 text-gray-400 group-hover:text-white transition-colors" />
                    {item.text}
                    {item.text === "Upgrade" && (
                      <span className="ml-auto px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-md">
                        PRO
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isLoading ? (
        <UserInfoSkeleton />
      ) : (
        <div className="flex flex-col relative" ref={dropdownRef}>
          <hr className="my-4 border-t border-gray-700" />
          <Button
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <AvatarCircles
                  className="your-class-name"
                  avatar={{
                    imageUrl: data?.image ?? undefined,
                    name: data?.name ?? "User",
                  }}
                  fallback={
                    data?.name
                      ? data.name.split(" ")[0].charAt(0).toUpperCase()
                      : "U"
                  }
                />
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-400 rounded-full border-2 border-gray-900" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-100">
                  {data?.name}
                </p>
              </div>
            </div>
          </Button>

          {showDropdown && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-fit min-w-[240px] z-50">
              <div className="bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-700">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">{data?.name}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    @{data?.name} - Joined{" "}
                    {data?.createdAt &&
                      new Date(data.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors text-left"
                    onClick={() => navigate.push("/account-settings")}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors text-left"
                    onClick={() => navigate.push("/pricing")}
                  >
                    Upgrade to Plus
                  </button>
                  <button className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors text-left">
                    Account Details
                  </button>
                  <div className="border-t border-gray-700 my-1" />
                  <button
                    className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors text-left"
                    onClick={() => navigate.push("/account-settings")}
                  >
                    Settings
                  </button>
                  <div className="border-t border-gray-700 my-1" />
                  <LogoutButton>
                    <button className="w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors text-left">
                      Logout
                    </button>
                  </LogoutButton>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative h-screen w-full flex flex-col md:flex-row bg-slate-50 overflow-hidden">
      {/* sidebar for desktop */}
      <div className="hidden md:block w-64 h-full shadow-lg">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* mobile header */}
        <div className="md:hidden sticky top-0 flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700 z-30">
          <p className="text-lg font-bold text-gray-100">KittyAt</p>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border border-gray-700"
          >
            <Menu className="size-5" />
          </button>
        </div>

        {/* main content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full mx-auto">
            <div className="flex flex-col flex-1 space-y-6 bg-slate-50 p-6 md:p-8">
              <TooltipProvider delayDuration={300}>
                <Toaster />
                {children}
              </TooltipProvider>
            </div>
          </div>
        </div>

        <Modal
          className="p-0 max-w-xs"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700">
            <p className="text-lg font-bold text-gray-100">KittyAt</p>
            <button
              aria-label="Close modal"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors border border-gray-700"
            >
              <X className="size-5" />
            </button>
          </div>

          <Sidebar onClose={() => setIsDrawerOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default Layout;
