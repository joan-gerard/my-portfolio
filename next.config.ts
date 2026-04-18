import type { NextConfig } from "next";

// Parent directory may have another lockfile; pin tracing/dev server root to this app (cwd when running `next` here).
const appRoot = process.cwd();

const nextConfig: NextConfig = {
  outputFileTracingRoot: appRoot,
  turbopack: {
    root: appRoot,
  },
};

export default nextConfig;
