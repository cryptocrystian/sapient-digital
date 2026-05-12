import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteNav from '@/components/nav/SiteNav';
import SiteFooter from '@/components/nav/SiteFooter';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies showing the Signal Engine in action — pipeline attributed, share of voice won, AI citations earned.',
};

type PillarTag = 'PR' | 'Content' | 'AI Presence' | 'Video';

interface CaseStudy {
  industry: string;
  status: string;
  primaryMetric: string;
  primaryLabel: string;
  outcome: string;
  pillars: PillarTag[];
}

const PILLAR_COLOR: Record<PillarTag, { fg: string; bg: string; border: string }> = {
  PR:            { fg: '#C8934A', bg: 'rgba(200,147,74,.10)', border: 'rgba(200,147,74,.30)' },
  Content:       { fg: '#7C5CBF', bg: 'rgba(124,92,191,.10)', border: 'rgba(124,92,191,.30)' },
  'AI Presence': { fg: '#4A9CC8', bg: 'rgba(74,156,200,.10)', border: 'rgba(74,156,200,.30)' },
  Video:         { fg: '#C84A7C', bg: 'rgba(200,74,124,.10)', border: 'rgba(200,74,124,.30)' },
};

const CASES: CaseStudy[] = [
  {
    industry: 'B2B Industrial Manufacturing',
    status: 'Coming Q3 2026',
    primaryMetric: '$1.8M',
    primaryLabel: 'Pipeline attributed to PR',
    outcome:
      'Establishing category authority in a crowded market through integrated PR, content, and AI presence.',
    pillars: ['PR', 'Content', 'AI Presence'],
  },
  {
    industry: 'Professional Services — Legal',
    status: 'Coming Q3 2026',
    primaryMetric: '180%',
    primaryLabel: 'Increase in inbound inquiries',
    outcome:
      'Building executive thought leadership from zero to recognized authority in under 6 months.',
    pillars: ['Content', 'PR', 'AI Presence'],
  },
  {
    industry: 'B2B SaaS',
    status: 'Coming Q4 2026',
    primaryMetric: '38%',
    primaryLabel: 'Pitch placement rate',
    outcome:
      'Winning share of voice against well-funded category incumbents.',
    pillars: ['PR', 'Content', 'AI Presence'],
  },
  {
    industry: 'Video Production Showcase',
    status: 'Coming Q4 2026',
    primaryMetric: '28',
    primaryLabel: 'Video pieces/month at Dominate',
    outcome:
      'From zero video presence to 4 short-form assets per week in 60 days.',
    pillars: ['Video', 'Content'],
  },
];

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main style={{ paddingTop: '64px' }}>
        {/* Header */}
        <div
          style={{
            padding: '80px 52px 60px',
            maxWidth: '960px',
            margin: '0 auto',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                background: 'var(--gold)',
                opacity: 0.6,
              }}
            />
            Case Studies
          </p>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(48px, 6.2vw, 72px)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-.028em',
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}
          >
            Proof that{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>outcomes</em> are the only
            metric.
          </h1>
          <p
            style={{
              fontSize: '17px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '720px',
            }}
          >
            Every case study shows the Signal Engine™ in action — what moved, by how much, and
            how the three pillars compounded to produce the result.
          </p>
        </div>

        {/* Case study cards */}
        <div
          style={{
            padding: '60px 52px 80px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '24px',
            }}
          >
            {CASES.map((c) => (
              <article
                key={c.industry}
                className="reveal"
                style={{
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  minHeight: '360px',
                  transition: 'transform .2s ease, border-color .2s ease, box-shadow .2s ease',
                }}
              >
                {/* Status badge top-right */}
                <span
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '5px',
                    background: 'var(--gold-dim)',
                    color: 'var(--gold)',
                    border: '1px solid var(--gold-border)',
                  }}
                >
                  {c.status}
                </span>

                {/* Industry label */}
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-tertiary)',
                    marginBottom: '28px',
                    maxWidth: '70%',
                  }}
                >
                  {c.industry}
                </p>

                {/* Primary metric — the visual hero */}
                <div
                  className="stat-glow"
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontWeight: 400,
                    fontSize: '72px',
                    color: 'var(--gold)',
                    lineHeight: 1,
                    letterSpacing: '-.03em',
                    marginBottom: '10px',
                  }}
                >
                  {c.primaryMetric}
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    letterSpacing: '.05em',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                  }}
                >
                  {c.primaryLabel}
                </p>

                {/* Outcome */}
                <p
                  style={{
                    fontSize: '15px',
                    color: 'var(--text-primary)',
                    lineHeight: 1.55,
                    marginBottom: '24px',
                    flex: 1,
                  }}
                >
                  {c.outcome}
                </p>

                {/* Pillar tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {c.pillars.map((p) => {
                    const col = PILLAR_COLOR[p];
                    return (
                      <span
                        key={p}
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '.04em',
                          padding: '4px 9px',
                          borderRadius: '5px',
                          background: col.bg,
                          color: col.fg,
                          border: `1px solid ${col.border}`,
                        }}
                      >
                        {p}
                      </span>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="reveal"
            style={{
              marginTop: '60px',
              textAlign: 'center',
              padding: '52px',
              background: 'var(--surface-elevated)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
            }}
          >
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: '36px',
                fontWeight: 400,
                letterSpacing: '-.02em',
                color: 'var(--text-primary)',
                marginBottom: '14px',
              }}
            >
              Ready to become a{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>case study?</em>
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                marginBottom: '28px',
                lineHeight: 1.65,
                maxWidth: '500px',
                margin: '0 auto 28px',
              }}
            >
              We&apos;re selectively onboarding new clients. Start with a free visibility audit
              to see where you stand — and what we&apos;d move.
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/audit"
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
                Get a free audit <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 28px',
                  border: '1px solid var(--gold-border)',
                  color: 'var(--gold)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  background: 'var(--gold-dim)',
                }}
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
