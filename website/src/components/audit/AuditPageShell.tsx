'use client';

import { useState, type ReactNode } from 'react';
import SiteNav from '@/components/nav/SiteNav';
import SiteFooter from '@/components/nav/SiteFooter';
import SignalEngineForm from './SignalEngineForm';
import VisibilityScorecardResults from './VisibilityScorecardResults';
import type { EntryPath, ScanResponse } from './audit-types';

const ENGINES = ['Google', 'ChatGPT', 'Perplexity', 'Gemini', 'Bing'];

interface Props {
  badge: ReactNode;
  headline: ReactNode;
  subhead: string;
  entryPath: EntryPath;
  ctaLabel: string;
}

export default function AuditPageShell({
  badge,
  headline,
  subhead,
  entryPath,
  ctaLabel,
}: Props) {
  const [result, setResult] = useState<ScanResponse | null>(null);

  return (
    <>
      <SiteNav />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(139,127,232,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,127,232,.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh', paddingTop: '64px' }}>
        {result ? (
          <VisibilityScorecardResults scanResult={result} entryPath={entryPath} />
        ) : (
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 24px 80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  background: 'var(--gold-dim)',
                  color: 'var(--gold)',
                  border: '1px solid var(--gold-border)',
                }}
              >
                {badge}
              </span>
            </div>

            <h1
              style={{
                textAlign: 'center',
                fontSize: '48px',
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-.025em',
                marginBottom: '18px',
                fontFamily: "'Instrument Serif', Georgia, serif",
                color: 'var(--text-primary)',
              }}
            >
              {headline}
            </h1>

            <p
              style={{
                textAlign: 'center',
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '48px',
                maxWidth: '520px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {subhead}
            </p>

            <div
              style={{
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <SignalEngineForm
                entryPath={entryPath}
                onResult={setResult}
                ctaLabel={ctaLabel}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '28px',
                marginTop: '40px',
                flexWrap: 'wrap',
              }}
            >
              {ENGINES.map((e) => (
                <div
                  key={e}
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    textAlign: 'center',
                    letterSpacing: '.04em',
                  }}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

export function TM() {
  return <sup style={{ fontSize: '.6em', verticalAlign: 'super' }}>™</sup>;
}
