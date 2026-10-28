import RfMark from './RfMark';

type Stage = {
  code: string;
  title: string;
  benefit: string;
  cx: number;
  labelAbove: boolean;
  signal?: boolean;
};

const STAGES: Stage[] = [
  { code: 'STAGE 01', title: 'Establish Direction', benefit: 'Clarity on audience, position & priorities', cx: 160, labelAbove: true },
  { code: 'STAGE 02', title: 'Read the Market', benefit: 'Identify relevant opportunities & constraints', cx: 400, labelAbove: false },
  { code: 'STAGE 03', title: 'Deploy Expertise', benefit: 'High-quality work by the right specialist practice', cx: 640, labelAbove: true },
  { code: 'STAGE 04', title: 'Connect the Work', benefit: 'Reinforce narrative across owned & partner-led surfaces', cx: 880, labelAbove: false },
  { code: 'STAGE 05 · LOCK', title: 'Measure & Adapt', benefit: 'Accountability & informed course corrections', cx: 1120, labelAbove: true, signal: true },
];

const RULER_TICKS_MINOR = [80, 120, 200, 240, 280, 320, 360, 440, 480, 520, 560, 600, 680, 720, 760, 800, 840, 920, 960, 1000, 1040, 1080, 1160];
const RULER_TICKS_MAJOR = [160, 400, 640, 880, 1120];

export default function ResultantMethodology() {
  return (
    <section className="rs-method rs-theme-light" id="method" aria-label="The Resultant Framework">
      <header className="rs-method__header">
        <div>
          <p className="rs-method__eyebrow">
            <RfMark />
            <span>03 — The Methodology</span>
          </p>
          <h2 className="rs-method__h2">
            The Resultant Framework<sup className="rs-tm">™</sup>
          </h2>
          <p className="rs-method__lead">One direction. More impact from the work that matters.</p>
        </div>
        <p className="rs-method__body">
          Different marketing disciplines produce different kinds of value. PR earns third-party
          recognition. Strategic content builds understanding and trust. Search and AI visibility
          make expertise easier to discover. When those efforts pursue disconnected priorities,
          brands lose valuable opportunities to reinforce what the market hears, reads, and finds.
          The Resultant Framework<sup className="rs-tm">™</sup> turns specialized capabilities into
          a coherent market presence.
        </p>
      </header>

      <div className="rs-method__diagram">
        <svg
          className="rs-method__svg"
          viewBox="0 0 1240 420"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="The Resultant Framework schematic — five stages from Establish Direction through Measure and Adapt"
        >
          {/* Top ruler */}
          <g>
            <line className="ruler-line" x1="40" y1="60" x2="1200" y2="60" />
            {RULER_TICKS_MINOR.map((x) => (
              <line key={`tm-${x}`} className="ruler-tick-minor" x1={x} y1={60} x2={x} y2={64} />
            ))}
            {RULER_TICKS_MAJOR.map((x) => (
              <line key={`tM-${x}`} className="ruler-tick-major" x1={x} y1={54} x2={x} y2={66} />
            ))}
          </g>

          <text className="ruler-text" x="160" y="44" textAnchor="middle">01</text>
          <text className="ruler-text" x="400" y="44" textAnchor="middle">02</text>
          <text className="ruler-text" x="640" y="44" textAnchor="middle">03</text>
          <text className="ruler-text" x="880" y="44" textAnchor="middle">04</text>
          <text className="ruler-text" x="1120" y="44" textAnchor="middle">05</text>

          {/* Flow gradient line */}
          <defs>
            <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A8878" stopOpacity="0.5" />
              <stop offset="25%" stopColor="#4A4A50" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#16161A" stopOpacity="1" />
              <stop offset="100%" stopColor="#D44214" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="chamber-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D44214" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D44214" stopOpacity="0" />
            </radialGradient>
          </defs>
          <line x1="40" y1="210" x2="1200" y2="210" stroke="url(#flow-grad)" strokeWidth="1.4" />

          <text className="flow-label flow-label-input" x="40" y="196">INPUT</text>
          <text className="flow-label flow-label-resultant" x="1200" y="196" textAnchor="end">
            RESULTANT →
          </text>

          {/* Chambers */}
          {STAGES.map((s) => (
            <g key={s.code}>
              {s.signal && <circle cx={s.cx} cy="210" r="42" fill="url(#chamber-glow)" />}
              <line
                className={`chamber-leader${s.signal ? ' signal-stroke' : ''}`}
                x1={s.cx}
                y1={s.labelAbove ? 178 : 240}
                x2={s.cx}
                y2={s.labelAbove ? 144 : 276}
                strokeWidth={s.signal ? '1.2' : undefined}
              />
              <circle className="chamber-bg" cx={s.cx} cy="210" r="30" />
              <circle
                className={`chamber-stroke${s.signal ? ' signal-stroke' : ''}`}
                cx={s.cx}
                cy="210"
                r="30"
                strokeWidth={s.signal ? '1.5' : undefined}
              />
              <circle
                className={`chamber-inner${s.signal ? ' signal-stroke' : ''}`}
                cx={s.cx}
                cy="210"
                r="23"
                strokeOpacity={s.signal ? '0.5' : undefined}
              />
              <circle
                className={`chamber-dot${s.signal ? ' signal-fill' : ''}`}
                cx={s.cx}
                cy="210"
                r={s.signal ? '3' : '2.8'}
              />
              <text className="stage-code" x={s.cx} y={s.labelAbove ? 125 : 294} textAnchor="middle">
                {s.code}
              </text>
              <text className="stage-title" x={s.cx} y={s.labelAbove ? 142 : 312} textAnchor="middle">
                {s.title}
              </text>
              <text
                className="stage-benefit"
                x={s.cx}
                y={s.labelAbove ? 105 : 332}
                textAnchor="middle"
              >
                {s.benefit}
              </text>
            </g>
          ))}

          {/* Bottom ruler */}
          <g>
            <line className="ruler-line" x1="40" y1="376" x2="1200" y2="376" />
            {RULER_TICKS_MINOR.map((x) => (
              <line key={`bm-${x}`} className="ruler-tick-minor" x1={x} y1={372} x2={x} y2={376} />
            ))}
            {RULER_TICKS_MAJOR.map((x) => (
              <line key={`bM-${x}`} className="ruler-tick-major" x1={x} y1={370} x2={x} y2={382} />
            ))}
          </g>

          <text className="time-label" x="40" y="398" textAnchor="start">T₀</text>
          <text className="time-label" x="400" y="398" textAnchor="middle">T+90d</text>
          <text className="time-label" x="880" y="398" textAnchor="middle">T+180d</text>
          <text className="time-label" x="1200" y="398" textAnchor="end">T+N</text>
        </svg>

        {/* Mobile cards */}
        <div className="rs-method__cards" aria-hidden="true">
          {STAGES.map((s) => (
            <div key={s.code} className="rs-method__card">
              <div className="rs-method__card-top">
                <div className="rs-method__card-num">{s.code}</div>
                <div className="rs-method__card-title">{s.title}</div>
              </div>
              <p className="rs-method__card-benefit">{s.benefit}.</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="rs-method__footer">
        <p className="rs-method__pull">
          A methodology — not software, and not a requirement to purchase every service.
        </p>
        <div className="rs-method__promise">
          <p>
            A focused engagement applies the framework within one practice. An integrated
            engagement activates the full cross-practice coordination model. Either way, the
            outcome we pursue is not activity for its own sake — it is stronger recognition,
            authority, and discoverability.
          </p>
          <a
            className="rs-method__page-link"
            href="/approach"
            data-track="cta_click"
            data-cta-name="open_framework"
            data-cta-location="methodology_footer"
          >
            <span className="rs-method__page-link-label">Open the full framework</span>
            <span className="rs-method__page-link-slug">/approach</span>
            <span className="rs-method__page-link-arrow">↗</span>
          </a>
        </div>
      </footer>
    </section>
  );
}
