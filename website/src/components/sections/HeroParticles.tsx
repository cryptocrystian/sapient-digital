'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const PARTICLE_COUNT     = 50;
const CONNECT_DISTANCE   = 110;
const MOUSE_RADIUS       = 160;
const PARTICLE_COLOR     = 'rgba(200,147,74,';
const CURSOR_LINE_OPACITY = 0.18;

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const particles: Particle[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let rafId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.4 + 0.6,
        });
      }
    };

    const onResize = () => {
      resize();
      seed();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Mouse attraction
        const dxm = mouseX - p.x;
        const dym = mouseY - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < MOUSE_RADIUS) {
          const force = (1 - dm / MOUSE_RADIUS) * 0.04;
          p.vx += (dxm / (dm || 1)) * force;
          p.vy += (dym / (dm || 1)) * force;
        }

        // Drift + dampening
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${PARTICLE_COLOR}.55)`;
        ctx.fill();
      }

      // Connection lines + cursor lines
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < CONNECT_DISTANCE) {
            const opacity = 0.12 * (1 - d / CONNECT_DISTANCE);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `${PARTICLE_COLOR}${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
        // Cursor line
        const dxc = a.x - mouseX;
        const dyc = a.y - mouseY;
        const dc = Math.hypot(dxc, dyc);
        if (dc < MOUSE_RADIUS) {
          const opacity = CURSOR_LINE_OPACITY * (1 - dc / MOUSE_RADIUS);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `${PARTICLE_COLOR}${opacity})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    // Defer particle init until after first paint to keep LCP unblocked.
    const startTimer = setTimeout(() => {
      resize();
      seed();
      rafId = requestAnimationFrame(draw);
      window.addEventListener('resize', onResize);
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
    }, 100);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    />
  );
}
