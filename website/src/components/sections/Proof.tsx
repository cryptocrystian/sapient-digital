'use client';

import Counter from './Counter';

interface Stat {
  value: number;
  decimals?: number;
  suffix?: string;
  headline: string;
  detail: string;
}

const STATS: Stat[] = [
  {
    value: 340,
    suffix: '+',
    headline: 'Tier 1 media placements',
    detail: 'In the publications your buyers read, in the last 12 months.',
  },
  {
    value: 38,
    suffix: '%',
    headline: 'Pitch placement rate',
    detail: 'Against a 12% industry average. The result of research, not volume.',
  },
  {
    value: 4.8,
    suffix: '×',
    decimals: 1,
    headline: 'Average retainer ROI',
    detail: 'Across active clients, measured against pipeline attribution.',
  },
];

export default function Proof() {
  return (
    <section
      className="section-base"
      style={{
        zIndex: 2,
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Gold orb centered behind stats */}
      <div
        className="orb-gold"
        aria-hidden="true"
        style={{
          width: '700px',
          height: '700px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.7,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '80px 52px',
        }}
      >
        <div className="reveal" style={{ marginBottom: '32px', textAlign: 'center' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}
          >
            By The Numbers
          </span>
        </div>

        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: 1.08,
            letterSpacing: '-.022em',
            color: 'var(--text-primary)',
            marginBottom: '24px',
            maxWidth: '700px',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            textWrap: 'balance',
          }}
        >
          Results that show up in the{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>metrics</em> that matter.
        </h2>

        <p
          className="reveal reveal-delay-2"
          style={{
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            margin: '0 auto 80px',
            textAlign: 'center',
          }}
        >
          Every client gets a dashboard — not a PDF. Coverage velocity, pitch placement rate, AI
          citation trends, and pipeline attribution, updated in real time.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '56px',
            maxWidth: '1080px',
            margin: '0 auto',
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.headline}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
              style={{ textAlign: 'center' }}
            >
              <div
                className="stat-glow"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontWeight: 400,
                  fontSize: 'clamp(72px, 8vw, 96px)',
                  color: 'var(--gold)',
                  letterSpacing: '-.03em',
                  lineHeight: 1,
                  marginBottom: '20px',
                }}
              >
                <Counter
                  target={s.value}
                  decimals={s.decimals ?? 0}
                  suffix={s.suffix}
                  trigger="view"
                />
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  letterSpacing: '.01em',
                }}
              >
                {s.headline}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.6,
                  maxWidth: '280px',
                  margin: '0 auto',
                }}
              >
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
