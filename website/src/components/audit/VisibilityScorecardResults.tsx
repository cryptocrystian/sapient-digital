'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  visibilityBand,
  sevColor,
  pillarOrder,
  PILLAR_CONFIG,
  type ScanResponse,
  type EntryPath,
} from './audit-types';

interface Props {
  scanResult: ScanResponse;
  entryPath: EntryPath;
}

function TM() {
  return <sup style={{ fontSize: '.6em', verticalAlign: 'super' }}>™</sup>;
}

export default function VisibilityScorecardResults({ scanResult, entryPath }: Props) {
  const band    = visibilityBand(scanResult.evi_score);
  const order   = pillarOrder(entryPath);
  const v       = scanResult.variance;
  const bench   = scanResult.benchmark;
  const leading = PILLAR_CONFIG[v.leading_pillar];
  const lagging = PILLAR_CONFIG[v.lagging_pillar];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px 80px' }}>
      {/* Overall score */}
      <div
        style={{
          padding: '40px',
          borderRadius: '16px',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border)',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            marginBottom: '20px',
          }}
        >
          Signal Engine
          <TM /> · Visibility Scorecard
        </div>
        <div
          style={{
            fontSize: '80px',
            fontWeight: 800,
            letterSpacing: '-.04em',
            color: band.color,
            lineHeight: 1,
            marginBottom: '12px',
            fontFamily: 'inherit',
          }}
        >
          {scanResult.evi_score}
        </div>
        <div
          style={{
            display: 'inline-block',
            padding: '5px 14px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 700,
            background: band.bgColor,
            color: band.color,
            marginBottom: '16px',
          }}
        >
          {band.label}
        </div>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            maxWidth: '520px',
            margin: '0 auto 24px',
          }}
        >
          {band.label === 'At Risk'
            ? "Your brand has significant visibility gaps across PR, content, and AI presence. Competitors are taking ground you haven't claimed yet."
            : band.label === 'Emerging'
              ? 'Your brand is building presence but there are clear gaps slowing your momentum. Targeted investment in lagging pillars will compound quickly.'
              : band.label === 'Competitive'
                ? 'Your brand has solid visibility across most pillars. The gap to Dominant status is addressable with a coordinated cross-pillar strategy.'
                : 'Your brand has strong visibility across all three pillars. Maintaining this position requires consistent execution and active defense.'}
        </p>
        {bench.category_label && (
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            {bench.category_quartile === 1
              ? 'Top quartile'
              : bench.category_quartile === 2
                ? '2nd quartile'
                : bench.category_quartile === 3
                  ? '3rd quartile'
                  : 'Bottom quartile'}{' '}
            in {bench.category_label}
          </p>
        )}
      </div>

      {/* Three pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {order.map((pk) => {
          const ps  = scanResult.pillars[pk];
          const cfg = PILLAR_CONFIG[pk];
          const b   = visibilityBand(ps.score);
          return (
            <div
              key={pk}
              style={{
                padding: '24px',
                borderRadius: '12px',
                background: 'var(--surface-elevated)',
                border: `1px solid ${cfg.bgAccent.replace('.10', '.25')}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    color: cfg.accent,
                  }}
                >
                  {cfg.label}
                </span>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    color: b.color,
                    letterSpacing: '-.02em',
                  }}
                >
                  {ps.score}
                </span>
              </div>
              <div
                style={{
                  height: '3px',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,.06)',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: `${ps.score}%`,
                    height: '100%',
                    borderRadius: '2px',
                    background: cfg.accent,
                  }}
                />
              </div>
              {ps.gaps.slice(0, 2).map((gap, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '3px',
                    }}
                  >
                    <div
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: sevColor(gap.severity),
                        flexShrink: 0,
                      }}
                    />
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {gap.title}
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      paddingLeft: '11px',
                    }}
                  >
                    {gap.description}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Variance / orchestration insight */}
      <div
        style={{
          padding: '24px',
          borderRadius: '12px',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border)',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                marginBottom: '8px',
              }}
            >
              Cross-Pillar Opportunity
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {v.orchestration_opportunity}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: leading.accent }}>
                {scanResult.pillars[v.leading_pillar].score}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                {leading.label}
              </div>
            </div>
            <div style={{ fontSize: '16px', color: 'var(--text-tertiary)' }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: lagging.accent }}>
                {scanResult.pillars[v.lagging_pillar].score}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                {lagging.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          padding: '40px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(200,147,74,.08) 0%, transparent 60%)',
          border: '1px solid var(--gold-border)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px',
            letterSpacing: '-.02em',
          }}
        >
          Ready to close the gaps?
        </p>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            maxWidth: '480px',
            margin: '0 auto 24px',
          }}
        >
          Your scorecard shows exactly where you&apos;re losing ground. Let&apos;s talk about
          building a coordinated strategy to move you up the band.
        </p>
        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '13px 28px',
            background: 'var(--gold)',
            color: '#0E0D12',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          Talk to our team <ArrowRight size={15} />
        </Link>
        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '14px' }}>
          No commitment — we&apos;ll review your results together and tell you where we can move
          the needle.
        </p>
      </div>
    </div>
  );
}
