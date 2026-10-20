import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas:     "var(--canvas)",
        paper:      "var(--paper)",
        ink:        "var(--ink)",
        body:       "var(--body)",
        muted:      "var(--muted)",
        rule:       "var(--rule)",
        forest:     "var(--forest)",
        signal:     "var(--signal)",
        "signal-dim": "var(--signal-dim)",
        spark:      "var(--spark)",
        "spark-ink": "var(--spark-ink)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Didot", "Georgia", "serif"],
        sans:    ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "SF Mono", "Menlo", "monospace"],
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "10px",
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.14em",
      },
      transitionTimingFunction: {
        sapient: "cubic-bezier(.2,.6,.2,1)",
      },
      maxWidth: {
        "measure": "68ch",
        "wrap": "1340px",
      },
      animation: {
        marquee: "marquee 42s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
