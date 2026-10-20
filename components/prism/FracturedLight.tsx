// Fractured Light — the problem section.
// Six symptom cards with ghost numerals. TripleDart-adjacent treatment.

const SYMPTOMS = [
  {
    k: "01",
    t: "Agency silos",
    d: "Your PR agency doesn't talk to your SEO firm. Your content team hands off to nobody. Four invoices, four strategies, zero compounding.",
  },
  {
    k: "02",
    t: "Misattributed press",
    d: "A tier-1 placement spikes your traffic. Nobody can tell you what it was worth, which keywords it moved, or which AI engine started citing you after.",
  },
  {
    k: "03",
    t: "Invisible to AI",
    d: "Perplexity and ChatGPT cite your competitor on your own category queries. You have no visibility into why or how to fix it.",
  },
  {
    k: "04",
    t: "Dark-funnel video",
    d: "Your video content runs separate from everything else. Journalists can't embed it. SEO can't index it. The spend evaporates.",
  },
  {
    k: "05",
    t: "Duplicate briefs",
    d: "The same story told four different ways by four different teams. The brand voice drifts. The spectrum goes incoherent.",
  },
  {
    k: "06",
    t: "Data orphans",
    d: "Every channel optimizes on its own data. No shared signal. No orchestration. No one holds the whole picture.",
  },
];

export function FracturedLight() {
  return (
    <section
      className="section section--ink"
      style={{ paddingTop: 112, paddingBottom: 112 }}
    >
      <div className="container-wide">
        <div style={{ marginBottom: 56, maxWidth: 760 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 5.4vw, 84px)",
              color: "var(--soft-ink)",
              lineHeight: 0.98,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              maxWidth: "18ch",
              margin: 0,
            }}
          >
            Where fractured light leaks.
          </h2>
          <p
            style={{
              marginTop: 24,
              fontSize: "clamp(17px, 1.4vw, 20px)",
              lineHeight: 1.55,
              color: "var(--soft-ink)",
              opacity: 0.82,
              maxWidth: "60ch",
            }}
          >
            Growth teams run four pillars as four separate retainers. The pillars never converge, the brand voice drifts, and the market reads back fragments instead of a presence. These are the symptoms.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            background: "rgba(232,227,213,0.14)",
            border: "1px solid rgba(232,227,213,0.14)",
          }}
          className="p-symptoms-grid"
        >
          {SYMPTOMS.map((s) => (
            <article
              key={s.k}
              style={{
                background: "var(--charcoal)",
                padding: "32px 28px 40px",
                position: "relative",
                overflow: "hidden",
                minHeight: 240,
              }}
            >
              {/* Ghost numeral */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: -16,
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 160,
                  lineHeight: 1,
                  letterSpacing: "-0.045em",
                  color: "rgba(232,227,213,0.05)",
                  pointerEvents: "none",
                }}
              >
                {s.k.replace("0", "")}
              </span>

              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", fontWeight: 600, color: "var(--beam)" }}>
                {s.k}
              </div>
              <h3
                style={{
                  marginTop: 16,
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 700,
                  color: "var(--soft-ink)",
                  letterSpacing: "-0.018em",
                  lineHeight: 1.1,
                }}
              >
                {s.t}
              </h3>
              <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.55, color: "var(--soft-ink)", opacity: 0.72, position: "relative" }}>
                {s.d}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>
        {`
        @media (max-width: 900px) {
          .p-symptoms-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .p-symptoms-grid { grid-template-columns: 1fr !important; }
        }
        `}
      </style>
    </section>
  );
}
