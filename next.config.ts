import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath    : process.env.NEXT_BASE_PATH ?? "",
  assetPrefix : process.env.NEXT_ASSET_PREFIX ?? "",
  images      : {
    unoptimized: true,
  },
  output      : "export",
};

export default nextConfig;
