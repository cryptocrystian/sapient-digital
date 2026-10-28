import ResultantHero from './ResultantHero';
import ResultantWorldview from './ResultantWorldview';
import ResultantPivot from './ResultantPivot';
import ResultantMethodology from './ResultantMethodology';
import ResultantCadence from './ResultantCadence';
import ResultantServices from './ResultantServices';
import ResultantThinking from './ResultantThinking';
import ResultantDecision from './ResultantDecision';
import ResultantFooter from './ResultantFooter';
import ChapterViewTracker from './ChapterViewTracker';

export default function ResultantHome() {
  return (
    <>
      <ChapterViewTracker />
      <ResultantHero />
      <ResultantWorldview />
      <ResultantPivot />
      <ResultantMethodology />
      <ResultantCadence />
      <ResultantServices />
      <ResultantThinking />
      <ResultantDecision />
      <ResultantFooter />
    </>
  );
}
