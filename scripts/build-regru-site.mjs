import { copyFile, cp, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = join(projectRoot, '_site');
const outputDir = join(projectRoot, '_regru_site');

await rm(outputDir, { recursive: true, force: true });
await cp(sourceDir, outputDir, { recursive: true });

const indexPath = join(outputDir, 'index.html');
const indexHtml = await readFile(indexPath, 'utf8');
const showcaseHtml = indexHtml.replace(
  '<meta name="robots" content="index,follow,max-image-preview:large">',
  '<meta name="robots" content="noindex,follow,noarchive,max-image-preview:large">',
);

await writeFile(indexPath, showcaseHtml, 'utf8');
await writeFile(
  join(outputDir, 'robots.txt'),
  'User-agent: *\nDisallow: /\n',
  'utf8',
);
await copyFile(join(projectRoot, 'deploy', 'regru.htaccess'), join(outputDir, '.htaccess'));

console.log(`Reg.ru showcase prepared at ${outputDir}`);
