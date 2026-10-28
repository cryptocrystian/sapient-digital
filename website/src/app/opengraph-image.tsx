import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sapient Digital — Impossible to Ignore';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          position: 'relative',
          backgroundImage:
            'radial-gradient(ellipse at 85% 35%, rgba(255,87,34,0.28) 0%, transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(255,87,34,0.08) 0%, transparent 50%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Convergence ring suggestion — three vector lines → aperture → beam */}
        <div
          style={{
            position: 'absolute',
            top: '280px',
            right: '80px',
            width: '320px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg width="320" height="80" viewBox="0 0 320 80">
            <line x1="4" y1="20" x2="130" y2="40" stroke="#C8C8CE" strokeWidth="1.2" opacity="0.55" />
            <line x1="4" y1="40" x2="130" y2="40" stroke="#C8C8CE" strokeWidth="1.2" opacity="0.55" />
            <line x1="4" y1="60" x2="130" y2="40" stroke="#C8C8CE" strokeWidth="1.2" opacity="0.55" />
            <circle cx="156" cy="40" r="18" fill="none" stroke="#F4F4F6" strokeWidth="1.5" />
            <circle cx="156" cy="40" r="6" fill="#FF5722" />
            <line x1="174" y1="40" x2="316" y2="40" stroke="#FF5722" strokeWidth="2" />
          </svg>
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '20px',
            color: '#F4F4F6',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <span>SAPIENT</span>
          <span style={{ color: '#FF5722' }}>·</span>
          <span>DIGITAL</span>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            marginTop: '72px',
            fontSize: '15px',
            color: '#FF5722',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <span
            style={{
              width: '56px',
              height: '1px',
              background: '#FF5722',
              display: 'block',
            }}
          />
          <span>B2B Authority &amp; Visibility Agency</span>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: '32px',
            fontSize: '132px',
            color: '#F4F4F6',
            lineHeight: 0.9,
            fontWeight: 600,
            letterSpacing: '-0.035em',
            maxWidth: '900px',
          }}
        >
          Impossible to ignore.
        </div>

        {/* Pillar row — bottom */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '20px',
            color: '#C8C8CE',
            letterSpacing: '0.02em',
          }}
        >
          <span>Digital PR</span>
          <span style={{ color: '#6A6A74' }}>·</span>
          <span>Strategic Content</span>
          <span style={{ color: '#6A6A74' }}>·</span>
          <span>Search &amp; AI Visibility</span>
        </div>
      </div>
    ),
    size,
  );
}
