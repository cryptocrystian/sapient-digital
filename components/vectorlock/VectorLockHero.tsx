import { VectorLockSchematic } from "./VectorLockSchematic";

export function VectorLockHero() {
  return (
    <section className="vl-hero">
      {/* ───── Nav strip ───── */}
      <nav className="vl-nav" aria-label="Primary">
        <a href="#" className="vl-wordmark">
          Sapient<em>↗</em>Digital
        </a>
        <ul className="vl-nav-links">
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#method">Vector Lock</a>
          </li>
          <li>
            <a href="#insights">Insights</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
        <div className="vl-nav-cta">
          <a href="#contact" className="vl-btn vl-btn--sm">
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile hamburger — native toggle via <details>/<summary> */}
        <details className="vl-nav-mobile">
          <summary className="vl-hamburger" aria-label="Open menu">
            <span className="vl-hamburger-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </summary>
          <ul className="vl-nav-mobile-links">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#method">Vector Lock</a>
            </li>
            <li>
              <a href="#insights">Insights</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact" className="vl-nav-mobile-cta">
                Let&apos;s talk →
              </a>
            </li>
          </ul>
        </details>
      </nav>

      {/* ───── Hero body ───── */}
      <div className="vl-hero-grid">
        <div className="vl-hero-copy">
          <p className="vl-eyebrow">
            <span className="vl-eyebrow-platform">Platform · Vector Lock</span>
            <span className="vl-eyebrow-sep">//</span>
            <span className="vl-eyebrow-live">
              <span className="vl-live-dot" aria-hidden="true" />
              Live Signal · T−00:04
            </span>
          </p>
          <h1 className="vl-display">
            Impossible
            <br />
            to ignore.
          </h1>
          <p className="vl-support">
            Connected marketing. Amplified impact.
          </p>
          <p className="vl-paragraph">
            Vector Lock converges Digital PR, Strategic Content, and search
            visibility into a single locked trajectory — the only signal that
            keeps gaining when the market shifts.
          </p>
          <div className="vl-cta-row">
            <a href="#contact" className="vl-btn">
              Let&apos;s talk
            </a>
            <a href="#method" className="vl-link">
              Explore Vector Lock
            </a>
          </div>

          {/* System readouts under CTAs */}
          <div className="vl-status-strip" aria-hidden="true">
            <div className="vl-status-item">
              <span className="vl-status-label">Version</span>
              <span className="vl-status-value">3.0 · Canonical</span>
            </div>
            <div className="vl-status-item">
              <span className="vl-status-label">Coherence</span>
              <span className="vl-status-value">ƒ(signal) · 0.986</span>
            </div>
            <div className="vl-status-item">
              <span className="vl-status-label">Phase</span>
              <span className="vl-status-value signal">Lock Established</span>
            </div>
          </div>
        </div>

        <div className="vl-hero-schematic">
          <VectorLockSchematic />
          <p className="vl-schematic-disclaimer">
            Diagnostic values shown · Sapient method, not client data. KPI set
            under definition.
          </p>
        </div>
      </div>

      {/* ───── Discipline footstrip ───── */}
      <div className="vl-footstrip">
        <div className="vl-footstrip-item">
          <span className="vl-footstrip-label">Vector · 01</span>
          <span className="vl-footstrip-value">Digital PR</span>
          <span className="vl-footstrip-sub">Earn credible recognition.</span>
        </div>
        <div className="vl-footstrip-item">
          <span className="vl-footstrip-label">Vector · 02</span>
          <span className="vl-footstrip-value">Strategic Content</span>
          <span className="vl-footstrip-sub">Turn expertise into narrative.</span>
        </div>
        <div className="vl-footstrip-item">
          <span className="vl-footstrip-label">Vector · 03</span>
          <span className="vl-footstrip-value">SEO · AEO · GEO</span>
          <span className="vl-footstrip-sub">Discoverable in every surface.</span>
        </div>
        <div className="vl-footstrip-item vl-footstrip-item--optional">
          <span className="vl-footstrip-label">Optional · 04</span>
          <span className="vl-footstrip-value">Video Production</span>
          <span className="vl-footstrip-sub">
            Separately scoped amplification.
          </span>
        </div>
      </div>
    </section>
  );
}
