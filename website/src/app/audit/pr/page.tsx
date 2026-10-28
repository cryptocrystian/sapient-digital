import type { Metadata } from 'next';
import AuditPageShell, { TM } from '@/components/audit/AuditPageShell';

export const metadata: Metadata = {
  title: 'Digital PR Scorecard',
  description:
    'A free diagnostic of your earned media presence, message pull-through, and journalist relationship depth — benchmarked against your category.',
};

export default function AuditPrPage() {
  return (
    <AuditPageShell
      badge={
        <>
          The Resultant Scorecard<TM /> · Digital PR
        </>
      }
      headline={
        <>
          Your earned media presence, <em>scored.</em>
        </>
      }
      subhead="A free diagnostic of your earned media presence, message pull-through, and journalist relationship depth — benchmarked against your category."
      entryPath="pr"
      ctaLabel="Score My PR Presence →"
    />
  );
}
