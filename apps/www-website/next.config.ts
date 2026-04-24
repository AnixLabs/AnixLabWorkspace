import type { NextConfig } from "next";
import defaultConfig from "../../shared/config/next.config";

const nextConfig: NextConfig = {
  ...defaultConfig,
  images: {
    ...defaultConfig.images ?? {},
    remotePatterns: [
      ...(defaultConfig.images?.remotePatterns ?? []),
      {
        protocol: "https",
        hostname: "tools.anixlab.in",
      },
      {
        protocol: "https",
        hostname: "anipic.anixlab.in",
      },
    ],
  },
};

export default nextConfig;
