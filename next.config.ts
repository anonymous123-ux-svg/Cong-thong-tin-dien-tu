import type { NextConfig } from "next";

const appHost = process.env.APP_HOST || "localhost";
const allowedOrigins = [appHost, `${appHost}:3000`, `${appHost}:3001`];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
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
      // Vulnerable surface: Server Actions are reachable from these origins.
      allowedOrigins,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
