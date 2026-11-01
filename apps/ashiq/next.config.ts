import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Images are local and already resized and compressed before they're added (see AGENTS.md),
  // and a static export has no server to optimize them on request.
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
