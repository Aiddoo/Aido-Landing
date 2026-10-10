import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  async headers() {
    return [
      {
        source: "/responsive/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    loader: "custom",
    loaderFile: "./src/components/media/static-image-loader.ts",
    deviceSizes: [320, 480, 640, 960, 1280],
    imageSizes: [48, 96, 160, 240],
  },
};

export default nextConfig;
