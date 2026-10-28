import type { Metadata } from 'next';
import './globals.css';
import { GTMScript, GTMNoScript } from '@/components/analytics/GTMScript';
import { GA4Script } from '@/components/analytics/GA4Script';
import AnalyticsEventTracker from '@/components/analytics/AnalyticsEventTracker';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sapientdigital.io',
  ),
  title: {
    default: 'Sapient Digital — Impossible to Ignore',
    template: '%s — Sapient Digital',
  },
  description:
    'A B2B marketing agency connecting digital PR, strategic content, and search & AI visibility in one accountable program. The Resultant Framework™ turns specialized disciplines into coordinated market presence.',
  applicationName: 'Sapient Digital',
  authors: [{ name: 'Sapient Digital' }],
  keywords: [
    'B2B marketing agency',
    'digital PR agency',
    'strategic content',
    'AI visibility',
    'search visibility',
    'AI citation measurement',
    'earned media',
    'connected marketing',
    'the Resultant Framework',
    'B2B authority',
  ],
  openGraph: {
    title: 'Sapient Digital — Impossible to Ignore',
    description:
      'A B2B marketing agency connecting digital PR, strategic content, and search & AI visibility in one accountable program. The Resultant Framework™ turns specialized disciplines into coordinated market presence.',
    url: 'https://sapientdigital.io',
    siteName: 'Sapient Digital',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sapient Digital — Impossible to Ignore',
    description:
      'Connected marketing. Amplified impact. Digital PR, strategic content, and search & AI visibility, coordinated.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
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
        <AnalyticsEventTracker />
        <div id="cursor" aria-hidden="true" />
        <div id="cursor-ring" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
