"use client";

import { motion } from "framer-motion";
import { useId } from "react";

type Period = "monthly" | "annual";

export default function PricingToggle({
  value,
  onChange,
  label = "Billing period",
}: {
  value: Period;
  onChange: (v: Period) => void;
  label?: string;
}) {
  const id = useId();
  const isAnnual = value === "annual";

  return (
    <div className="inline-flex items-center gap-3">
      <label htmlFor={id} className="text-sm text-fg-300">
        {label}
      </label>
      <div
        id={id}
        role="tablist"
        aria-label={label}
        className="relative flex w-[280px] rounded-xl border border-line-700 bg-bg-700 p-1"
      >
        <button
          role="tab"
          aria-selected={!isAnnual}
          className="relative z-10 flex-1 px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => onChange("monthly")}
        >
          <span className="block">Monthly</span>
          <span className="block text-xs text-fg-300">Cancel anytime</span>
        </button>
        <button
          role="tab"
          aria-selected={isAnnual}
          className="relative z-10 flex-1 px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => onChange("annual")}
        >
          <span className="block">Annual</span>
          <span className="block text-xs text-accent-400">Save 15%</span>
        </button>

        <motion.span
          layout
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
          className="absolute inset-y-1 w-1/2 rounded-lg bg-bg-800 border border-line-600"
          style={{ left: isAnnual ? "50%" : "0%" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
