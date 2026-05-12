import type { Metadata } from 'next';
import AuditPageShell, { TM } from '@/components/audit/AuditPageShell';

export const metadata: Metadata = {
  title: 'Search & AI Visibility Audit',
  description:
    'Free diagnostic of how your brand performs across Google, ChatGPT, Perplexity, Gemini, and Bing — versus competitors.',
};

export default function AuditVisibilityPage() {
  return (
    <AuditPageShell
      badge={
        <>
          Signal Engine
          <TM /> · Search & AI Visibility Audit · Free
        </>
      }
      headline={
        <>
          Your visibility in search and AI,{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>scored.</em>
        </>
      }
      subhead="A free diagnostic of how your brand performs across Google, ChatGPT, Perplexity, Gemini, and Bing — versus competitors."
      entryPath="ai"
      ctaLabel="Get my visibility audit"
    />
  );
}
