import type { Metadata } from 'next';
import ServicePageShell from '@/components/sections/ServicePageShell';

export const metadata: Metadata = {
  title: 'AI Presence & AEO',
  description:
    "60% of your buyers ask AI who leads your category before they call. We measure, optimize, and grow your brand's AI citation rank across ChatGPT, Perplexity, Gemini, and Claude.",
};

export default function SearchAiVisibilityPage() {
  return (
    <ServicePageShell
      eyebrow="Search & AI Visibility"
      headline={
        <>
          Show up where buyers
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>actually look.</em>
        </>
      }
      subhead="Your buyers search Google, but increasingly they ask AI. Both matter. Most agencies optimize for one. We build the foundation that makes you discoverable across both — because the same signals that help Google understand you help AI cite you."
      chips={['Google', 'ChatGPT', 'Perplexity', 'Gemini', 'Bing']}
      problemH2="The search landscape changed faster than most agencies adapted."
      wrongList={[
        'Keyword rankings',
        'Backlink counts',
        'Domain authority scores',
        'Organic traffic alone',
      ]}
      rightList={[
        'Entity recognition across AI platforms',
        'Citation frequency in AI responses',
        'Topic authority signals',
        'Competitive visibility share',
      ]}
      approachH2="Three things that explain why we show up in both search and AI."
      approach={[
        {
          n: '01',
          title: 'SEO foundation first',
          body:
            'Technical authority, structured data, entity markup, and content architecture that signals topical expertise. This is the foundation that both Google and AI systems build on. No shortcuts — without it, the AEO layer above has nothing to stand on.',
        },
        {
          n: '02',
          title: 'AEO layer on top',
          body:
            'We optimize specifically for how AI systems decide what to cite: entity completeness, authoritative backlink profiles, structured content that LLMs can parse and attribute correctly. AEO is not SEO with a new name — it is a distinct discipline with different signals and benchmarks.',
        },
        {
          n: '03',
          title: 'Measurement across both surfaces',
          body:
            'We track where you rank in Google AND how frequently you appear in AI responses across five platforms. Visibility is the metric, not just traffic. When a buyer asks ChatGPT, Perplexity, or Gemini who leads your category, we measure whether you show up.',
        },
      ]}
      includesH2="What search and AI visibility with Sapient actually looks like."
      includes={[
        'Technical SEO audit and remediation',
        'Entity and structured data optimization',
        'AI citation monitoring (5 platforms)',
        'Competitive visibility tracking',
        'Content gap analysis',
        'Monthly visibility scorecard',
        'Backlink and authority strategy',
        'Quarterly strategy review',
      ]}
      ctaH2="See your current search and AI visibility score."
      ctaBody="Our free visibility audit shows you exactly how you rank across Google and the major AI platforms — and where competitors are taking ground."
      ctaHref="/audit/visibility"
      ctaLabel="Get a free visibility audit"
    />
  );
}
