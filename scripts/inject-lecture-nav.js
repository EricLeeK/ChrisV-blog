import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const targetDir = 'public/lectures/retro-aesthetics';
const navPath = join(targetDir, 'nav-bar.html');
const navFragment = readFileSync(navPath, 'utf-8');

const files = readdirSync(targetDir).filter(
  (file) => extname(file).toLowerCase() === '.html' && file !== 'nav-bar.html'
);

let injectedCount = 0;

for (const file of files) {
  const filePath = join(targetDir, file);
  let html = readFileSync(filePath, 'utf-8');

  if (html.includes('lecture-nav-bar')) {
    console.log(`skip ${file}: already injected`);
    continue;
  }

  const bodyOpenIndex = html.toLowerCase().indexOf('<body>');
  if (bodyOpenIndex === -1) {
    console.warn(`skip ${file}: no <body> tag found`);
    continue;
  }

  const insertIndex = bodyOpenIndex + '<body>'.length;
  html = html.slice(0, insertIndex) + '\n' + navFragment + '\n' + html.slice(insertIndex);

  writeFileSync(filePath, html, 'utf-8');
  injectedCount++;
  console.log(`injected ${file}`);
}

console.log(`done: ${injectedCount} file(s) injected`);
