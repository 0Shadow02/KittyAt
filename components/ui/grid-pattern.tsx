import { useId } from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[x: number, y: number]>;
  className?: string;
  depth?: number;
  [key: string]: unknown;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  squares,
  className,
  depth = 0.5,
  ...props
}: GridPatternProps) {
  const id = useId();
  const patternId = `${id}-pattern`;
  const strokeWidth = 0.75;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        "fill-gray-400/20 stroke-gray-500/20",
        "dark:fill-gray-600/10 dark:stroke-gray-500/10",
        className
      )}
      {...props}
    >
      <defs>
        {/* Main grid pattern */}
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray="0"
            className="stroke-current"
            strokeWidth={strokeWidth}
          />
        </pattern>

        {/* 3D effect filter */}
        <filter id={`${id}-3d`}>
          <feDropShadow
            dx={depth}
            dy={depth}
            stdDeviation={depth * 2}
            floodOpacity={0.2}
          />
          <feDropShadow
            dx={-depth}
            dy={-depth}
            stdDeviation={depth * 2}
            floodOpacity={0.1}
          />
        </filter>

        {/* Gradient for depth effect */}
        <linearGradient id={`${id}-gradient`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Background grid */}
      <rect 
        width="100%" 
        height="100%" 
        fill={`url(#${patternId})`}
        filter={`url(#${id}-3d)`}
      />

      {/* Foreground grid with emboss effect */}
      <rect 
        width="100%" 
        height="100%" 
        fill={`url(#${patternId})`}
        className="mix-blend-overlay"
        strokeWidth={strokeWidth * 2}
      />

      {squares && (
        <svg 
          x={x} 
          y={y} 
          className="overflow-visible"
          style={{ transition: "all 0.3s ease" }}
        >
          {squares.map(([xPos, yPos]) => (
            <rect
              key={`${xPos}-${yPos}`}
              width={width - 1}
              height={height - 1}
              x={xPos * width + 1}
              y={yPos * height + 1}
              className={cn(
                "fill-current stroke-current",
                "opacity-20 hover:opacity-40",
                "transition-all duration-300 ease-out",
                "hover:shadow-lg"
              )}
              strokeWidth={strokeWidth * 1.5}
              rx={2}
              ry={2}
              style={{
                fill: `url(#${id}-gradient)`,
                transformOrigin: "center center",
                filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.1))`
              }}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}