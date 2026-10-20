"use client";

import { useEffect } from "react";

/* Observes all .vl-reveal elements and adds .is-visible when they scroll into view. */
export function ScrollReveal() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      document
        .querySelectorAll(".vl-reveal")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const els = Array.from(
      document.querySelectorAll(".vl-reveal:not(.is-visible)")
    );
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
