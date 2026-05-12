export default function Problem() {
  return (
    <section
      className="section-elevated"
      style={{
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {/* Violet atmospheric orb, centered */}
      <div
        className="orb-violet"
        aria-hidden="true"
        style={{
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 52px',
          maxWidth: '1240px',
          margin: '0 auto',
        }}
      >
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
            The Problem
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
            marginBottom: '40px',
            maxWidth: '900px',
          }}
        >
          Most agencies report{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>activity</em>.
          <br />
          We track outcomes.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            maxWidth: '1100px',
          }}
        >
          {/* Left column — original two paragraphs */}
          <div className="reveal reveal-delay-2">
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: '20px',
              }}
            >
              The traditional agency model was built to impress you with effort — pitches sent,
              articles published, keywords targeted. Impressive-looking reports that don&apos;t
              answer the question you&apos;re actually asking: is any of this moving anything?
            </p>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
              }}
            >
              We built Sapient Digital around a different question. Pipeline generated. Share of
              voice won. AI citations earned. If it can&apos;t be measured against your business,
              we don&apos;t track it.
            </p>
          </div>

          {/* Right column — the dominant stat */}
          <div
            className="reveal reveal-delay-3"
            style={{ textAlign: 'center', padding: '20px 0' }}
          >
            <div
              className="stat-glow"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: 400,
                fontSize: '96px',
                lineHeight: 1,
                color: 'var(--gold)',
                letterSpacing: '-.03em',
                marginBottom: '20px',
              }}
            >
              68%
            </div>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                maxWidth: '360px',
                margin: '0 auto',
              }}
            >
              of B2B buyers use AI to research vendors before talking to sales. Most brands
              don&apos;t appear in a single answer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
