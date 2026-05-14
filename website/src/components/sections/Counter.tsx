'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  /** Animation duration in ms (default 2000) */
  duration?: number;
  /** Number of decimal places (default 0) */
  decimals?: number;
  /**
   * 'view' = fires when the element enters the viewport (default; matches Proof / above-fold stats)
   * 'mount' = fires immediately on mount (for hero stats already visible)
   */
  trigger?: 'view' | 'mount';
}

/**
 * Count-up component.
 *
 * Style-agnostic: renders only the formatted number string; the caller controls
 * font, size, and color via a parent wrapper. Pre-animation it renders an
 * em-dash (—) so SSR markup doesn't show a misleading "0".
 *
 * Animation reliability fix (Session 7):
 * - Use a refs-based animation loop so it never reads stale React state
 * - Always finalize at exact target value (no rounding drift)
 * - Reset and restart on the same intersection if hot-reloaded
 * - IntersectionObserver threshold 0.3 (down from 0.5) — fires earlier so
 *   stats animate even on a fast scroll past
 */
export default function Counter({
  target,
  prefix = '',
  suffix = '',
  duration = 2000,
  decimals = 0,
  trigger = 'view',
}: CounterProps) {
  const [display, setDisplay] = useState<string>('—');
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const fmt = (n: number) => prefix + n.toFixed(decimals) + suffix;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const startTs = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTs;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(fmt(eased * target));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // Snap to exact target — avoids 339.97 type drift
          setDisplay(fmt(target));
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    if (trigger === 'mount') {
      // Fire on next tick so the initial '—' is in the DOM before counting starts
      const t = setTimeout(start, 16);
      return () => {
        clearTimeout(t);
        cancelAnimationFrame(rafRef.current);
      };
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, prefix, suffix, duration, decimals, trigger]);

  return <span ref={ref}>{display}</span>;
}
