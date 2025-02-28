import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Add experimental config options here if needed
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during the build process
  },
  async headers() {
    return [
      {
        // Apply to API routes (e.g., /api/*)
        source: '/api/:path*', // This pattern applies to all API routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // You can change '*' to your specific domain if needed (e.g., 'https://yourdomain.com')
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
