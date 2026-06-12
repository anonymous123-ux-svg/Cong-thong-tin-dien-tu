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
      allowedOrigins: ["192.168.95.128", "192.168.95.128:3000", "192.168.95.128:3001"],
    },
  },
  // Allow hot-reloading from external network interfaces
  allowedDevOrigins: ["192.168.95.128", "192.168.95.128:3000", "192.168.95.128:3001"],
};

export default nextConfig;
