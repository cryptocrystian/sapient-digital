'use client';

import Link, { type LinkProps } from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { trackEvent, type EventName } from '@/lib/analytics';

interface Props extends Omit<LinkProps, 'onClick'> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  trackEventName: EventName;
  trackLabel?: string;
  trackTier?: string;
  trackSource?: string;
  trackValue?: number;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

/**
 * <Link> wrapper that fires a GTM dataLayer event on click before navigating.
 * Use this in server components instead of adding `'use client'` to whole pages
 * just to wire analytics.
 */
export default function TrackedLink({
  children,
  className,
  style,
  trackEventName,
  trackLabel,
  trackTier,
  trackSource,
  trackValue,
  target,
  rel,
  ariaLabel,
  ...linkProps
}: Props) {
  return (
    <Link
      {...linkProps}
      className={className}
      style={style}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onClick={() => {
        trackEvent({
          event: trackEventName,
          label: trackLabel,
          tier: trackTier,
          source: trackSource,
          value: trackValue,
        });
      }}
    >
      {children}
    </Link>
  );
}
