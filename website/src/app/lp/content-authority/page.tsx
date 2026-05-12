import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LpShell from '@/components/nav/LpShell';
import TrackedLink from '@/components/analytics/TrackedLink';

export const metadata: Metadata = {
  title: 'Content Authority',
  description:
    'Content engineered to be cited by journalists and AI systems. Executive positioning at the cadence that builds authority.',
};

const ACCENT = '#7C5CBF'; // violet — content authority

const DATA_POINTS = [
  {
    stat: '60%',
    label: 'B2B buyers who use AI for vendor research.',
    detail: 'Before they ever talk to sales. Your content is the source AI cites — or it isn’t.',
  },
  {
    stat: '73%',
    label: 'B2B buyers who prefer video to learn about solutions.',
    detail: 'Every content asset needs a video derivative.',
  },
  {
    stat: '28',
    label: 'Content pieces per month at Accelerate tier.',
    detail: 'Your competitors are producing at volume. Are you?',
  },
];

const METHODOLOGY = [
  {
    label: 'Written to be cited, not just read.',
    body:
      "Every piece of content we produce is structured for AI retrieval — semantic clarity, entity reinforcement, FAQ architecture, and schema markup built in from the brief stage. A piece optimized for AI citation performs better in traditional search too. We don't choose between them.",
  },
  {
    label: 'Executive positioning that earns authority.',
    body:
      'The executives who show up consistently in Tier 1 publications, with a LinkedIn presence that provides expert context to AI systems, are the ones their buyers remember. We ghostwrite with your executive’s voice and publish to the surfaces where that voice creates competitive advantage.',
  },
  {
    label: 'Content that feeds PR, not the other way around.',
    body:
      'Traditional agencies produce content after PR gets placements. We produce content that earns placements — editorial pieces designed to be pitched as exclusive contributions, white papers positioned as research briefing invitations, executive posts that generate inbound from journalists already watching your space.',
  },
];

export default function ContentAuthorityLpPage() {
  return (
    <LpShell source="lp-content">
      {/* Atmospheric orbs — violet for content authority */}
      <div
        className="orb-violet"
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
          opacity: 0.45,
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
            color: ACCENT,
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
              background: ACCENT,
              opacity: 0.6,
            }}
          />
          Content &amp; Thought Leadership
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
          You&apos;re publishing.{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>Nobody&apos;s citing you.</em>
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
          Content that doesn&apos;t earn citations from journalists or AI systems isn&apos;t
          building authority. It&apos;s building a backlog. We write to be cited — in
          publications, in AI responses, and in the conversations your buyers are having before
          they ever reach out.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
          <TrackedLink
            href="/contact?type=audit&source=lp-content"
            trackEventName="cta_click"
            trackLabel="lp_primary"
            trackSource="lp-content"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '17px 32px',
              background: ACCENT,
              color: '#0E0D12',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '.01em',
              boxShadow: '0 8px 24px rgba(124,92,191,.22)',
            }}
          >
            Get a content audit <ArrowRight size={16} strokeWidth={2.5} />
          </TrackedLink>
          <Link
            href="/pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '17px 32px',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            See full program →
          </Link>
        </div>
      </section>

      {/* Data section */}
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
            color: ACCENT,
            marginBottom: '20px',
          }}
        >
          The Numbers
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
          Publishing is the bar. Being{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>cited</em> is the goal.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {DATA_POINTS.map((d) => (
            <div
              key={d.stat}
              className="reveal"
              style={{
                padding: '28px 24px',
                borderRadius: '12px',
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontWeight: 400,
                  fontSize: '72px',
                  color: ACCENT,
                  lineHeight: 1,
                  letterSpacing: '-.025em',
                  marginBottom: '16px',
                  textShadow:
                    '0 0 40px rgba(124,92,191,.35), 0 0 80px rgba(124,92,191,.15)',
                }}
              >
                {d.stat}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  lineHeight: 1.4,
                }}
              >
                {d.label}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {d.detail}
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
            color: ACCENT,
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
          We engineer content for{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>citation.</em>
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
                  color: ACCENT,
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
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
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
            color: ACCENT,
            marginBottom: '20px',
          }}
        >
          Why Integrated Beats Standalone
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
          Content without distribution is a{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>filing cabinet.</em>
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '720px',
          }}
        >
          Content agencies deliver deliverables. We deliver a distribution system. Every piece
          we produce is simultaneously a pitch angle for PR, an AEO asset for AI citation, and
          source material for video derivatives. The output is multiplied — the same investment
          works across every surface your buyers use.
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
            color: ACCENT,
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
          <em style={{ fontStyle: 'italic', color: ACCENT }}>start.</em>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
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
              Start with an audit
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
              Start with a content audit
            </h3>
            <p
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: '20px',
                fontWeight: 400,
                color: ACCENT,
                letterSpacing: '-.015em',
                marginBottom: '14px',
              }}
            >
              Part of the $5,000 Visibility Audit
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              Includes editorial gaps, AI citation analysis of your existing content, and a
              90-day content program recommendation.
            </p>
            <Link
              href="/contact?type=audit&source=lp-content"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'transparent',
                color: ACCENT,
                border: `1px solid ${ACCENT}`,
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Get the audit →
            </Link>
          </div>

          <div
            style={{
              padding: '32px 28px',
              borderRadius: '14px',
              background:
                'linear-gradient(160deg, rgba(124,92,191,.10) 0%, var(--surface-elevated) 50%)',
              border: `1px solid ${ACCENT}`,
            }}
          >
            <p
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: ACCENT,
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
                color: ACCENT,
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
              All three pillars running simultaneously from day one — so every piece of content
              earns coverage and citations at the same time.
            </p>
            <Link
              href="/contact?tier=establish&source=lp-content"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: ACCENT,
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
