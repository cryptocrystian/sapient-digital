'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIMELINE_OPTIONS = [
  { value: '', label: 'Exploring — no timeline yet' },
  { value: 'this-month', label: 'Within the next 30 days' },
  { value: 'this-quarter', label: 'This quarter' },
  { value: 'next-quarter', label: 'Next quarter' },
  { value: 'later', label: '2+ quarters out' },
];

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string; field?: string };

export default function ResultantContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [timeline, setTimeline] = useState('');
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const renderedAtRef = useRef<number>(0);

  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim()) {
        setStatus({ kind: 'error', message: 'Please enter your name.', field: 'name' });
        return;
      }
      if (!EMAIL_REGEX.test(email.trim())) {
        setStatus({ kind: 'error', message: 'Please enter a valid work email.', field: 'email' });
        return;
      }
      if (!company.trim()) {
        setStatus({ kind: 'error', message: 'Please enter your company.', field: 'company' });
        return;
      }
      if (message.trim().length < 10) {
        setStatus({
          kind: 'error',
          message: 'Tell us a bit more about what you are trying to improve.',
          field: 'message',
        });
        return;
      }

      setStatus({ kind: 'submitting' });

      try {
        const res = await fetch('/api/contact/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            company: company.trim(),
            website: website.trim(),
            message: message.trim(),
            timeline,
            honey,
            renderedAt: renderedAtRef.current,
          }),
        });

        const raw = (await res.json().catch(() => ({}))) as {
          error?: string;
          field?: string;
          ok?: boolean;
        };
        if (res.ok && raw.ok) {
          track('form_submit', {
            form: 'contact',
            timeline: timeline || 'none',
          });
          setStatus({ kind: 'success' });
          return;
        }
        setStatus({
          kind: 'error',
          message: raw.error ?? 'Something went wrong — please try again.',
          field: raw.field,
        });
      } catch {
        setStatus({
          kind: 'error',
          message: 'Network error — please try again.',
        });
      }
    },
    [name, email, company, website, message, timeline, honey],
  );

  if (status.kind === 'success') {
    const firstName = name.split(' ')[0] || 'there';
    return (
      <div className="rs-contact__success">
        <div className="rs-contact__success-mark" aria-hidden="true">✓</div>
        <p className="rs-contact__success-eyebrow">— Message received</p>
        <h2 className="rs-contact__success-title">Thanks, {firstName}.</h2>
        <p className="rs-contact__success-body">
          We&apos;ve got your note and we&apos;ll respond within one business day — usually faster.
          A confirmation is on its way to <strong>{email}</strong>.
        </p>
        <div className="rs-contact__success-ctas">
          <a className="rs-btn rs-btn--primary" href="/audit">Score Your Presence →</a>
          <a className="rs-btn rs-btn--ghost" href="/">← Return home</a>
        </div>
      </div>
    );
  }

  const submitting = status.kind === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="rs-form" aria-label="Contact Sapient Digital">
      <div className="rs-form__row">
        <div className="rs-form__field">
          <label className="rs-form__label" htmlFor="rs-contact-name">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="rs-contact-name"
            type="text"
            required
            aria-required="true"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => { setName(e.target.value); if (status.kind === 'error') setStatus({ kind: 'idle' }); }}
            className="rs-form__input"
            disabled={submitting}
            autoComplete="name"
          />
        </div>
        <div className="rs-form__field">
          <label className="rs-form__label" htmlFor="rs-contact-email">
            Work email <span aria-hidden="true">*</span>
          </label>
          <input
            id="rs-contact-email"
            type="email"
            required
            aria-required="true"
            placeholder="you@yourcompany.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status.kind === 'error') setStatus({ kind: 'idle' }); }}
            className="rs-form__input"
            disabled={submitting}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="rs-form__row">
        <div className="rs-form__field">
          <label className="rs-form__label" htmlFor="rs-contact-company">
            Company <span aria-hidden="true">*</span>
          </label>
          <input
            id="rs-contact-company"
            type="text"
            required
            aria-required="true"
            placeholder="Acme Inc"
            value={company}
            onChange={(e) => { setCompany(e.target.value); if (status.kind === 'error') setStatus({ kind: 'idle' }); }}
            className="rs-form__input"
            disabled={submitting}
            autoComplete="organization"
          />
        </div>
        <div className="rs-form__field">
          <label className="rs-form__label rs-form__label--sub">
            Website <span>(optional)</span>
          </label>
          <input
            type="url"
            placeholder="https://yourcompany.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="rs-form__input"
            disabled={submitting}
            autoComplete="url"
            aria-label="Company website"
          />
        </div>
      </div>

      <div className="rs-form__field">
        <label className="rs-form__label" htmlFor="rs-contact-message">
          What are you hoping to improve? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="rs-contact-message"
          required
          aria-required="true"
          placeholder="Recognition, reputation, category position, discoverability — tell us what you're trying to change, and anything you think may be holding you back."
          value={message}
          onChange={(e) => { setMessage(e.target.value); if (status.kind === 'error') setStatus({ kind: 'idle' }); }}
          className="rs-form__textarea"
          disabled={submitting}
          rows={6}
          maxLength={4000}
        />
      </div>

      <div className="rs-form__field">
        <label className="rs-form__label rs-form__label--sub" htmlFor="rs-contact-timeline">
          Timeline <span>(optional)</span>
        </label>
        <select
          id="rs-contact-timeline"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          className="rs-form__select"
          disabled={submitting}
        >
          {TIMELINE_OPTIONS.map((o) => (
            <option key={o.label} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Honeypot — hidden from humans and screen readers */}
      <input
        type="text"
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="rs-form__honey"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
      />

      {status.kind === 'error' && (
        <div className="rs-form__error" role="alert">{status.message}</div>
      )}

      <button type="submit" className="rs-form__submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send Message →'}
      </button>

      <p className="rs-form__fine">
        We respond within one business day · No sales calls without your invitation
      </p>
    </form>
  );
}
