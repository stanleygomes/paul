import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@done/search-ranker", "@done/utils", "@done/ui"],
  turbopack: {},
};

// @ts-expect-error - next-pwa types are incompatible with the latest Next.js version
export default withPWA(nextConfig) as NextConfig;
