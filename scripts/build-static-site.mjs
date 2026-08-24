import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(projectRoot, '_site');
const publicDir = join(projectRoot, 'public');
const pageUrl = 'https://ivashkov2022-droid.github.io/bloomly-grooming-site/';
const previewUrl = `${pageUrl}og.jpg`;

const headAdditions = `
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#f04b3f">
<meta property="og:locale" content="ru_RU">
<meta property="og:image" content="${previewUrl}">
<meta property="og:image:width" content="1731">
<meta property="og:image:height" content="909">
<meta property="og:image:alt" content="Bloomly — бережный груминг для счастливых питомцев">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Bloomly — студия груминга">
<meta name="twitter:description" content="Бережный груминг для собак и кошек: купание, стрижка, уход за лапами и онлайн-запись в студию Bloomly.">
<meta name="twitter:image" content="${previewUrl}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:wght@500;600&amp;family=Golos+Text:wght@400;500&amp;family=Manrope:wght@300&amp;family=TikTok+Sans:opsz,wght@12..36,300..900&amp;display=swap">
<link rel="preload" as="image" href="images/tild6230-6433-4566-a563-313638343732__image_14.jpg" fetchpriority="high">
<link rel="stylesheet" href="css/bloomly-optimizations.css">
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Bloomly',
  description: 'Бережный груминг для собак и кошек.',
  url: pageUrl,
  image: previewUrl,
})}</script>
`;

function prepareHtml(source) {
  return source
    .replaceAll('https://bloomly-pet-care.ivv2.chatgpt.site/', pageUrl)
    .replaceAll('href="/"', 'href="./"')
    .replace(/<link[^>]+fonts\.googleapis\.com\/css2[^>]+>/gi, '')
    .replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com">/gi, '')
    .replace(/<img(?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async"')
    .replace(
      /<img loading="lazy" decoding="async"([^>]*data-original=['"]images\/tild6633-3666-4461-b465-333633626633__bloomly\.svg)/g,
      '<img loading="eager" decoding="async" fetchpriority="high"$1',
    )
    .replace(/<meta property="og:image" content="[^"]*"\s*\/?>/i, '')
    .replace('</head>', `${headAdditions}</head>`)
    .replace('</body>', '<script src="js/bloomly-optimizations.js" defer></script></body>');
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const directory of ['css', 'images', 'js']) {
  await cp(join(publicDir, directory), join(outputDir, directory), { recursive: true });
}

for (const filename of ['favicon.svg', 'og.jpg', 'robots.txt', 'sitemap.xml']) {
  await cp(join(publicDir, filename), join(outputDir, filename));
}

const source = readFileSync(join(projectRoot, 'reference', 'page203266409.html'), 'utf8');
await writeFile(join(outputDir, 'index.html'), prepareHtml(source), 'utf8');
await writeFile(join(outputDir, '.nojekyll'), '', 'utf8');

console.log(`Static site prepared at ${outputDir}`);
