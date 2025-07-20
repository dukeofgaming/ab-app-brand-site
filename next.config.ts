import type { NextConfig } from "next";

import { readFileSync } from "fs";
import { join } from "path";

const packageJson = JSON.parse(
  readFileSync(join(__dirname, "package.json"), "utf8")
);

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
    NEXT_PUBLIC_APP_NAME: packageJson.name,
    NEXT_PUBLIC_APP_DESCRIPTION: packageJson.description,
  },
  basePath    : process.env.NEXT_BASE_PATH ?? "",
  assetPrefix : process.env.NEXT_ASSET_PREFIX ?? "",
  images      : {
    unoptimized: true,
  },
  output      : "export",
};

export default nextConfig;
