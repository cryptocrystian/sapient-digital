import type { Metadata } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import ResultantHero from '@/components/resultant/ResultantHero';
import ResultantWorldview from '@/components/resultant/ResultantWorldview';
import ResultantPivot from '@/components/resultant/ResultantPivot';
import ResultantMethodology from '@/components/resultant/ResultantMethodology';
import ResultantCadence from '@/components/resultant/ResultantCadence';
import ResultantServices from '@/components/resultant/ResultantServices';
import ResultantThinking from '@/components/resultant/ResultantThinking';
import ResultantDecision from '@/components/resultant/ResultantDecision';
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

export const metadata: Metadata = {
  title: 'Resultant System — Preview',
  description:
    'Preview of the Resultant Framework design system — not yet public. Internal review build.',
  robots: { index: false, follow: false },
};

export default function ResultantSystemPreviewPage() {
  const fontClasses = `${inter.variable} ${interTight.variable} ${jetBrainsMono.variable}`;

  return (
    <div className={`resultant-root ${fontClasses}`}>
      <div className="rs-page">
        <ResultantHero />
        <ResultantWorldview />
        <ResultantPivot />
        <ResultantMethodology />
        <ResultantCadence />
        <ResultantServices />
        <ResultantThinking />
        <ResultantDecision />
      </div>
    </div>
  );
}
