import type { Metadata } from 'next';
import ResultantPlaceholder from '@/components/resultant/ResultantPlaceholder';

export const metadata: Metadata = {
  title: 'Measuring AI Visibility Without Pretending It Is Revenue',
  description:
    'What AI citation measurement can and cannot tell you — the sampling discipline, the honest caveats, and why rank-#1-in-ChatGPT is a claim nobody can make.',
};

export default function AiVisibilityMeasurementPage() {
  return (
    <ResultantPlaceholder
      theme="light"
      eyebrow="Methodology Explainer"
      title={<>Measuring AI Visibility<br />Without Pretending It Is Revenue.</>}
      body={
        <>
          <p>
            What AI citation measurement can and cannot tell you — the sampling discipline, the
            honest caveats, the difference between observed inclusion and attributed influence,
            and why &quot;rank #1 in ChatGPT&quot; is a claim nobody can make.
          </p>
          <p style={{ marginTop: '16px' }}>
            18-minute read. Methodology audit complete. Final writing pass in progress. Expected
            publish: 2026 Q4.
          </p>
        </>
      }
      statusLabel="Final Writing Pass · 2026 Q4"
      meta={[
        { label: 'Length', value: '18 min read' },
        { label: 'Price', value: 'Free' },
      ]}
      primaryLabel="Subscribe for Launch →"
      primaryHref="/subscribe"
      secondaryLabel="← Back to Thinking"
      secondaryHref="/#thinking"
    />
  );
}
