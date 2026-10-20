// Masthead — the operators. Named partners.

const TEAM = [
  { initials: "MA", name: "Marisol Alvarez", role: "Partner · Earned Media",     bio: "Fifteen years in trade press. Still writes.",                                          bylines: ["Wired", "Stratechery", "Information"] },
  { initials: "JO", name: "Jude Okafor",     role: "Partner · AI Visibility",    bio: "Built the first in-house AEO practice at a Series C fintech. Instrumented the thing.", bylines: ["Decrypt", "The Verge"] },
  { initials: "RH", name: "Rania Hassan",    role: "Partner · Expert Content",   bio: "Editor's editor. Ships originals that journalists cite inside two weeks.",             bylines: ["Bloomberg", "WSJ", "Axios"] },
  { initials: "TV", name: "Teo Vance",       role: "Director · Video",           bio: "Runs the Spectrum pipeline. 11 series shipped this quarter.",                         bylines: ["Vimeo", "YouTube"] },
];

export function Masthead() {
  return (
    <section id="team" className="section section--canvas" style={{ paddingTop: 112, paddingBottom: 112 }}>
      <div className="container-wide">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32, alignItems: "end", marginBottom: 48 }} className="p-mast-head">
          <div style={{ gridColumn: "span 5" }} className="p-mast-head-l">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5vw, 76px)",
                lineHeight: 0.98,
                fontWeight: 700,
                letterSpacing: "-0.038em",
                color: "var(--ink)",
                maxWidth: "16ch",
                margin: 0,
              }}
            >
              Senior partners on <span className="text-beam">every account</span>.
            </h2>
          </div>
          <p style={{ gridColumn: "span 7", fontSize: "clamp(17px, 1.4vw, 20px)", color: "var(--body)", maxWidth: "48ch", lineHeight: 1.5 }} className="p-mast-head-r">
            No pods. No account managers. One partner leads every engagement, day to day, with their name on published work.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "var(--rule)", border: "1px solid var(--rule)" }} className="p-mast-grid">
          {TEAM.map((p, i) => (
            <article key={p.initials} style={{ background: "var(--paper)", padding: "24px 22px 24px", display: "flex", flexDirection: "column", gap: 16, minHeight: 280 }}>
              <div style={{
                width: 60, height: 60,
                background: i === 0 ? "var(--beam)" : "var(--ink)",
                color: i === 0 ? "var(--ink)" : "var(--canvas)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em",
              }}>
                {p.initials}
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.018em", lineHeight: 1.1, margin: 0 }}>
                  {p.name}
                </h3>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginTop: 6 }}>
                  {p.role}
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--body)", margin: 0 }}>
                {p.bio}
              </p>
              <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--rule)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>
                  Bylines
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--beam-dim)", fontWeight: 700 }}>
                  {p.bylines.join(" · ")}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>
        {`
        @media (max-width: 900px) {
          .p-mast-head { grid-template-columns: 1fr !important; gap: 16px !important; }
          .p-mast-head-l, .p-mast-head-r { grid-column: 1 !important; }
          .p-mast-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .p-mast-grid { grid-template-columns: 1fr !important; }
        }
        `}
      </style>
    </section>
  );
}
