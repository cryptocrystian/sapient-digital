import type { Metadata } from 'next';
import ServicePageShell from '@/components/sections/ServicePageShell';

export const metadata: Metadata = {
  title: 'PR & Media Relations',
  description:
    'Tier 1 placements that reach the buyers who matter. 38% pitch placement rate against a 12% industry average. Coverage measured in pipeline, not clip reports.',
};

export default function PrMediaRelationsPage() {
  return (
    <ServicePageShell
      eyebrow="PR & Media Relations"
      headline={
        <>
          Coverage that reaches
          <br />
          the buyers who{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>matter.</em>
        </>
      }
      subhead="Most PR agencies measure success by volume. We measure it by outcome: did this placement reach the right person, in the right publication, at the right moment in their buying journey?"
      stats={[
        { v: '38%',  l: 'Placement rate' },
        { v: '12%',  l: 'Industry average' },
        { v: '340+', l: 'Tier 1 placements · 2025' },
      ]}
      problemH2="Your agency is measuring the wrong things."
      wrongList={[
        'Pitches submitted',
        'Media list size',
        'Press releases distributed',
        'Open rates on pitch emails',
      ]}
      rightList={[
        'Placement rate vs. industry benchmark',
        'Pipeline attributed to coverage',
        'Tier 1 vs. Tier 2 vs. Tier 3 split',
        'Competitive share of voice movement',
      ]}
      approachH2="Three things that explain the 38% rate."
      approach={[
        {
          n: '01',
          title: 'Journalist-first research',
          body:
            "Every pitch is built on real intelligence about what a journalist has covered in the last 90 days, what they've said publicly they're interested in, and what their publication's editorial calendar looks like. We don't pitch based on beat; we pitch based on recent behavior.",
        },
        {
          n: '02',
          title: 'Tier-specific angle engineering',
          body:
            "A pitch to the WSJ requires a completely different angle than the same story pitched to an industry vertical. We build distinct angles for each tier, each tailored to what that specific outlet's audience cares about. Volume is not our strategy.",
        },
        {
          n: '03',
          title: 'Signal Engine™ attribution',
          body:
            'We track every placement against pipeline movement, AI citation velocity, and competitive share of voice. When a Tier 1 placement lands, we measure what it moved — not just that it happened. This changes how we prioritize the next 90 days of outreach.',
        },
      ]}
      includesH2="What PR with Sapient actually looks like."
      includes={[
        'Monthly media target list (Tier 1 / 2 / 3)',
        'Custom pitch angles per publication',
        'Journalist relationship tracking',
        'Real-time coverage monitoring',
        'Competitive coverage benchmarking',
        'Pipeline attribution reporting',
        'Monthly performance brief with placement data',
        'Quarterly coverage strategy review',
      ]}
      ctaH2="See your current PR presence score."
      ctaBody="Our free PR audit shows you how your media presence compares to your category — and where the gaps are."
      ctaHref="/audit/pr"
      ctaLabel="Get a free PR audit"
    />
  );
}
