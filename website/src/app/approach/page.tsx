import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/nav/SiteNav';
import SiteFooter from '@/components/nav/SiteFooter';

export const metadata: Metadata = {
  title: 'How We Work',
  description:
    'The Signal Engine™ integrates PR, content, and AI presence so every action compounds every other action simultaneously.',
};

const CAPABILITIES = [
  {
    label: 'Cross-pillar intelligence',
    body:
      'One action creates signal across all three Signal Engine pillars simultaneously. We track how PR coverage feeds content authority, which feeds AI citations, which accelerates competitive positioning. Every video asset produced amplifies the signal.',
  },
  {
    label: 'Real-time visibility tracking',
    body:
      'Your dashboard shows coverage velocity, pitch placement rates, AI citation trends, and pipeline attribution — updated live. Not a PDF on the 30th.',
  },
  {
    label: 'Proprietary prioritization',
    body:
      "We surface the highest-impact opportunities based on where you are in your visibility journey, not what's easiest to execute. Effort goes where the signal is.",
  },
];

const STEPS = [
  {
    phase: 'Week 1–2',
    title: 'Brand immersion + Signal Engine calibration',
    body:
      'We learn your business, map your competitive landscape, establish your AI citation baseline, and configure the Signal Engine to your category and growth stage. First pitches go out by end of week two.',
  },
  {
    phase: 'Month 1',
    title: 'Full execution across active pillars',
    body:
      'PR pitches in market. Content calendar live. Search and AI visibility baseline established. Video production brief developed if included. You see your first dashboard within the first two weeks.',
  },
  {
    phase: 'Ongoing',
    title: 'Weekly action, monthly review',
    body:
      "The Signal Engine surfaces priority actions each week. Your account lead reviews, assigns, and executes. Monthly performance brief shows exactly what moved and what's next. Quarterly strategy review recalibrates the plan.",
  },
  {
    phase: 'Compounding',
    title: 'Visibility builds on itself',
    body:
      "A Tier 1 placement earns backlinks. Backlinks lift search authority. Search authority feeds AI citation likelihood. AI citations drive inbound. Every action we take is designed to reinforce every other action we've already taken.",
  },
];

const TRANSPARENCY = [
  'Real-time coverage tracking',
  'Pitch status and placement rate',
  'AI citation monitoring (5 platforms)',
  'Video production pipeline',
  'Pipeline attribution',
  'Competitive share of voice',
  'Monthly performance briefs',
  'Quarterly strategy reviews',
];

export default function ApproachPage() {
  return (
    <>
      <SiteNav />
      <main style={{ paddingTop: '64px', position: 'relative', overflow: 'hidden' }}>
        {/* Hero atmospheric orb */}
        <div
          className="orb-gold"
          aria-hidden="true"
          style={{
            width: '700px',
            height: '700px',
            top: '-180px',
            right: '-200px',
            opacity: 0.4,
            zIndex: 0,
          }}
        />

        {/* Hero */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '80px 52px 60px',
            maxWidth: '900px',
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
            How We Work
          </p>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: '62px',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-.025em',
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}
          >
            A system, not a{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>collection of tools.</em>
          </h1>
          <p
            style={{
              fontSize: '17px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '620px',
            }}
          >
            Most agencies deliver services. We deliver a compounding system. The Signal Engine™
            connects intelligence, strategy, and execution across PR, content, and AI presence —
            so every action reinforces every other action simultaneously. Video production
            amplifies every output the system generates.
          </p>
        </div>

        {/* The Signal Engine */}
        <section
          className="reveal section-elevated"
          style={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* Violet orb */}
          <div
            className="orb-violet"
            aria-hidden="true"
            style={{
              width: '500px',
              height: '500px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.3,
              zIndex: 0,
            }}
          />

          {/* Mini Signal Engine diagram */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              padding: '40px 52px 0',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            <svg
              viewBox="0 0 800 160"
              width="100%"
              style={{ maxHeight: '160px', display: 'block' }}
              aria-label="Signal Engine mini diagram"
              role="img"
            >
              {/* Connecting lines: PR & AI Presence to center */}
              <line x1="140" y1="60" x2="380" y2="60" stroke="#C8934A" strokeOpacity="0.4" strokeWidth="1.4" />
              <line x1="420" y1="60" x2="660" y2="60" stroke="#4A9CC8" strokeOpacity="0.4" strokeWidth="1.4" />
              {/* Vertical line from center to Content node below */}
              <line x1="400" y1="80" x2="400" y2="118" stroke="#7C5CBF" strokeOpacity="0.4" strokeWidth="1.4" />
              {/* Vertical dashed line from Content to Video output */}
              <line
                x1="400"
                y1="138"
                x2="400"
                y2="152"
                stroke="#C84A7C"
                strokeOpacity="0.5"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* PR node (left) */}
              <circle cx="140" cy="60" r="14" fill="var(--surface-overlay)" stroke="#C8934A" strokeWidth="1.5" />
              <circle cx="140" cy="60" r="4" fill="#C8934A" />
              <text x="140" y="40" fill="rgba(240,237,232,.8)" fontSize="11" fontWeight="700" textAnchor="middle" style={{ letterSpacing: '.06em', textTransform: 'uppercase' }}>PR</text>

              {/* Center hub */}
              <circle cx="400" cy="60" r="22" fill="var(--surface-overlay)" stroke="var(--gold)" strokeWidth="1.5" />
              <circle cx="400" cy="60" r="14" fill="rgba(200,147,74,.14)" />
              <circle cx="400" cy="60" r="6" fill="var(--gold)" />

              {/* AI Presence node (right) */}
              <circle cx="660" cy="60" r="14" fill="var(--surface-overlay)" stroke="#4A9CC8" strokeWidth="1.5" />
              <circle cx="660" cy="60" r="4" fill="#4A9CC8" />
              <text x="660" y="40" fill="rgba(240,237,232,.8)" fontSize="11" fontWeight="700" textAnchor="middle" style={{ letterSpacing: '.06em', textTransform: 'uppercase' }}>AI Presence</text>

              {/* Content node (below center) */}
              <circle cx="400" cy="128" r="12" fill="var(--surface-overlay)" stroke="#7C5CBF" strokeWidth="1.5" />
              <circle cx="400" cy="128" r="3.5" fill="#7C5CBF" />
              <text x="430" y="132" fill="rgba(240,237,232,.8)" fontSize="11" fontWeight="700" textAnchor="start" style={{ letterSpacing: '.06em', textTransform: 'uppercase' }}>Content</text>
            </svg>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '-4px',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,80,124,.9)',
                  background: 'rgba(200,80,124,.08)',
                  border: '1px solid rgba(200,80,124,.25)',
                  padding: '4px 10px',
                  borderRadius: '5px',
                }}
              >
                ▶ Video Production Layer
              </span>
            </div>
          </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '40px 52px 72px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: '20px',
            }}
          >
            The Signal Engine™
          </p>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: '42px',
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '-.02em',
              color: 'var(--text-primary)',
              marginBottom: '24px',
              maxWidth: '600px',
            }}
          >
            The intelligence layer that connects everything.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '680px',
              marginBottom: '40px',
            }}
          >
            The Signal Engine is the proprietary intelligence system that integrates all three
            pillars — PR, content, and AI presence. It monitors signals across your media coverage,
            content authority, and AI citation rank — and identifies where coordinated action will
            produce the most compounding impact. It&apos;s why a Tier 1 placement also lifts your
            content authority score, which feeds your AI citation velocity, which makes the next
            placement easier to earn.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
            }}
          >
            {CAPABILITIES.map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '24px',
                  borderRadius: '10px',
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '3px',
                    borderRadius: '2px',
                    background: 'var(--gold)',
                    marginBottom: '16px',
                  }}
                />
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                  }}
                >
                  {item.label}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        </section>

        {/* The delivery model */}
        <div
          className="reveal"
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '72px 52px',
            maxWidth: '900px',
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
              color: 'var(--text-tertiary)',
              marginBottom: '20px',
            }}
          >
            How It Works
          </p>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: '42px',
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '-.02em',
              color: 'var(--text-primary)',
              marginBottom: '40px',
              maxWidth: '540px',
            }}
          >
            What working with Sapient actually looks like.
          </h2>
          {STEPS.map((step, i) => (
            <div
              key={step.phase}
              className="reveal"
              style={{
                display: 'flex',
                gap: '36px',
                padding: '24px 24px 24px 20px',
                marginBottom: '8px',
                borderRadius: '10px',
                background: i % 2 === 1 ? 'rgba(255,255,255,.02)' : 'transparent',
                borderBottom:
                  i < STEPS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flexShrink: 0, paddingTop: '3px', minWidth: '120px' }}>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '4px',
                  }}
                >
                  {step.phase}
                </p>
              </div>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                  }}
                >
                  {step.title}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency */}
        <section
          className="reveal"
          style={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* Gold orb behind transparency grid */}
          <div
            className="orb-gold"
            aria-hidden="true"
            style={{
              width: '600px',
              height: '600px',
              top: '50%',
              right: '-220px',
              transform: 'translateY(-50%)',
              opacity: 0.45,
              zIndex: 0,
            }}
          />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '72px 52px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: '20px',
            }}
          >
            Transparency
          </p>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: '42px',
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '-.02em',
              color: 'var(--text-primary)',
              marginBottom: '24px',
              maxWidth: '580px',
            }}
          >
            You see everything we see.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '640px',
              marginBottom: '32px',
            }}
          >
            Every client gets a dedicated portal where they can see their coverage velocity,
            pitch pipeline, AI citation trends, video production status, and campaign performance
            — updated in real time. Not a monthly PDF. A live view of everything happening on
            your behalf.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            {TRANSPARENCY.map((item) => (
              <p
                key={item}
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ color: 'var(--gold)', flexShrink: 0 }}>→</span>
                {item}
              </p>
            ))}
          </div>
        </div>
        </section>

        {/* CTA */}
        <div
          className="reveal"
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '72px 52px',
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: '40px',
              fontWeight: 400,
              letterSpacing: '-.02em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}
          >
            Ready to see how the system works for your brand?
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              marginBottom: '28px',
            }}
          >
            Start with a free visibility audit — we&apos;ll show you where you stand before we
            talk about where you&apos;re going.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
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
              Get a free visibility audit →
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
      </main>
      <SiteFooter />
    </>
  );
}
