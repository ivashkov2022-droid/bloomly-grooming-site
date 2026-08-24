import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bloomly — Gentle grooming for happy pets',
  description:
    'A caring grooming studio offering bathing, styling, coat care, and wellness treatments for cats and dogs.',
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
