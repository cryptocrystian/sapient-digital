"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-bg-900/80 backdrop-blur border-b border-line-700"
          : ""
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-8 py-6 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight text-accent-500 hover:text-accent-400 transition"
        >
          Sapient Digital
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <a
            href="#services"
            className="text-fg-300 hover:text-fg-100 transition"
          >
            Services
          </a>
          <a
            href="#case-studies"
            className="text-fg-300 hover:text-fg-100 transition"
          >
            Case Studies
          </a>
          <a
            href="#approach"
            className="text-fg-300 hover:text-fg-100 transition"
          >
            Approach
          </a>
          <a
            href="#contact"
            className="text-fg-300 hover:text-fg-100 transition"
          >
            Contact
          </a>
          <Button>Book a Call</Button>
        </div>
      </nav>
    </header>
  );
}
