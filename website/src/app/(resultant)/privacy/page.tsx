import type { Metadata } from 'next';
import ResultantPlaceholder from '@/components/resultant/ResultantPlaceholder';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Sapient Digital collects, uses, and protects your information.',
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <ResultantPlaceholder
      theme="light"
      eyebrow="Legal"
      title="Privacy Policy."
      body={
        <>
          <p>
            Our privacy policy is in legal review ahead of launch. The published version will
            cover what information we collect, how we use it, who we share it with, how we store
            it, your rights as a data subject (including GDPR), cookie usage, and how to contact
            us about your data.
          </p>
          <p style={{ marginTop: '16px' }}>
            For questions in the interim, email{' '}
            <a
              href="mailto:privacy@sapientdigital.io"
              style={{ color: 'var(--rs-signal)', textDecoration: 'underline' }}
            >
              privacy@sapientdigital.io
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
