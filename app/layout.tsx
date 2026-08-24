import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bloomly-pet-care.ivv2.chatgpt.site'),
  title: 'Bloomly — Gentle grooming for happy pets',
  description:
    'A caring grooming studio offering bathing, styling, coat care, and wellness treatments for cats and dogs.',
  openGraph: {
    title: 'Bloomly — Gentle grooming for happy pets',
    description:
      'A caring grooming studio offering bathing, styling, coat care, and wellness treatments for cats and dogs.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloomly — Gentle grooming for happy pets',
    description:
      'A caring grooming studio offering bathing, styling, coat care, and wellness treatments for cats and dogs.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
