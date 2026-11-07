import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Railway builds a container and routes to the port it assigns. Standalone
  // output keeps that image small; `pnpm start` binds the assigned port
  // explicitly rather than letting the framework pick one.
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
