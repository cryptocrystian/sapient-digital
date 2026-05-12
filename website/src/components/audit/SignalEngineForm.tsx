'use client';

import { useCallback, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EMAIL_REGEX, type EntryPath, type ScanResponse } from './audit-types';

const SCAN_LOGS = [
  'Resolving domain and SSL chain…',
  'Mapping your content footprint…',
  'Extracting entity signals from page content…',
  'Querying Google Knowledge Graph…',
  'Checking Bing entity coverage…',
  'Probing ChatGPT for brand citations…',
  'Probing Perplexity for citation presence…',
  'Probing Gemini for knowledge recall…',
  'Analyzing schema and structured data depth…',
  'Cross-referencing competitor visibility footprints…',
  'Building three-pillar presence matrix…',
  'Computing your visibility breakdown…',
  'Generating visibility score…',
  'Finalizing your scorecard…',
];

interface Props {
  entryPath: EntryPath;
  onResult: (r: ScanResponse) => void;
  ctaLabel?: string;
}

type Outcome =
  | { kind: 'success'; data: ScanResponse }
  | { kind: 'rate_limit' | 'validation' | 'error'; message: string };

export default function SignalEngineForm({
  entryPath,
  onResult,
  ctaLabel = 'Get my visibility scorecard',
}: Props) {
  const [step, setStep]         = useState<'idle' | 'scanning'>('idle');
  const [brandUrl, setBrandUrl] = useState('');
  const [email, setEmail]       = useState('');
  const [name, setName]         = useState('');
  const [company, setCompany]   = useState('');
  const [competitors, setComp]  = useState<string[]>(['', '', '']);
  const [error, setError]       = useState('');
  const [progress, setProgress] = useState(0);
  const [logIdx, setLogIdx]     = useState(0);

  const updateComp = useCallback((i: number, v: string) => {
    setComp((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      if (!EMAIL_REGEX.test(email.trim())) {
        setError('Please enter a valid work email.');
        return;
      }

      setStep('scanning');
      setProgress(0);
      setLogIdx(0);

      const progressDone = new Promise<void>((resolve) => {
        let elapsed = 0;
        const timer = setInterval(() => {
          elapsed += 50;
          const p = Math.min((elapsed / 5000) * 100, 100);
          setProgress(p);
          setLogIdx(
            Math.min(Math.floor((elapsed / 5000) * SCAN_LOGS.length), SCAN_LOGS.length - 1),
          );
          if (elapsed >= 5000) {
            clearInterval(timer);
            resolve();
          }
        }, 50);
      });

      const fetchDone: Promise<Outcome> = fetch('/api/audit/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandUrl,
          email: email.trim(),
          name: name.trim(),
          company: company.trim(),
          competitorUrls: competitors.filter(Boolean),
          entry_path: entryPath,
        }),
      })
        .then<Outcome>(async (res) => {
          const raw = (await res.json().catch(() => ({}))) as Record<string, unknown>;
          if (res.status === 429) {
            return {
              kind: 'rate_limit',
              message:
                typeof raw.message === 'string'
                  ? raw.message
                  : 'You already ran an audit for this email. Try again later.',
            };
          }
          if (res.status === 400) {
            return {
              kind: 'validation',
              message: typeof raw.error === 'string' ? raw.error : 'Invalid input.',
            };
          }
          if (!res.ok || typeof raw.evi_score !== 'number') {
            return { kind: 'error', message: 'Scan failed — please try again.' };
          }
          return { kind: 'success', data: raw as unknown as ScanResponse };
        })
        .catch<Outcome>(() => ({
          kind: 'error',
          message: 'Something went wrong — please try again.',
        }));

      const [, outcome] = await Promise.all([progressDone, fetchDone]);
      if (outcome.kind !== 'success') {
        setError(outcome.message);
        setStep('idle');
        return;
      }
      onResult(outcome.data);
    },
    [brandUrl, email, name, company, competitors, entryPath, onResult],
  );

  const input: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '9px',
    border: '1px solid rgba(255,255,255,.1)',
    background: 'rgba(255,255,255,.04)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  if (step === 'scanning') {
    return (
      <div
        style={{
          padding: '32px',
          borderRadius: '16px',
          background: 'rgba(255,255,255,.03)',
          border: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <div style={{ width: '72px', height: '72px', margin: '0 auto 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(200,147,74,.15)' }} />
          <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', border: '2px solid rgba(139,127,232,.15)' }} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: 'var(--gold)',
              animation: 'spin 1s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--gold)',
              animation: 'badge-pulse 1.5s ease-in-out infinite',
            }}
          />
        </div>
        <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Scanning your visibility footprint…
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '20px', fontStyle: 'italic' }}>
          {SCAN_LOGS[logIdx]}
        </p>
        <div
          style={{
            width: '100%',
            height: '3px',
            borderRadius: '2px',
            background: 'rgba(255,255,255,.06)',
            overflow: 'hidden',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, var(--gold), var(--violet))',
              transition: 'width .1s linear',
            }}
          />
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
          Signal Engine™ analysis takes 20–30 seconds across five platforms.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '6px',
          }}
        >
          Website URL *
        </label>
        <input
          type="url"
          required
          placeholder="https://yourcompany.com"
          value={brandUrl}
          onChange={(e) => {
            setBrandUrl(e.target.value);
            setError('');
          }}
          style={input}
        />
      </div>
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '6px',
          }}
        >
          Work email *
        </label>
        <input
          type="email"
          required
          placeholder="you@yourcompany.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          style={input}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '6px',
            }}
          >
            Full name *
          </label>
          <input
            type="text"
            required
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            style={input}
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '6px',
            }}
          >
            Company *
          </label>
          <input
            type="text"
            required
            placeholder="Acme Inc"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              setError('');
            }}
            style={input}
          />
        </div>
      </div>
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            marginBottom: '6px',
          }}
        >
          Competitor URLs <span style={{ fontWeight: 400 }}>(optional)</span>
        </label>
        {competitors.map((c, i) => (
          <input
            key={i}
            type="url"
            placeholder={`https://competitor${i + 1}.com`}
            value={c}
            onChange={(e) => updateComp(i, e.target.value)}
            style={{
              ...input,
              padding: '11px 16px',
              fontSize: '13px',
              background: 'rgba(255,255,255,.02)',
              border: '1px solid rgba(255,255,255,.06)',
              marginBottom: '8px',
            }}
          />
        ))}
      </div>
      {error && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: '8px',
            background: 'rgba(239,68,68,.08)',
            border: '1px solid rgba(239,68,68,.2)',
            color: '#FCA5A5',
            fontSize: '13px',
          }}
        >
          {error}
        </div>
      )}
      <button
        type="submit"
        style={{
          padding: '16px',
          borderRadius: '9px',
          border: 'none',
          background: 'var(--gold)',
          color: '#0E0D12',
          fontSize: '15px',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '4px',
          transition: 'opacity .2s ease',
          fontFamily: 'inherit',
        }}
      >
        {ctaLabel} <ArrowRight size={17} strokeWidth={2.5} />
      </button>
      <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
        No credit card required · Results in under 30 seconds · Free
      </p>
    </form>
  );
}
