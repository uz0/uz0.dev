import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure output for GitHub Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'docs',

  // Disable image optimization since GitHub Pages doesn't support it
  images: {
    unoptimized: true,
  },

  // No basePath or assetPrefix needed for custom domain
  // GitHub Pages will serve from the root domain directly
};

export default nextConfig;
