import { Button } from "@/components/ui/Button";
import { StatChip } from "@/components/ui/StatChip";
import { Reveal, Parallax } from "@/components/motion/Reveal";
import MagneticButton from "@/components/fx/MagneticButton";

const stats = [
  { label: "Avg. Traffic Increase", value: "247%", delta: 247 },
  { label: "Domain Authority Lift", value: "+18", delta: 45 },
  { label: "Media Placements", value: "120+" },
  { label: "Featured Snippets", value: "340+", delta: 156 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 pt-24">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-inter-tight)] mb-6 leading-tight">
            Integrated PR, Content & SEO{" "}
            <span className="text-accent-400">That Compounds</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xl md:text-2xl text-fg-300 mb-12 max-w-3xl mx-auto">
            Senior-led campaigns that combine earned media, strategic content,
            and technical SEO into one coherent growth system.
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.2 + i * 0.08}>
              <div className="gradient-border">
                <StatChip
                  label={stat.label}
                  value={stat.value}
                  delta={stat.delta}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5}>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton>Book a Strategy Call</MagneticButton>
            <Button variant="ghost">View Case Studies</Button>
          </div>
        </Reveal>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
