import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Add experimental config options here if needed
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during the build process
  },
};

export default nextConfig;
