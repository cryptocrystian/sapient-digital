import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LpShell from '@/components/nav/LpShell';
import TrackedLink from '@/components/analytics/TrackedLink';

export const metadata: Metadata = {
  title: 'AI-Native Video Production',
  description:
    '16+ video pieces per month. Brief to published in days. Thought leadership, hero content, Video Press Releases.',
};

const ACCENT = '#C84A7C'; // rose — video

const DATA_POINTS = [
  {
    stat: '4×',
    label: 'LinkedIn video engagement vs. text posts.',
    detail: 'Your buyers are watching. Someone is showing up.',
  },
  {
    stat: '29.5%',
    label: 'Of Google AI Overviews cite YouTube.',
    detail: 'Video isn’t just social — it’s AEO.',
  },
  {
    stat: '16+',
    label: 'Minimum video pieces per month for a consistent B2B presence.',
    detail: 'Most companies produce 2.',
  },
];

const STACK = [
  {
    label: 'Hero Content (2–5 min)',
    body:
      'Case studies, executive interviews, in-depth series. The anchor that drives 8–12 derivative clips. One shoot, weeks of content.',
  },
  {
    label: 'Thought Leadership (60–120s)',
    body:
      'Executive positioning, LinkedIn-native, vertical format. The weekly presence builder. AI avatar option for consistent cadence without scheduling.',
  },
  {
    label: 'Short-Form Derivatives (15–45s)',
    body:
      'Cut from hero and TL content. The 4-per-week cadence. Optimized per platform: LinkedIn, YouTube Shorts, email.',
  },
  {
    label: 'Video Press Release',
    body:
      '90–120s AI-produced companion to every major announcement. Distributed via wire + YouTube + LinkedIn. What traditional agencies can’t do in your timeline.',
  },
];

const METHODOLOGY = [
  {
    label: 'Brief to published in days, not weeks.',
    body:
      'Traditional production takes 4–8 weeks per video. Our AI-native pipeline moves from approved brief to published asset in 3–5 business days for avatar and derivative content, 7–10 days for hero productions. You never miss the news cycle.',
  },
  {
    label: 'Video that feeds AI search, not just social.',
    body:
      'YouTube is cited in 29.5% of Google AI Overviews — 200× more than Vimeo. Every video we produce is uploaded to YouTube with optimized metadata, VideoObject schema markup, and entity-rich descriptions. Your video content directly feeds your AI citation rank.',
  },
  {
    label: 'Executive Avatar Program — consistent presence at scale.',
    body:
      'One 2-hour session to build your executive’s AI avatar. Then 4 thought leadership videos per month without scheduling constraints. Your CEO appears consistently in your buyers’ feeds every week, without 4 hours on camera.',
  },
];

export default function VideoProductionLpPage() {
  return (
    <LpShell source="lp-video">
      {/* Atmospheric orbs — rose tint for video */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
          top: '-300px',
          right: '-300px',
          opacity: 0.6,
          zIndex: 0,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(200,74,124,.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          top: '1100px',
          left: '-240px',
          opacity: 0.5,
          zIndex: 0,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(200,74,124,.08) 0%, transparent 70%)',
          pointerEvents: 'none',
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
          AI-Native Video Production
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
          Your competitors are showing up in video every week.{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>You&apos;re not.</em>
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
          A serious B2B video presence requires 16+ pieces per month — 4 shorts per week,
          thought leadership series, hero content, and Video Press Releases. We produce the full
          stack from brief to published in days, not months.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
          <TrackedLink
            href="/contact?type=video-pr&source=lp-video"
            trackEventName="cta_click"
            trackLabel="lp_primary"
            trackSource="lp-video"
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
              boxShadow: '0 8px 24px rgba(200,74,124,.22)',
            }}
          >
            Start with a Video Press Release — $3,500{' '}
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
            Add Video Core — $2,500/mo →
          </Link>
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
          Video is the most cited surface in B2B.{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>It&apos;s also the most ignored.</em>
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
                    '0 0 40px rgba(200,74,124,.35), 0 0 80px rgba(200,74,124,.15)',
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

      {/* The Video Content Stack */}
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
          The Video Content Stack
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
          What a real B2B video program{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>requires.</em>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {STACK.map((s, i) => (
            <div
              key={s.label}
              className="reveal"
              style={{
                padding: '28px 24px',
                borderRadius: '12px',
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
                borderTop: `2px solid ${ACCENT}`,
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                  marginBottom: '8px',
                }}
              >
                0{i + 1}
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  letterSpacing: '-.005em',
                }}
              >
                {s.label}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {s.body}
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
          Production speed without sacrificing the{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>editorial bar.</em>
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
          Video without distribution is just{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>production cost.</em>
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '720px',
          }}
        >
          A standalone video agency delivers assets. We deliver an integrated production layer —
          where every PR placement generates a Video Press Release, every piece of content
          generates a video essay, and every video is structured for AI citation and distributed
          to the surfaces where your buyers actually are. The production cost is the same. The
          impact is multiplied.
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
              Single asset
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
              Start with a single Video Press Release
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
              $3,500 / asset
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              Script, AI production, thumbnail, YouTube upload, LinkedIn-ready format. Ships in
              5 business days.
            </p>
            <Link
              href="/contact?type=video-pr&source=lp-video"
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
              Order a Video Press Release →
            </Link>
          </div>

          <div
            style={{
              padding: '32px 28px',
              borderRadius: '14px',
              background:
                'linear-gradient(160deg, rgba(200,74,124,.10) 0%, var(--surface-elevated) 50%)',
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
              Monthly add-on
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
              Add Video Core to your Signal Engine program
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
              $2,500 / month
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              12 video pieces / month — 4 TL videos + 8 short-form derivatives, integrated with
              your PR and content output.
            </p>
            <Link
              href="/contact?tier=establish&source=lp-video"
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
              Add to a program →
            </Link>
          </div>
        </div>
      </section>
    </LpShell>
  );
}
