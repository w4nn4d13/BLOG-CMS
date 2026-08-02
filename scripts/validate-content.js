#!/usr/bin/env node
// Content validation script — runs during CI and as npm run validate
// Checks: required fields, date validity, duplicate slugs, frontmatter shape

import { readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = join(__dirname, '..', 'src', 'content', 'posts');

let errors = 0;
let warnings = 0;

function err(file, msg) {
  console.error(`  ERROR [${file}] ${msg}`);
  errors++;
}
function warn(file, msg) {
  console.warn(`  WARN  [${file}] ${msg}`);
  warnings++;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return fm;
}

let files;
try {
  files = readdirSync(postsDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
} catch {
  console.log('No posts directory found — skipping validation.');
  process.exit(0);
}

console.log(`\nValidating ${files.length} post(s)...\n`);

const slugs = new Map();

for (const file of files) {
  const content = readFileSync(join(postsDir, file), 'utf-8');
  const fm = parseFrontmatter(content);

  if (!fm) { err(file, 'Missing or malformed frontmatter'); continue; }

  if (!fm.title) err(file, 'Missing required field: title');
  if (!fm.description) err(file, 'Missing required field: description');
  if (!fm.date) err(file, 'Missing required field: date');
  else if (isNaN(Date.parse(fm.date))) err(file, `Invalid date: ${fm.date}`);

  const slug = fm.slug || file.replace(/\.mdx?$/, '');
  if (slugs.has(slug)) err(file, `Duplicate slug: "${slug}" (also used by ${slugs.get(slug)})`);
  else slugs.set(slug, file);

  if (fm.description && fm.description.length > 300) {
    warn(file, `Description too long (${fm.description.length} chars, max 300)`);
  }

  if (fm.seriesOrder && isNaN(Number(fm.seriesOrder))) {
    err(file, `seriesOrder must be a number, got: ${fm.seriesOrder}`);
  }

  if (fm.canonical && !fm.canonical.startsWith('http')) {
    warn(file, `canonical URL should be absolute: ${fm.canonical}`);
  }
}

console.log(`\nValidation complete: ${files.length} file(s), ${errors} error(s), ${warnings} warning(s)\n`);

if (errors > 0) {
  console.error(`Build blocked: ${errors} validation error(s) found.`);
  process.exit(1);
}
