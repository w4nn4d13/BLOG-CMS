#!/usr/bin/env node
// npm run new:post "My Article Title"

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new:post "Article Title"');
  process.exit(1);
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const slug = slugify(title);
const date = new Date().toISOString().slice(0, 10);
const outputPath = join(__dirname, '..', 'src', 'content', 'posts', `${slug}.md`);

if (existsSync(outputPath)) {
  console.error(`File already exists: ${outputPath}`);
  process.exit(1);
}

const template = readFileSync(join(__dirname, '..', 'templates', 'post.md'), 'utf-8');

const content = template
  .replace(/title: "Your Article Title Here"/, `title: "${title.replace(/"/g, '\\"')}"`)
  .replace(/date: 2026-08-03/, `date: ${date}`)
  .replace(/draft: false/, 'draft: true');

writeFileSync(outputPath, content, 'utf-8');
console.log(`\nCreated: ${outputPath}`);
console.log(`\nEdit the file, set draft: false when ready, then:`);
console.log(`  git add src/content/posts/${slug}.md`);
console.log(`  git commit -m "publish: ${title}"`);
console.log(`  git push`);
