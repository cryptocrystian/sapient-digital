import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/nav/SiteNav';
import SiteFooter from '@/components/nav/SiteFooter';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'PR & Media Relations, Content & Thought Leadership, AI Presence & AEO. Video production as the amplification layer.',
};

interface Service {
  number: string;
  name: string;
  href: string;
  pain: string;
  body: string;
  metrics: string[];
  accentClass: 'pillar-pr' | 'pillar-content' | 'pillar-aeo' | 'pillar-video';
}

const SERVICES: Service[] = [
  {
    number: '01',
    name: 'PR & Media Relations',
    href: '/services/pr-media-relations',
    pain: 'Most agencies track how many pitches they sent. We track how many moved pipeline.',
    body:
      'Tier 1 placements in the publications your buyers actually read. Our pitch placement rate is 38% — the industry average is 12%. The difference is research, precision, and not wasting your brand on contacts who will never cover you.',
    metrics: [
      '38% pitch placement rate',
      '12% industry average',
      '340+ Tier 1 placements · 2025',
    ],
    accentClass: 'pillar-pr',
  },
  {
    number: '02',
    name: 'Content & Thought Leadership',
    href: '/services/content-thought-leadership',
    pain: 'Publishing without a distribution strategy is creating content into a void.',
    body:
      'Executive positioning, ghostwriting, and editorial strategy that builds category authority over time. We write to be cited — by journalists, by other publishers, and increasingly by AI systems that decide whose expertise matters in your space.',
    metrics: [
      '28 content pieces/month at Accelerate',
      '~40 content pieces/month at Dominate',
      'AI-citation optimized, not just SEO',
    ],
    accentClass: 'pillar-content',
  },
  {
    number: '03',
    name: 'AI Presence & AEO',
    href: '/services/search-ai-visibility',
    pain:
      'Your buyers ask AI who leads your category before they call. Most brands don’t show up in a single answer.',
    body:
      '60% of your buyers ask AI who leads your category before they talk to anyone. AI Presence optimization ensures your brand gets cited when those questions get asked. We monitor, measure, and move your AI citation rank across every major AI system — and we connect it directly to your PR and content work so citations compound.',
    metrics: [
      '60% of B2B buyers use AI for vendor research',
      'Monitored: ChatGPT · Perplexity · Gemini · Claude',
      'Brands cited in AI answers see 38% more organic clicks',
    ],
    accentClass: 'pillar-aeo',
  },
  {
    number: '04',
    name: 'Video Production',
    href: '/services/video-production',
    pain: 'By the time traditional production finishes, the moment has passed.',
    body:
      'The Video Content Stack — a complete taxonomy of formats built for modern distribution. Hero content, thought leadership series, short-form derivatives, and Video Press Releases. Brief to published in days, not months, because the production cycle is AI-native end-to-end.',
    metrics: [
      '28 video pieces/month at Dominate',
      '4 shorts/week cadence — market standard',
      'Brief to published in days, not months',
    ],
    accentClass: 'pillar-video',
  },
];

export default function ServicesPage() {
  return (
    <>
      <SiteNav />
      <main style={{ paddingTop: '64px' }}>
        {/* Header */}
        <div style={{ padding: '80px 52px 60px', maxWidth: '1200px', margin: '0 auto' }}>
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
              marginBottom: '20px',
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
            What We Do
          </p>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: '64px',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-.025em',
              color: 'var(--text-primary)',
              maxWidth: '700px',
              marginBottom: '20px',
            }}
          >
            Three pillars.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>One integrated system.</em>
            <br />
            <span
              style={{
                fontSize: '0.42em',
                color: 'var(--text-tertiary)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                letterSpacing: '.01em',
              }}
            >
              Plus AI-native video production — built into every retainer.
            </span>
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '560px',
            }}
          >
            Most agencies operate in silos. We don&apos;t. Every pillar feeds the others through
            the Signal Engine™ — so your PR coverage builds content authority, which earns AI
            citations, which amplifies your next placement.
          </p>
        </div>

        {/* Services list — each card carries its pillar accent */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 52px 80px',
          }}
        >
          {SERVICES.map((svc) => (
            <div
              key={svc.href}
              className={`reveal pillar-card ${svc.accentClass}`}
              style={{
                marginTop: '24px',
                borderRadius: '14px',
                padding: '40px 32px',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 80px) minmax(0, 1fr) minmax(0, 280px)',
                gap: '40px',
                alignItems: 'start',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: 'var(--pillar-accent)',
                  paddingTop: '4px',
                  letterSpacing: '.04em',
                }}
              >
                {svc.number}
              </p>
              <div>
                <h2
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: '36px',
                    fontWeight: 400,
                    letterSpacing: '-.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '14px',
                    lineHeight: 1.15,
                  }}
                >
                  {svc.name}
                </h2>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--pillar-accent)',
                    fontStyle: 'italic',
                    marginBottom: '16px',
                    lineHeight: 1.5,
                  }}
                >
                  {svc.pain}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    marginBottom: '24px',
                  }}
                >
                  {svc.body}
                </p>
                <Link
                  href={svc.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--pillar-accent)',
                    textDecoration: 'none',
                  }}
                >
                  Learn more →
                </Link>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  paddingTop: '4px',
                }}
              >
                {svc.metrics.map((m) => (
                  <div
                    key={m}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '7px',
                      background: 'rgba(0,0,0,.25)',
                      border: '1px solid var(--pillar-accent)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--pillar-accent)',
                      letterSpacing: '.03em',
                    }}
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div
          style={{
            background: 'var(--surface-elevated)',
            borderTop: '1px solid var(--border)',
            padding: '72px 52px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: '42px',
              fontWeight: 400,
              letterSpacing: '-.02em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}
          >
            Ready to see where you stand?
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              marginBottom: '32px',
            }}
          >
            Run a free visibility audit across all three pillars — results in under 30 seconds.
          </p>
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
            Get a free visibility audit →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
