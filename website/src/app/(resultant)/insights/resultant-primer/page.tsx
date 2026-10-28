import type { Metadata } from 'next';
import ResultantPlaceholder from '@/components/resultant/ResultantPlaceholder';

export const metadata: Metadata = {
  title: 'The Resultant Framework™ Primer',
  description:
    'A shorter companion to the full methodology — the five stages, the four review gates, and how a focused engagement differs from an integrated one.',
};

export default function ResultantPrimerPage() {
  return (
    <ResultantPlaceholder
      theme="light"
      eyebrow="Primer"
      title={<>The Resultant Framework&trade;<br />Primer.</>}
      body={
        <>
          <p>
            A shorter companion to the full methodology — the five stages, the four review gates,
            and how a focused engagement differs from an integrated one. Designed as an 8-page
            PDF you can share with a team or print for a meeting.
          </p>
          <p style={{ marginTop: '16px' }}>
            Design in progress. Expected publish: 2026 Q4.
          </p>
        </>
      }
      statusLabel="Design in Progress · 2026 Q4"
      meta={[
        { label: 'Length', value: '8 pages' },
        { label: 'Price', value: 'Free' },
        { label: 'Format', value: 'PDF' },
      ]}
      primaryLabel="Subscribe for Launch →"
      primaryHref="/subscribe"
      secondaryLabel="← Back to Thinking"
      secondaryHref="/#thinking"
    />
  );
}
