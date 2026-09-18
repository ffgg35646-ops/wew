import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["ffmpeg-static"],

  outputFileTracingIncludes: {
    "/api/admin/maids/upload": [
      "./node_modules/ffmpeg-static/ffmpeg",
    ],
  },
};

export default nextConfig;
