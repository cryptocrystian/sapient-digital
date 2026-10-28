import type { Metadata } from 'next';
import ResultantPlaceholder from '@/components/resultant/ResultantPlaceholder';

export const metadata: Metadata = {
  title: 'Subscribe — Occasional Thinking',
  description:
    'One editorial note a month on authority, credibility, and discoverability. No vendor roundups, no sponsored content, no sales pitches.',
};

export default function SubscribePage() {
  return (
    <ResultantPlaceholder
      theme="light"
      eyebrow="Occasional"
      title="One editorial note a month."
      body={
        <>
          <p>
            Monthly thinking on authority, credibility, and discoverability — the long-form pieces
            that didn&apos;t make it into our client work but shaped how we approach it. No vendor
            roundups. No sponsored content. No sales pitches. Unsubscribe in two clicks.
          </p>
          <p style={{ marginTop: '16px' }}>
            Signup is in build. The homepage carries a working form in the Thinking chapter — or
            email{' '}
            <a
              href="mailto:subscribe@sapientdigital.io"
              style={{ color: 'var(--rs-signal)', textDecoration: 'underline' }}
            >
              subscribe@sapientdigital.io
            </a>{' '}
            and we&apos;ll add you.
          </p>
        </>
      }
      statusLabel="Signup Form in Build"
      meta={[
        { label: 'Cadence', value: 'Monthly' },
        { label: 'Format', value: 'One editorial note' },
      ]}
      primaryLabel="Read the Thinking →"
      primaryHref="/#thinking"
      secondaryLabel="← Return home"
    />
  );
}
