const steps = [
  {
    number: "01",
    title: "Audit & Strategy",
    description:
      "Deep-dive analysis of your current positioning, competitive landscape, and growth opportunities. We identify quick wins and long-term plays.",
    deliverables: [
      "Technical SEO audit",
      "Content gap analysis",
      "Media opportunity mapping",
      "6-month roadmap",
    ],
  },
  {
    number: "02",
    title: "Foundation",
    description:
      "Fix the technical foundation. Optimize site architecture, speed, and crawlability. Implement tracking and analytics infrastructure.",
    deliverables: [
      "Core Web Vitals optimization",
      "Schema markup implementation",
      "Analytics setup & dashboards",
      "Baseline performance report",
    ],
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Launch integrated campaigns. Publish high-signal content, pitch media, build backlinks. Everything compounds.",
    deliverables: [
      "Weekly content publication",
      "Media outreach & placement",
      "Backlink acquisition",
      "Performance tracking",
    ],
  },
  {
    number: "04",
    title: "Scale & Optimize",
    description:
      "Double down on what works. Expand keyword coverage, increase PR cadence, optimize conversion paths. Continuous improvement.",
    deliverables: [
      "A/B testing & optimization",
      "Content expansion",
      "Advanced link building",
      "Monthly strategy reviews",
    ],
  },
];

export default function ApproachSection() {
  return (
    <section id="approach" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-4">
            Our <span className="text-accent-400">Approach</span>
          </h2>
          <p className="text-xl text-fg-300 max-w-3xl mx-auto">
            A structured process designed for compounding growth. No guesswork, no
            vanity metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-8 rounded-xl bg-bg-700 border border-line-700 hover:border-accent-500/50 transition-all duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl font-bold font-[family-name:var(--font-inter-tight)] text-accent-500/30">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-fg-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-fg-300">{step.description}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-fg-100 mb-3">
                  Key Deliverables
                </h4>
                <ul className="space-y-2">
                  {step.deliverables.map((deliverable, idx) => (
                    <li
                      key={idx}
                      className="text-fg-300 text-sm flex items-start gap-2"
                    >
                      <span className="text-accent-400 mt-1">→</span>
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
