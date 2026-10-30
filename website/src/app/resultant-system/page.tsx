import type { Metadata } from 'next';
import ResultantHero from '@/components/resultant/ResultantHero';
import ResultantWorldview from '@/components/resultant/ResultantWorldview';
import ResultantPivot from '@/components/resultant/ResultantPivot';
import ResultantMethodology from '@/components/resultant/ResultantMethodology';
import ResultantCadence from '@/components/resultant/ResultantCadence';
import ResultantServices from '@/components/resultant/ResultantServices';
import ResultantThinking from '@/components/resultant/ResultantThinking';
import ResultantDecision from '@/components/resultant/ResultantDecision';
import '@/styles/resultant.css';

export const metadata: Metadata = {
  title: 'Resultant System — Preview',
  description:
    'Preview of the Resultant Framework design system — not yet public. Internal review build.',
  robots: { index: false, follow: false },
};

export default function ResultantSystemPreviewPage() {

  return (
    <div className="resultant-root">
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
