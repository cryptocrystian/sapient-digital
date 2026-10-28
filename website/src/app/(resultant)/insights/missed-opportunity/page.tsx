import type { Metadata } from 'next';
import ResultantPlaceholder from '@/components/resultant/ResultantPlaceholder';

export const metadata: Metadata = {
  title: 'The Missed Opportunity Between PR, Content & Search',
  description:
    'An annotated hypothetical integrated campaign showing where coverage, content, and discoverability compound when the work is coordinated instead of calendared separately.',
};

export default function MissedOpportunityPage() {
  return (
    <ResultantPlaceholder
      theme="light"
      eyebrow="Essay"
      title={<>The Missed Opportunity<br />Between PR, Content &amp; Search.</>}
      body={
        <>
          <p>
            An annotated hypothetical integrated campaign — showing where coverage, content, and
            discoverability compound when the work is coordinated instead of calendared
            separately. Twelve-minute read, published as part of the launch set.
          </p>
          <p style={{ marginTop: '16px' }}>
            Draft is in review with editorial. Expected publish: 2026 Q4. Subscribe to be
            notified the day it goes live.
          </p>
        </>
      }
      statusLabel="Editorial Review · 2026 Q4"
      meta={[
        { label: 'Length', value: '12 min read' },
        { label: 'Price', value: 'Free' },
      ]}
      primaryLabel="Subscribe for Launch →"
      primaryHref="/subscribe"
      secondaryLabel="← Back to Thinking"
      secondaryHref="/#thinking"
    />
  );
}
