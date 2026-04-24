import type { Metadata } from 'next';
import './globals.css';
// api v3 — routes hydrated via Filesystem tool

export const metadata: Metadata = {
  title: 'Sapient Digital — Agency OS',
  description: 'Sapient Digital Agency Management Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
