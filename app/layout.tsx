import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://ivashkov2022-droid.github.io/bloomly-grooming-site/',
  ),
  title: 'Bloomly — бережный груминг для счастливых питомцев',
  description:
    'Бережный груминг для собак и кошек: купание, стрижка, уход за лапами и онлайн-запись в студию Bloomly.',
  openGraph: {
    title: 'Bloomly — студия груминга',
    description:
      'Бережный груминг для собак и кошек: купание, стрижка, уход за лапами и онлайн-запись в студию Bloomly.',
    images: [
      'https://ivashkov2022-droid.github.io/bloomly-grooming-site/og.jpg',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloomly — студия груминга',
    description:
      'Бережный груминг для собак и кошек: купание, стрижка, уход за лапами и онлайн-запись в студию Bloomly.',
    images: [
      'https://ivashkov2022-droid.github.io/bloomly-grooming-site/og.jpg',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
