'use client';

import { useRef } from 'react';

interface CoverageItem {
  tier: 'T1' | 'T2';
  outlet: string;
  date: string;
}

const COVERAGE: CoverageItem[] = [
  { tier: 'T1', outlet: 'The Wall Street Journal', date: 'Apr 14' },
  { tier: 'T1', outlet: 'Manufacturing Today',     date: 'Apr 11' },
  { tier: 'T2', outlet: 'Plant Engineering',       date: 'Apr 9' },
];

export default function HeroDashboardCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltingRef = useRef(false);

  const handleMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltingRef.current = true;
    card.style.transition = 'none';
    card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(12px)`;
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    tiltingRef.current = false;
    card.style.transition = 'transform .5s var(--ease-out-expo)';
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
  };

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          width: 'min(506px, 100%)',
          maxWidth: '100%',
          padding: '28px',
          borderRadius: '14px',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border)',
          boxShadow: '0 30px 80px rgba(0,0,0,.45), 0 4px 16px rgba(200,147,74,.05)',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          transition: 'transform .5s var(--ease-out-expo)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '.01em',
              }}
            >
              Vantage Industrial
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>·</span>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Live</span>
          </div>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--violet)',
              animation: 'badge-pulse 1.6s ease-in-out infinite',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '18px',
          }}
        >
          <Stat label="Coverage / Mo" value="12" valueColor="var(--gold)" />
          <Stat label="AI citations"   value="847" />
          <Stat label="Pitch rate"     value="38%" />
          <Stat label="Pipeline"       value="$2.4M" valueColor="var(--gold)" />
        </div>

        {/* Coverage list */}
        <div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: '10px',
            }}
          >
            Recent Placements
          </div>
          {COVERAGE.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 0',
                borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '.04em',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: item.tier === 'T1' ? 'var(--gold-dim)' : 'rgba(255,255,255,.05)',
                    color: item.tier === 'T1' ? 'var(--gold)' : 'var(--text-tertiary)',
                    border: `1px solid ${item.tier === 'T1' ? 'var(--gold-border)' : 'var(--border)'}`,
                  }}
                >
                  {item.tier}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                  {item.outlet}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Signal Engine status floating card (bottom-right) */}
      <div
        style={{
          position: 'absolute',
          right: '-28px',
          bottom: '-24px',
          padding: '12px 16px',
          borderRadius: '10px',
          background: 'var(--surface-overlay)',
          border: '1px solid var(--border)',
          boxShadow: '0 12px 36px rgba(0,0,0,.5)',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22C55E',
            boxShadow: '0 0 0 4px rgba(34,197,94,.18)',
            animation: 'badge-pulse 1.6s ease-in-out infinite',
          }}
          aria-hidden="true"
        />
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '.01em',
            }}
          >
            Signal Engine™ Active
          </div>
          <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginTop: '1px' }}>
            3 pillars compounding
          </div>
        </div>
      </div>

      {/* Floating accent card (bottom-left) */}
      <div
        style={{
          position: 'absolute',
          left: '-32px',
          bottom: '-28px',
          padding: '14px 18px',
          borderRadius: '10px',
          background: 'var(--surface-overlay)',
          border: '1px solid var(--violet-border)',
          boxShadow: '0 12px 36px rgba(0,0,0,.5)',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            marginBottom: '4px',
          }}
        >
          AI presence rank
        </div>
        <div
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--gold)',
            letterSpacing: '-.02em',
            lineHeight: 1,
            marginBottom: '4px',
          }}
        >
          #3
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
          industrial automation · ChatGPT
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  valueColor = 'var(--text-primary)',
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        padding: '12px 14px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,.025)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
          marginBottom: '6px',
        }}
      >
        {label}
      </div>
      <div
        style={{ fontSize: '22px', fontWeight: 700, color: valueColor, letterSpacing: '-.02em' }}
      >
        {value}
      </div>
    </div>
  );
}
