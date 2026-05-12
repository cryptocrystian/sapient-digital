import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/analytics/TrackedLink';

export default function Close() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '80px 52px',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'var(--surface-base)',
      }}
    >
      {/* Dramatic centered gold orb */}
      <div
        className="orb-gold"
        aria-hidden="true"
        style={{
          width: '900px',
          height: '900px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          className="reveal"
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(48px, 6.4vw, 80px)',
            lineHeight: 1.04,
            letterSpacing: '-.028em',
            color: 'var(--text-primary)',
            marginBottom: '28px',
          }}
        >
          Your competitors are{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>building presence</em>{' '}
          right now.
        </h2>

        <p
          className="reveal reveal-delay-1"
          style={{
            fontSize: '17px',
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            margin: '0 auto 40px',
          }}
        >
          The brands that win the next five years will dominate search results, appear in AI
          answers, earn consistent Tier 1 coverage, and move at the speed of video. That window
          is open — but it closes. Let&apos;s show you exactly where you stand.
        </p>

        <div
          className="reveal reveal-delay-2"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}
        >
          <TrackedLink
            href="/audit"
            trackEventName="audit_start"
            trackSource="close_band"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '17px 32px',
              background: 'var(--gold)',
              color: '#0E0D12',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '.01em',
              boxShadow: '0 8px 24px rgba(200,147,74,.18)',
            }}
          >
            Get your free visibility audit <ArrowRight size={16} strokeWidth={2.5} />
          </TrackedLink>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '17px 32px',
              border: '1px solid var(--gold-border)',
              background: 'var(--gold-dim)',
              color: 'var(--gold)',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '.01em',
            }}
          >
            Talk to our team
          </Link>
        </div>

        <p
          className="reveal reveal-delay-3"
          style={{
            fontSize: '13px',
            color: 'var(--text-tertiary)',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}
        >
          We&apos;ll score your PR presence, content coverage, and AI citation rank — and show
          you the gaps your competitors are already exploiting.
        </p>
      </div>
    </section>
  );
}
