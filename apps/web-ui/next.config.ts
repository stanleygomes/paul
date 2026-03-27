/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@done/search-ranker", "@done/utils", "@done/ui"],
  // experimental: {
  //   turbopackUseSystemTlsCerts: true,
  // },
};

export default nextConfig;
