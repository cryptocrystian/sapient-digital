import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LpShell from '@/components/nav/LpShell';
import TrackedLink from '@/components/analytics/TrackedLink';

export const metadata: Metadata = {
  title: 'AI Presence & AEO',
  description:
    "60% of your buyers ask AI who leads your category. We measure, optimize, and grow your brand's AI citation rank across ChatGPT, Perplexity, Gemini, and Claude.",
};

const AI_ENGINES = ['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'AI Overviews'];

const DATA_POINTS = [
  {
    stat: '60%',
    body: 'of B2B buyers use AI to research vendors before talking to sales.',
  },
  {
    stat: '38%',
    body: 'more organic clicks for brands cited in AI answers on the same queries.',
  },
  {
    stat: '29.5%',
    body:
      'of Google AI Overviews include YouTube content — video directly feeds AI citation rank.',
  },
  {
    stat: '—',
    body:
      'The brands winning in AI search built their citations through earned media and structured content authority — not by asking AI nicely.',
  },
];

const METHODOLOGY = [
  {
    label: 'How we measure AI Presence',
    body:
      'Citation scan across 4 systems. Share-of-voice scoring against your competitive set. Gap analysis on exactly which queries you should appear on but don’t.',
  },
  {
    label: 'How we optimize',
    body:
      'Entity reinforcement, structured data deployment, LLM-native content architecture. The signals AI systems use to decide whose expertise is worth citing.',
  },
  {
    label: 'How it compounds',
    body:
      'The Signal Engine™ connection — PR placements feed content authority, content authority feeds AI citations, AI citations accelerate the next placement.',
  },
];

export default function AiPresenceLpPage() {
  return (
    <LpShell source="lp-ai-presence">
      {/* Atmospheric orbs */}
      <div
        className="orb-gold"
        aria-hidden="true"
        style={{
          width: '900px',
          height: '900px',
          top: '-300px',
          right: '-300px',
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      <div
        className="orb-violet"
        aria-hidden="true"
        style={{
          width: '600px',
          height: '600px',
          top: '900px',
          left: '-240px',
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 52px 60px',
          maxWidth: '960px',
          margin: '0 auto',
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
          AI Presence Audit
        </p>
        <h1
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(48px, 6.2vw, 76px)',
            fontWeight: 400,
            lineHeight: 1.04,
            letterSpacing: '-.028em',
            color: 'var(--text-primary)',
            marginBottom: '28px',
          }}
        >
          Your brand is invisible to AI.{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
            Here&apos;s how to fix it.
          </em>
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '720px',
          }}
        >
          When buyers ask ChatGPT, Perplexity, or Gemini who leads your category, your
          competitors&apos; names come up. Yours doesn&apos;t. We measure it, optimize it, and
          connect it to the PR and content work that makes it compound.
        </p>

        <TrackedLink
          href="/contact?type=audit&source=lp-ai-presence"
          trackEventName="cta_click"
          trackLabel="lp_primary"
          trackSource="lp-ai-presence"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '17px 32px',
            background: 'var(--gold)',
            color: '#0E0D12',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 700,
            textDecoration: 'none',
            letterSpacing: '.01em',
            boxShadow: '0 8px 24px rgba(200,147,74,.18)',
            marginBottom: '36px',
          }}
        >
          Get your AI Presence Audit — $4,500{' '}
          <ArrowRight size={16} strokeWidth={2.5} />
        </TrackedLink>

        {/* Trust signal */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
            }}
          >
            Monitored systems
          </span>
          {AI_ENGINES.map((e) => (
            <span
              key={e}
              style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}
            >
              {e}
            </span>
          ))}
        </div>
      </section>

      {/* The data — the problem */}
      <section
        className="reveal"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '60px 52px 80px',
          maxWidth: '960px',
          margin: '0 auto',
          borderTop: '1px solid var(--border)',
        }}
      >
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '20px',
          }}
        >
          The Data
        </p>
        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(36px, 4.6vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-.022em',
            color: 'var(--text-primary)',
            marginBottom: '48px',
            maxWidth: '680px',
          }}
        >
          AI search is already where your buyers{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>start.</em>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {DATA_POINTS.map((d, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                padding: '28px 24px',
                borderRadius: '12px',
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                className={d.stat !== '—' ? 'stat-glow' : undefined}
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontWeight: 400,
                  fontSize: '56px',
                  color: 'var(--gold)',
                  lineHeight: 1,
                  letterSpacing: '-.025em',
                  marginBottom: '14px',
                }}
              >
                {d.stat}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                }}
              >
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section
        className="reveal"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '60px 52px 80px',
          maxWidth: '960px',
          margin: '0 auto',
          borderTop: '1px solid var(--border)',
        }}
      >
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '20px',
          }}
        >
          Our Methodology
        </p>
        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(36px, 4.6vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-.022em',
            color: 'var(--text-primary)',
            marginBottom: '48px',
            maxWidth: '680px',
          }}
        >
          We don&apos;t guess what AI cites.{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>We measure it.</em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {METHODOLOGY.map((m, i) => (
            <div
              key={m.label}
              className="reveal"
              style={{
                padding: '28px',
                borderRadius: '12px',
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '10px',
                }}
              >
                0{i + 1}
              </p>
              <p
                style={{
                  fontSize: '17px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  letterSpacing: '-.01em',
                }}
              >
                {m.label}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why integrated beats standalone */}
      <section
        className="reveal"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '60px 52px 80px',
          maxWidth: '960px',
          margin: '0 auto',
          borderTop: '1px solid var(--border)',
        }}
      >
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '20px',
          }}
        >
          Why Integrated Beats Siloed
        </p>
        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(36px, 4.6vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-.022em',
            color: 'var(--text-primary)',
            marginBottom: '24px',
            maxWidth: '680px',
          }}
        >
          AEO alone has a{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>ceiling.</em>
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '720px',
          }}
        >
          AI citations aren&apos;t random. They&apos;re built on credibility signals — earned
          media coverage, structured content authority, and entity recognition. A brand
          optimizing AI presence without building the earned media and content foundation is
          polishing a signal that doesn&apos;t exist yet. Our integrated Signal Engine™ runs
          all three in parallel, so every PR placement feeds your citation rank and every piece
          of content is built to be cited.
        </p>
      </section>

      {/* Two paths forward */}
      <section
        className="reveal"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '60px 52px 100px',
          maxWidth: '960px',
          margin: '0 auto',
          borderTop: '1px solid var(--border)',
        }}
      >
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '20px',
          }}
        >
          Two Paths Forward
        </p>
        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(36px, 4.6vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-.022em',
            color: 'var(--text-primary)',
            marginBottom: '40px',
            maxWidth: '680px',
          }}
        >
          Pick where you{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>start.</em>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Path 1: Standalone audit */}
          <div
            style={{
              padding: '32px 28px',
              borderRadius: '14px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border)',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                marginBottom: '12px',
              }}
            >
              Standalone audit
            </p>
            <h3
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: 400,
                fontSize: '28px',
                color: 'var(--text-primary)',
                marginBottom: '4px',
                letterSpacing: '-.015em',
                lineHeight: 1.15,
              }}
            >
              Start with an AI Presence Audit
            </h3>
            <p
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: '28px',
                fontWeight: 400,
                color: 'var(--gold)',
                letterSpacing: '-.02em',
                marginBottom: '14px',
              }}
            >
              $4,500 one-time
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              Full citation baseline, competitive gap, structured data audit, 60-day optimization
              plan. No retainer required.
            </p>
            <Link
              href="/contact?type=audit&source=lp-ai-presence"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'transparent',
                color: 'var(--gold)',
                border: '1px solid var(--gold-border)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Get the audit →
            </Link>
          </div>

          {/* Path 2: Full Signal Engine */}
          <div
            style={{
              padding: '32px 28px',
              borderRadius: '14px',
              background:
                'linear-gradient(160deg, rgba(200,147,74,.08) 0%, var(--surface-elevated) 50%)',
              border: '1px solid var(--gold-border)',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '12px',
              }}
            >
              Recommended for most brands
            </p>
            <h3
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: 400,
                fontSize: '28px',
                color: 'var(--text-primary)',
                marginBottom: '4px',
                letterSpacing: '-.015em',
                lineHeight: 1.15,
              }}
            >
              Start the full Signal Engine™
            </h3>
            <p
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: '28px',
                fontWeight: 400,
                color: 'var(--gold)',
                letterSpacing: '-.02em',
                marginBottom: '14px',
              }}
            >
              From $8,500/month
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              All three pillars running simultaneously from day one. PR, Content, and AI Presence
              compounding together.
            </p>
            <Link
              href="/contact?tier=establish&source=lp-ai-presence"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'var(--gold)',
                color: '#0E0D12',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Start a program →
            </Link>
          </div>
        </div>
      </section>
    </LpShell>
  );
}
