import { Lightbulb, Crown, Rocket, Share2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const items = [
  {
    icon: Lightbulb,
    title: "Signal",
    body: "Narrative design and category story. We craft the angles that earn coverage and spark demand.",
  },
  {
    icon: Crown,
    title: "Authority",
    body: "Executive bylines, expert content engines, and entity SEO that build durable trust.",
  },
  {
    icon: Rocket,
    title: "Growth",
    body: "Technical + programmatic SEO, conversion design, and CRO sprints that scale discovery.",
  },
  {
    icon: Share2,
    title: "Exposure",
    body: "Distribution ops—syndication, podcast tours, and social loops—to compound reach.",
  },
];

export default function Methodologies() {
  return (
    <section id="methodologies" className="bg-bg-800">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <Reveal>
          <header className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-inter-tight)] tracking-tight">
              Methodologies
            </h2>
            <p className="mt-3 text-fg-300 max-w-2xl">
              We run an integrated operating model—SAGE—that turns earned signal
              into owned authority, then amplifies it for compounding growth and
              exposure.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="rounded-lg border border-line-700 bg-bg-700 p-6 hover:border-accent-500/50 transition-all duration-200">
                <div className="mb-4 inline-flex items-center justify-center rounded-md border border-line-700 bg-bg-800 p-2 text-accent-500">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-fg-100">
                  {it.title}
                </h3>
                <p className="mt-2 text-fg-300 text-sm">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-12 rounded-lg border border-line-700 bg-bg-700 p-6">
            <h3 className="text-lg font-semibold text-fg-100">
              SAGE in practice
            </h3>
            <ul className="mt-3 grid gap-3 md:grid-cols-2 text-fg-300 text-sm">
              <li>
                • <strong className="text-fg-100">Signals</strong> → media
                angles, founder narratives, category POV
              </li>
              <li>
                • <strong className="text-fg-100">Authority</strong> → bylines,
                expert content, entity schema
              </li>
              <li>
                • <strong className="text-fg-100">Growth</strong> →
                programmatic pages, keyword clusters, CRO
              </li>
              <li>
                • <strong className="text-fg-100">Exposure</strong> → podcast
                tours, syndication, newsletter loops
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
