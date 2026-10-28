/**
 * Analytics event helper — pushes to window.dataLayer, which GTM + GA4
 * both consume. Decoupled from any single platform; adding another
 * analytics tool later means configuring a GTM tag, not changing this code.
 *
 * Event vocabulary (keep stable — GTM tags depend on these names):
 *   - page_view          { page_path }
 *   - cta_click          { cta_name, cta_location, cta_discipline?, insight_slug? }
 *   - form_submit        { form, form_entry_path? }
 *   - scorecard_result   { band, score, entry_path }
 *   - scroll_depth       { percent, page_path }
 *   - chapter_view       { chapter, page_path }
 */

export type TrackParams = Record<string, string | number | boolean>;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as DataLayerWindow;
  if (!w.dataLayer) w.dataLayer = [];
  w.dataLayer.push({ event, ...params });
}

export function trackPageView(path: string): void {
  track('page_view', { page_path: path });
}

// Backward-compat shim: legacy Signal Engine components call
// trackEvent({ event, ...params }) — a single-object signature.
export type EventName = string;

export function trackEvent(payload: { event: EventName } & Record<string, unknown>): void {
  const { event, ...rest } = payload;
  const params: TrackParams = {};
  for (const [k, v] of Object.entries(rest)) {
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      params[k] = v;
    }
  }
  track(event, params);
}
