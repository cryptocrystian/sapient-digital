// Archived — original Signal Engine homepage preserved for reference.
// The new Resultant Framework homepage lives at /.
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
  title: 'Signal Engine — Archived',
  description: 'Archived view of the Signal Engine homepage design (superseded by the Resultant Framework homepage at /).',
  robots: { index: false, follow: false },
};

export default function SignalEngineArchivePage() {
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
