import type { Metadata } from 'next';
import ServicePageShell from '@/components/sections/ServicePageShell';

export const metadata: Metadata = {
  title: 'Video Production',
  description:
    'The Video Content Stack — hero content, thought leadership series, short-form derivatives, and Video Press Releases. Brief to published in days, not months.',
};

export default function VideoProductionPage() {
  return (
    <ServicePageShell
      eyebrow="Video Production"
      headline={
        <>
          From brief to published
          <br />
          in <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>days, not months.</em>
        </>
      }
      subhead="Traditional video production is too slow for modern content distribution. Our AI-native pipeline compresses the production cycle without compressing the quality — so your brand can move at the speed that modern buyers expect."
      chips={[
        'Brief to published in days',
        'Multiple formats & series',
        'Integrated with content strategy',
      ]}
      problemH2="Video is the most powerful content format and the most underused by B2B brands."
      wrongList={[
        'High production cost',
        'Long timelines',
        'One-off approach',
        'No strategy layer',
      ]}
      rightList={[
        'Speed without quality sacrifice',
        'Series-based strategy',
        'Content and PR integration',
        'Measurable distribution',
      ]}
      approachH2="Three things that explain how we publish in days."
      approach={[
        {
          n: '01',
          title: 'Strategy before production',
          body:
            "Every video starts with a distribution brief: where it will live, who it's for, what action it should drive. We don't produce content that doesn't have a clear purpose. The brief shapes the script, the format, the length, and the distribution plan before a single frame is captured.",
        },
        {
          n: '02',
          title: 'AI-native production pipeline',
          body:
            'From script to final edit using AI-assisted production at every stage. This is what lets us publish in days instead of months — not cutting corners, but eliminating the friction that slows traditional production. The output meets the same editorial bar; only the time-to-publish changes.',
        },
        {
          n: '03',
          title: 'Integrated with content and PR',
          body:
            'Video doesn’t exist in isolation. A CEO thought leadership video gets distributed across LinkedIn, embedded in articles, pitched to media as supporting material, and indexed for search. Every asset works harder because every asset is part of a larger plan.',
        },
      ]}
      includesH2="What video with Sapient actually looks like."
      includes={[
        'Video strategy and content calendar',
        'Script development and refinement',
        'Full production (multiple formats)',
        'CEO and executive avatar capability',
        'Social-ready edits per video',
        'Distribution brief per asset',
        'Performance tracking',
        'Monthly production review',
      ]}
      ctaH2="See where you stand across all three Signal Engine pillars."
      ctaBody="Video is most effective when it reinforces the rest of your visibility strategy. Run a free audit to see your full picture across PR, content, search, and AI."
      ctaHref="/audit"
      ctaLabel="Get a free visibility audit"
    />
  );
}
