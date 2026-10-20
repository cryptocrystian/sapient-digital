// The Spectrum Reel — video portfolio. Prominent, not centerpiece.
// Placeholder video thumbs rendered as abstract treatment (press-release still,
// avatar frame, thought-leadership intertitle).

const REEL = [
  { k: "V01", kind: "Video press release", client: "Series B infra", length: "0:58", color: "var(--beam)" },
  { k: "V02", kind: "Avatar program · ep 03", client: "Fintech", length: "2:14", color: "var(--medium)" },
  { k: "V03", kind: "Thought-leadership", client: "Developer platform", length: "4:22", color: "var(--spectrum)" },
  { k: "V04", kind: "Social short", client: "Infra", length: "0:28", color: "var(--refraction)" },
];

export function VideoReel() {
  return (
    <section className="section section--mist" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container-wide">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32, alignItems: "end", marginBottom: 40 }} className="p-reel-head">
          <div style={{ gridColumn: "span 7" }} className="p-reel-head-l">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4.6vw, 68px)",
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                color: "var(--ink)",
                maxWidth: "22ch",
                margin: 0,
              }}
            >
              Video that journalists can embed, Google indexes, AI cites.
            </h2>
          </div>
          <p
            style={{ gridColumn: "span 5", fontSize: 16, color: "var(--body)", maxWidth: "40ch", lineHeight: 1.55 }}
            className="p-reel-head-r"
          >
            Four of the twenty-plus productions in flight this quarter — video press releases, avatar programs, and thought-leadership series.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="p-reel-grid">
          {REEL.map((v) => (
            <article key={v.k} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Thumbnail */}
              <div
                style={{
                  aspectRatio: "16/9",
                  background: "var(--ink)",
                  color: "var(--canvas)",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid var(--ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Timecode */}
                <span
                  className="font-mono"
                  style={{
                    position: "absolute",
                    bottom: 10, right: 10,
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    background: "rgba(10,10,8,0.6)",
                    padding: "3px 6px",
                    color: "var(--canvas)",
                  }}
                >
                  {v.length}
                </span>
                {/* Play glyph */}
                <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                  <circle cx="20" cy="20" r="18" fill="none" stroke={v.color} strokeWidth="1.4" />
                  <polygon points="16,13 29,20 16,27" fill={v.color} />
                </svg>
                {/* Color bar top */}
                <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: v.color }} />
                {/* Index */}
                <span
                  className="font-mono"
                  style={{
                    position: "absolute",
                    top: 10, left: 10,
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: v.color,
                    fontWeight: 700,
                  }}
                >
                  {v.k}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                  {v.kind}
                </span>
                <span className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.012em" }}>
                  {v.client}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
            Pipeline · n8n → Higgsfield → HeyGen → ElevenLabs → Vimeo
          </span>
          <a href="#start" className="btn btn-ghost btn-sm">See the full reel →</a>
        </div>
      </div>

      <style>
        {`
        @media (max-width: 900px) {
          .p-reel-head { grid-template-columns: 1fr !important; gap: 16px !important; }
          .p-reel-head-l, .p-reel-head-r { grid-column: 1 !important; }
          .p-reel-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .p-reel-grid { grid-template-columns: 1fr !important; }
        }
        `}
      </style>
    </section>
  );
}
