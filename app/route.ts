import bloomlyPage from '../reference/page203266409.html?raw';

export const dynamic = 'force-static';

const pageUrl = 'https://ivashkov2022-droid.github.io/bloomly-grooming-site/';
const previewUrl = `${pageUrl}og.jpg`;
const faviconMarkup = `<!--favicons-->
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="alternate icon" href="favicon.svg">
<!--/favicons-->`;

const optimizedPage = bloomlyPage
  .replaceAll('https://bloomly-pet-care.ivv2.chatgpt.site/', pageUrl)
  .replaceAll('href="/"', 'href="./"')
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
  .replace(/<link[^>]+fonts\.googleapis\.com\/css2[^>]+>/gi, '')
  .replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com">/gi, '')
  .replace(/<img(?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async"')
  .replace(
    /<img loading="lazy" decoding="async"([^>]*data-original=['"]images\/tild6633-3666-4461-b465-333633626633__bloomly\.svg)/g,
    '<img loading="eager" decoding="async" fetchpriority="high"$1',
  )
  .replace(/<meta property="og:image" content="[^"]*"\s*\/?>/i, '')
  .replace(
    '</head>',
    `<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#f04b3f">
<meta property="og:locale" content="ru_RU">
<meta property="og:image" content="${previewUrl}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${previewUrl}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:wght@500;600&amp;family=Golos+Text:wght@400;500&amp;family=Manrope:wght@300&amp;family=TikTok+Sans:opsz,wght@12..36,300..900&amp;display=swap">
<link rel="preload" as="image" href="images/tild6230-6433-4566-a563-313638343732__image_14.jpg" fetchpriority="high">
<link rel="stylesheet" href="css/bloomly-optimizations.css">
</head>`,
  )
  .replace(
    '</body>',
    '<script src="js/bloomly-optimizations.js" defer></script></body>',
  );

export function GET() {
  return new Response(optimizedPage, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
