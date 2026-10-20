// Start — final CTA with the "Book a Prism Audit" ask.
// Ink surface, one restrained vermillion.

import Link from "next/link";

export function Start() {
  return (
    <section
      id="start"
      className="section section--ink"
      style={{ paddingTop: 128, paddingBottom: 128, position: "relative", overflow: "hidden" }}
    >
      <div className="container-wide">
        <div style={{ marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6vw, 92px)",
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-0.038em",
              color: "var(--soft-ink)",
              margin: 0,
              maxWidth: "22ch",
            }}
          >
            Thirty minutes. We audit your prism <span style={{ color: "var(--beam)" }}>live</span>.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32, alignItems: "end", marginBottom: 72 }} className="p-start-body">
          <p
            style={{
              gridColumn: "5 / span 7",
              fontSize: "clamp(18px, 1.6vw, 22px)",
              lineHeight: 1.5,
              color: "var(--soft-ink)",
              opacity: 0.84,
              margin: 0,
              maxWidth: "48ch",
            }}
          >
            We&rsquo;ll pull your share of model from PrismOS on the call, name three fixable gaps across the four wavelengths, and send the audit after. No deck. No SDR. One partner on the line.
          </p>
          <div style={{ gridColumn: "span 4", textAlign: "right", display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }} className="p-start-cta">
            <a href="mailto:hello@sapient.digital?subject=Prism%20Audit" className="btn btn-beam" style={{ padding: "16px 22px" }}>
              Book the audit
            </a>
            <a href="mailto:hello@sapient.digital" className="cta-arrow" aria-label="Email us">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Terms strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            paddingTop: 32,
            borderTop: "1px solid rgba(232,227,213,0.14)",
          }}
          className="p-start-terms"
        >
          <Term k="Floor"  v="Engagements start at $18k/mo" />
          <Term k="Terms"  v="Quarterly, month-to-month after Q1" />
          <Term k="Fit"    v="B2B · growth-stage · earned-first ready" />
          <Term k="PrismOS" v="Share-of-model instrumentation included" />
        </div>
      </div>

      <style>
        {`
        @media (max-width: 900px) {
          .p-start-head, .p-start-body { grid-template-columns: 1fr !important; }
          .p-start-head > *, .p-start-body > * { grid-column: 1 !important; }
          .p-start-cta { text-align: left !important; justify-content: flex-start !important; }
          .p-start-terms { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .p-start-terms { grid-template-columns: 1fr !important; }
        }
        `}
      </style>
    </section>
  );
}

function Term({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--dim-ink)", marginBottom: 8 }}>
        {k}
      </div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--soft-ink)", fontWeight: 500, lineHeight: 1.4 }}>
        {v}
      </div>
    </div>
  );
}
