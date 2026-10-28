import type { Metadata } from 'next';
import AuditClient from './AuditClient';

export const metadata: Metadata = {
  title: 'The Resultant Scorecard™ — Free Diagnostic',
  description:
    "Score your market presence across digital PR, strategic content, and search & AI visibility. Free 60-second diagnostic sampled across ChatGPT, Gemini, Google AI, Perplexity, and Bing. Human-reviewed results. No credit card.",
};

export default function AuditPage() {
  return <AuditClient />;
}
