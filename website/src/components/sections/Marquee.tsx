'use client';

const ITEMS = [
  'PR & Media Relations',
  'Content & Thought Leadership',
  'Search & AI Visibility',
  'Video Production',
  'Executive Positioning',
  'Brand Authority',
  'Pipeline Attribution',
  'Cross-Pillar Strategy',
];

export default function Marquee() {
  const row = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        paddingRight: '48px',
      }}
    >
      {ITEMS.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '.04em',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'var(--gold)',
              margin: '0 24px',
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '24px 0',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(0,0,0,.18)',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget.querySelector<HTMLElement>('[data-marquee-track]');
        if (t) t.style.animationPlayState = 'paused';
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget.querySelector<HTMLElement>('[data-marquee-track]');
        if (t) t.style.animationPlayState = 'running';
      }}
    >
      <div
        data-marquee-track
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 38s linear infinite',
        }}
      >
        {row}
        {row}
      </div>
    </section>
  );
}
