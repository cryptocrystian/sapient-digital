import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import '@/styles/resultant.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jbmono',
  display: 'swap',
});

export default function ResultantLayout({ children }: { children: React.ReactNode }) {
  const fontClasses = `${inter.variable} ${interTight.variable} ${jetBrainsMono.variable}`;
  return (
    <div className={`resultant-root ${fontClasses}`}>
      <a href="#main" className="rs-skip-link">Skip to main content</a>
      <div className="rs-page">
        <main id="main">{children}</main>
      </div>
    </div>
  );
}
