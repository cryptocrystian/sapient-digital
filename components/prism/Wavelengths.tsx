// Wavelengths — the four pillars as rooms of the prism.
// Each gets its own color-headed card with 3 sub-components.

import Link from "next/link";

const WAVELENGTHS = [
  {
    k: "beam",
    color: "var(--beam)",
    textColor: "var(--canvas)",
    chipClass: "pill--beam",
    tag: "λ · BEAM",
    name: "The Beam",
    pillar: "Earned media · PR",
    tagline: "The first strike.",
    body: "Tier-1 placements, senior journalist relationships, pitch cadence that journalists actually open. Every placement logged against the citation it eventually triggers.",
    subs: [
      { icon: "beam", t: "Pitch desk",         d: "Named journalists, warm relationships, weekly cadence." },
      { icon: "beam", t: "Media list, curated", d: "Not scraped. Tier-1 only. Updated monthly." },
      { icon: "beam", t: "Citation log",        d: "Every placement → the AI citation it triggered." },
    ],
  },
  {
    k: "medium",
    color: "var(--medium)",
    textColor: "var(--ink)",
    chipClass: "pill",
    tag: "λ · MEDIUM",
    name: "The Medium",
    pillar: "Expert content",
    tagline: "Where authority is composed.",
    body: "Original research, executive bylines, category-defining features. Published under real names on real surfaces — the kind trade press cites back.",
    subs: [
      { icon: "medium", t: "Original research", d: "Data-first pieces that reporters embed." },
      { icon: "medium", t: "Byline program",    d: "Executive thought leadership, placed under name." },
      { icon: "medium", t: "Entity map",        d: "Topical authority structured for every reader." },
    ],
  },
  {
    k: "refraction",
    color: "var(--refraction)",
    textColor: "var(--refraction-ink)",
    chipClass: "pill--refraction",
    tag: "λ · REFRACTION",
    name: "The Refraction",
    pillar: "SEO · AEO",
    tagline: "Signal, bent for every reader.",
    body: "Technical SEO plus answer-engine optimization. We make sure Google ranks you, Perplexity cites you, and ChatGPT reaches for you when the question comes.",
    subs: [
      { icon: "refraction", t: "Technical SEO",       d: "Core Web Vitals, schema, index coverage." },
      { icon: "refraction", t: "AEO measurement",     d: "Share of model across ChatGPT, Perplexity, AI Overviews." },
      { icon: "refraction", t: "Programmatic clusters", d: "Query coverage at category scale." },
    ],
  },
  {
    k: "spectrum",
    color: "var(--spectrum)",
    textColor: "var(--canvas)",
    chipClass: "pill",
    tag: "λ · SPECTRUM",
    name: "The Spectrum",
    pillar: "Video",
    tagline: "Full emission — color, motion, reach.",
    body: "The one surface that already contains the other three. Thought-leadership series, video press releases, avatar-led shorts. Instrumented pipeline, weekly cadence.",
    subs: [
      { icon: "spectrum", t: "Thought-leadership series", d: "11 live this quarter. Named faces, real cadence." },
      { icon: "spectrum", t: "Video press releases",      d: "Journalists can embed. Google indexes. AI cites." },
      { icon: "spectrum", t: "Avatar programs",            d: "AI pipeline → review → publish. Weekly shipped." },
    ],
  },
];

export function Wavelengths() {
  return (
    <section
      id="wavelengths"
      className="section section--canvas"
      style={{ paddingTop: 112, paddingBottom: 112 }}
    >
      <div className="container-wide">
        <div style={{ marginBottom: 56, maxWidth: 760 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6vw, 92px)",
              lineHeight: 0.96,
              fontWeight: 700,
              letterSpacing: "-0.038em",
              color: "var(--ink)",
              maxWidth: "20ch",
              margin: 0,
            }}
          >
            Four pillars, kept in <span className="text-beam">phase</span>.
          </h2>
          <p
            style={{
              marginTop: 20,
              fontSize: "clamp(17px, 1.4vw, 20px)",
              lineHeight: 1.5,
              color: "var(--body)",
              maxWidth: "56ch",
            }}
          >
            Each pillar does its own work. The orchestration layer holds them coherent so the brand voice stays one voice everywhere the market reads.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}
          className="p-wave-grid"
        >
          {WAVELENGTHS.map((w) => (
            <article
              key={w.k}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--rule)",
                padding: "32px 28px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                position: "relative",
                overflow: "hidden",
                minHeight: 420,
              }}
            >
              {/* Color seam */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 4,
                  background: w.color,
                }}
              />

              <header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                    color: w.k === "refraction" ? "var(--refraction-ink)" : (w.k === "spectrum" ? "var(--spectrum-dim)" : (w.k === "medium" ? "var(--medium-dim)" : "var(--beam-dim)")),
                  }}
                >
                  {w.tag}
                </span>
                <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>
                  {w.pillar}
                </span>
              </header>

              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 3.6vw, 44px)",
                    fontWeight: 700,
                    color: "var(--ink)",
                    letterSpacing: "-0.025em",
                    lineHeight: 0.98,
                    margin: 0,
                  }}
                >
                  {w.name}
                </h3>
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 500,
                    color: "var(--body)",
                    opacity: 0.75,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {w.tagline}
                </div>
              </div>

              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--body)" }}>
                {w.body}
              </p>

              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid var(--rule)" }}>
                {w.subs.map((sub) => (
                  <li
                    key={sub.t}
                    style={{
                      padding: "14px 0",
                      borderBottom: "1px solid var(--rule)",
                      display: "grid",
                      gridTemplateColumns: "6px minmax(0, 160px) 1fr",
                      gap: 16,
                      alignItems: "baseline",
                    }}
                  >
                    <span aria-hidden="true" style={{ width: 6, height: 6, background: w.color, display: "block", alignSelf: "center" }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                      {sub.t}
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--body)", lineHeight: 1.5 }}>
                      {sub.d}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#start"
                style={{
                  marginTop: "auto",
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink)",
                  textDecoration: "none",
                  padding: "10px 0",
                }}
              >
                Learn more
                <span style={{ width: 32, height: 32, background: w.k === "refraction" ? w.color : "var(--refraction)", border: "1px solid var(--ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" }}>
                  <svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <style>
        {`
        @media (max-width: 820px) {
          .p-wave-grid { grid-template-columns: 1fr !important; }
        }
        `}
      </style>
    </section>
  );
}
