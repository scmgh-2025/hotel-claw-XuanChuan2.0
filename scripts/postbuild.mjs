import { readFileSync, writeFileSync } from 'fs';

const distDir = 'dist';
const htmlPath = `${distDir}/index.html`;

let html = readFileSync(htmlPath, 'utf-8');

// 去掉 type="module" crossorigin，加上 defer 让脚本在 DOM 就绪后执行
// 否则 file:// 协议下 ES module 会被 CORS 拦截导致白屏
html = html.replace(
  /<script type="module" crossorigin src="([^"]*)"><\/script>/,
  '<script defer src="$1"></script>'
);
html = html.replace(/ crossorigin/g, '');

writeFileSync(htmlPath, html, 'utf-8');

console.log('[postbuild] dist/index.html — 已修复，可双击直接打开');
