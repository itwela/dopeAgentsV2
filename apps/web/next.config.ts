import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@agents-2025-dope/api-client'],
  serverExternalPackages: ['@agents-2025-dope/agent']
};

export default nextConfig;
