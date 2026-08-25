import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(projectRoot, '_site');
const publicDir = join(projectRoot, 'public');
const pageUrl = 'https://ivashkov2022-droid.github.io/bloomly-grooming-site/';
const previewUrl = `${pageUrl}og.jpg`;
const assetVersion = 'seo-release-3';

const semanticHeadings = [
  ['h1', 'Питомец достоин лучшего'],
  ['h2', 'Забота о здоровье, красоте и комфорте вашего питомца'],
  ['h2', 'Гордимся качественным уходом с вниманием к каждому питомцу'],
  ['h2', 'Груминг с заботой о каждом питомце'],
  ['h2', 'ЧАЩЕ — ВЫГОДНЕЕ'],
  ['h2', 'Отзывы наших клиентов'],
  ['h2', 'Отзывы клиентов'],
  ['h2', 'Счастливые питомцы — лучшая награда'],
  ['h2', 'Ответы на частые вопросы'],
  ['h2', 'Всё, что важно знать перед записью на уход'],
  ['h2', 'Запишите питомца на уход'],
];

const backgroundLabels = new Map([
  ['tild6230-6433-4566-a563-313638343732__image_14.jpg', 'Собака в студии груминга Bloomly'],
  ['tild3364-3030-4631-b665-393638643235__frame_29_upscayl_3x_.jpg', 'Собака во время бережного спа-ухода'],
  ['tild6532-6463-4331-b733-323365313961__frame_57_1.jpg', 'Профессиональная стрижка питомца'],
  ['tild6231-6565-4235-a332-396264626232__frame_58_1.jpg', 'Аккуратный уход за лапами питомца'],
]);

const faviconMarkup = `<!--favicons-->
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="alternate icon" href="favicon.svg">
<!--/favicons-->`;

const headAdditions = `
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#f04b3f">
<meta property="og:locale" content="ru_RU">
<meta property="og:site_name" content="Bloomly">
<meta property="og:image" content="${previewUrl}">
<meta property="og:image:width" content="1731">
<meta property="og:image:height" content="909">
<meta property="og:image:alt" content="Bloomly — бережный груминг для счастливых питомцев">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Bloomly — студия груминга">
<meta name="twitter:description" content="Бережный груминг для собак и кошек: купание, стрижка, уход за лапами и онлайн-запись в студию Bloomly.">
<meta name="twitter:image" content="${previewUrl}">
<meta name="twitter:image:alt" content="Bloomly — бережный груминг для счастливых питомцев">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600&amp;display=swap">
<link rel="preload" as="image" href="images/tild6230-6433-4566-a563-313638343732__image_14.jpg" fetchpriority="high">
<style id="bloomly-critical">.t-records{opacity:1!important}</style>
<link rel="stylesheet" href="css/bloomly-optimizations.css?v=${assetVersion}">
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${pageUrl}#website`,
      name: 'Bloomly',
      url: pageUrl,
      inLanguage: 'ru-RU',
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${pageUrl}#business`,
      name: 'Bloomly',
      description: 'Бережный груминг для собак и кошек.',
      url: pageUrl,
      image: previewUrl,
      priceRange: '₽₽',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Услуги груминга',
        itemListElement: ['Спа-уход', 'Стрижка и стиль', 'Уход за лапами'].map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
    },
  ],
})}</script>
`;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function enhanceSemanticMarkup(source) {
  let html = source;

  for (const [tag, text] of semanticHeadings) {
    const pattern = new RegExp(
      `<div class='tn-atom'field='([^']+)'>${escapeRegExp(text)}<\\/div>`,
    );
    html = html.replace(pattern, `<${tag} class='tn-atom' field='$1'>${text}</${tag}>`);
  }

  for (const [filename, label] of backgroundLabels) {
    const pattern = new RegExp(
      `(data-original=["']images\\/${escapeRegExp(filename)}["'][^>]*?)aria-label=["'][^"']*["']([^>]*role=["']img["'])`,
      'g',
    );
    html = html.replace(pattern, `$1aria-label="${label}"$2`);
    const unlabeledPattern = new RegExp(
      `(data-original=["']images\\/${escapeRegExp(filename)}["'])(?![^>]*aria-label)`,
      'g',
    );
    html = html.replace(unlabeledPattern, `$1 role="img" aria-label="${label}"`);
  }

  return html;
}

function prepareHtml(source) {
  return enhanceSemanticMarkup(source)
    .replaceAll('https://bloomly-pet-care.ivv2.chatgpt.site/', pageUrl)
    .replaceAll('href="/"', 'href="./"')
    .replaceAll(
      `<a class='tn-atom' href="./">`,
      `<a class='tn-atom' href="./" aria-label="Bloomly — на главную">`,
    )
    .replaceAll(
      `<a class='tn-atom' href="#menuopen">`,
      `<a class='tn-atom' href="#menuopen" aria-label="Открыть меню">`,
    )
    .replace(
      '<div class="t-popup " data-anim="fadein"',
      '<div id="menuopen" class="t-popup " data-anim="fadein"',
    )
    .replace(
      /<div\s+class="t-popup" data-tooltip-hook="#form"/,
      '<div id="form" class="t-popup" data-tooltip-hook="#form"',
    )
    .replace(/href=["']\/privacy["']/gi, 'href="privacy/"')
    .replaceAll('href=&quot;/privacy&quot;', 'href=&quot;privacy/&quot;')
    .replaceAll('tel:+1234567890', '#form')
    .replaceAll('mailto:hello@bloomly.com', '#form')
    .replaceAll('+1 (234) 567-890', 'Открыть форму')
    .replaceAll('hello@bloomly.com', 'Написать нам')
    .replaceAll('ул. Питомцев, 123', 'По предварительной записи')
    .replaceAll('Режим работы: Пн–Сб, 9:00–19:00', 'Ежедневно — время согласуем заранее')
    .replace(/>АДРЕС</g, '>ФОРМАТ<')
    .replace(/>ТЕЛЕФОН</g, '>ЗАПИСЬ<')
    .replace(/>ПОЧТА</g, '>ВОПРОСЫ<')
    .replace(
      /<a href=["']\.\/["']\s*style=["']color: inherit["']>Политика конфиденциальности<\/a>/gi,
      '<a href="privacy/" style="color: inherit">Политика конфиденциальности</a>',
    )
    .replace(/<!--favicons-->[\s\S]*?<!--\/favicons-->/i, faviconMarkup)
    .replace(/<meta name="google-site-verification"[^>]*>/gi, '')
    .replace(/<script src="https:\/\/neo\.tildacdn\.com\/js\/tilda-fallback-1\.0\.min\.js"[^>]*><\/script>\s*/i, '')
    .replace(/<link rel="dns-prefetch" href="https:\/\/ws\.tildacdn\.com">\s*/i, '')
    .replace(/<link[^>]+fonts\.googleapis\.com\/css2[^>]+>/gi, '')
    .replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com">/gi, '')
    .replace(/<img(?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async"')
    .replace(
      /<img loading="lazy" decoding="async"([^>]*data-original=['"]images\/tild6633-3666-4461-b465-333633626633__bloomly\.svg)/g,
      '<img loading="eager" decoding="async" fetchpriority="high"$1',
    )
    .replace(
      `<div class='tn-atom t-bgimg' data-original="images/tild6230-6433-4566-a563-313638343732__image_14.jpg"`,
      `<div class='tn-atom t-bgimg loaded' data-original="images/tild6230-6433-4566-a563-313638343732__image_14.jpg" style="background-image:url('images/tild6230-6433-4566-a563-313638343732__image_14.jpg')"`,
    )
    .replace(/<meta property="og:image" content="[^"]*"\s*\/?>/i, '')
    .replace(/<!-- Stat -->[\s\S]*?(?=<\/body>)/i, '')
    .replace(/data-mp4video="(images\/[^"]+\.mp4)"/g, `data-mp4video="$1?v=${assetVersion}"`)
    .replace('</head>', `${headAdditions}</head>`)
    .replace('</body>', `<script src="js/bloomly-optimizations.js?v=${assetVersion}" defer></script></body>`);
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const directory of ['css', 'images', 'js']) {
  await cp(join(publicDir, directory), join(outputDir, directory), { recursive: true });
}

await cp(join(publicDir, 'privacy'), join(outputDir, 'privacy'), { recursive: true });

for (const filename of ['favicon.svg', 'og.jpg', 'robots.txt', 'sitemap.xml']) {
  await cp(join(publicDir, filename), join(outputDir, filename));
}

const source = readFileSync(join(projectRoot, 'reference', 'page203266409.html'), 'utf8');
await writeFile(join(outputDir, 'index.html'), prepareHtml(source), 'utf8');
await writeFile(join(outputDir, '.nojekyll'), '', 'utf8');

console.log(`Static site prepared at ${outputDir}`);
