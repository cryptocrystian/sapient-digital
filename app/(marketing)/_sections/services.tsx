import ServiceCard from "@/components/ServiceCard";
import { Service } from "@/types/service";
import { Reveal } from "@/components/motion/Reveal";

const services: Service[] = [
  {
    name: "Integrated PR",
    summary:
      "Earn media coverage that drives backlinks, brand authority, and qualified traffic.",
    outcomes: [
      "Tier-1 media placements (TechCrunch, Forbes, WSJ)",
      "High-authority backlinks from editorial sources",
      "Brand mentions that convert to organic search visibility",
    ],
    deliverables: [
      "Media pitch strategy & angle development",
      "Press release drafting & distribution",
      "Journalist relationship management",
      "Coverage tracking & backlink analysis",
    ],
    kpis: ["Media placements", "Backlinks earned", "Referral traffic", "Domain authority"],
    timeline: "3-6 months",
  },
  {
    name: "Strategic Content",
    summary:
      "High-signal content that ranks, converts, and positions you as a category leader.",
    outcomes: [
      "First-page rankings for commercial keywords",
      "Thought leadership content that drives inbound leads",
      "Content that attracts natural backlinks",
    ],
    deliverables: [
      "Content strategy & keyword research",
      "Long-form articles & guides",
      "Case studies & white papers",
      "Content distribution & promotion",
    ],
    kpis: ["Keyword rankings", "Organic traffic", "Time on page", "Conversion rate"],
    timeline: "Ongoing",
  },
  {
    name: "Technical SEO",
    summary:
      "Fix the foundation. Optimize site architecture, speed, and crawlability for maximum visibility.",
    outcomes: [
      "Improved crawl efficiency & indexation",
      "Faster page speeds & Core Web Vitals",
      "Structured data for rich results",
    ],
    deliverables: [
      "Technical SEO audit & roadmap",
      "Schema markup implementation",
      "Site speed optimization",
      "Internal linking architecture",
    ],
    kpis: ["Core Web Vitals", "Crawl budget usage", "Index coverage", "Featured snippets"],
    timeline: "1-3 months initial, ongoing maintenance",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-4">
              Services Built to <span className="text-accent-400">Compound</span>
            </h2>
            <p className="text-xl text-fg-300 max-w-3xl mx-auto">
              Each service amplifies the others. PR drives backlinks. Content ranks
              and converts. Technical SEO ensures maximum visibility.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={i * 0.1}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
