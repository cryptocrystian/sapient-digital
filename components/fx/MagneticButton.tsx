"use client";

import { useRef, ButtonHTMLAttributes } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function MagneticButton({
  children,
  className = "",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`rounded-xl bg-accent-500 text-bg-900 px-5 py-3 font-medium transition-all duration-200 will-change-transform hover:bg-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-900 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
