import { SVGProps } from "react";

export interface Iphone15ProProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  src?: string;
  videoSrc?: string;
}

export default function Iphone15Pro({
  width = 281.45, // 216.5 * 1.3
  height = 573.3, // 441 * 1.3
  src,
  videoSrc,
  ...props
}: Iphone15ProProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 47.45C1 21.2441 22.5441 0 48.75 0H232.75C258.956 0 280.5 21.2441 280.5 47.45V525.85C280.5 552.056 258.956 573.3 232.75 573.3H48.75C22.5441 573.3 1 552.056 1 525.85V47.45Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]"
      />
      <path
        d="M0 111.15C0 110.891 0.291015 110.6 0.5 110.6H1.95V132.6H0.5C0.291015 132.6 0 132.309 0 132.05V111.15Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]"
      />
      <path
        d="M0.65 152.1C0.65 151.841 0.941406 151.55 1.15 151.55H2.275V195H1.15C0.941406 195 0.65 194.709 0.65 194.45V152.1Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]"
      />
      <path
        d="M0.65 207.35C0.65 207.091 0.941406 206.8 1.15 206.8H2.275V250.25H1.15C0.941406 250.25 0.65 249.959 0.65 249.7V207.35Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]"
      />
      <path
        d="M280.5 181.35H282C282.309 181.35 282.6 181.641 282.6 181.95V250.25C282.6 250.559 282.309 250.85 282 250.85H280.5V181.35Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]"
      />
      <path
        d="M3.9 47.45C3.9 22.9711 22.9711 3.9 47.45 3.9H232.05C256.529 3.9 275.6 22.9711 275.6 47.45V525.85C275.6 550.329 256.529 569.4 232.05 569.4H47.45C22.9711 569.4 3.9 550.329 3.9 525.85V47.45Z"
        className="fill-white dark:fill-[#262626]"
      />
      <path
        opacity="0.5"
        d="M113.1 3.25H167.7V3.575C167.7 4.29297 167.043 4.95 166.325 4.95H114.475C113.757 4.95 113.1 4.29297 113.1 3.575V3.25Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]"
      />
      <path
        d="M13.8125 47.45C13.8125 28.7363 29.7363 12.8125 48.45 12.8125H231.05C249.764 12.8125 265.687 28.7363 265.687 47.45V525.85C265.687 544.564 249.764 560.487 231.05 560.487H48.45C29.7363 560.487 13.8125 544.564 13.8125 525.85V47.45Z"
        className="fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.325] dark:fill-[#404040] dark:stroke-[#404040]"
      />

      {src && (
        <image
          href={src}
          x="13.8125"
          y="12.8125"
          width="253.375"
          height="547.175"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#roundedCorners)"
        />
      )}
      {videoSrc && (
        <foreignObject x="13.8125" y="12.8125" width="253.375" height="547.175">
          <video
            className="size-full overflow-hidden rounded-[36.2375px] object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        </foreignObject>
      )}
      <path
        d="M100.1 31.525C100.1 24.8838 105.884 19.1 112.525 19.1H168.725C175.366 19.1 181.15 24.8838 181.15 31.525C181.15 38.1662 175.366 43.95 168.725 43.95H112.525C105.884 43.95 100.1 38.1662 100.1 31.525Z"
        className="fill-[#F5F5F5] dark:fill-[#262626]"
      />
      <path
        d="M161.85 31.525C161.85 27.7557 164.755 24.85 168.525 24.85C172.295 24.85 175.2 27.7557 175.2 31.525C175.2 35.2943 172.295 38.2 168.525 38.2C164.755 38.2 161.85 35.2943 161.85 31.525Z"
        className="fill-[#F5F5F5] dark:fill-[#262626]"
      />
      <path
        d="M165.1 31.525C165.1 29.5506 166.55 28.1 168.525 28.1C170.5 28.1 171.95 29.5506 171.95 31.525C171.95 33.4994 170.5 34.95 168.525 34.95C166.55 34.95 165.1 33.4994 165.1 31.525Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]"
      />
      <defs>
        <clipPath id="roundedCorners">
          <rect
            x="13.8125"
            y="12.8125"
            width="253.375"
            height="547.175"
            rx="36.2375"
            ry="36.2375"
          />
        </clipPath>
      </defs>
    </svg>
  );
}