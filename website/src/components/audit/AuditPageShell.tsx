'use client';

import { useState, type ReactNode } from 'react';
import ResultantNav from '@/components/resultant/ResultantNav';
import RfMark from '@/components/resultant/RfMark';
import SignalEngineForm from './SignalEngineForm';
import VisibilityScorecardResults from './VisibilityScorecardResults';
import type { EntryPath, ScanResponse } from './audit-types';

const ENGINES = ['ChatGPT', 'Gemini', 'Google AI', 'Perplexity', 'Bing'];

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

  if (result) {
    return <VisibilityScorecardResults scanResult={result} entryPath={entryPath} />;
  }

  return (
    <>
      <header style={{ padding: '20px', borderBottom: '1px solid var(--rs-border)' }}>
        <ResultantNav />
      </header>

      <section className="rs-audit" aria-label="Free Resultant Scorecard">
        <div className="rs-audit__inner rs-audit__center">
          <div className="rs-audit__badge">
            <RfMark />
            <span>{badge}</span>
          </div>

          <h1 className="rs-audit__h1">{headline}</h1>
          <p className="rs-audit__sub">{subhead}</p>

          <div className="rs-audit__card">
            <SignalEngineForm
              entryPath={entryPath}
              onResult={setResult}
              ctaLabel={ctaLabel}
            />
          </div>

          <div className="rs-audit__engines">
            <div className="rs-audit__engines-label">
              Sampled across
            </div>
            <div className="rs-audit__engines-list">
              {ENGINES.map((e) => (
                <div key={e} className="rs-audit__engine">
                  {e}
                </div>
              ))}
            </div>
          </div>

          <p className="rs-audit__assurance">
            60 Seconds · <strong>Human-Reviewed Results</strong> · No Credit Card
          </p>
        </div>
      </section>
    </>
  );
}

export function TM() {
  return <sup className="rs-tm">™</sup>;
}
