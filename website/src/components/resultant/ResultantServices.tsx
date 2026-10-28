import RfMark from './RfMark';

const HIT_PROBES = [
  { x: 100, y: 78 },
  { x: 180, y: 60 },
  { x: 280, y: 82 },
  { x: 360, y: 65 },
  { x: 440, y: 50 },
  { x: 480, y: 75 },
];

const NON_HIT_PROBES = [
  { x: 40, h: 5 }, { x: 60, h: 4 }, { x: 80, h: 6 },
  { x: 120, h: 3 }, { x: 140, h: 5 }, { x: 160, h: 4 },
  { x: 200, h: 5 }, { x: 220, h: 4 }, { x: 240, h: 6 }, { x: 260, h: 3 },
  { x: 300, h: 5 }, { x: 320, h: 4 }, { x: 340, h: 3 },
  { x: 380, h: 5 }, { x: 400, h: 4 }, { x: 420, h: 6 },
  { x: 460, h: 4 }, { x: 500, h: 5 },
];

const FORMATS = [
  {
    format: 'FORMAT 01', duration: '60–90s',
    name: 'Thought-Leadership Film',
    sub: 'Executive narrative, grounded in a defensible point of view.',
    scene: 'SC. 01', reticle: 'circle' as const,
  },
  {
    format: 'FORMAT 02', duration: '90–120s',
    name: 'Video Press Release',
    sub: 'Announcement-grade story, built for pickup and shareability.',
    scene: 'SC. 02', reticle: 'square' as const,
  },
  {
    format: 'FORMAT 03', duration: '60–90s',
    name: 'Executive Narrative',
    sub: 'Named-leader programs for consistent on-camera presence.',
    scene: 'SC. 03', reticle: 'concentric' as const,
  },
  {
    format: 'FORMAT 04', duration: '15–45s',
    name: 'Social Short',
    sub: 'Vertical-first, platform-native cuts of the broader story.',
    scene: 'SC. 04 · 9:16', reticle: 'vertical' as const,
  },
  {
    format: 'FORMAT 05', duration: '2–3 min',
    name: 'Explainer',
    sub: 'Category-defining concept pieces for buyer education.',
    scene: 'SC. 05', reticle: 'inline' as const,
  },
];

type ReticleType = (typeof FORMATS)[number]['reticle'];

function Reticle({ type }: { type: ReticleType }) {
  const stroke = 'rgba(255,87,34,0.45)';
  if (type === 'square') {
    return (
      <g stroke={stroke} strokeWidth="1" fill="none">
        <rect x="180" y="105" width="40" height="40" />
        <line x1="200" y1="98" x2="200" y2="152" />
        <line x1="173" y1="125" x2="227" y2="125" />
      </g>
    );
  }
  if (type === 'concentric') {
    return (
      <g stroke={stroke} strokeWidth="1" fill="none">
        <circle cx="200" cy="125" r="22" />
        <circle cx="200" cy="125" r="14" />
        <circle cx="200" cy="125" r="6" />
      </g>
    );
  }
  if (type === 'vertical') {
    return (
      <g stroke={stroke} strokeWidth="1" fill="none">
        <rect x="162" y="60" width="76" height="135" />
        <line x1="200" y1="60" x2="200" y2="195" />
      </g>
    );
  }
  if (type === 'inline') {
    return (
      <g stroke={stroke} strokeWidth="1" fill="none">
        <line x1="150" y1="125" x2="250" y2="125" />
        <line x1="200" y1="108" x2="200" y2="142" />
        <circle cx="200" cy="125" r="4" fill="rgba(255,87,34,0.6)" />
      </g>
    );
  }
  return (
    <g stroke={stroke} strokeWidth="1" fill="none">
      <circle cx="200" cy="125" r="20" />
      <line x1="200" y1="98" x2="200" y2="152" />
      <line x1="173" y1="125" x2="227" y2="125" />
    </g>
  );
}

function FilmStillFrame({ scene }: { scene: string }) {
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g fill="rgba(246,243,234,0.1)">
        <rect x="15" y="8" width="14" height="7" rx="1" />
        <rect x="35" y="8" width="14" height="7" rx="1" />
        <rect x="55" y="8" width="14" height="7" rx="1" />
        <rect x="330" y="8" width="14" height="7" rx="1" />
        <rect x="350" y="8" width="14" height="7" rx="1" />
        <rect x="370" y="8" width="14" height="7" rx="1" />
        <rect x="15" y="235" width="14" height="7" rx="1" />
        <rect x="35" y="235" width="14" height="7" rx="1" />
        <rect x="55" y="235" width="14" height="7" rx="1" />
        <rect x="330" y="235" width="14" height="7" rx="1" />
        <rect x="350" y="235" width="14" height="7" rx="1" />
        <rect x="370" y="235" width="14" height="7" rx="1" />
      </g>
      <g stroke="rgba(246,243,234,0.28)" strokeWidth="1" fill="none">
        <path d="M 25 42 L 25 25 L 42 25" />
        <path d="M 358 25 L 375 25 L 375 42" />
        <path d="M 375 208 L 375 225 L 358 225" />
        <path d="M 42 225 L 25 225 L 25 208" />
      </g>
      <text x="25" y="60" fill="rgba(255,87,34,0.7)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">
        {scene}
      </text>
      <text x="375" y="210" textAnchor="end" fill="rgba(246,243,234,0.5)" fontFamily="JetBrains Mono, monospace" fontSize="9">
        00:00:00:00
      </text>
    </svg>
  );
}

export default function ResultantServices() {
  return (
    <section className="rs-services rs-theme-light" id="services" aria-label="Services">
      <header className="rs-services__header">
        <div>
          <p className="rs-services__eyebrow">
            <RfMark />
            <span>05 — The Services</span>
          </p>
          <h2 className="rs-services__h2">
            Exceptional on their own.<br />More powerful together.
          </h2>
        </div>
        <p className="rs-services__lead">
          Brand authority grows through work that stands up independently: strong ideas, credible
          third-party recognition, and a discoverable body of expertise. We combine these
          disciplines because the connections between them are often where the opportunity lies.
        </p>
      </header>

      {/* Featured — Search & AI Visibility */}
      <div className="rs-services__featured">
        <article className="rs-discipline rs-discipline--featured">
          <div className="rs-discipline__text">
            <div className="rs-discipline__num">
              01 / Lead Discipline — Search &amp; AI Visibility
            </div>
            <h3 className="rs-discipline__h3">Be easier to find. And easier to understand.</h3>
            <p className="rs-discipline__lead">
              Buyers now research through traditional search, AI-assisted interfaces, and trusted
              sources. We help make your expertise accessible, credible, and consistently
              represented across those environments.
            </p>
            <div className="rs-discipline__section">
              <div className="rs-discipline__label">What we do</div>
              <ul className="rs-discipline__list">
                <li>Search &amp; AI visibility baselines</li>
                <li>Topic &amp; entity research</li>
                <li>Authority-oriented content recommendations</li>
                <li>Monitoring of citations &amp; relevant answers, where sampling supports it</li>
              </ul>
            </div>
            <div className="rs-discipline__section">
              <div className="rs-discipline__label">What we measure</div>
              <ul className="rs-discipline__list rs-discipline__list--small">
                <li>Search presence on agreed research terms</li>
                <li>Sampled AI-answer inclusion, with sampling limits shown</li>
                <li>Change over time, not single-point rankings</li>
              </ul>
            </div>
            <div className="rs-discipline__section rs-discipline__section--scope">
              <div className="rs-discipline__label">Where this stops</div>
              <p className="rs-discipline__scope">
                Technical implementation, engineering work, broad site migrations, and guaranteed
                AI inclusion are not implicit in this service. Scoped separately when relevant.
              </p>
            </div>
            <a
              className="rs-diag-cta"
              href="/audit/visibility"
              data-track="cta_click"
              data-cta-name="scorecard"
              data-cta-location="services_featured"
              data-cta-discipline="ai"
            >
              <div className="rs-diag-cta__text">
                <span className="rs-diag-cta__chip">Free Resultant Scorecard</span>
                <span className="rs-diag-cta__label">
                  Score your <strong>search &amp; AI</strong> visibility
                </span>
              </div>
              <span className="rs-diag-cta__arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="rs-discipline__viz">
            <div className="rs-discipline__viz-tag">
              <span>Fig. 05.1 / Discoverability Sampling</span>
              <span className="rs-discipline__viz-tag--signal">6 of 24 observed</span>
            </div>
            <svg
              className="rs-viz-svg"
              viewBox="0 0 540 180"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Discoverability sampling — twenty-four observations across a sample window, six confirmed inclusions"
            >
              <line className="viz-base" x1="30" y1="130" x2="510" y2="130" />
              {NON_HIT_PROBES.map((p) => (
                <line
                  key={`t-${p.x}`}
                  className="viz-tick"
                  x1={p.x}
                  y1={130}
                  x2={p.x}
                  y2={130 - p.h}
                />
              ))}
              {HIT_PROBES.map((p) => (
                <g key={`h-${p.x}`}>
                  <line className="viz-hit-line" x1={p.x} y1={130} x2={p.x} y2={p.y} />
                  <circle className="viz-hit-dot" cx={p.x} cy={p.y} r="2.5" />
                </g>
              ))}
              <text className="viz-y-label" x="30" y="38">OBSERVED</text>
              <text className="viz-y-label" x="30" y="50">INCLUSION</text>
              <text className="viz-x-label" x="30" y="155">W01</text>
              <text className="viz-x-label" x="270" y="155" textAnchor="middle">
                SAMPLE WINDOW · PROMPT CLUSTER A
              </text>
              <text className="viz-x-label" x="510" y="155" textAnchor="end">W12</text>
            </svg>
          </div>
        </article>
      </div>

      {/* Supporting disciplines */}
      <div className="rs-services__supporting">
        <article className="rs-discipline rs-discipline--supporting">
          <div className="rs-discipline__num">02 / Digital PR</div>
          <svg className="rs-discipline-badge" viewBox="0 0 60 60" aria-hidden="true">
            <line className="mark-line" x1="12" y1="18" x2="30" y2="30" />
            <line className="mark-line" x1="46" y1="12" x2="30" y2="30" />
            <line className="mark-line" x1="18" y1="48" x2="30" y2="30" />
            <line className="mark-line" x1="52" y1="44" x2="30" y2="30" />
            <circle className="mark-ring" cx="12" cy="18" r="3.5" />
            <circle className="mark-dot" cx="12" cy="18" r="1.5" />
            <circle className="mark-ring" cx="46" cy="12" r="3.5" />
            <circle className="mark-dot" cx="46" cy="12" r="1.5" />
            <circle className="mark-ring" cx="18" cy="48" r="3.5" />
            <circle className="mark-dot" cx="18" cy="48" r="1.5" />
            <circle className="mark-ring" cx="52" cy="44" r="3.5" />
            <circle className="mark-dot-signal" cx="52" cy="44" r="1.5" />
            <circle className="mark-ring" cx="30" cy="30" r="5.5" strokeWidth="1.3" />
            <circle className="mark-dot" cx="30" cy="30" r="1.8" />
          </svg>
          <h3 className="rs-discipline__h3">Earn attention that carries weight.</h3>
          <p className="rs-discipline__lead">
            Not every mention builds authority. We pursue meaningful recognition through stories
            grounded in expertise, substance, and what journalists actually cover.
          </p>
          <div className="rs-discipline__section">
            <div className="rs-discipline__label">What we do</div>
            <ul className="rs-discipline__list">
              <li>Narrative development &amp; editorial angles</li>
              <li>Targeted media research &amp; outreach</li>
              <li>Expert commentary opportunities</li>
              <li>Earned coverage monitoring &amp; verification</li>
            </ul>
          </div>
          <div className="rs-discipline__section rs-discipline__section--scope">
            <div className="rs-discipline__label">Where this stops</div>
            <p className="rs-discipline__scope">
              No paid placement masquerading as earned coverage. No guaranteed coverage.
            </p>
          </div>
          <a
            className="rs-diag-cta"
            href="/audit/pr"
            data-track="cta_click"
            data-cta-name="scorecard"
            data-cta-location="services_pr"
            data-cta-discipline="pr"
          >
            <div className="rs-diag-cta__text">
              <span className="rs-diag-cta__chip">Free Resultant Scorecard</span>
              <span className="rs-diag-cta__label">
                Audit your <strong>earned media</strong>
              </span>
            </div>
            <span className="rs-diag-cta__arrow" aria-hidden="true">↗</span>
          </a>
        </article>

        <article className="rs-discipline rs-discipline--supporting">
          <div className="rs-discipline__num">03 / Strategic Content</div>
          <svg className="rs-discipline-badge" viewBox="0 0 60 60" aria-hidden="true">
            <circle className="mark-ring" cx="30" cy="30" r="22" strokeOpacity="0.28" />
            <circle className="mark-ring" cx="30" cy="30" r="15" strokeOpacity="0.52" />
            <circle className="mark-ring" cx="30" cy="30" r="8" strokeOpacity="0.82" />
            <circle className="mark-dot" cx="30" cy="30" r="2" />
            <line className="mark-line" x1="30" y1="4" x2="30" y2="9" />
            <line className="mark-line" x1="30" y1="51" x2="30" y2="56" />
            <line className="mark-line" x1="4" y1="30" x2="9" y2="30" />
            <line className="mark-line" x1="51" y1="30" x2="56" y2="30" />
            <circle className="mark-dot-signal" cx="43" cy="18" r="2" />
          </svg>
          <h3 className="rs-discipline__h3">Make expertise worth discovering.</h3>
          <p className="rs-discipline__lead">
            Useful content does more than fill a calendar. It gives buyers a reason to understand
            your perspective — and credible sources a reason to reference you.
          </p>
          <div className="rs-discipline__section">
            <div className="rs-discipline__label">What we do</div>
            <ul className="rs-discipline__list">
              <li>Narrative architecture</li>
              <li>Executive thought leadership</li>
              <li>Substantive long-form &amp; original analysis</li>
              <li>Editorial planning &amp; distribution support</li>
            </ul>
          </div>
          <div className="rs-discipline__section rs-discipline__section--scope">
            <div className="rs-discipline__label">Where this stops</div>
            <p className="rs-discipline__scope">
              Not calendar-filling. Not ghostwriting without a point of view. Not SEO-first
              content targeting keywords we cannot credibly own.
            </p>
          </div>
          <a
            className="rs-diag-cta"
            href="/audit/content"
            data-track="cta_click"
            data-cta-name="scorecard"
            data-cta-location="services_content"
            data-cta-discipline="content"
          >
            <div className="rs-diag-cta__text">
              <span className="rs-diag-cta__chip">Free Resultant Scorecard</span>
              <span className="rs-diag-cta__label">
                Audit your <strong>content authority</strong>
              </span>
            </div>
            <span className="rs-diag-cta__arrow" aria-hidden="true">↗</span>
          </a>
        </article>
      </div>

      {/* Video — separately scoped */}
      <article className="rs-services__video">
        <header className="video__header">
          <div>
            <div className="rs-video__scope-marker">Scoped Separately</div>
          </div>
          <div>
            <h3 className="rs-video__h3">When the story warrants a camera.</h3>
            <p className="rs-video__lead">
              Premium visual storytelling — commissioned when the moment calls for it, not stacked
              onto every retainer. Five production formats, human-approved before any external
              publish.
            </p>
          </div>
        </header>
        <div className="rs-video__reel">
          {FORMATS.map((f) => (
            <div key={f.format} className="rs-still">
              <div className="rs-still__frame">
                <FilmStillFrame scene={f.scene} />
                <svg
                  viewBox="0 0 400 250"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Reticle type={f.reticle} />
                </svg>
              </div>
              <div className="rs-still__meta">
                <div className="rs-still__num">
                  <span>{f.format}</span>
                  <span className="rs-still__dur">{f.duration}</span>
                </div>
                <h4 className="rs-still__name">{f.name}</h4>
                <p className="rs-still__sub">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="rs-video__caveat">
          Priced per engagement. Separately contracted. Not a required fourth retainer pillar.
        </p>
      </article>

      <footer className="rs-services__footer">
        <p>
          Our engagements use a fixed monthly retainer with clear scope, deliverables, and
          priorities. Because the market changes, we can recommend shifting effort among
          disciplines within agreed boundaries. Clients approve material scope, fee, and
          reputation-sensitive changes.
        </p>
        <a
          className="rs-btn rs-btn--primary"
          href="/contact"
          data-track="cta_click"
          data-cta-name="talk_strategy"
          data-cta-location="services_footer"
        >
          Talk Strategy →
        </a>
      </footer>
    </section>
  );
}
