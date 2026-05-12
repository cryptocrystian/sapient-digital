/**
 * Typed wrapper for GTM dataLayer events.
 *
 * Usage:
 *   trackEvent({ event: 'cta_click', label: 'pricing_cta', tier: 'establish' });
 *   trackEvent({ event: 'lp_view', source: 'lp-ai-presence' });
 *
 * Safe to call from anywhere — guards against SSR + missing dataLayer.
 */

export type EventName =
  | 'cta_click'
  | 'form_submit'
  | 'lp_view'
  | 'audit_start'
  | 'pricing_view';

export interface TrackEventProps {
  event: EventName;
  label?: string;
  tier?: string;
  source?: string;
  value?: number;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent({ event, ...props }: TrackEventProps): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...props });
}
