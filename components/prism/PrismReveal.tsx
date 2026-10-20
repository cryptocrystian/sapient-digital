import { PrismMark } from "./PrismMark";

// The Sapient Prism — reveal section with the big bespoke illustration.
// Four pillar rays converge through the prism into one unified beam.

export function PrismReveal() {
  return (
    <section
      id="prism"
      className="section section--canvas"
      style={{ paddingTop: 72, paddingBottom: 96, borderTop: "1px solid var(--rule)" }}
    >
      <div className="container-wide">
        {/* Section head — no eyebrow */}
        <div style={{ marginBottom: 48, maxWidth: 820 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6vw, 92px)",
              lineHeight: 0.96,
              fontWeight: 700,
              letterSpacing: "-0.038em",
              color: "var(--ink)",
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Four pillars in. One presence out.
          </h2>
          <p
            style={{
              marginTop: 24,
              fontSize: "clamp(17px, 1.4vw, 20px)",
              lineHeight: 1.55,
              color: "var(--body)",
              maxWidth: "56ch",
            }}
          >
            Press, content, search visibility, and video enter as four separate signals. The orchestration layer converges them into one coherent voice — the brand presence the market reads back on every surface.
          </p>
        </div>

        {/* The prism */}
        <div
          style={{
            background: "var(--paper)",
            border: "1px solid var(--rule)",
            padding: "48px 32px 40px",
            position: "relative",
          }}
        >
          <PrismMark />
        </div>
      </div>
    </section>
  );
}
