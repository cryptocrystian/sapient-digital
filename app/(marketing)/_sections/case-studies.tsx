import CaseStudyCard from "@/components/CaseStudyCard";
import { CaseStudy } from "@/types/case-study";

const caseStudies: CaseStudy[] = [
  {
    title: "B2B SaaS Platform: 340% Organic Growth in 8 Months",
    slug: "b2b-saas-organic-growth",
    client: "Mid-market SaaS",
    industry: "Project Management",
    problem:
      "Low domain authority (DA 24), minimal organic visibility, and struggling to compete with established players spending millions on paid ads.",
    approach:
      "Integrated campaign combining tier-1 PR for backlinks, pillar content targeting high-intent keywords, and technical SEO to improve crawl efficiency and Core Web Vitals.",
    execution:
      "Secured 18 media placements in TechCrunch, Forbes, and industry publications. Published 24 long-form guides optimized for commercial keywords. Implemented schema markup and improved page speed by 40%.",
    results: [
      { kpi: "Organic Traffic", value: "12.4K → 54.6K/mo", delta: 340 },
      { kpi: "Domain Authority", value: "24 → 42", delta: 75 },
      { kpi: "Featured Snippets", value: "142", delta: 142 },
      { kpi: "MQL from Organic", value: "3.2K", delta: 420 },
    ],
    quote: {
      text: "Sapient Digital didn't just increase our traffic—they transformed how we think about growth. The PR-SEO integration is a competitive moat now.",
      author: "Sarah Chen",
      role: "VP Marketing",
    },
  },
  {
    title: "Fintech Startup: From Zero to Thought Leader",
    slug: "fintech-thought-leadership",
    client: "Early-stage Fintech",
    industry: "Financial Services",
    problem:
      "Brand new domain, no backlinks, competing against legacy financial institutions with decades of trust and authority.",
    approach:
      "Positioned founder as a category expert through strategic PR and thought leadership content. Built topical authority in crypto lending and DeFi.",
    execution:
      "Published 16 data-driven articles and reports. Secured founder interviews in WSJ, Bloomberg, and Decrypt. Built robust internal linking structure and optimized for E-E-A-T signals.",
    results: [
      { kpi: "Backlinks", value: "0 → 380", delta: 100 },
      { kpi: "Domain Authority", value: "8 → 34", delta: 325 },
      { kpi: "Page 1 Rankings", value: "68", delta: 68 },
      { kpi: "Inbound Leads", value: "1.8K", delta: 100 },
    ],
    quote: {
      text: "They helped us build credibility faster than we thought possible. The media coverage alone was worth 10x our investment.",
      author: "Marcus Wu",
      role: "Founder & CEO",
    },
  },
];

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-24 px-8 bg-bg-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-4">
            Proven <span className="text-accent-400">Results</span>
          </h2>
          <p className="text-xl text-fg-300 max-w-3xl mx-auto">
            Real companies. Real growth. Every metric tracked, verified, and
            reproducible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
