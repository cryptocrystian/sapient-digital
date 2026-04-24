import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...opts,
  });
}

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatRelativeTime(date: string | Date) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return formatDate(date);
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Map DB status values to display labels */
export const STATUS_LABELS: Record<string, string> = {
  // Client status
  onboarding: 'Onboarding',
  active: 'Active',
  paused: 'Paused',
  churned: 'Churned',
  // Retainer
  renewed: 'Renewed',
  terminated: 'Terminated',
  // Video production
  queued: 'Queued',
  scripting: 'Scripting',
  script_review: 'Script Review',
  generating: 'Generating',
  internal_review: 'Internal Review',
  client_review: 'Client Review',
  revision: 'Revision',
  approved: 'Approved',
  publishing: 'Publishing',
  published: 'Published',
  failed: 'Failed',
  // Pitch
  draft: 'Draft',
  sent: 'Sent',
  opened: 'Opened',
  responded: 'Responded',
  placed: 'Placed',
  declined: 'Declined',
  no_response: 'No Response',
  // Content
  planned: 'Planned',
  briefed: 'Briefed',
  in_progress: 'In Progress',
  review: 'Review',
  // Priority
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const TIER_LABELS: Record<string, string> = {
  tier1: 'Tier 1',
  tier2: 'Tier 2',
  tier3: 'Tier 3',
  establish: 'Establish',
  accelerate: 'Accelerate',
  dominate: 'Dominate',
  enterprise: 'Enterprise',
};
