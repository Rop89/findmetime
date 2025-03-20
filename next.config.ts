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
        source: '/api/googleauth/callback', 
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://findmetime.netlify.app/' // Or specify your domain, e.g., 'https://yourdomain.com'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control',
        },
        ],
      },
    ];
  },
};

export default nextConfig;
