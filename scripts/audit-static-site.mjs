import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(projectRoot, '_site');
const html = readFileSync(join(outputDir, 'index.html'), 'utf8');

const references = [...html.matchAll(/(?:src|href|data-original|data-mp4video)=["']([^"'#?]+)(?:\?[^"']*)?["']/g)]
  .map((match) => match[1])
  .filter((reference) => !/^(?:https?:|mailto:|tel:|\.\/)/.test(reference));

const missing = [...new Set(references)].filter(
  (reference) => !existsSync(join(outputDir, reference)),
);

function directorySize(directory) {
  return readdirSync(directory, { withFileTypes: true }).reduce(
    (total, entry) =>
      total +
      (entry.isDirectory()
        ? directorySize(join(directory, entry.name))
        : statSync(join(directory, entry.name)).size),
    0,
  );
}

const report = {
  htmlBytes: Buffer.byteLength(html),
  htmlGzipBytes: gzipSync(html).length,
  artifactBytes: directorySize(outputDir),
  references: references.length,
  uniqueReferences: new Set(references).size,
  missing,
  hasOptimizationStyles: html.includes('bloomly-optimizations.css'),
  hasOptimizationScript: html.includes('bloomly-optimizations.js'),
  hasStructuredData: html.includes('application/ld+json'),
  hasOldHost:
    html.includes('uwingroup.ru') ||
    html.includes('bloomly-pet-care.ivv2.chatgpt.site'),
};

console.log(JSON.stringify(report, null, 2));

if (missing.length || report.hasOldHost) {
  process.exitCode = 1;
}
