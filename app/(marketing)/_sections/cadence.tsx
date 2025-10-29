"use client";

import { Reveal } from "@/components/motion/Reveal";

const cadences = [
  {
    title: "Weekly",
    description:
      "PR pitching, content production, SEO sprints, KPI checkpoints.",
  },
  {
    title: "Biweekly",
    description: "Strategy sync, backlog grooming, and experiment reviews.",
  },
  {
    title: "Monthly / Quarterly",
    description: "Narrative updates, growth plans, and executive reporting.",
  },
];

export default function Cadence() {
  return (
    <section id="cadence" className="bg-bg-900">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <Reveal>
          <header className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-inter-tight)] tracking-tight">
              Operating Cadence
            </h2>
            <p className="mt-3 text-fg-300 max-w-2xl">
              Senior-operator rituals keep strategy, delivery, and measurement
              tightly aligned.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {cadences.map((cadence, i) => (
            <Reveal key={cadence.title} delay={i * 0.1}>
              <div className="rounded-lg border border-line-700 bg-bg-700 p-6 hover:border-accent-500/50 transition-all duration-200">
                <h3 className="text-lg font-semibold text-fg-100">
                  {cadence.title}
                </h3>
                <p className="mt-2 text-fg-300 text-sm">
                  {cadence.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
