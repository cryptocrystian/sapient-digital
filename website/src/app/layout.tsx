import type { Metadata } from 'next';
import './globals.css';
import { GTMScript, GTMNoScript } from '@/components/analytics/GTMScript';
import { GA4Script } from '@/components/analytics/GA4Script';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sapientdigital.io',
  ),
  title: {
    default: 'Sapient Digital — AI-Native PR & Content Agency',
    template: '%s — Sapient Digital',
  },
  description:
    'PR, content, and AI presence engineered to compound. The Signal Engine™ integrates three disciplines so every placement feeds your AI citation rank and every citation accelerates the next placement.',
  openGraph: {
    title: 'Sapient Digital — AI-Native PR & Content Agency',
    description:
      'PR, content, and AI presence engineered to compound. Built for brands that refuse to be invisible.',
    url: 'https://sapientdigital.io',
    siteName: 'Sapient Digital',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sapient Digital — AI-Native PR & Content Agency',
    description:
      'PR, content, and AI presence engineered to compound.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
        />
        <GTMScript />
        <GA4Script />
      </head>
      <body>
        <GTMNoScript />
        <div id="cursor" aria-hidden="true" />
        <div id="cursor-ring" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
