import type { Metadata } from 'next';
import AuditPageShell, { TM } from '@/components/audit/AuditPageShell';

export const metadata: Metadata = {
  title: 'Strategic Content Scorecard',
  description:
    'A free diagnostic of your content authority, topical presence, and editorial depth across search and AI-assisted research.',
};

export default function AuditContentPage() {
  return (
    <AuditPageShell
      badge={
        <>
          The Resultant Scorecard<TM /> · Strategic Content
        </>
      }
      headline={
        <>
          Your content authority, <em>measured.</em>
        </>
      }
      subhead="A free diagnostic of your content authority, topical presence, and editorial depth across search and AI-assisted research."
      entryPath="content"
      ctaLabel="Score My Content Authority →"
    />
  );
}
