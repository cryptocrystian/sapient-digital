import type { Metadata } from 'next';
import AuditPageShell, { TM } from '@/components/audit/AuditPageShell';

export const metadata: Metadata = {
  title: 'Search & AI Visibility Scorecard',
  description:
    'A free diagnostic of how your brand performs across traditional search and AI-assisted research — sampled across ChatGPT, Gemini, Google AI, Perplexity, and Bing.',
};

export default function AuditVisibilityPage() {
  return (
    <AuditPageShell
      badge={
        <>
          The Resultant Scorecard<TM /> · Search &amp; AI Visibility
        </>
      }
      headline={
        <>
          Your visibility in search &amp; AI, <em>scored.</em>
        </>
      }
      subhead="A free diagnostic of how your brand performs across traditional search and AI-assisted research — sampled across prompt clusters and compared against named competitors."
      entryPath="ai"
      ctaLabel="Score My Visibility →"
    />
  );
}
