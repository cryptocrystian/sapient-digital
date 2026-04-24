import type { Config } from 'tailwindcss';

/**
 * Tailwind config for Agency OS
 * Shares DS v3.1 design tokens with apps/dashboard
 * Canonical source: docs/canon/DS_v3_1_EXPRESSION.md
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Slate Neutrals
        slate: {
          0: 'var(--slate-0)',
          1: 'var(--slate-1)',
          2: 'var(--slate-2)',
          3: 'var(--slate-3)',
          4: 'var(--slate-4)',
          5: 'var(--slate-5)',
          6: 'var(--slate-6)',
        },
        'white-0': 'var(--white-0)',
        page: 'var(--page-bg)',
        panel: 'var(--panel-bg)',
        text: 'var(--text)',
        brand: {
          iris: 'var(--brand-iris)',
          cyan: 'var(--brand-cyan)',
          violet: 'var(--brand-violet)',
          teal: 'var(--brand-teal)',
          magenta: 'var(--brand-magenta)',
          amber: 'var(--brand-amber)',
        },
        semantic: {
          info: 'var(--semantic-info)',
          success: 'var(--semantic-success)',
          warning: 'var(--semantic-warning)',
          danger: 'var(--semantic-danger)',
        },
        'border-subtle': 'var(--border-subtle)',
        // Agency-specific accent
        agency: {
          gold: '#C4A25C',
          'gold-light': '#FDF6E8',
          dark: '#0D0F14',
        },
        // shadcn compat
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        '2xl': 'var(--radius-2xl)',
        DEFAULT: 'var(--radius)',
      },
      boxShadow: {
        'elev-0': 'var(--elev-0)',
        'elev-1': 'var(--elev-1)',
        'elev-2': 'var(--elev-2)',
        'elev-3': 'var(--elev-3)',
        panel: 'var(--shadow-panel)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 1600ms infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
  safelist: [
    // Badge variants — dynamically constructed in JSX, must be safelisted
    { pattern: /^badge-/ },
    { pattern: /^alert-/ },
    { pattern: /^pipeline-dot-/ },
    { pattern: /^btn-/ },
    // Semantic colors used in className expressions
    'text-semantic-success', 'text-semantic-warning', 'text-semantic-danger', 'text-semantic-info',
    'text-brand-cyan', 'text-brand-iris', 'text-brand-amber', 'text-brand-teal',
    'text-white-0', 'text-slate-6',
    'bg-slate-3', 'bg-slate-4',
    'border-semantic-success', 'border-semantic-danger',
  ],
};

export default config;
