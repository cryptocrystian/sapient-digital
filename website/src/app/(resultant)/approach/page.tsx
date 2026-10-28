import type { Metadata } from 'next';
import ResultantPlaceholder from '@/components/resultant/ResultantPlaceholder';

export const metadata: Metadata = {
  title: 'The Resultant Framework™',
  description:
    'The full methodology — the five stages, the four review gates, the human-approval model, and the engagement cadence that turns specialized disciplines into coordinated market presence.',
};

export default function ApproachPage() {
  return (
    <ResultantPlaceholder
      theme="light"
      eyebrow="The Methodology"
      title={<>The Resultant Framework&trade;.<br />The full read.</>}
      statusLabel="In Development · Q4 2026"
      body={
        <>
          <p>
            This page will host the complete methodology: each of the five stages expanded with
            operating detail, the four fixed review gates with examples, the human-approval model
            that governs every outbound action, scope boundaries per discipline, and the
            engagement cadence that turns specialized work into coordinated market presence.
          </p>
          <p style={{ marginTop: '16px' }}>
            For now, the short version lives on the <a href="/#method" style={{ color: 'var(--rs-signal)', textDecoration: 'underline' }}>homepage methodology chapter</a>.
            When this page launches, it will also carry an 8-page PDF primer you can take with you.
          </p>
        </>
      }
      meta={[
        { label: 'Status', value: 'Writing' },
        { label: 'Expected', value: '2026 Q4' },
        { label: 'Format', value: 'Long-form + PDF' },
      ]}
      primaryLabel="Talk Strategy →"
      secondaryLabel="← View short version"
      secondaryHref="/#method"
    />
  );
}
