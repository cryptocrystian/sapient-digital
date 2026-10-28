'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { track, trackPageView } from '@/lib/analytics';

/**
 * Global analytics event tracker — mounted once in the root layout.
 *
 *   - Fires `page_view` on every client-side route change (Next.js App Router
 *     does NOT auto-fire these; GA4 only reads the initial pathname.)
 *   - Delegates click tracking: any element (or ancestor) with `data-track`
 *     fires that event. Other `data-*` attributes become params, snake-cased.
 *     Example: data-track="cta_click" data-cta-name="talk_strategy"
 *              data-cta-location="hero" → fires cta_click { cta_name, cta_location }
 *   - Fires `scroll_depth` milestones at 25 / 50 / 75 / 100% of page height,
 *     throttled, once per page load.
 */
export default function AnalyticsEventTracker() {
  const pathname = usePathname();

  // Page view on route change
  useEffect(() => {
    if (pathname) trackPageView(pathname);
  }, [pathname]);

  // Delegated click tracking
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
      if (!target) return;
      const eventName = target.dataset.track;
      if (!eventName) return;

      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(target.dataset)) {
        if (key === 'track' || !value) continue;
        // camelCase → snake_case: ctaName → cta_name
        const snake = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        params[snake] = value;
      }
      track(eventName, params);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Scroll depth milestones (reset per route)
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const fired = new Set<number>();
    let scheduled = false;

    const measureAndFire = () => {
      scheduled = false;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = (window.scrollY / total) * 100;
      for (const m of milestones) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track('scroll_depth', { percent: m, page_path: pathname ?? '' });
        }
      }
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      window.setTimeout(measureAndFire, 250);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
