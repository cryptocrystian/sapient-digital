import type { MetadataRoute } from 'next';

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sapientdigital.io';

type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

const ROUTES: SitemapEntry[] = [
  // Primary funnel
  { path: '',                      priority: 1.0, changeFrequency: 'monthly' },
  { path: '/approach',             priority: 0.9, changeFrequency: 'monthly' },
  { path: '/contact',              priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about',                priority: 0.8, changeFrequency: 'monthly' },

  // Resultant Scorecard
  { path: '/audit',                priority: 0.9, changeFrequency: 'monthly' },
  { path: '/audit/visibility',     priority: 0.8, changeFrequency: 'monthly' },
  { path: '/audit/pr',             priority: 0.8, changeFrequency: 'monthly' },
  { path: '/audit/content',        priority: 0.8, changeFrequency: 'monthly' },

  // The Thinking — insights library
  { path: '/insights',             priority: 0.7, changeFrequency: 'weekly' },
  { path: '/insights/attention-authority',           priority: 0.8, changeFrequency: 'monthly' },
  { path: '/insights/missed-opportunity',            priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights/ai-visibility-measurement',     priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights/resultant-primer',              priority: 0.7, changeFrequency: 'monthly' },

  // Supporting
  { path: '/subscribe',            priority: 0.6, changeFrequency: 'yearly' },

  // Legal
  { path: '/privacy',              priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms',                priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
