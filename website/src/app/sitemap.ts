import type { MetadataRoute } from 'next';

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sapientdigital.io';

const ROUTES = [
  '',
  '/services',
  '/services/pr-media-relations',
  '/services/content-thought-leadership',
  '/services/search-ai-visibility',
  '/services/video-production',
  '/approach',
  '/work',
  '/pricing',
  '/contact',
  '/audit',
  '/audit/pr',
  '/audit/content',
  '/audit/visibility',
  '/accelerator',
  '/lp/ai-presence',
  '/lp/earned-media',
  '/lp/content-authority',
  '/lp/video-production',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
