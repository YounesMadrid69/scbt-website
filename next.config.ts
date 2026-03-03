import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-transverse.azureedge.net",
        pathname: "/phlogos/**",
      },
    ],
  },
};

export default nextConfig;
