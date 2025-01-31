import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

type BentoCardProps = {
  name: string;
  className: string;
  background: ReactNode;
  description: string;
};

const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  description,
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-800",
      "bg-neutral-900/80 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/90",
      className
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <h3 className="text-xl font-bold text-neutral-100">
        {name}
      </h3>
      <p className="max-w-lg text-lg font-medium text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300  group-hover:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
