import type { Metadata } from 'next';
import SiteNav from '@/components/nav/SiteNav';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Problem from '@/components/sections/Problem';
import SignalEngineSystem from '@/components/sections/SignalEngineSystem';
import FourPillars from '@/components/sections/FourPillars';
import Proof from '@/components/sections/Proof';
import CaseStudies from '@/components/sections/CaseStudies';
import FAQ from '@/components/sections/FAQ';
import Close from '@/components/sections/Close';
import SiteFooter from '@/components/nav/SiteFooter';

export const metadata: Metadata = {
  // Title intentionally omitted — root metadata.default in layout.tsx is what we want.
  description:
    'PR, content, and AI presence engineered to compound. The Signal Engine™ integrates three disciplines so every placement feeds your AI citation rank and every citation accelerates the next placement.',
};

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main style={{ position: 'relative', minHeight: '100vh' }}>
        <Hero />
        <Marquee />
        <Problem />
        <SignalEngineSystem />
        <FourPillars />
        <Proof />
        <CaseStudies />
        <FAQ />
        <Close />
      </main>
      <SiteFooter />
    </>
  );
}
