'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  target: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  trigger?: 'mount' | 'view';
  duration?: number;
}

export default function Counter({
  target,
  decimals = 0,
  suffix = '',
  prefix = '',
  trigger = 'mount',
  duration = 1600,
}: Props) {
  const [value, setValue]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStarted(true);
    const startTs = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTs;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) requestAnimationFrame(animate);
      else setValue(target);
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (trigger === 'mount') {
      start();
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, target, duration]);

  // Before animation starts, render an em-dash placeholder instead of "0".
  const display = !started
    ? '—'
    : decimals === 0
      ? Math.floor(value).toString()
      : value.toFixed(decimals);

  return (
    <span ref={ref}>
      {started && prefix}
      {display}
      {started && suffix}
    </span>
  );
}
