const fs = require('fs');
const path = require('path');

const sourceDir = 'out';
const targetDir = 'docs';

console.log('🔧 Flattening Next.js assets for GitHub Pages...');

// Remove existing docs directory
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true });
}

// Copy everything from out to docs
fs.cpSync(sourceDir, targetDir, { recursive: true });

// Function to update asset paths in HTML files
function updateAssetPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace _next/static/ paths with static/ paths
  content = content.replace(/_next\/static\//g, 'static/');

  // Also update the preload links
  content = content.replace(/href="\/_next\//g, 'href="/static/');
  content = content.replace(/src="\/_next\//g, 'src="/static/');

  fs.writeFileSync(filePath, content);
}

// Move _next/static to static in the docs folder
const nextStaticPath = path.join(targetDir, '_next', 'static');
const staticPath = path.join(targetDir, 'static');

if (fs.existsSync(nextStaticPath)) {
  fs.renameSync(nextStaticPath, staticPath);

  // Remove the empty _next folder
  const nextPath = path.join(targetDir, '_next');
  if (fs.existsSync(nextPath)) {
    fs.rmSync(nextPath, { recursive: true });
  }
}

// Update HTML files to use the new static paths
const htmlFiles = [];
function findHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findHtmlFiles(fullPath);
    } else if (file.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
}

findHtmlFiles(targetDir);

// Update asset paths in all HTML files
htmlFiles.forEach(file => {
  updateAssetPaths(file);
});

console.log('✅ Assets flattened successfully!');
console.log(`📁 Static assets moved to: static/`);
console.log(`📄 Updated ${htmlFiles.length} HTML files`);