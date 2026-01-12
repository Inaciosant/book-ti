import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'itbook.store', 
      },
    ],
  },
};

export default nextConfig;
