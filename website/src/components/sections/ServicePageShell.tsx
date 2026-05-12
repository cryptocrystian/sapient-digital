import type { ReactNode } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/nav/SiteNav';
import SiteFooter from '@/components/nav/SiteFooter';

interface Stat {
  v: string;
  l: string;
}

interface ApproachItem {
  n: string;
  title: string;
  body: string;
}

export interface ServicePageProps {
  eyebrow: string;
  headline: ReactNode;
  subhead: string;
  stats?: Stat[];
  chips?: string[];
  problemH2: string;
  wrongList: string[];
  rightList: string[];
  approachH2: string;
  approach: ApproachItem[];
  includesH2: string;
  includes: string[];
  ctaH2: string;
  ctaBody: string;
  ctaHref: string;
  ctaLabel: string;
}

export default function ServicePageShell(props: ServicePageProps) {
  return (
    <>
      <SiteNav />
      <main style={{ paddingTop: '64px' }}>
        {/* Hero */}
        <div style={{ padding: '80px 52px 60px', maxWidth: '900px', margin: '0 auto' }}>
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
            {props.eyebrow}
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
            {props.headline}
          </h1>
          <p
            style={{
              fontSize: '17px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '600px',
              marginBottom: '36px',
            }}
          >
            {props.subhead}
          </p>

          {props.stats && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              {props.stats.map((s) => (
                <div key={s.l}>
                  <p
                    style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: 'var(--gold)',
                      letterSpacing: '-.025em',
                      lineHeight: 1,
                    }}
                  >
                    {s.v}
                  </p>
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-tertiary)',
                      marginTop: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '.06em',
                    }}
                  >
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          )}

          {props.chips && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {props.chips.map((c) => (
                <span
                  key={c}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '7px',
                    background: 'var(--gold-dim)',
                    border: '1px solid var(--gold-border)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--gold)',
                    letterSpacing: '.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ borderTop: '1px solid var(--border)' }}>
          {/* Problem section */}
          <div
            className="reveal"
            style={{
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
              The Problem
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
              {props.problemH2}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '40px',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#EF4444',
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    marginBottom: '12px',
                  }}
                >
                  What traditional agencies report
                </p>
                {props.wrongList.map((item) => (
                  <p
                    key={item}
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-tertiary)',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    ✗ {item}
                  </p>
                ))}
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    marginBottom: '12px',
                  }}
                >
                  What we report
                </p>
                {props.rightList.map((item) => (
                  <p
                    key={item}
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    ✓ {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Approach */}
          <div
            className="reveal"
            style={{
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
              Our Approach
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
                maxWidth: '600px',
              }}
            >
              {props.approachH2}
            </h2>
            {props.approach.map((item, i) => (
              <div
                key={item.n}
                className="reveal"
                style={{
                  display: 'flex',
                  gap: '32px',
                  paddingBottom: '36px',
                  marginBottom: '36px',
                  borderBottom:
                    i < props.approach.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    color: 'var(--text-tertiary)',
                    flexShrink: 0,
                    paddingTop: '3px',
                    width: '28px',
                  }}
                >
                  {item.n}
                </p>
                <div>
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '10px',
                    }}
                  >
                    {item.title}
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* What's included */}
          <div
            className="reveal"
            style={{
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
              What&apos;s Included
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: '36px',
                fontWeight: 400,
                letterSpacing: '-.02em',
                color: 'var(--text-primary)',
                marginBottom: '28px',
              }}
            >
              {props.includesH2}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              {props.includes.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '14px',
                    borderRadius: '8px',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--gold)',
                      flexShrink: 0,
                      marginTop: '1px',
                      fontSize: '13px',
                    }}
                  >
                    ✓
                  </span>
                  <p
                    style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="reveal"
            style={{
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
              {props.ctaH2}
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                marginBottom: '28px',
                lineHeight: 1.65,
              }}
            >
              {props.ctaBody}
            </p>
            <Link
              href={props.ctaHref}
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
              {props.ctaLabel} →
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
