import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LpShell from '@/components/nav/LpShell';
import TrackedLink from '@/components/analytics/TrackedLink';

export const metadata: Metadata = {
  title: 'Earned Media & PR',
  description:
    '38% pitch placement rate vs 12% industry average. Tier 1 coverage measured in pipeline, not clip reports.',
};

const ACCENT = '#C8934A'; // gold — earned media

const DATA_POINTS = [
  {
    stat: '12%',
    label: 'The industry average pitch placement rate.',
    detail: 'Most agencies celebrate this.',
  },
  {
    stat: '38%',
    label: 'Our placement rate.',
    detail: 'The result of targeting the right journalists, not more journalists.',
  },
  {
    stat: '$2.4M',
    label: 'Average pipeline attributed to PR.',
    detail: 'Measured in our first full client engagement.',
  },
];

const METHODOLOGY = [
  {
    label: "We don't send press releases. We build journalist relationships.",
    body:
      "Our pitch process starts with the publication — what they've covered in the last 90 days, which angles their editors are commissioning, what their audience actually reads. Then we build the angle. Then we pitch.",
  },
  {
    label: 'Coverage that earns, not vanity coverage.',
    body:
      "Tier 1 placements in the publications your buyers use for vendor research. We don't count a placement in a publication your buyer has never heard of. Coverage velocity only counts if it's in the right outlets.",
  },
  {
    label: 'Every placement compounds.',
    body:
      'A Tier 1 placement earns backlinks. Backlinks lift domain authority. Domain authority feeds AI citation likelihood. We design every pitch for both its immediate placement value and its downstream compounding effect on content and AI presence.',
  },
];

export default function EarnedMediaLpPage() {
  return (
    <LpShell source="lp-earned-media">
      {/* Atmospheric orbs — gold for earned media */}
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
        className="orb-gold"
        aria-hidden="true"
        style={{
          width: '600px',
          height: '600px',
          top: '900px',
          left: '-240px',
          opacity: 0.4,
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
          Earned Media &amp; PR
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
          Your brand isn&apos;t in the publications your buyers trust.{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>Here&apos;s how to change that.</em>
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
          A 38% pitch placement rate against a 12% industry average. The result of journalist
          intelligence, precision targeting, and a refusal to waste your brand on contacts who
          will never cover you.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
          <TrackedLink
            href="/contact?type=audit&source=lp-earned-media"
            trackEventName="cta_click"
            trackLabel="lp_primary"
            trackSource="lp-earned-media"
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
              boxShadow: '0 8px 24px rgba(200,147,74,.18)',
            }}
          >
            Start with a Visibility Audit — $5,000{' '}
            <ArrowRight size={16} strokeWidth={2.5} />
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
            See full program pricing →
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'center',
            padding: '20px 24px',
            borderRadius: '10px',
            background: 'rgba(0,0,0,.25)',
            border: '1px solid var(--border)',
            maxWidth: '780px',
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
            Coverage map
          </span>
          {['Tier 1', 'Tier 2', 'Tier 3 placements', 'Executive positioning', 'Analyst relations'].map(
            (e) => (
              <span
                key={e}
                style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}
              >
                {e}
              </span>
            ),
          )}
        </div>
      </section>

      {/* The problem (data) */}
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
          Why most PR programs{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>under-deliver.</em>
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
                className="stat-glow"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontWeight: 400,
                  fontSize: '72px',
                  color: ACCENT,
                  lineHeight: 1,
                  letterSpacing: '-.025em',
                  marginBottom: '16px',
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
          What the 38% rate{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>actually requires.</em>
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
          Earned media alone has a{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>ceiling.</em>
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '720px',
          }}
        >
          An article in a Tier 1 publication lasts 48 hours in someone&apos;s feed. The same
          article, repurposed into a thought leadership video, structured as an AEO-optimized
          long-form piece, and cited across your executive LinkedIn program — that&apos;s a
          visibility asset that compounds for months. Standalone PR agencies deliver placements.
          The Signal Engine™ turns placements into permanent authority.
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
              Start with a Visibility Audit
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
              $5,000 one-time
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              Complete baseline of your current earned media footprint, competitive coverage
              analysis, and a 90-day program recommendation. Credits toward your retainer within
              90 days.
            </p>
            <Link
              href="/contact?type=audit&source=lp-earned-media"
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
              All three pillars running simultaneously from day one — so every placement
              compounds into content authority and AI citations.
            </p>
            <Link
              href="/contact?tier=establish&source=lp-earned-media"
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
