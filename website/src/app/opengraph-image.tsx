import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sapient Digital — AI-Native PR & Content Agency';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E0D12',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(200,147,74,0.18) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(124,92,191,0.12) 0%, transparent 55%)',
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '18px',
            color: '#6B6875',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '60px',
            fontFamily: 'sans-serif',
          }}
        >
          <span>SAPIENT</span>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#C8934A',
              display: 'block',
            }}
          />
          <span>DIGITAL</span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '76px',
            color: '#F0EDE8',
            lineHeight: 1.05,
            fontWeight: 400,
            letterSpacing: '-0.025em',
            marginBottom: '32px',
            maxWidth: '960px',
          }}
        >
          Built for brands that refuse to be{' '}
          <span style={{ color: '#C8934A', fontStyle: 'italic' }}>invisible.</span>
        </div>

        {/* Pillar row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            fontSize: '22px',
            color: '#C8934A',
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
          }}
        >
          <span>PR</span>
          <span style={{ color: '#6B6875' }}>·</span>
          <span>Content</span>
          <span style={{ color: '#6B6875' }}>·</span>
          <span>AI Presence</span>
        </div>
      </div>
    ),
    size,
  );
}
