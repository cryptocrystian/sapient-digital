import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          900: "var(--sd-bg-900)",
          800: "var(--sd-bg-800)",
          700: "var(--sd-bg-700)"
        },
        fg: {
          100: "var(--sd-fg-100)",
          300: "var(--sd-fg-300)",
          500: "var(--sd-fg-500)"
        },
        accent: {
          500: "var(--sd-accent-500)",
          400: "var(--sd-accent-400)"
        },
        gold: {
          400: "var(--sd-gold-400)"
        },
        line: {
          700: "var(--sd-line-700)",
          600: "var(--sd-line-600)"
        },
        state: {
          danger: "var(--sd-danger-500)",
          info: "var(--sd-info-400)",
          warn: "var(--sd-warn-400)"
        }
      },
      borderRadius: {
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px"
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,.25)"
      },
      transitionTimingFunction: {
        sapient: "cubic-bezier(.2,.8,.2,1)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
