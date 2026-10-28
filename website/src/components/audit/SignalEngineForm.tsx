'use client';

import { useCallback, useState } from 'react';
import { track } from '@/lib/analytics';
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
  'Building three-discipline presence matrix…',
  'Computing your Resultant Scorecard breakdown…',
  'Generating overall score…',
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
  ctaLabel = 'Score My Presence →',
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
                  : 'You already ran a scorecard for this email. Try again later.',
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
        track('form_submit_error', { form: 'scorecard', entry_path: entryPath, reason: outcome.kind });
        setError(outcome.message);
        setStep('idle');
        return;
      }
      track('form_submit', { form: 'scorecard', entry_path: entryPath });
      track('scorecard_result', {
        band: outcome.data.evi_band,
        score: outcome.data.evi_score,
        entry_path: entryPath,
      });
      onResult(outcome.data);
    },
    [brandUrl, email, name, company, competitors, entryPath, onResult],
  );

  if (step === 'scanning') {
    return (
      <div className="rs-form__scanning">
        <div className="rs-form__spinner" aria-hidden="true">
          <div className="rs-form__spinner-outer" />
          <div className="rs-form__spinner-inner" />
          <div className="rs-form__spinner-arc" />
          <div className="rs-form__spinner-dot" />
        </div>
        <p className="rs-form__scanning-title">Scanning your market presence…</p>
        <p className="rs-form__scanning-log">{SCAN_LOGS[logIdx]}</p>
        <div className="rs-form__progress">
          <div className="rs-form__progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="rs-form__scanning-fine">
          Sampled across five AI engines · 20–30 seconds · Human-reviewed
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rs-form" aria-label="Resultant Scorecard form">
      <div className="rs-form__field">
        <label className="rs-form__label" htmlFor="rs-form-url">
          Website URL <span aria-hidden="true">*</span>
        </label>
        <input
          id="rs-form-url"
          type="url"
          required
          aria-required="true"
          placeholder="https://yourcompany.com"
          value={brandUrl}
          onChange={(e) => { setBrandUrl(e.target.value); setError(''); }}
          className="rs-form__input"
        />
      </div>

      <div className="rs-form__field">
        <label className="rs-form__label" htmlFor="rs-form-email">
          Work email <span aria-hidden="true">*</span>
        </label>
        <input
          id="rs-form-email"
          type="email"
          required
          aria-required="true"
          placeholder="you@yourcompany.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          className="rs-form__input"
        />
      </div>

      <div className="rs-form__row">
        <div className="rs-form__field">
          <label className="rs-form__label" htmlFor="rs-form-name">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="rs-form-name"
            type="text"
            required
            aria-required="true"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            className="rs-form__input"
          />
        </div>
        <div className="rs-form__field">
          <label className="rs-form__label" htmlFor="rs-form-company">
            Company <span aria-hidden="true">*</span>
          </label>
          <input
            id="rs-form-company"
            type="text"
            required
            aria-required="true"
            placeholder="Acme Inc"
            value={company}
            onChange={(e) => { setCompany(e.target.value); setError(''); }}
            className="rs-form__input"
          />
        </div>
      </div>

      <div className="rs-form__field">
        <label className="rs-form__label rs-form__label--sub">
          Competitor URLs <span>(optional)</span>
        </label>
        <div className="rs-form__competitors">
          {competitors.map((c, i) => (
            <input
              key={i}
              type="url"
              placeholder={`https://competitor${i + 1}.com`}
              value={c}
              onChange={(e) => updateComp(i, e.target.value)}
              className="rs-form__input rs-form__input--small"
              aria-label={`Competitor URL ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {error && <div className="rs-form__error" role="alert">{error}</div>}

      <button type="submit" className="rs-form__submit">{ctaLabel}</button>

      <p className="rs-form__fine">
        No credit card · Results in under 30 seconds · Free
      </p>
    </form>
  );
}
