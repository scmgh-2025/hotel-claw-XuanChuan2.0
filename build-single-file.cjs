const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const htmlPath = path.join(distDir, 'index.html');

// Read the built files
let html = fs.readFileSync(htmlPath, 'utf-8');
const cssFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(f => f.endsWith('.css'));
const jsFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(f => f.endsWith('.js'));

const cssContent = fs.readFileSync(path.join(distDir, 'assets', cssFiles[0]), 'utf-8');
const jsContent = fs.readFileSync(path.join(distDir, 'assets', jsFiles[0]), 'utf-8');

// Replace asset references with inline content
html = html.replace(
  new RegExp(`<link rel="stylesheet" href="/hotel-claw-XuanChuan2.0/assets/${cssFiles[0]}">`),
  `<style>${cssContent}</style>`
);

html = html.replace(
  new RegExp(`<script defer src="/hotel-claw-XuanChuan2.0/assets/${jsFiles[0]}"></script>`),
  `<script>${jsContent}</script>`
);

// Add base tag for relative path support
html = html.replace('</head>', '<base href="./" />\n</head>');

// Update image paths to be relative
html = html.replace(/src="\/hotel-claw-XuanChuan2\.0\//g, 'src="./');

// Write the single file
const outputPath = path.join(__dirname, 'HotelClaw-单文件预览.html');
fs.writeFileSync(outputPath, html, 'utf-8');

console.log('✓ 单文件已生成: ' + outputPath);
console.log('  CSS大小: ' + (cssContent.length / 1024).toFixed(1) + 'KB');
console.log('  JS大小: ' + (jsContent.length / 1024).toFixed(1) + 'KB');
console.log('  HTML总大小: ' + (html.length / 1024).toFixed(1) + 'KB');
