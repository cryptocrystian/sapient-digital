import Link from "next/link";

// Hero — big display thesis, TripleDart register.
// Clean headline (no eyebrow). Testimonial anonymized until real data lands.

export function Hero() {
  return (
    <section style={{ background: "var(--canvas)", position: "relative", overflow: "hidden" }}>
      <div className="container-wide" style={{ paddingTop: 96, paddingBottom: 64 }}>

        {/* Massive display headline — in-metaphor */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(56px, 9vw, 148px)",
            lineHeight: 0.92,
            letterSpacing: "-0.045em",
            fontWeight: 700,
            margin: 0,
            maxWidth: "16ch",
            color: "var(--ink)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: "0.1em" }}>
            <span aria-hidden="true" style={{
              display: "inline-block",
              width: "0.28em",
              height: "0.78em",
              background: "var(--refraction)",
              marginRight: "0.1em",
              transform: "translateY(-0.02em)",
            }} />
            One brand.
          </span>
          <br />
          <span style={{ color: "var(--muted)" }}>Full </span>
          <span style={{ color: "var(--ink)" }}>spectrum.</span>
        </h1>

        {/* Standfirst */}
        <p
          style={{
            marginTop: 36,
            maxWidth: "48ch",
            fontSize: "clamp(18px, 1.6vw, 22px)",
            lineHeight: 1.5,
            color: "var(--body)",
          }}
        >
          Sapient Digital converges four fragmented pillars — PR, editorial content, SEO and answer-engine visibility, and video — into one coherent brand presence. One orchestration layer, measured across every surface the market reads.
        </p>

        {/* CTAs */}
        <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          <Link href="#start" className="btn btn-primary" style={{ padding: "16px 24px" }}>
            Book a Prism Audit
          </Link>
          <Link href="#prism" className="btn btn-ghost" style={{ padding: "16px 24px" }}>
            See the Prism
          </Link>
          <Link href="#prism" className="cta-arrow" aria-label="See the Prism">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Attribution strip — anonymized placeholder, reads as placeholder */}
      <div className="container-wide" style={{ paddingBottom: 56 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid var(--rule)",
            borderBottom: "1px solid var(--rule)",
          }}
          className="p-hero-attr"
        >
          <AttrCell n="Four pillars" v="unified under one brief" />
          <AttrCell n="One attribution layer" v="press → cite, measured" />
          <AttrCell n="Senior-led delivery" v="one partner per account" />
          <AttrCell n="Instrumented by" v="PrismOS, weekly refresh" accent />
        </div>
      </div>

      <style>
        {`
        @media (max-width: 820px) {
          .p-hero-attr { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .p-hero-attr { grid-template-columns: 1fr !important; }
        }
        `}
      </style>
    </section>
  );
}

function AttrCell({ n, v, accent }: { n: string; v: string; accent?: boolean }) {
  return (
    <div style={{ padding: "22px 24px", borderRight: "1px solid var(--rule)", display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        className="font-mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: accent ? "var(--beam-dim)" : "var(--muted)",
          fontWeight: 700,
        }}
      >
        {n}
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--ink)", fontWeight: 500, lineHeight: 1.4 }}>
        {v}
      </span>
    </div>
  );
}
