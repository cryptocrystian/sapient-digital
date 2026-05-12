interface CaseStudy {
  industry: string;
  status: string;
  primaryMetric: string;
  primaryLabel: string;
  challenge: string;
  supportingMetrics: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    industry: 'B2B Industrial Manufacturing',
    status: 'Coming Q3 2026',
    primaryMetric: '$1.8M',
    primaryLabel: 'Pipeline attributed to PR',
    challenge: 'Establishing category authority in a crowded market',
    supportingMetrics: ['14 Tier 1 placements', '3.2× AI citation growth'],
  },
  {
    industry: 'Professional Services · Legal',
    status: 'Coming Q3 2026',
    primaryMetric: '180%',
    primaryLabel: 'Increase in inbound inquiries',
    challenge: 'Building executive thought leadership from zero',
    supportingMetrics: ['22 media placements', '#2 AI presence in category'],
  },
  {
    industry: 'B2B SaaS',
    status: 'Coming Q4 2026',
    primaryMetric: '4.1×',
    primaryLabel: 'Retainer ROI',
    challenge: 'Winning share of voice against well-funded competitors',
    supportingMetrics: ['38% pitch placement rate', 'Competitive → Dominant band'],
  },
  {
    industry: 'Video Production Showcase',
    status: 'Coming Q4 2026',
    primaryMetric: '4 days',
    primaryLabel: 'From brief to published',
    challenge: 'Video at the speed of news',
    supportingMetrics: ['340K organic views', '2 national syndications'],
  },
];

export default function CaseStudies() {
  return (
    <section className="section-elevated" style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '80px 52px' }}>
        <div className="reveal" style={{ marginBottom: '48px' }}>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '.18em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          Work
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
          marginBottom: '56px',
          maxWidth: '900px',
        }}
      >
        Proof that <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>outcomes</em>
        <br />
        are the only metric.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '20px',
        }}
      >
        {CASE_STUDIES.map((c, i) => (
          <article
            key={c.industry}
            className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
            style={{
              padding: '32px 28px',
              borderRadius: '14px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '320px',
              transition: 'border-color .2s ease, transform .2s ease',
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                paddingBottom: '14px',
                borderBottom: '1px solid var(--border)',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-tertiary)',
                }}
              >
                {c.industry}
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '.06em',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'var(--violet-dim)',
                  color: 'var(--violet)',
                  border: '1px solid var(--violet-border)',
                }}
              >
                {c.status}
              </span>
            </div>

            {/* Primary metric as visual hero */}
            <div
              className="stat-glow"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: 400,
                fontSize: '48px',
                color: 'var(--gold)',
                lineHeight: 1,
                letterSpacing: '-.025em',
                marginBottom: '8px',
              }}
            >
              {c.primaryMetric}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                letterSpacing: '.04em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              {c.primaryLabel}
            </div>

            {/* Challenge */}
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                lineHeight: 1.5,
                letterSpacing: '-.005em',
                marginBottom: '20px',
                flex: 1,
              }}
            >
              {c.challenge}
            </h3>

            {/* Supporting metrics */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {c.supportingMetrics.map((m) => (
                <span
                  key={m}
                  style={{
                    fontSize: '11px',
                    padding: '4px 9px',
                    borderRadius: '5px',
                    background: 'rgba(0,0,0,.2)',
                    color: 'var(--text-tertiary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>

            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-tertiary)',
                letterSpacing: '.02em',
              }}
            >
              Read the case study →
            </span>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
