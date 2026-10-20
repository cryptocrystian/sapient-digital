// Colophon — footer. Ink surface, spectrum stripe at the top.

import Link from "next/link";

export function Colophon() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "var(--ink-deep)", color: "var(--soft-ink)", position: "relative" }}>
      {/* Spectrum stripe */}
      <div style={{ height: 4, display: "flex" }} aria-hidden="true">
        <span style={{ background: "var(--beam)", flex: 1 }} />
        <span style={{ background: "var(--medium)", flex: 1 }} />
        <span style={{ background: "var(--refraction)", flex: 1 }} />
        <span style={{ background: "var(--spectrum)", flex: 1 }} />
      </div>

      <div className="container-wide" style={{ paddingTop: 72, paddingBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 40 }} className="p-colo-grid">
          <div style={{ gridColumn: "span 5" }} className="p-colo-brand">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
              <svg width="36" height="32" viewBox="0 0 36 32" aria-hidden="true">
                <polygon points="18,3 33,29 3,29" fill="none" stroke="var(--soft-ink)" strokeWidth="1.6" strokeLinejoin="round" />
                <line x1="23" y1="16" x2="36" y2="12" stroke="var(--beam)" strokeWidth="1.5" />
                <line x1="23" y1="16" x2="36" y2="18" stroke="var(--medium)" strokeWidth="1.5" />
                <line x1="23" y1="16" x2="36" y2="24" stroke="var(--refraction)" strokeWidth="1.5" />
                <line x1="23" y1="16" x2="36" y2="30" stroke="var(--spectrum)" strokeWidth="1.5" />
              </svg>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "var(--soft-ink)", letterSpacing: "-0.025em", lineHeight: 1 }}>
                Sapient Digital
              </span>
            </div>
            <p style={{ marginTop: 24, fontFamily: "var(--font-display)", fontSize: 20, color: "var(--soft-ink)", opacity: 0.84, maxWidth: "32ch", lineHeight: 1.3, fontWeight: 400 }}>
              One brand. Full spectrum. Four wavelengths. One orchestration layer.
            </p>
            <div className="font-mono" style={{ marginTop: 28, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--dim-ink)" }}>
              Innovation partner ·{" "}
              <a href="https://saipienlabs.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--soft-ink)", textDecoration: "none" }}>
                Saipien Labs
              </a>
            </div>
          </div>

          <FColumn title="The Prism">
            <FLink href="#prism">The Prism</FLink>
            <FLink href="#wavelengths">Four wavelengths</FLink>
            <FLink href="#prismos">PrismOS</FLink>
            <FLink href="#work">Recent runs</FLink>
          </FColumn>

          <FColumn title="The Firm">
            <FLink href="#team">The operators</FLink>
            <FLink href="/about">About</FLink>
            <FLink href="/resources">Writing</FLink>
            <FLink href="/contact">Contact</FLink>
          </FColumn>

          <div style={{ gridColumn: "span 3" }}>
            <h4 className="font-mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--dim-ink)", margin: "0 0 16px" }}>
              Contact
            </h4>
            <a href="mailto:hello@sapient.digital" style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--soft-ink)", textDecoration: "none", fontWeight: 500, letterSpacing: "-0.015em", wordBreak: "break-word" }}>
              hello@sapient.digital
            </a>
            <div className="font-mono" style={{ marginTop: 18, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--dim-ink)" }}>
              Engagements start at $18k / mo
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 72, paddingTop: 24,
            borderTop: "1px solid rgba(232,227,213,0.14)",
            display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
            fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--dim-ink)",
          }}
        >
          <span>© {year} Sapient Digital</span>
          <span>Set in Space Grotesk, Inter, JetBrains Mono</span>
        </div>
      </div>

      <style>
        {`
        @media (max-width: 900px) {
          .p-colo-grid { gap: 32px !important; }
          .p-colo-brand { grid-column: 1 / -1 !important; }
          .p-colo-grid > :not(.p-colo-brand) { grid-column: span 6 !important; }
        }
        @media (max-width: 500px) {
          .p-colo-grid > :not(.p-colo-brand) { grid-column: 1 / -1 !important; }
        }
        `}
      </style>
    </footer>
  );
}

function FColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ gridColumn: "span 2" }}>
      <h4 className="font-mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--dim-ink)", margin: "0 0 16px" }}>
        {title}
      </h4>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {children}
      </ul>
    </div>
  );
}

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--soft-ink)", opacity: 0.8, textDecoration: "none" }}>
        {children}
      </Link>
    </li>
  );
}
