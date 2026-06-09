import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ivory-cormorant-194899.hostingersite.com",
      },
    ],
  },
};

export default nextConfig;