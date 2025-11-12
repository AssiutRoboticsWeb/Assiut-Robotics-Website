#!/usr/bin/env node
// Usage: node scripts/generate-sitemap.js [baseUrl]
// Or set environment variable SITEMAP_BASE

const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ROOT_OUTPUT = path.join(__dirname, '..', 'sitemap.xml');
const PUBLIC_OUTPUT = path.join(PUBLIC_DIR, 'sitemap.xml');

const defaultExcludePatterns = [
  'Stashed_files',
  'draft',
  'test',
  'Test',
];

// Load optional ignore patterns from repo-root .sitemapignore (one per line,
// supports simple substrings or file name fragments). Lines starting with # are comments.
async function loadIgnoreFile(repoRoot) {
  const ignorePath = path.join(repoRoot, '.sitemapignore');
  try {
    const txt = await fs.readFile(ignorePath, 'utf8');
    return txt
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'));
  } catch (err) {
    return [];
  }
}

// Load optional include file (.sitemapinclude) which lists relative paths or
// fragments to include. If present, only files matching any include pattern
// will be present in the sitemap.
async function loadIncludeFile(repoRoot) {
  const includePath = path.join(repoRoot, '.sitemapinclude');
  try {
    const txt = await fs.readFile(includePath, 'utf8');
    return txt
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'));
  } catch (err) {
    return [];
  }
}

function shouldExclude(filePath, excludePatterns) {
  const lower = filePath.replace(/\\/g, '/');
  // exclude any path segment that matches the patterns
  for (const p of excludePatterns) {
    if (!p) continue;
    if (lower.includes(`/${p}/`) || lower.endsWith(`/${p}`) || lower.includes(`/${p}`)) return true;
    const base = path.basename(lower);
    try {
      // treat pattern as case-insensitive substring for filenames
      if (new RegExp(p, 'i').test(base)) return true;
    } catch (e) {
      // if pattern is invalid regex, fallback to simple substring
      if (base.toLowerCase().includes(p.toLowerCase())) return true;
    }
  }
  return false;
}

async function walk(dir, excludePatterns) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (shouldExclude(full, excludePatterns)) continue;
    if (entry.isDirectory()) {
      files.push(...await walk(full, excludePatterns));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

function toUrl(base, filePath) {
  // filePath is inside PUBLIC_DIR
  const rel = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');
  return base.replace(/\/$/, '') + '/' + rel;
}

async function main() {
  try {
    const baseArg = process.argv[2] || process.env.SITEMAP_BASE || 'https://assiut-robotics-website-xi.vercel.app';
    const base = baseArg.replace(/\/$/, '');

  const repoRoot = path.join(__dirname, '..');
  const ignoreLines = await loadIgnoreFile(repoRoot);
  const excludePatterns = Array.from(new Set([...defaultExcludePatterns, ...ignoreLines]));

  const htmlFilesAll = await walk(PUBLIC_DIR, excludePatterns);
  // If a .sitemapinclude exists, only include files that match any include pattern.
  const includeLines = await loadIncludeFile(repoRoot);
  let htmlFiles = htmlFilesAll;
  if (includeLines && includeLines.length) {
    const includePatterns = includeLines.map(l => l.replace(/^\/+/, '').toLowerCase());
    htmlFiles = htmlFilesAll.filter(f => {
      const rel = path.relative(PUBLIC_DIR, f).replace(/\\/g, '/').toLowerCase();
      for (const p of includePatterns) {
        if (!p) continue;
        if (rel === p) return true;
        if (rel.endsWith('/' + p)) return true;
        if (rel.includes(p)) return true;
      }
      return false;
    });
  }
    // ensure index root exists (public/index.html -> /)
    const entries = [];

    // Add root
    const publicIndex = path.join(PUBLIC_DIR, 'index.html');
    try {
      const stat = await fs.stat(publicIndex);
      entries.push({ loc: base + '/', lastmod: formatDate(stat.mtime), changefreq: 'daily', priority: '1.0' });
    } catch (e) {
      // ignore if not exists
    }

    for (const file of htmlFiles) {
      // skip public/index.html since added
      if (path.resolve(file) === path.resolve(publicIndex)) continue;
      const stat = await fs.stat(file);
      const loc = toUrl(base, file);
      // default frequency/priority heuristics
      const changefreq = /index\.html$/.test(file) ? 'monthly' : 'monthly';
      const priority = /index\.html$/.test(file) ? '0.7' : '0.5';
      entries.push({ loc, lastmod: formatDate(stat.mtime), changefreq, priority });
    }

    // Build XML
    const header = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n  <!-- Generated sitemap -->\n`;
    const footer = '\n</urlset>\n';
    const body = entries.map(e => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>\n`).join('\n');
    const xml = header + body + footer;

    await fs.writeFile(ROOT_OUTPUT, xml, 'utf8');
    await fs.writeFile(PUBLIC_OUTPUT, xml, 'utf8');

    console.log('Sitemap generated:', ROOT_OUTPUT);
    console.log('Sitemap generated:', PUBLIC_OUTPUT);
  } catch (err) {
    console.error('Error generating sitemap:', err);
    process.exit(1);
  }
}

if (require.main === module) main();
