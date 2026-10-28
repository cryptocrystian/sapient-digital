import type { Metadata } from 'next';
import ResultantPlaceholder from '@/components/resultant/ResultantPlaceholder';

export const metadata: Metadata = {
  title: 'The Thinking — Insights',
  description:
    'Original research assets on the authority economy, the connected marketing opportunity, and honest measurement. All free, nothing gated beyond an email.',
};

export default function InsightsHubPage() {
  return (
    <ResultantPlaceholder
      theme="light"
      eyebrow="The Thinking"
      title="Ideas worth putting into the market."
      body={
        <>
          <p>
            A standalone library for original perspectives on credibility, earned recognition,
            strategic content, search, and AI-assisted discovery. Not filler for a publishing
            calendar — four flagship research assets anchor the current body of work.
          </p>
          <p style={{ marginTop: '16px' }}>
            The hub view is in build. For now, the homepage{' '}
            <a href="/#thinking" style={{ color: 'var(--rs-signal)', textDecoration: 'underline' }}>Thinking chapter</a>{' '}
            carries all four pieces with abstracts and read links.
          </p>
        </>
      }
      statusLabel="Library in Build"
      meta={[
        { label: 'Current Pieces', value: '4' },
        { label: 'Expected Launch', value: '2026 Q4' },
      ]}
      primaryLabel="Browse Current Pieces →"
      primaryHref="/#thinking"
      secondaryLabel="← Return home"
    />
  );
}
