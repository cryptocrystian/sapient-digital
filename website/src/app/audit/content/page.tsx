import type { Metadata } from 'next';
import AuditPageShell, { TM } from '@/components/audit/AuditPageShell';

export const metadata: Metadata = {
  title: 'Content Authority Audit',
  description:
    'Free diagnostic of your content coverage, citation depth, and editorial authority across search and AI platforms.',
};

export default function AuditContentPage() {
  return (
    <AuditPageShell
      badge={
        <>
          Signal Engine
          <TM /> · Content Authority Audit · Free
        </>
      }
      headline={
        <>
          Your content authority,{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>measured.</em>
        </>
      }
      subhead="A free diagnostic of your content coverage, citation depth, and editorial authority — across search and AI platforms."
      entryPath="content"
      ctaLabel="Get my content audit"
    />
  );
}
