'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

const CHAPTERS = [
  'worldview',
  'method',
  'cadence',
  'services',
  'thinking',
  'decision',
];

/**
 * Observes chapter sections on the homepage and fires `chapter_view` the first
 * time each one crosses 50% visibility. One event per chapter per page load.
 */
export default function ChapterViewTracker() {
  useEffect(() => {
    const fired = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && !fired.has(id)) {
            fired.add(id);
            track('chapter_view', { chapter: id, page_path: '/' });
          }
        }
      },
      { threshold: 0.5 },
    );

    for (const id of CHAPTERS) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, []);

  return null;
}
