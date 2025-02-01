import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google Sign-In avatars
      "avatars.githubusercontent.com", // GitHub Sign-In avatars
    ],
  },
  experimental: {
    // @ts-expect-error: outputFileTracingExcludes is not defined in NextConfig type yet
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/core-linux-x64-gnu",
        "node_modules/@swc/core-linux-x64-musl",
        "node_modules/@esbuild/linux-x64",
      ],
    },
  },
};

export default nextConfig;
