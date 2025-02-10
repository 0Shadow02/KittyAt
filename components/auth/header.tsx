import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-6 items-center justify-center">
      <div className="relative group w-full flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

        <Image height={100} width={100} src={"/logo.png"} alt="logo" />
      </div>

      <div className="text-center space-y-3">
        <h1
          className={cn(
            "text-4xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent",
            "transition-all duration-300 hover:from-gray-200 hover:to-gray-50",
            "flex items-center justify-center gap-3",
            font.className
          )}
        >
          <span className="animate-pulse text-white delay-75">🔒</span>
          <span className="relative">
            <p className=" text-white">
            KittyAt
            </p>
            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-gray-400/30 to-gray-400/0" />
          </span>
          <span className="animate-pulse text-white delay-150">🛡️</span>
        </h1>
      </div>

      <p
        className="text-gray-400 text-lg tracking-wide transition-all duration-300 
         hover:text-gray-200 hover:translate-y-1 text-center max-w-md"
      >
        {label}
      </p>

      <div className="w-full max-w-[200px] bg-gradient-to-r from-transparent via-gray-700 to-transparent h-px animate-shine" />
    </div>
  );
};
