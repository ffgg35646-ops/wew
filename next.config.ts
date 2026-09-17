import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  outputFileTracingIncludes: {
    "/api/admin/maids/upload": [
      "./node_modules/ffmpeg-static/**/*",
    ],
  },
/* config options here */
};

export default nextConfig;
