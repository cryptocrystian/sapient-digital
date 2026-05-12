import type { Metadata } from 'next';
import AuditPageShell, { TM } from '@/components/audit/AuditPageShell';

export const metadata: Metadata = {
  title: 'PR Presence Audit',
  description:
    'Free diagnostic of your media coverage, pitch placement rate, and journalist relationship depth versus your top competitors.',
};

export default function AuditPrPage() {
  return (
    <AuditPageShell
      badge={
        <>
          Signal Engine
          <TM /> · PR Presence Audit · Free
        </>
      }
      headline={
        <>
          Your PR presence,{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>scored.</em>
        </>
      }
      subhead="A free diagnostic of your media coverage, pitch placement rate, and journalist relationship depth — versus your top competitors."
      entryPath="pr"
      ctaLabel="Get my PR audit"
    />
  );
}
