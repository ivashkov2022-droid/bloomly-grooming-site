import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(projectRoot, '_site');
const html = readFileSync(join(outputDir, 'index.html'), 'utf8');
const privacyPage = join(outputDir, 'privacy', 'index.html');
const videoFiles = [
  'vide3962-3239-4639-b835-333538633161____2025-11-19__104916.mp4',
  'vide3665-6135-4435-a635-333838393831__dog2.mp4',
];
const videoPosters = [
  'bloomly-video-bonus-poster.webp',
  'bloomly-video-gallery-poster.webp',
];

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

function isFastStartVideo(path) {
  const contents = readFileSync(path).toString('latin1');
  const moov = contents.indexOf('moov');
  const mdat = contents.indexOf('mdat');
  return moov >= 0 && mdat >= 0 && moov < mdat;
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
  hasPrivacyPage: existsSync(privacyPage),
  hasVideoPosters: videoPosters.every((name) => existsSync(join(outputDir, 'images', name))),
  videosFastStart: videoFiles.every((name) => isFastStartVideo(join(outputDir, 'images', name))),
  hasPawFavicon:
    html.includes('href="favicon.svg"') &&
    existsSync(join(outputDir, 'favicon.svg')),
  hasTemplateContacts:
    html.includes('+1 (234) 567-890') ||
    html.includes('hello@bloomly.com') ||
    html.includes('ул. Питомцев, 123'),
  hasLegacyFavicons:
    html.includes('tild3061-3438-4434-b063-623266646632') ||
    html.includes('tild3161-3066-4637-a166-613437393438'),
  hasOldHost:
    html.includes('uwingroup.ru') ||
    html.includes('bloomly-pet-care.ivv2.chatgpt.site'),
};

console.log(JSON.stringify(report, null, 2));

if (
  missing.length ||
  report.hasOldHost ||
  !report.hasPrivacyPage ||
  !report.hasVideoPosters ||
  !report.videosFastStart ||
  !report.hasPawFavicon ||
  report.hasTemplateContacts ||
  report.hasLegacyFavicons
) {
  process.exitCode = 1;
}
