'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import SiteNav from '@/components/nav/SiteNav';
import SiteFooter from '@/components/nav/SiteFooter';
import { trackEvent } from '@/lib/analytics';

const TIERS = [
  'Establish ($8,500/mo+)',
  'Accelerate ($15,000/mo+)',
  'Dominate ($25,000/mo+)',
  'Enterprise ($35,000/mo+)',
  'Specialist or project engagement',
  'Not sure yet',
];

const HOW = ['Referral', 'Google search', 'LinkedIn', 'Content / article', 'Other'];

interface FormState {
  name: string;
  email: string;
  company: string;
  url: string;
  tier: string;
  how: string;
  message: string;
  /** Honeypot — bots will fill this; humans don't see it. */
  website: string;
}

const INITIAL: FormState = {
  name: '',
  email: '',
  company: '',
  url: '',
  tier: '',
  how: '',
  message: '',
  website: '',
};

// Map ?tier= URL param values to the corresponding dropdown label.
const TIER_PARAM_TO_LABEL: Record<string, string> = {
  establish: 'Establish ($8,500/mo+)',
  accelerate: 'Accelerate ($15,000/mo+)',
  dominate: 'Dominate ($25,000/mo+)',
  enterprise: 'Enterprise ($35,000/mo+)',
};

// Map ?type= URL param values to the dropdown label.
const TYPE_PARAM_TO_LABEL: Record<string, string> = {
  accelerator: 'Specialist or project engagement',
  audit: 'Specialist or project engagement',
  custom: 'Specialist or project engagement',
  project: 'Specialist or project engagement',
  'video-pr': 'Specialist or project engagement',
  video: 'Specialist or project engagement',
};

export default function ContactClient() {
  const searchParams = useSearchParams();
  const tierParam   = searchParams.get('tier');
  const typeParam   = searchParams.get('type');
  const sourceParam = searchParams.get('source') ?? '';

  const [form, setForm]       = useState<FormState>(INITIAL);
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  // Pre-fill the tier dropdown from URL params on mount.
  useEffect(() => {
    const fromTier = tierParam ? TIER_PARAM_TO_LABEL[tierParam] : undefined;
    const fromType = typeParam ? TYPE_PARAM_TO_LABEL[typeParam] : undefined;
    const preselect = fromTier ?? fromType;
    if (preselect) {
      setForm((prev) => ({ ...prev, tier: preselect }));
    }
  }, [tierParam, typeParam]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: sourceParam || 'contact-page',
        }),
      });
      if (!res.ok) {
        const raw = (await res.json().catch(() => ({}))) as Record<string, unknown>;
        setError(
          typeof raw.error === 'string'
            ? raw.error
            : 'Something went wrong. Email us directly at hello@sapientdigital.io',
        );
        setSending(false);
        return;
      }
      trackEvent({
        event: 'form_submit',
        label: 'contact',
        tier: form.tier || undefined,
        source: sourceParam || undefined,
      });
      setSent(true);
      setForm(INITIAL);
    } catch {
      setError('Something went wrong. Email us directly at hello@sapientdigital.io');
    } finally {
      setSending(false);
    }
  }

  const input: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'rgba(255,255,255,.04)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '6px',
    letterSpacing: '.02em',
  };

  return (
    <>
      <SiteNav />
      <main style={{ paddingTop: '64px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 52px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            {/* Left — context */}
            <div>
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
                Talk to Us
              </p>
              <h1
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: '52px',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '-.025em',
                  color: 'var(--text-primary)',
                  marginBottom: '24px',
                }}
              >
                Let&apos;s figure out
                <br />
                where you{' '}
                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>stand.</em>
              </h1>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '40px',
                }}
              >
                We&apos;re selective about the clients we take on. Tell us about your brand,
                where you&apos;re trying to go, and we&apos;ll tell you honestly whether
                we&apos;re the right fit.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  {
                    label: 'Not a sales call',
                    body:
                      'We review your submission before we respond. If we see a fit, we schedule a 30-minute strategy conversation — not a demo with three people on it.',
                  },
                  {
                    label: 'Start with a free audit',
                    body:
                      'Not ready for a call? Run a free visibility audit first. It takes under two minutes and gives you a real score to react to.',
                  },
                  {
                    label: 'Direct line',
                    body:
                      "Prefer email? Reach us directly at hello@sapientdigital.io and you'll hear back within one business day.",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '5px',
                      }}
                    >
                      {item.label}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div
              style={{
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              {sent ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'var(--gold-dim)',
                      border: '1px solid var(--gold-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      fontSize: '20px',
                      color: 'var(--gold)',
                    }}
                  >
                    ✓
                  </div>
                  <p
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '10px',
                    }}
                  >
                    We got it.
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                    }}
                  >
                    We&apos;ll review your submission and get back to you within one business
                    day. If we see a strong fit, we&apos;ll reach out to schedule time.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  {/* Honeypot — hidden from humans, irresistible to bots */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor="website-field">Leave this empty</label>
                    <input
                      id="website-field"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, website: e.target.value }))
                      }
                    />
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Full name *</label>
                      <input
                        style={input}
                        placeholder="Jane Smith"
                        required
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Work email *</label>
                      <input
                        style={input}
                        type="email"
                        placeholder="you@company.com"
                        required
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Company *</label>
                      <input
                        style={input}
                        placeholder="Acme Inc"
                        required
                        value={form.company}
                        onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Website</label>
                      <input
                        style={input}
                        type="url"
                        placeholder="https://acme.com"
                        value={form.url}
                        onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Interested in</label>
                    <select
                      style={{ ...input, cursor: 'pointer' }}
                      value={form.tier}
                      onChange={(e) => setForm((p) => ({ ...p, tier: e.target.value }))}
                    >
                      <option value="">Select a tier (optional)</option>
                      {TIERS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>How did you hear about us?</label>
                    <select
                      style={{ ...input, cursor: 'pointer' }}
                      value={form.how}
                      onChange={(e) => setForm((p) => ({ ...p, how: e.target.value }))}
                    >
                      <option value="">Select (optional)</option>
                      {HOW.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Tell us about your goals</label>
                    <textarea
                      style={{ ...input, minHeight: '96px', resize: 'vertical' }}
                      placeholder="What are you trying to accomplish? What's not working with your current approach?"
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    />
                  </div>
                  {error && (
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#FCA5A5',
                        padding: '10px 14px',
                        background: 'rgba(239,68,68,.08)',
                        borderRadius: '6px',
                      }}
                    >
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      padding: '14px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'var(--gold)',
                      color: '#0E0D12',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: sending ? 'wait' : 'pointer',
                      opacity: sending ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontFamily: 'inherit',
                    }}
                  >
                    {sending ? (
                      <>
                        <Loader2
                          size={15}
                          style={{ animation: 'spin 1s linear infinite' }}
                        />{' '}
                        Sending…
                      </>
                    ) : (
                      'Send message →'
                    )}
                  </button>
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-tertiary)',
                      textAlign: 'center',
                    }}
                  >
                    We respond within one business day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
