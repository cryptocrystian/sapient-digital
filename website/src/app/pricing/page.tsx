import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/nav/SiteNav';
import SiteFooter from '@/components/nav/SiteFooter';
import TrackedLink from '@/components/analytics/TrackedLink';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Signal Engine programs starting at $8,500/month. All three pillars included in every tier. Scoped to your market.',
};

interface Tier {
  name: string;
  startingAt: string;
  minimum: string;
  positioning: string;
  inclusions: string[];
  cta: string;
  href: string;
  highlight: boolean;
}

const TIERS: Tier[] = [
  {
    name: 'Establish',
    startingAt: '$8,500',
    minimum: '6-month minimum',
    positioning:
      'All three Signal Engine™ pillars at foundational velocity. For brands establishing their authority footprint.',
    inclusions: [
      'PR & Media Relations — 6 pitches/month, precision targeting',
      'Content & Thought Leadership — 12 content pieces/month including social layer',
      'AI Presence & AEO — monthly citation monitoring across 4 major AI systems',
      'Monthly Visibility Report + dedicated account lead',
    ],
    cta: 'Get your custom scope',
    href: '/contact?tier=establish',
    highlight: false,
  },
  {
    name: 'Accelerate',
    startingAt: '$15,000',
    minimum: '6-month minimum',
    positioning:
      'Full Signal Engine™ at growth velocity. For brands competing for category leadership.',
    inclusions: [
      'PR & Media Relations — 10+ pitches/month, analyst relations, newsjacking',
      'Content & Thought Leadership — 28 content pieces/month, exec LinkedIn program',
      'AI Presence & AEO — bi-weekly monitoring, active entity optimization',
      'Signal Engine™ intelligence — weekly opportunity scan, competitive gap analysis',
      'Priority production queue + bi-weekly strategy calls',
    ],
    cta: 'Get your custom scope',
    href: '/contact?tier=accelerate',
    highlight: true,
  },
  {
    name: 'Dominate',
    startingAt: '$25,000',
    minimum: '6-month minimum',
    positioning:
      'Maximum velocity across all three pillars — plus the full Video Content Stack. For brands committed to owning their category.',
    inclusions: [
      'All three Signal Engine™ pillars at full velocity',
      'Video Content Stack included — 28 video pieces/month (4 shorts/week cadence)',
      '~68 total content + video assets per month',
      'Weekly strategy calls + Quarterly Business Review',
      'Pipeline attribution reporting, competitive displacement tracking',
    ],
    cta: 'Get your custom scope',
    href: '/contact?tier=dominate',
    highlight: false,
  },
  {
    name: 'Enterprise',
    startingAt: 'From $35,000',
    minimum: 'Custom terms',
    positioning:
      'Multi-market programs, dedicated embedded teams, PE portfolio rollouts.',
    inclusions: [
      'Custom scope built around specific business objectives',
      'Dedicated embedded account team',
      'Talk to us about what you need →',
    ],
    cta: 'Talk to us',
    href: '/contact?tier=enterprise',
    highlight: false,
  },
];

interface Specialist {
  name: string;
  price: string;
  body: string;
  cta: string;
  href: string;
}

const SPECIALISTS: Specialist[] = [
  {
    name: 'AI Presence Accelerator',
    price: '$6,500 setup + $3,500/month (3-month min)',
    body:
      'A focused 90-day sprint for brands with an identified AI visibility gap. Full citation audit, active optimization, and a Signal Engine Readiness Report that maps exactly what a full program would unlock.',
    cta: 'Start the Accelerator',
    href: '/contact?type=accelerator',
  },
  {
    name: 'Custom Scope',
    price: 'Quoted per project',
    body:
      "Multi-market complexity, a single-pillar project, or a brief that doesn't fit a standard program. Tell us what you're trying to solve.",
    cta: "Let's scope it",
    href: '/contact?type=custom',
  },
];

interface Project {
  name: string;
  price: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    name: 'Visibility Audit & Strategy Brief',
    price: '$5,000',
    description: 'A full diagnostic of your visibility across all three pillars, plus a 60-day strategy brief.',
  },
  {
    name: 'AI Presence Snapshot Audit',
    price: '$4,500',
    description: 'Targeted citation baseline across ChatGPT, Perplexity, Gemini, and Claude.',
  },
  {
    name: 'Video Press Release',
    price: '$3,500 / asset',
    description: 'A press-grade video built for distribution to media, AI systems, and search.',
  },
  {
    name: 'Executive Avatar Setup',
    price: '$2,500',
    description: 'Production-ready executive avatar capability for high-velocity video output.',
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main style={{ paddingTop: '64px' }}>
        {/* Header */}
        <div
          style={{
            padding: '80px 52px 60px',
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center',
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
            Pricing
          </p>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(44px, 5.4vw, 60px)',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-.025em',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}
          >
            Visibility,{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>scoped to your market.</em>
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
            }}
          >
            Every program includes all three Signal Engine™ pillars — PR, Content, and AI
            Presence. Programs are scoped to your category, competition, and velocity goals.
            Starting prices below. We&apos;ll build the exact program in your discovery session.
          </p>
        </div>

        {/* Tier cards */}
        <div style={{ padding: '0 52px 80px', maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '80px',
            }}
          >
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="reveal pricing-card"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: tier.highlight
                    ? '1px solid var(--gold-border)'
                    : '1px solid var(--border)',
                  background: tier.highlight
                    ? 'linear-gradient(160deg, rgba(200,147,74,.08) 0%, var(--surface-elevated) 40%)'
                    : 'var(--surface-elevated)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '32px 28px',
                }}
              >
                {tier.highlight && (
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '.06em',
                      background: 'var(--gold-dim)',
                      color: 'var(--gold)',
                      border: '1px solid var(--gold-border)',
                      marginBottom: '16px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    Most popular
                  </span>
                )}
                {!tier.highlight && <div style={{ height: '24px' }} aria-hidden="true" />}

                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '14px',
                    letterSpacing: '-.015em',
                  }}
                >
                  {tier.name}
                </h2>

                <div style={{ marginBottom: '6px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-tertiary)',
                      letterSpacing: '.04em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    Programs starting at
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: '40px',
                      fontWeight: 400,
                      color: 'var(--gold)',
                      letterSpacing: '-.025em',
                      lineHeight: 1,
                    }}
                  >
                    {tier.startingAt}
                  </span>
                  {!tier.startingAt.startsWith('From') && (
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                      /month
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    marginBottom: '20px',
                  }}
                >
                  {tier.minimum}
                </p>

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '24px',
                  }}
                >
                  {tier.positioning}
                </p>

                <div style={{ flex: 1, marginBottom: '24px' }}>
                  {tier.inclusions.map((item) => (
                    <p
                      key={item}
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        marginBottom: '10px',
                        lineHeight: 1.55,
                      }}
                    >
                      <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '1px' }}>
                        ✓
                      </span>
                      {item}
                    </p>
                  ))}
                </div>

                <TrackedLink
                  href={tier.href}
                  trackEventName="cta_click"
                  trackLabel="pricing_cta"
                  trackTier={tier.name.toLowerCase()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '8px',
                    background: tier.highlight ? 'var(--gold)' : 'transparent',
                    color: tier.highlight ? '#0E0D12' : 'var(--gold)',
                    border: tier.highlight ? 'none' : '1px solid var(--gold-border)',
                    fontWeight: 700,
                    fontSize: '13px',
                    textDecoration: 'none',
                  }}
                >
                  {tier.cta} →
                </TrackedLink>
              </div>
            ))}
          </div>

          {/* Specialist engagements */}
          <div className="reveal" style={{ marginBottom: '60px' }}>
            <div style={{ marginBottom: '32px' }}>
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '12px',
                }}
              >
                Specialist Engagements
              </p>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: '32px',
                  fontWeight: 400,
                  letterSpacing: '-.02em',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Not ready for a full program? Start here.
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {SPECIALISTS.map((s) => (
                <div
                  key={s.name}
                  style={{
                    padding: '28px',
                    borderRadius: '14px',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                      letterSpacing: '-.01em',
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--gold)',
                      fontWeight: 600,
                      marginBottom: '14px',
                      letterSpacing: '.02em',
                    }}
                  >
                    {s.price}
                  </p>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      marginBottom: '20px',
                    }}
                  >
                    {s.body}
                  </p>
                  <Link
                    href={s.href}
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--gold)',
                      textDecoration: 'none',
                    }}
                  >
                    {s.cta} →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Project-based engagements */}
          <div className="reveal" style={{ marginBottom: '60px' }}>
            <div style={{ marginBottom: '24px' }}>
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '12px',
                }}
              >
                Project-Based Engagements
              </p>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: '28px',
                  fontWeight: 400,
                  letterSpacing: '-.02em',
                  color: 'var(--text-primary)',
                }}
              >
                Targeted, one-off deliverables.
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px',
              }}
            >
              {PROJECTS.map((p) => (
                <div
                  key={p.name}
                  style={{
                    padding: '20px',
                    borderRadius: '10px',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                      lineHeight: 1.3,
                    }}
                  >
                    {p.name}
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--gold)',
                      fontWeight: 700,
                      marginBottom: '10px',
                      letterSpacing: '-.01em',
                    }}
                  >
                    {p.price}
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                      marginBottom: '14px',
                    }}
                  >
                    {p.description}
                  </p>
                  <Link
                    href="/contact?type=project"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--gold)',
                      textDecoration: 'none',
                    }}
                  >
                    Start this project →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Universal footer block */}
          <div
            className="reveal"
            style={{
              padding: '24px 28px',
              borderRadius: '12px',
              background: 'rgba(200,147,74,.04)',
              border: '1px solid var(--gold-border)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginRight: '12px',
                }}
              >
                All programs include
              </span>
              90-day Visibility Baseline Audit at onboarding · Dedicated account lead · Client
              portal access · Monthly Visibility Reports · 6-month minimum across all retainer
              programs.
            </p>
          </div>

          {/* Not sure section */}
          <div className="reveal" style={{ textAlign: 'center', padding: '60px 0 0' }}>
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
              Not sure which program is right?
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
              Start with a free visibility audit. We&apos;ll look at where you are across all
              three pillars and recommend the scope that matches your goals — with no pressure
              to sign anything.
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
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
