import type { Metadata } from 'next';
import ResultantPlaceholder from '@/components/resultant/ResultantPlaceholder';

export const metadata: Metadata = {
  title: 'About Sapient Digital',
  description:
    'The team behind the Resultant Framework. Experienced communications thinking combined with intelligent operating systems to help B2B companies become better known, better understood, and easier to discover.',
};

export default function AboutPage() {
  return (
    <ResultantPlaceholder
      theme="light"
      eyebrow="About"
      title="Good marketing takes judgment. Better marketing connects it."
      body={
        <>
          <p>
            Sapient Digital combines experienced communications thinking with intelligent
            operating systems to help B2B companies become better known, better understood, and
            easier to discover.
          </p>
          <p style={{ marginTop: '16px' }}>
            This page will carry the people who do the work — their bios, their credentials, and
            the published thinking that got them here. Launching alongside the first set of named
            team pages.
          </p>
        </>
      }
      statusLabel="Writing · Portrait Shoot Scheduled"
      meta={[
        { label: 'Status', value: 'Team bios in review' },
        { label: 'Expected', value: '2026 Q4' },
      ]}
      primaryLabel="Talk Strategy →"
    />
  );
}
