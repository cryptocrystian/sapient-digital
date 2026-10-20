"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#prism", label: "The Prism" },
  { href: "#wavelengths", label: "Wavelengths" },
  { href: "#prismos", label: "PrismOS" },
  { href: "#work", label: "Work" },
  { href: "#team", label: "Team" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(246,243,238,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        transition: "all 180ms var(--ease-standard)",
      }}
    >
      <nav className="container-wide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          {/* Tiny prism glyph */}
          <svg width="22" height="20" viewBox="0 0 22 20" aria-hidden="true">
            <polygon points="11,2 20,18 2,18" fill="none" stroke="#0A0A08" strokeWidth="1.6" strokeLinejoin="round" />
            <line x1="14" y1="10" x2="22" y2="7" stroke="#FF4F1A" strokeWidth="1.5" />
            <line x1="14" y1="10" x2="22" y2="11" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="14" y1="10" x2="22" y2="15" stroke="#E8FF3A" strokeWidth="1.5" />
            <line x1="14" y1="10" x2="22" y2="19" stroke="#0E8A6A" strokeWidth="1.5" />
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            Sapient Digital
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="p-desktop-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}
              style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink)", opacity: 0.75, textDecoration: "none", transition: "opacity 160ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
            >
              {n.label}
            </Link>
          ))}
          <Link href="#start" className="btn btn-primary btn-sm">
            Book a Prism Audit
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="p-mobile-toggle"
          style={{ width: 40, height: 40, background: "transparent", border: 0, color: "var(--ink)", display: "none" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22">
            {open ? (
              <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="5" y1="5" x2="17" y2="17" />
                <line x1="17" y1="5" x2="5" y2="17" />
              </g>
            ) : (
              <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="4" y1="7" x2="18" y2="7" />
                <line x1="4" y1="15" x2="18" y2="15" />
              </g>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div style={{ padding: "16px 24px 28px", borderTop: "1px solid var(--rule)", background: "var(--canvas)", display: "flex", flexDirection: "column", gap: 16 }}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--ink)", textDecoration: "none" }}>
              {n.label}
            </Link>
          ))}
          <Link href="#start" className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start", marginTop: 8 }}>
            Book a Prism Audit
          </Link>
        </div>
      )}

      <style>
        {`
        @media (max-width: 920px) {
          .p-desktop-nav { display: none !important; }
          .p-mobile-toggle { display: inline-flex !important; }
        }
        `}
      </style>
    </header>
  );
}
