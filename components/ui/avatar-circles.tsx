"use client";

import { cn } from "@/lib/utils";
import Image from "next/image"; // Import the Image component from next/image

interface Avatar {
  imageUrl?: string;
  profileUrl?: string;
  name: string;
}

interface AvatarCirclesProps {
  className?: string;
  avatar: Avatar;
  fallback: string;
}

export const AvatarCircles = ({
  className,
  avatar,
  fallback,
}: AvatarCirclesProps) => {
  const initial = avatar.name.split(" ")[0].charAt(0).toUpperCase();

  return (
    <div className={cn("z-10 flex", className)}>
      <a
        href={avatar.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center bg-gray-700 text-white"
      >
        {avatar.imageUrl ? (
          <Image
            className="h-10 w-10 rounded-full"
            src={avatar.imageUrl}
            width={40}
            height={40}
            alt={fallback}
          />
        ) : (
          <span className="text-lg font-medium">{fallback}</span>
        )}
      </a>
    </div>
  );
};
