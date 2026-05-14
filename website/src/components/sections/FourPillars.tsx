import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Pillar {
  title: string;
  pain: string;
  body: string;
  href: string;
  glyph: string;
  accentClass: 'pillar-pr' | 'pillar-content' | 'pillar-aeo' | 'pillar-video';
}

const PILLARS: Pillar[] = [
  {
    title: 'PR & Media Relations',
    pain:
      'Most agencies track how many pitches they sent. We track how many moved pipeline.',
    body:
      'Tier 1 placements in the publications your buyers actually read. Our pitch placement rate is 38% — the industry average is 12%. The difference is research, precision, and not wasting your brand on contacts who will never cover you.',
    href: '/services/pr-media-relations',
    glyph: '◎',
    accentClass: 'pillar-pr',
  },
  {
    title: 'Content & Thought Leadership',
    pain: 'Publishing without a distribution strategy is creating content into a void.',
    body:
      'Executive positioning, ghostwriting, and editorial strategy that builds category authority over time. We write to be cited — by journalists, by other publishers, and increasingly by AI systems that decide whose expertise matters in your space.',
    href: '/services/content-thought-leadership',
    glyph: '✦',
    accentClass: 'pillar-content',
  },
  {
    title: 'AI Presence & AEO',
    pain:
      'Your buyers still Google — but they ask AI before they call. Most brands don’t appear in either answer.',
    body:
      '60% of B2B buyers ask AI who leads your category before they talk to anyone. AI Presence optimization ensures your brand gets cited when those questions get asked. We monitor, measure, and move your AI citation rank across ChatGPT, Perplexity, Gemini, and Claude — and connect it directly to your PR and content work so citations compound.',
    href: '/services/search-ai-visibility',
    glyph: '⬡',
    accentClass: 'pillar-aeo',
  },
  {
    title: 'Video Production',
    pain: 'By the time traditional production finishes, the moment has passed.',
    body:
      'An AI-native production pipeline that moves from brief to published in days, not months. Thought leadership series, hero content, short-form derivatives, and Video Press Releases — built for the speed that modern distribution demands.',
    href: '/services/video-production',
    glyph: '▶',
    accentClass: 'pillar-video',
  },
];

export default function FourPillars() {
  return (
    <section className="section-base" style={{ position: 'relative', zIndex: 2 }}>
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
          What We Do
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
        Three pillars.{' '}
        <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>One integrated system.</em>
        <br />
        <span
          style={{
            fontSize: '0.55em',
            color: 'var(--text-tertiary)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            letterSpacing: '.01em',
            display: 'block',
            maxWidth: '520px',
            textWrap: 'balance',
          }}
        >
          Plus AI-native video production — built into every retainer.
        </span>
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '20px',
        }}
      >
        {PILLARS.map((p, i) => (
          <article
            key={p.title}
            className={`reveal reveal-delay-${Math.min(i + 1, 4)} pillar-card ${p.accentClass}`}
            style={{
              padding: '36px 32px',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '320px',
            }}
          >
            {/* Glyph */}
            <div
              style={{
                fontSize: '32px',
                color: 'var(--pillar-accent)',
                marginBottom: '20px',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              {p.glyph}
            </div>

            <h3
              style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '-.015em',
                marginBottom: '20px',
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'var(--pillar-accent)',
                lineHeight: 1.55,
                marginBottom: '18px',
                paddingLeft: '14px',
                borderLeft: '2px solid var(--pillar-accent)',
                opacity: 0.95,
              }}
            >
              {p.pain}
            </p>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '24px',
                flex: 1,
              }}
            >
              {p.body}
            </p>
            <Link
              href={p.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--pillar-accent)',
                textDecoration: 'none',
                letterSpacing: '.01em',
              }}
            >
              Learn more <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
