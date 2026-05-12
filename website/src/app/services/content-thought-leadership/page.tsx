import type { Metadata } from 'next';
import ServicePageShell from '@/components/sections/ServicePageShell';

export const metadata: Metadata = {
  title: 'Content & Thought Leadership',
  description:
    'Executive positioning and ghostwriting engineered for citation — by journalists, by AI systems, by the conversations your buyers are already having.',
};

export default function ContentThoughtLeadershipPage() {
  return (
    <ServicePageShell
      eyebrow="Content & Thought Leadership"
      headline={
        <>
          Content that builds
          <br />
          authority that{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>compounds.</em>
        </>
      }
      subhead="Publishing regularly isn't enough. Content that builds real authority gets cited by journalists, referenced by analysts, and surfaced by AI systems when buyers ask who leads your category. We write for all three."
      chips={['Long-form strategy', 'Executive ghostwriting', 'AI-citation optimized']}
      problemH2="Most content is written to be published, not to be cited."
      wrongList={[
        'Page views',
        'Social shares',
        'Keyword rankings',
        'Content volume',
      ]}
      rightList={[
        'Journalist citations',
        'Analyst references',
        'AI surfacing across platforms',
        'Inbound attribution',
      ]}
      approachH2="Three things that explain why our content gets cited."
      approach={[
        {
          n: '01',
          title: 'Citation architecture',
          body:
            'We write to create citations, not just impressions. Every piece is structured — headline framing, claim density, supporting data, attribution depth — to be referenced by other publishers and AI systems. The architecture is invisible to the reader and decisive in how the piece gets reused.',
        },
        {
          n: '02',
          title: 'Executive voice development',
          body:
            "We develop a genuine editorial voice for your executives, not just a house style guide. The voice needs to be specific enough to be recognized and authoritative enough to be cited. That takes time, real conversations, and editorial judgment — not a content template.",
        },
        {
          n: '03',
          title: 'Editorial distribution strategy',
          body:
            'Publication means nothing without distribution. We build republication and syndication pathways that compound your content reach without duplicating effort. One executive op-ed becomes the source for three derivative formats and feeds two adjacent placements.',
        },
      ]}
      includesH2="What content with Sapient actually looks like."
      includes={[
        'Content strategy and editorial calendar',
        'Executive ghostwriting (articles, op-eds, LinkedIn)',
        'Editorial brief development',
        'Republication and syndication strategy',
        'Performance tracking (citations + AI mentions + SEO)',
        'Monthly content brief with Signal Engine™ insights',
        'Voice development and refinement',
        'Quarterly editorial review',
      ]}
      ctaH2="See your current content authority score."
      ctaBody="Our free content audit shows you where your editorial authority stands across search, AI platforms, and citation depth — and where the gaps are."
      ctaHref="/audit/content"
      ctaLabel="Get a free content audit"
    />
  );
}
