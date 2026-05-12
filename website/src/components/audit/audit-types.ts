// Rebranded audit types for Sapient Digital Signal Engine™.
// API-compatible with the upstream EVI scorecard backend.
// Brand-facing names changed: EVI → Visibility Score, SAGE → Signal Engine.

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
  if (score <= 40) return { label: 'At Risk',     color: '#EF4444', bgColor: 'rgba(239,68,68,.12)' };
  if (score <= 60) return { label: 'Emerging',    color: '#F59E0B', bgColor: 'rgba(245,158,11,.12)' };
  if (score <= 80) return { label: 'Competitive', color: '#C8934A', bgColor: 'rgba(200,147,74,.12)' };
  return                  { label: 'Dominant',    color: '#22C55E', bgColor: 'rgba(34,197,94,.12)' };
}

export function sevColor(s: Severity): string {
  return s === 'high' ? '#EF4444' : s === 'medium' ? '#F59E0B' : '#22C55E';
}

export const PILLAR_CONFIG: Record<
  PillarKey,
  { label: string; accent: string; bgAccent: string }
> = {
  pr:      { label: 'PR Presence',      accent: '#C8934A', bgAccent: 'rgba(200,147,74,.10)' },
  content: { label: 'Content Presence', accent: '#8B7FE8', bgAccent: 'rgba(139,127,232,.10)' },
  ai:      { label: 'AI Presence',      accent: '#14D9C4', bgAccent: 'rgba(20,217,196,.10)' },
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
