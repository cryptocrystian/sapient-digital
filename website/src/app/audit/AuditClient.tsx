'use client';

import { useState } from 'react';
import ResultantNav from '@/components/resultant/ResultantNav';
import RfMark from '@/components/resultant/RfMark';
import SignalEngineForm from '@/components/audit/SignalEngineForm';
import VisibilityScorecardResults from '@/components/audit/VisibilityScorecardResults';
import type { ScanResponse } from '@/components/audit/audit-types';

const ENGINES = ['ChatGPT', 'Gemini', 'Google AI', 'Perplexity', 'Bing'];

export default function AuditClient() {
  const [result, setResult] = useState<ScanResponse | null>(null);

  if (result) {
    return <VisibilityScorecardResults scanResult={result} entryPath="generic" />;
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
            <span>
              The Resultant Scorecard<sup className="rs-tm">™</sup> · Free Diagnostic
            </span>
          </div>

          <h1 className="rs-audit__h1">
            Your market presence, <em>scored.</em>
          </h1>
          <p className="rs-audit__sub">
            A free, three-pillar diagnostic across your digital PR, strategic content, and search
            &amp; AI visibility — scored, banded, and benchmarked against your category.
          </p>

          <div className="rs-audit__card">
            <SignalEngineForm entryPath="generic" onResult={setResult} />
          </div>

          <div className="rs-audit__engines">
            <div className="rs-audit__engines-label">Sampled across</div>
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
