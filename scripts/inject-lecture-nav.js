import { readFileSync, writeFileSync, readdirSync, renameSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const targetDir = process.argv[2] || 'public/lectures/retro-aesthetics';
const navFile = process.argv[3] || 'nav-bar.html';
const navPath = join(targetDir, navFile);
const injectionMarker = '<!-- lecture-nav-injected -->';

if (!existsSync(navPath)) {
  console.error(`Error: nav file not found: ${navPath}`);
  process.exit(1);
}

const navFragment = readFileSync(navPath, 'utf-8').trim();
if (!navFragment) {
  console.error(`Error: nav file is empty: ${navPath}`);
  process.exit(1);
}

const fullFragment = `\n${navFragment}\n${injectionMarker}\n`;

const files = readdirSync(targetDir).filter(
  (file) => extname(file).toLowerCase() === '.html' && file !== navFile
);

let injectedCount = 0;
let skippedCount = 0;

for (const file of files) {
  const filePath = join(targetDir, file);
  let html = readFileSync(filePath, 'utf-8');

  if (html.includes(injectionMarker) || html.includes('lecture-nav-bar')) {
    console.log(`skip ${file}: already injected`);
    skippedCount++;
    continue;
  }

  const bodyMatch = html.match(/<body[^>]*>/i);
  if (!bodyMatch) {
    console.warn(`skip ${file}: no <body> tag found`);
    continue;
  }

  const insertIndex = bodyMatch.index + bodyMatch[0].length;
  html = html.slice(0, insertIndex) + fullFragment + html.slice(insertIndex);

  const tempPath = `${filePath}.tmp`;
  writeFileSync(tempPath, html, 'utf-8');
  renameSync(tempPath, filePath);

  injectedCount++;
  console.log(`injected ${file}`);
}

console.log(`done: ${injectedCount} injected, ${skippedCount} skipped`);
