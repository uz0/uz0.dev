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

  // Ensure proper asset handling
  assetPrefix: '',
};

export default nextConfig;
