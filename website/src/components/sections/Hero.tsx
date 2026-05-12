'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroParticles from './HeroParticles';
import HeroDashboardCard from './HeroDashboardCard';
import Counter from './Counter';
import { trackEvent } from '@/lib/analytics';

const STATS = [
  { value: 340, suffix: '+',  label: 'Tier 1 placements · 2025' },
  { value: 38,  suffix: '%',  label: 'Pitch placement rate' },
  { value: 4.8, suffix: '×',  label: 'Average retainer ROI', decimals: 1 },
];

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        paddingTop: '120px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric orbs */}
      <div
        className="orb-gold"
        aria-hidden="true"
        style={{
          width: '800px',
          height: '800px',
          top: '-260px',
          right: '-260px',
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      <div
        className="orb-violet"
        aria-hidden="true"
        style={{
          width: '500px',
          height: '500px',
          bottom: '-200px',
          left: '-200px',
          zIndex: 0,
        }}
      />

      <HeroParticles />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 52px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* Left column */}
        <div>
          <div className="fade-up delay-1" style={{ marginBottom: '28px' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  animation: 'dot-pulse 3s ease-in-out infinite',
                }}
                aria-hidden="true"
              />
              AI-Native PR &amp; Content Agency
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 400,
              fontSize: 'clamp(48px, 6.4vw, 84px)',
              lineHeight: 1.06,
              letterSpacing: '-.025em',
              color: 'var(--text-primary)',
              marginBottom: '28px',
            }}
          >
            <span className="fade-up delay-2" style={{ display: 'block' }}>
              Built for brands
            </span>
            <span className="fade-up delay-3" style={{ display: 'block' }}>
              that refuse to be
            </span>
            <span className="fade-up delay-4" style={{ display: 'block' }}>
              <em
                style={{
                  fontStyle: 'italic',
                  color: 'var(--gold)',
                  fontFamily: "'Instrument Serif', Georgia, serif",
                }}
              >
                invisible.
              </em>
            </span>
          </h1>

          <p
            className="fade-up delay-5"
            style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              marginBottom: '36px',
            }}
          >
            Three integrated pillars. One compounding system. PR, content, and AI presence —
            engineered to compound, with AI-native video production built in.
          </p>

          <div
            className="fade-up delay-6"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '56px' }}
          >
            <Link
              href="/audit"
              onClick={() =>
                trackEvent({ event: 'audit_start', source: 'hero' })
              }
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '15px 26px',
                background: 'var(--gold)',
                color: '#0E0D12',
                borderRadius: '9px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '.01em',
                boxShadow: '0 8px 24px rgba(200,147,74,.18)',
              }}
            >
              Get a free visibility audit <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <Link
              href="/approach"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '15px 26px',
                background: 'transparent',
                color: 'var(--text-primary)',
                borderRadius: '9px',
                border: '1px solid var(--border)',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '.01em',
              }}
            >
              See how it works
            </Link>
          </div>

          <div
            className="fade-up delay-7"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '32px',
              maxWidth: '560px',
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    letterSpacing: '-.02em',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  <Counter
                    target={s.value}
                    decimals={s.decimals ?? 0}
                    suffix={s.suffix}
                    trigger="mount"
                  />
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div
          className="fade-up delay-5"
          style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <HeroDashboardCard />
        </div>
      </div>
    </section>
  );
}
