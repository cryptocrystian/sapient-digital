import type { Metadata } from 'next';
import ResultantPlaceholder from '@/components/resultant/ResultantPlaceholder';

export const metadata: Metadata = {
  title: 'Attention Is Everywhere. Authority Is Scarce.',
  description:
    'A market thesis on how B2B buyers form opinions in the AI-assisted research era — and why earned authority is the only compounding asset left when discovery fragments across every surface.',
};

export default function AttentionAuthorityPage() {
  return (
    <ResultantPlaceholder
      theme="light"
      eyebrow="Featured Report"
      title={<>Attention Is Everywhere.<br />Authority Is Scarce.</>}
      body={
        <>
          <p>
            A 24-page market thesis on how B2B buyers form opinions in the AI-assisted research
            era — and why earned authority is the only compounding asset left when discovery
            fragments across every surface.
          </p>
          <p style={{ marginTop: '16px' }}>
            Content complete. Design pass in progress. Expected publish: 2026 Q4. Subscribe below
            and we&apos;ll send the full PDF the moment it&apos;s live.
          </p>
        </>
      }
      statusLabel="Design Pass · 2026 Q4"
      meta={[
        { label: 'Length', value: '24 pages' },
        { label: 'Price', value: 'Free' },
        { label: 'Format', value: 'PDF + web' },
      ]}
      primaryLabel="Subscribe for Launch →"
      primaryHref="/subscribe"
      secondaryLabel="← Back to Thinking"
      secondaryHref="/#thinking"
    />
  );
}
