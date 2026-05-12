'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Wordmark from './Wordmark';

const LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Approach', href: '/approach' },
  { label: 'Work',     href: '/work' },
  { label: 'Pricing',  href: '/pricing' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Custom cursor — only on hover-capable pointer-fine devices, respect reduced motion.
  useEffect(() => {
    const supportsPointerFine =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!supportsPointerFine || reducedMotion) return;

    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursor-ring');
    if (!cursor || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '64px', padding: '0 52px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(14,13,18,.92)' : 'rgba(14,13,18,.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'background .3s ease, border-color .3s ease',
      }}
    >
      {/* Wordmark */}
      <Link
        href="/"
        aria-label="Sapient Digital — home"
        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
      >
        <Wordmark height={44} priority />
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: '12px',
              color: pathname.startsWith(link.href)
                ? 'var(--text-primary)'
                : 'var(--text-secondary)',
              textDecoration: 'none',
              letterSpacing: '.02em',
              position: 'relative',
              transition: 'color .2s ease',
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/audit"
          style={{
            fontSize: '11px', fontWeight: 600, padding: '8px 18px',
            borderRadius: '7px', border: '1px solid var(--gold-border)',
            color: 'var(--gold)', textDecoration: 'none',
            background: 'var(--gold-dim)',
            transition: 'background .2s ease',
            letterSpacing: '.03em',
          }}
        >
          Free Audit →
        </Link>
      </div>
    </nav>
  );
}
