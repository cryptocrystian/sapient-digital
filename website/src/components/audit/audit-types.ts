// Resultant Scorecard typed data model.
// API-compatible with the upstream backend; display labels use agency-level
// language (Digital PR / Strategic Content / Search & AI Visibility) and the
// Resultant signal-orange palette for emphasis.

export type VisibilityBand = 'At Risk' | 'Emerging' | 'Competitive' | 'Dominant';
export type PillarKey      = 'pr' | 'content' | 'ai';
export type EntryPath      = 'pr' | 'content' | 'ai' | 'generic';
export type Severity       = 'high' | 'medium' | 'low';

export interface PillarGap {
  title: string;
  description: string;
  severity: Severity;
  remediation: string;
}

export interface PillarScore {
  score: number;
  band: VisibilityBand;
  signals: Record<string, string>;
  gaps: PillarGap[];
}

export interface ScanResult {
  evi_score: number;
  evi_band:  VisibilityBand;
  pillars: {
    pr: PillarScore;
    content: PillarScore;
    ai: PillarScore;
  };
  variance: {
    spread: number;
    leading_pillar: PillarKey;
    lagging_pillar: PillarKey;
    orchestration_opportunity: string;
  };
  benchmark: {
    category_quartile: 1 | 2 | 3 | 4 | null;
    category_label: string | null;
  };
  scan_metadata: {
    brand_url: string;
    competitor_urls: string[];
    scanned_at: string;
    engines_consulted: string[];
  };
  magic_link_sent: boolean;
}

export interface ScanResponse extends ScanResult {
  audit_id: string | null;
  org_id: string;
  trial_expires_at: string;
  entry_path: EntryPath;
}

export function visibilityBand(score: number): {
  label: VisibilityBand;
  color: string;
  bgColor: string;
} {
  if (score <= 40) return { label: 'At Risk',     color: '#EF4444', bgColor: 'rgba(239,68,68,.14)' };
  if (score <= 60) return { label: 'Emerging',    color: '#F59E0B', bgColor: 'rgba(245,158,11,.14)' };
  if (score <= 80) return { label: 'Competitive', color: '#0EA5E9', bgColor: 'rgba(14,165,233,.14)' };
  return                  { label: 'Dominant',    color: '#22C55E', bgColor: 'rgba(34,197,94,.14)' };
}

export function sevColor(s: Severity): string {
  return s === 'high' ? '#EF4444' : s === 'medium' ? '#F59E0B' : '#22C55E';
}

// Agency-level public labels — Digital PR / Strategic Content / Search & AI Visibility.
// Accent colors mirror the stream tints from the hero wind-tunnel annotation panel
// (cool / neutral / warm), tying the scorecard back to the homepage visual language.
export const PILLAR_CONFIG: Record<
  PillarKey,
  { label: string; accent: string; bgAccent: string }
> = {
  pr:      { label: 'Digital PR',              accent: '#DBE4F2', bgAccent: 'rgba(219,228,242,.08)' },
  content: { label: 'Strategic Content',       accent: '#F0F0F0', bgAccent: 'rgba(240,240,240,.06)' },
  ai:      { label: 'Search & AI Visibility',  accent: '#F7E5CA', bgAccent: 'rgba(247,229,202,.08)' },
};

export function pillarOrder(entryPath: EntryPath): PillarKey[] {
  switch (entryPath) {
    case 'pr':      return ['pr', 'content', 'ai'];
    case 'content': return ['content', 'pr', 'ai'];
    case 'ai':      return ['ai', 'pr', 'content'];
    default:        return ['pr', 'content', 'ai'];
  }
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
