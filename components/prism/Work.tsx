// Work — recent engagements shown as case tiles. Prominent but tight.
// Placeholder language reads AS placeholder ("A Series B infrastructure brand").

import Link from "next/link";

const CASES = [
  {
    k: "C01",
    industry: "B2B · Infrastructure",
    stage: "Series B",
    headline: "A quiet-infra brand owns Perplexity on four category queries.",
    big: "+312%",
    bigLabel: "Perplexity cites · YoY",
    tags: ["Beam", "Medium", "Refraction"],
    cover: "composite",
  },
  {
    k: "C02",
    industry: "Fintech",
    stage: "Early-stage",
    headline: "Three bylines in Bloomberg, DA 8 → 34 in seven months.",
    big: "+325%",
    bigLabel: "DA lift · 7 months",
    tags: ["Beam", "Medium"],
    cover: "mastheads",
  },
  {
    k: "C03",
    industry: "Developer platform",
    stage: "Series C",
    headline: "24 ChatGPT citations per week, up from 6.",
    big: "6 → 24",
    bigLabel: "AI citations / week",
    tags: ["Medium", "Refraction", "Spectrum"],
    cover: "slope",
  },
];

export function Work() {
  return (
    <section
      id="work"
      className="section section--canvas"
      style={{ paddingTop: 112, paddingBottom: 112 }}
    >
      <div className="container-wide">
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32, alignItems: "end", marginBottom: 56 }}
          className="p-work-head"
        >
          <div style={{ gridColumn: "span 5" }} className="p-work-head-l">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5vw, 76px)",
                lineHeight: 0.98,
                fontWeight: 700,
                letterSpacing: "-0.038em",
                color: "var(--ink)",
                maxWidth: "18ch",
                margin: 0,
              }}
            >
              The <span className="text-beam">spectrum</span>, in production.
            </h2>
          </div>
          <p
            style={{ gridColumn: "span 7", fontSize: "clamp(17px, 1.4vw, 20px)", color: "var(--body)", maxWidth: "48ch", lineHeight: 1.5 }}
            className="p-work-head-r"
          >
            Three recent engagements. Named shapes rather than named names, until the agreements say otherwise.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="p-work-grid"
        >
          {CASES.map((c) => (
            <article
              key={c.k}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--rule)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <WorkCover kind={c.cover} />
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <span className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                    {c.industry} · {c.stage}
                  </span>
                  <span className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", color: "var(--beam-dim)", fontWeight: 700 }}>
                    {c.k}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.15, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.018em" }}>
                  {c.headline}
                </h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 4, paddingTop: 16, borderTop: "1px solid var(--rule)" }}>
                  <span
                    className="font-display"
                    style={{ fontSize: 42, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.028em", lineHeight: 0.9 }}
                  >
                    {c.big}
                  </span>
                  <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                    {c.bigLabel}
                  </span>
                </div>
                <div style={{ marginTop: "auto", paddingTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        padding: "4px 8px",
                        border: "1px solid var(--rule)",
                        color: "var(--muted)",
                      }}
                    >
                      λ {t.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "right" }}>
          <Link href="/work" className="btn btn-ghost btn-sm">
            See all runs →
          </Link>
        </div>
      </div>

      <style>
        {`
        @media (max-width: 900px) {
          .p-work-head { grid-template-columns: 1fr !important; gap: 16px !important; }
          .p-work-head-l, .p-work-head-r { grid-column: 1 !important; }
          .p-work-grid { grid-template-columns: 1fr !important; }
        }
        `}
      </style>
    </section>
  );
}

/* ─── Case cover artwork (abstract, no fake clients) ─── */
function WorkCover({ kind }: { kind: string }) {
  if (kind === "composite") return <CompositeCover />;
  if (kind === "mastheads") return <MastheadsCover />;
  return <SlopeCover />;
}

function CompositeCover() {
  return (
    <div style={{ aspectRatio: "4/3", background: "var(--ink)", color: "var(--canvas)", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--dim-ink)", textTransform: "uppercase" }}>
        Composite · 12-mo
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(72px, 14vw, 110px)", lineHeight: 0.9, letterSpacing: "-0.055em", fontWeight: 700 }}>
          92<span style={{ fontSize: "0.4em", color: "var(--beam)", verticalAlign: "top" }}>/100</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, paddingTop: 12, borderTop: "1px solid rgba(232,227,213,0.14)" }}>
        {[["BEAM", "+42"], ["MED", "+28"], ["REF", "+31"], ["SPEC", "+27"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.14em", color: "var(--dim-ink)" }}>{k}</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--beam)", fontWeight: 700 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MastheadsCover() {
  const PUBS = ["Wired.", "Bloomberg.", "Stratechery.", "The Verge."];
  return (
    <div style={{ aspectRatio: "4/3", background: "var(--mist)", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}>
        Last 6 mo · tier 1
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 0 }}>
        {PUBS.map((p, i) => (
          <li
            key={p}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(24px, 4vw, 44px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: i === 0 ? "var(--beam-dim)" : "var(--ink)",
            }}
          >
            {p}
          </li>
        ))}
      </ul>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
        + 11 more · weekly cadence
      </div>
    </div>
  );
}

function SlopeCover() {
  return (
    <div style={{ aspectRatio: "4/3", background: "var(--paper)", border: "1px solid var(--rule)", padding: 20, display: "flex", flexDirection: "column", gap: 14, position: "relative", overflow: "hidden" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}>
        AI cites / week · 16 mo
      </div>
      <svg viewBox="0 0 400 220" style={{ width: "100%", height: "100%", flex: 1 }} preserveAspectRatio="none">
        <g stroke="var(--rule)" strokeWidth="1">
          <line x1="0" y1="50" x2="400" y2="50" />
          <line x1="0" y1="110" x2="400" y2="110" />
          <line x1="0" y1="170" x2="400" y2="170" />
        </g>
        <path d="M 0 190 C 60 185, 110 178, 150 170 S 240 140, 290 100 S 370 40, 400 20"
              fill="none" stroke="var(--beam)" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 0 190 C 60 185, 110 178, 150 170 S 240 140, 290 100 S 370 40, 400 20 L 400 220 L 0 220 Z"
              fill="var(--beam)" fillOpacity="0.1" />
        <circle cx="400" cy="20" r="4" fill="var(--beam)" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}>
        <span>Jun&apos;25 · 6/wk</span>
        <span style={{ color: "var(--beam-dim)", fontWeight: 700 }}>Oct&apos;26 · 24/wk</span>
      </div>
    </div>
  );
}
