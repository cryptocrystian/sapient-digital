interface PillarNode {
  label: string;
  shortLabel: string;
  color: string;
  cx: number;
  cy: number;
  labelDx: number;
  labelDy: number;
}

const PILLARS: PillarNode[] = [
  { label: 'PR & Media',  shortLabel: 'PR',      color: '#C8934A', cx: 180, cy: 36,  labelDx: 0,   labelDy: -18 },
  { label: 'AI Presence', shortLabel: 'AI',      color: '#4A9CC8', cx: 307, cy: 234, labelDx: 16,  labelDy: 0   },
  { label: 'Content',     shortLabel: 'Content', color: '#7C5CBF', cx: 53,  cy: 234, labelDx: -16, labelDy: 0   },
];

const CHIPS = [
  'PR placement → content authority',
  'Content authority → AI citations',
  'AI citations → next placement',
];

export default function SignalEngineSystem() {
  return (
    <section
      className="section-elevated"
      style={{
        zIndex: 2,
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gold orb behind the diagram */}
      <div
        className="orb-gold"
        aria-hidden="true"
        style={{
          width: '700px',
          height: '700px',
          top: '50%',
          right: '-180px',
          transform: 'translateY(-50%)',
          opacity: 0.5,
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left column — copy */}
          <div>
            <div className="reveal" style={{ marginBottom: '24px' }}>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: 'var(--violet)',
                }}
              >
                The Signal Engine™
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
                marginBottom: '28px',
                maxWidth: '480px',
              }}
            >
              A <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>system</em>, not a
              collection of tools.
            </h2>

            <p
              className="reveal reveal-delay-2"
              style={{
                fontSize: '16px',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: '24px',
              }}
            >
              Most agencies operate in silos. PR doesn&apos;t talk to content. Content
              doesn&apos;t inform your AI citation presence. None of it connects. The Signal
              Engine is the intelligence layer that integrates all three pillars — so every
              Tier 1 placement reinforces your content authority, which feeds your AI citation
              rank, which accelerates the next placement.
            </p>
            <p
              className="reveal reveal-delay-3"
              style={{
                fontSize: '14px',
                color: 'var(--text-tertiary)',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}
            >
              Compounding. Measurable. Accountable.
            </p>
          </div>

          {/* Right column — animated SVG diagram */}
          <div
            className="reveal reveal-delay-1"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}
          >
            <svg
              viewBox="0 0 360 360"
              width="100%"
              style={{ maxWidth: '420px', height: 'auto' }}
              aria-label="Signal Engine diagram"
              role="img"
            >
              {/* Connecting lines: outer nodes → center */}
              {PILLARS.map((p, i) => (
                <line
                  key={`line-${p.shortLabel}`}
                  x1={p.cx}
                  y1={p.cy}
                  x2={180}
                  y2={180}
                  stroke={p.color}
                  strokeOpacity="0.35"
                  strokeWidth="1.2"
                />
              ))}
              {/* Traveling pulse on top of lines */}
              {PILLARS.map((p, i) => (
                <line
                  key={`pulse-${p.shortLabel}`}
                  x1={p.cx}
                  y1={p.cy}
                  x2={180}
                  y2={180}
                  stroke={p.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className={`signal-line${i > 0 ? ` signal-line-${i + 1}` : ''}`}
                />
              ))}

              {/* Outer nodes */}
              {PILLARS.map((p) => (
                <g key={`node-${p.shortLabel}`}>
                  <circle
                    cx={p.cx}
                    cy={p.cy}
                    r="14"
                    fill="var(--surface-overlay)"
                    stroke={p.color}
                    strokeWidth="1.5"
                  />
                  <circle cx={p.cx} cy={p.cy} r="4" fill={p.color} />
                </g>
              ))}

              {/* Outer labels */}
              {PILLARS.map((p) => (
                <text
                  key={`label-${p.shortLabel}`}
                  x={p.cx + p.labelDx}
                  y={p.cy + p.labelDy}
                  fill="rgba(240,237,232,.7)"
                  fontSize="11"
                  fontWeight="600"
                  textAnchor={p.labelDx < 0 ? 'end' : p.labelDx > 0 ? 'start' : 'middle'}
                  dominantBaseline="middle"
                  style={{ letterSpacing: '.04em', textTransform: 'uppercase' }}
                >
                  {p.shortLabel}
                </text>
              ))}

              {/* Center node */}
              <g className="signal-node-center">
                <circle cx="180" cy="180" r="34" fill="var(--surface-overlay)" stroke="var(--gold)" strokeWidth="1.5" />
                <circle cx="180" cy="180" r="22" fill="rgba(200,147,74,.12)" />
                <circle cx="180" cy="180" r="8" fill="var(--gold)" />
              </g>
              <text
                x="180"
                y="180"
                dy="55"
                fill="var(--gold)"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
                style={{ letterSpacing: '.08em', textTransform: 'uppercase' }}
              >
                Signal Engine™
              </text>
            </svg>

            {/* Video output arrow — Video is an amplification layer, not a Signal Engine pillar */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                marginTop: '-8px',
              }}
            >
              <svg width="20" height="28" viewBox="0 0 20 28" aria-hidden="true">
                <line
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="20"
                  stroke="rgba(200,147,74,.4)"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <polygon points="5,18 15,18 10,26" fill="rgba(200,147,74,.5)" />
              </svg>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,80,124,.9)',
                  background: 'rgba(200,80,124,.08)',
                  border: '1px solid rgba(200,80,124,.25)',
                  padding: '4px 10px',
                  borderRadius: '5px',
                }}
              >
                ▶ Video Production Layer
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '.02em',
                }}
              >
                amplifies all three pillars
              </span>
            </div>

            {/* Proof point chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
              }}
            >
              {CHIPS.map((c) => (
                <span
                  key={c}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: 'rgba(0,0,0,.25)',
                    border: '1px solid var(--gold-border)',
                    color: 'var(--text-secondary)',
                    fontSize: '11px',
                    letterSpacing: '.01em',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
