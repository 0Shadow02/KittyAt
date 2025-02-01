import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google Sign-In avatars
      "avatars.githubusercontent.com", // GitHub Sign-In avatars
    ],
  },
};

export default nextConfig;
