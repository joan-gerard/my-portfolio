import type { NextConfig } from "next";

// Parent directory may have another lockfile; pin tracing/dev server root to this app (cwd when running `next` here).
const appRoot = process.cwd();

const nextConfig: NextConfig = {
  outputFileTracingRoot: appRoot,
  turbopack: {
    root: appRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
