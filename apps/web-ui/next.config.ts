import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "@paul/search-ranker",
    "@paul/utils",
    "@paul/ui",
    "@paul/http",
  ],
  turbopack: {},
};

export default withSerwist(nextConfig);
