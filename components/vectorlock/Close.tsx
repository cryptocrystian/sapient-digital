import { ChapterBand } from "./ChapterBand";

export function Close() {
  return (
    <section className="vl-close" id="contact">
      <ChapterBand num="08" label="The Next Step" variant="carbon" />
      <div className="vl-close-container">
        <div className="vl-close-signal vl-reveal">
          <ClosingTrajectory />
        </div>

        <div className="vl-close-copy vl-reveal">
          <p className="vl-close-eyebrow">
            <span className="vl-close-live-dot" aria-hidden="true" />
            One partner on the line
          </p>
          <h2 className="vl-close-headline">Let&apos;s talk.</h2>
          <p className="vl-close-lead">
            Thirty minutes with a Sapient partner. We pull your current pillar
            state against the Vector Lock method, name three fixable gaps,
            and send the audit in writing.
          </p>

          <div className="vl-close-what">
            <div className="vl-close-what-item">
              <span className="vl-close-what-label">Who you talk to</span>
              <span className="vl-close-what-value">
                A named Sapient partner — no SDR, no deck.
              </span>
            </div>
            <div className="vl-close-what-item">
              <span className="vl-close-what-label">What you leave with</span>
              <span className="vl-close-what-value">
                A written audit of three gaps and the first-month moves.
              </span>
            </div>
            <div className="vl-close-what-item">
              <span className="vl-close-what-label">What it costs</span>
              <span className="vl-close-what-value">
                Nothing, if we decide we are not a fit.
              </span>
            </div>
          </div>

          <div className="vl-close-cta-row">
            <a href="mailto:hello@sapient.digital?subject=Vector%20Audit" className="vl-btn vl-btn--onCarbon vl-btn--lg">
              Begin a Vector Audit
            </a>
            <a href="mailto:hello@sapient.digital" className="vl-mc-cta-link">
              hello@sapient.digital
            </a>
          </div>

          <p className="vl-close-fine">
            We take two to four new engagements per quarter. The audit is the
            only way to find out whether we are one of them.
          </p>
        </div>

        <footer className="vl-close-footer">
          <div className="vl-close-footer-left">
            <span className="vl-close-mark">Sapient<em>↗</em>Digital</span>
            <span className="vl-close-footer-tag">
              Authority &amp; visibility marketing · B2B
            </span>
          </div>
          <div className="vl-close-footer-right">
            <span>© 2026 Sapient Digital</span>
            <span className="vl-chapter-dot" aria-hidden="true" />
            <span>Rev 3.0 · Canonical</span>
          </div>
        </footer>
      </div>
    </section>
  );
}

/* ────────── Closing trajectory — small reprise of the Vector Lock beam ────────── */
function ClosingTrajectory() {
  return (
    <svg
      viewBox="0 0 920 160"
      className="vl-close-svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Final reprise: three origins converge and extend as one momentum beam."
    >
      {/* Baseline rule */}
      <line x1={0} y1={80} x2={920} y2={80} stroke="rgba(245,242,236,0.08)" strokeWidth={1} />

      {/* Three incoming vectors */}
      <g>
        <circle cx={40} cy={30} r={3} fill="rgba(245,242,236,0.6)" />
        <path d="M 40 30 Q 180 60 320 72" fill="none" stroke="rgba(245,242,236,0.6)" strokeWidth={1.25} />
        <text className="vl-close-origin" x={44} y={22}>PR</text>
      </g>
      <g>
        <circle cx={40} cy={80} r={3} fill="rgba(245,242,236,0.6)" />
        <path d="M 40 80 L 320 76" fill="none" stroke="rgba(245,242,236,0.6)" strokeWidth={1.25} />
        <text className="vl-close-origin" x={44} y={100}>CONTENT</text>
      </g>
      <g>
        <circle cx={40} cy={130} r={3} fill="rgba(245,242,236,0.6)" />
        <path d="M 40 130 Q 180 110 320 80" fill="none" stroke="rgba(245,242,236,0.6)" strokeWidth={1.25} />
        <text className="vl-close-origin" x={44} y={148}>SEARCH</text>
      </g>

      {/* Lock */}
      <circle cx={325} cy={76} r={14} fill="none" stroke="rgba(245,242,236,0.5)" strokeWidth={1} strokeDasharray="3 3" />
      <circle cx={325} cy={76} r={5} fill="#D4EB00" stroke="var(--vl-carbon)" strokeWidth={0.75} />

      {/* Momentum beam */}
      <path
        d="M 335 74 Q 500 60 640 44 T 880 10"
        fill="none"
        stroke="#FF5722"
        strokeWidth={12}
        opacity={0.18}
        strokeLinecap="round"
      />
      <path
        d="M 335 74 Q 500 60 640 44 T 880 10"
        fill="none"
        stroke="#FF5722"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <polygon points="892,8 876,2 876,22" fill="#FF5722" />

      <text className="vl-close-origin vl-close-origin--signal" x={870} y={44} textAnchor="end">
        MARKET PRESENCE →
      </text>
    </svg>
  );
}
