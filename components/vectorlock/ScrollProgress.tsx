"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { num: "01", label: "Hero", selector: ".vl-hero" },
  { num: "02", label: "Worldview", selector: ".vl-worldview" },
  { num: "03", label: "Silo", selector: ".vl-friction" },
  { num: "04", label: "Method", selector: ".vl-method" },
  { num: "05", label: "Disciplines", selector: ".vl-services" },
  { num: "06", label: "Means", selector: ".vl-mc" },
  { num: "07", label: "Evidence", selector: ".vl-evidence" },
  { num: "08", label: "Close", selector: ".vl-close" },
];

export function ScrollProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = CHAPTERS.findIndex((c) =>
              entry.target.matches(c.selector)
            );
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    const targets: Element[] = [];
    CHAPTERS.forEach((c) => {
      const el = document.querySelector(c.selector);
      if (el) {
        observer.observe(el);
        targets.push(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="vl-progress" aria-label="Chapter progress">
      <ol className="vl-progress-list">
        {CHAPTERS.map((c, i) => (
          <li key={c.num} className="vl-progress-item">
            <a
              href={c.selector}
              onClick={(e) => handleJump(e, c.selector)}
              className={`vl-progress-dot ${
                i === active ? "is-active" : i < active ? "is-visited" : ""
              }`}
              aria-current={i === active ? "true" : undefined}
            >
              <span className="vl-progress-num">{c.num}</span>
              <span className="vl-progress-label">{c.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
