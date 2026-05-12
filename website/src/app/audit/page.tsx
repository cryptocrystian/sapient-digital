import type { Metadata } from 'next';
import AuditClient from './AuditClient';

export const metadata: Metadata = {
  title: 'Free Visibility Audit',
  description:
    "Score your brand's PR presence, content coverage, and AI citation rank across Google, ChatGPT, Perplexity, Gemini, and Bing. Free, 30-second diagnostic.",
};

export default function AuditPage() {
  return <AuditClient />;
}
