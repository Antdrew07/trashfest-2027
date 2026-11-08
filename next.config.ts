import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Railway builds a container and routes to the port it assigns. Standalone
  // output keeps that image small; `pnpm start` binds the assigned port
  // explicitly rather than letting the framework pick one.
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // The headliner poster is the band's own YouTube thumbnail, loaded from
    // YouTube's CDN rather than copied into this repo. DESIGN.md §5.7 says to
    // embed rather than rip, and hot-linking keeps it authoritative: if the
    // band changes the video's artwork, the site follows.
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
