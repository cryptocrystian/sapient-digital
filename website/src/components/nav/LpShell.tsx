'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Wordmark from './Wordmark';
import { trackEvent } from '@/lib/analytics';

interface LpShellProps {
  children: ReactNode;
  /** LP slug for `lp_view` attribution, e.g. "lp-ai-presence". */
  source?: string;
}

/**
 * Conversion landing-page shell.
 * - Stripped header: logo only, no nav links.
 * - Minimal legal footer (no SiteFooter).
 * - Reveals + cursor logic copied (lightly) so the LPs feel native to the site
 *   without dragging in the nav links that would dilute the single CTA thread.
 * - Fires `lp_view` to the dataLayer on mount when `source` is set.
 */
export default function LpShell({ children, source }: LpShellProps) {
  // Fire lp_view event on mount.
  useEffect(() => {
    if (source) {
      trackEvent({ event: 'lp_view', source });
    }
  }, [source]);

  // Scroll reveal observer — matches SiteNav's behavior so .reveal classes work here too.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: '64px',
          padding: '0 52px',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(14,13,18,.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Link
          href="/"
          aria-label="Sapient Digital — home"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <Wordmark height={44} priority />
        </Link>
      </header>

      <main style={{ paddingTop: '64px', position: 'relative', overflow: 'hidden' }}>
        {children}
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '24px 52px',
          background: 'var(--surface-base)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
          © 2026 Sapient Digital · A Saipien Labs venture ·{' '}
          <Link
            href="/privacy"
            style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}
          >
            Privacy
          </Link>
        </p>
      </footer>
    </>
  );
}
