/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // experimental: {
  //   turbopackUseSystemTlsCerts: true,
  // },
};

export default nextConfig;
