import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteNav from '@/components/nav/SiteNav';
import SiteFooter from '@/components/nav/SiteFooter';

export const metadata: Metadata = {
  title: 'AI Presence Accelerator',
  description:
    "A 90-day sprint to audit, optimize, and grow your brand's AI citation presence. $6,500 setup + $3,500/month.",
};

const AI_ENGINES = ['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'AI Overviews'];

const STEPS = [
  {
    n: '01',
    phase: 'Weeks 1–2',
    title: 'Audit',
    body:
      'Full AI citation baseline across 4 systems. Competitive gap. Structured data review. Entity audit. You see exactly where you stand and why.',
  },
  {
    n: '02',
    phase: 'Months 1–3',
    title: 'Sprint',
    body:
      'Active optimization. Entity reinforcement. Structured data deployment. LLM-optimized content recommendations. Monthly citation tracking against your competitive set.',
  },
  {
    n: '03',
    phase: 'Month 3',
    title: 'Readiness Report',
    body:
      "Where you've moved. What PR and content would unlock next. Your Signal Engine program recommendation — including the exact scope and cadence we'd build for you.",
  },
];

export default function AcceleratorPage() {
  return (
    <>
      <SiteNav />
      <main style={{ paddingTop: '64px', position: 'relative', overflow: 'hidden' }}>
        {/* Atmospheric orbs */}
        <div
          className="orb-gold"
          aria-hidden="true"
          style={{
            width: '800px',
            height: '800px',
            top: '-200px',
            right: '-280px',
            opacity: 0.5,
            zIndex: 0,
          }}
        />
        <div
          className="orb-violet"
          aria-hidden="true"
          style={{
            width: '500px',
            height: '500px',
            top: '600px',
            left: '-200px',
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
            Specialist Engagement
          </p>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(44px, 5.8vw, 68px)',
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: '-.025em',
              color: 'var(--text-primary)',
              marginBottom: '28px',
              maxWidth: '820px',
            }}
          >
            60% of your buyers ask AI who leads your category.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              Are you the answer?
            </em>
          </h1>
          <p
            style={{
              fontSize: '17px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: '36px',
              maxWidth: '700px',
            }}
          >
            The AI Presence Accelerator is a focused 90-day program that audits where your brand
            stands in AI systems today, closes the gaps, and tells you exactly what a full
            visibility program would unlock.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              marginBottom: '40px',
            }}
          >
            <Link
              href="/contact?type=accelerator"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '15px 26px',
                background: 'var(--gold)',
                color: '#0E0D12',
                borderRadius: '9px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '.01em',
                boxShadow: '0 8px 24px rgba(200,147,74,.18)',
              }}
            >
              Start the Accelerator — $6,500 <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <Link
              href="/contact?type=audit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '15px 26px',
                background: 'transparent',
                color: 'var(--text-primary)',
                borderRadius: '9px',
                border: '1px solid var(--border)',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '.01em',
              }}
            >
              Start with an audit — $4,500
            </Link>
          </div>

          {/* Engine strip */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '28px',
              alignItems: 'center',
              padding: '20px 24px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,.25)',
              border: '1px solid var(--border)',
              maxWidth: '720px',
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
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </section>

        {/* How it works */}
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
            How It Works
          </p>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(36px, 4.4vw, 52px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-.022em',
              color: 'var(--text-primary)',
              marginBottom: '48px',
              maxWidth: '600px',
            }}
          >
            A focused, three-phase{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>90-day program.</em>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="reveal"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 60px) minmax(0, 140px) minmax(0, 1fr)',
                  gap: '24px',
                  padding: '24px 24px',
                  borderRadius: '12px',
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border)',
                  alignItems: 'start',
                }}
              >
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    color: 'var(--gold)',
                    letterSpacing: '.04em',
                  }}
                >
                  {s.n}
                </p>
                <div>
                  <p
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-tertiary)',
                      marginBottom: '4px',
                    }}
                  >
                    {s.phase}
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {s.title}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Investment */}
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
            Investment
          </p>
          <div
            style={{
              padding: '40px',
              borderRadius: '14px',
              background:
                'linear-gradient(160deg, rgba(200,147,74,.08) 0%, var(--surface-elevated) 50%)',
              border: '1px solid var(--gold-border)',
            }}
          >
            <div
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: 400,
                fontSize: '40px',
                color: 'var(--gold)',
                letterSpacing: '-.025em',
                lineHeight: 1.1,
                marginBottom: '12px',
              }}
            >
              $6,500 setup + $3,500/month
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-tertiary)',
                marginBottom: '18px',
                letterSpacing: '.02em',
              }}
            >
              3-month minimum
            </p>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              Everything in the Accelerator credits toward a full Signal Engine™ retainer.
            </p>
          </div>
        </section>

        {/* Why integrated beats siloed */}
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
              fontSize: 'clamp(32px, 4vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '-.022em',
              color: 'var(--text-primary)',
              marginBottom: '24px',
              maxWidth: '720px',
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
              marginBottom: '20px',
            }}
          >
            AI citations are built on earned media signals and content authority. A brand with no
            PR coverage and no structured content gets optimized into a corner — there&apos;s
            nothing for the AI to cite.
          </p>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '720px',
            }}
          >
            The Accelerator shows you exactly where that ceiling is, and what it would take to
            break through it. Most clients move to a full program within 60 days of starting.
          </p>
        </section>

        {/* Final CTA */}
        <section
          className="reveal"
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '60px 52px 100px',
            maxWidth: '960px',
            margin: '0 auto',
            textAlign: 'center',
            borderTop: '1px solid var(--border)',
          }}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(36px, 4.6vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-.022em',
              color: 'var(--text-primary)',
              marginBottom: '20px',
              lineHeight: 1.1,
            }}
          >
            Ready to find out where you stand?
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              marginBottom: '32px',
              lineHeight: 1.7,
              maxWidth: '520px',
              margin: '0 auto 32px',
            }}
          >
            Start the AI Presence Accelerator and see your full citation baseline in two weeks.
          </p>
          <Link
            href="/contact?type=accelerator"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '15px 30px',
              background: 'var(--gold)',
              color: '#0E0D12',
              borderRadius: '9px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(200,147,74,.18)',
            }}
          >
            Start the AI Presence Accelerator <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
