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

  // Set asset prefix for GitHub Pages deployment
  assetPrefix: '/uz0.dev/',

  // Enable basePath for GitHub Pages
  basePath: '/uz0.dev',
};

export default nextConfig;
