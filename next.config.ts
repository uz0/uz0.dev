import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure output for GitHub Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'out', // Build to out directory first

  // Disable image optimization since GitHub Pages doesn't support it
  images: {
    unoptimized: true,
  },

  // No assetPrefix - we'll handle this in the build script
};

export default nextConfig;
