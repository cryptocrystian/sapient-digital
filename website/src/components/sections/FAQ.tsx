'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const QUESTIONS = [
  {
    q: 'How quickly will we see results?',
    a:
      'Most clients see measurable coverage velocity within the first 60 days. Full momentum — where PR, content, and AI citation signals are compounding — typically builds over 90–180 days. We track leading indicators from week one so you always know where you are in the curve.',
  },
  {
    q: 'What does onboarding look like?',
    a:
      "Week one: brand immersion, competitive mapping, Signal Engine calibration. Week two: first pitches submitted, content calendar built, AI baseline established. By day 30, we're in full execution. We've refined the onboarding to move fast without cutting corners.",
  },
  {
    q: 'Do I need to commit long-term?',
    a:
      "We work on monthly retainers with a 6-month minimum across all programs. Most clients stay 18+ months because the compounding effect becomes obvious. We don't hide behind long contracts — we earn the renewal.",
  },
  {
    q: 'How is this different from a traditional PR agency?',
    a:
      "Traditional agencies are organized around activity — pitches sent, stories placed, reports delivered. We're organized around outcomes — pipeline generated, authority built, citations earned. The difference isn't just our tools; it's how we measure success.",
  },
  {
    q: 'You mention AI across all services. Are you an AI company or an agency?',
    a:
      "An agency. AI is our infrastructure, not our product. You hire us for judgment, relationships, and strategy. The intelligence layer behind it makes us faster and more precise — but a brand's reputation is still built by people who understand your business.",
  },
  {
    q: 'What size company is Sapient right for?',
    a:
      "We work best with B2B companies doing $10M–$500M in revenue that have a real story to tell but not the internal team to tell it consistently. If you're too early, we'll tell you. If you're Fortune 100, there are bigger agencies that will impress you more at the pitch. We're the agency for the company that needs to punch above its weight.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-base" style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '80px 52px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 320px) minmax(0, 1fr)',
          gap: '64px',
          alignItems: 'flex-start',
        }}
      >
        <div className="reveal">
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'block',
              marginBottom: '24px',
            }}
          >
            FAQ
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 400,
              fontSize: 'clamp(36px, 4vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-.02em',
              color: 'var(--text-primary)',
            }}
          >
            Common <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>questions</em>.
          </h2>
        </div>

        <div className="reveal reveal-delay-1">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '24px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    fontSize: '17px',
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    letterSpacing: '-.005em',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ paddingRight: '24px' }}>{item.q}</span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? 'var(--gold)' : 'var(--text-secondary)',
                      borderColor: isOpen ? 'var(--gold-border)' : 'var(--border)',
                      background: isOpen ? 'var(--gold-dim)' : 'transparent',
                      transition: 'all .25s var(--ease-out-expo)',
                    }}
                  >
                    {isOpen ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height .35s cubic-bezier(0.4, 0, 0.2, 1), opacity .25s ease',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.75,
                      color: 'var(--text-secondary)',
                      paddingBottom: '24px',
                      paddingRight: '40px',
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
