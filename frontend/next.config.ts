import type { NextConfig } from "next";
import { version } from "./package.json";

const nextConfig: NextConfig = {
  output: "standalone",
  env: { NEXT_PUBLIC_VERSION: version },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
