import { existsSync, readFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const errors = [];

function runCheck(file) {
  const result = spawnSync(process.execPath, ['--check', file], { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) errors.push(result.stderr || result.stdout);
}

runCheck('script.js');
runCheck('dev-server.mjs');

const html = readFileSync(join(root, 'index.html'), 'utf8');
const js = readFileSync(join(root, 'script.js'), 'utf8');
const css = readFileSync(join(root, 'style.css'), 'utf8');
const localRefs = new Set();

for (const source of [html, js, css]) {
  for (const match of source.matchAll(/(?:src|href)=["']([^"']+)["']|['"`]((?:assets|public|docs|config)\/[^'"`) ]+)/g)) {
    const ref = match[1] || match[2];
    if (!ref || ref.startsWith('http') || ref.startsWith('tel:') || ref.startsWith('mailto:') || ref.startsWith('#')) continue;
    if (ref.includes('${')) continue;
    const clean = ref.split('?')[0];
    if (extname(clean)) localRefs.add(clean);
  }
}

for (const ref of localRefs) {
  if (!existsSync(join(root, ref))) errors.push(`Missing local asset: ${ref}`);
}

for (const match of html.matchAll(/href=["'](#[^"']+)["']/g)) {
  const id = match[1].slice(1);
  if (id && !html.includes(`id="${id}"`) && !html.includes(`id='${id}'`)) {
    errors.push(`Broken hash link: ${match[1]}`);
  }
}

if (!html.includes('<meta name="description"')) errors.push('Missing meta description.');
if (!html.includes('application/ld+json')) errors.push('Missing structured data.');
if (!html.includes('aria-label')) errors.push('Missing ARIA labels.');
if (/coming soon|TODO|undefined|NaN|window\.print|alert\(/i.test(`${html}\n${js}`)) {
  errors.push('Found incomplete marker or weak placeholder behavior.');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Static production validation passed.');
