import type { Metadata } from 'next';
import ResultantPlaceholder from '@/components/resultant/ResultantPlaceholder';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Sapient Digital.',
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <ResultantPlaceholder
      theme="light"
      eyebrow="Legal"
      title="Terms of Service."
      body={
        <>
          <p>
            Our terms of service are in legal review ahead of launch. The published version will
            cover acceptable use, intellectual property, limitation of liability, indemnification,
            dispute resolution, and governing law.
          </p>
          <p style={{ marginTop: '16px' }}>
            For questions, email{' '}
            <a
              href="mailto:legal@sapientdigital.io"
              style={{ color: 'var(--rs-signal)', textDecoration: 'underline' }}
            >
              legal@sapientdigital.io
            </a>
            .
          </p>
        </>
      }
      statusLabel="In Legal Review"
      meta={[
        { label: 'Status', value: 'Counsel review' },
        { label: 'Launch', value: 'Pre-public release' },
      ]}
      primaryLabel="Talk Strategy →"
      secondaryLabel="← Return home"
    />
  );
}
