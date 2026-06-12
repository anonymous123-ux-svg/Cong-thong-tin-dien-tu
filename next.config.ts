import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "192.168.95.128:3000", "192.168.95.133:3000"],
    },
  },
  // Allow hot-reloading from external network interfaces
  allowedDevOrigins: ["localhost:3000", "192.168.95.128:3000", "192.168.95.133:3000"],
};

export default nextConfig;
