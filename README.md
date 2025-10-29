# sapient-digitalSapient Digital — Website

Dark-first, enterprise-grade marketing site for Sapient Digital (integrated PR, Content, SEO).
Built with Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui and a tokenized design system.

✨ Features

Dark-first design system with CSS variables + Tailwind mapping

Modular sections (Hero, Services, Case Studies, Approach, Contact)

Reusable UI components (Buttons, Cards, Stat Chips, Pricing, FAQ)

MDX-ready content types (Services, Case Studies, Posts)

Accessibility: visible focus, reduced-motion, landmarks, labels

SEO/SGE: metadata, JSON-LD, sitemap, robots

Analytics hooks (events.ts) for CTAs, forms, case study opens

Minimal /api/lead endpoint (stub) for future email/CRM integration

🧱 Tech Stack

Framework: Next.js 15, App Router, TypeScript

UI: Tailwind CSS (build, not CDN), shadcn/ui, lucide-react

Fonts: Inter & Inter Tight via next/font

Content: MDX (optional later), typed models

Analytics: lightweight gtag/GTM wrapper

Deploy: Vercel (recommended)

🚀 Getting Started
Prereqs

Node 18+

pnpm (npm i -g pnpm)

Install & run
pnpm install
pnpm dev
# http://localhost:3000

Build & start
pnpm build
pnpm start

📦 Scripts
pnpm dev        # local dev
pnpm build      # production build
pnpm start      # run production
pnpm lint       # (optional) add eslint config if needed

🔧 Environment (optional for later integrations)

Create .env.local (values can be empty for now):

# Analytics (optional)
NEXT_PUBLIC_GA_ID=

# Mail (optional, when wiring notifications)
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
MAIL_FROM="Sapient Digital <noreply@sapient.digital>"
MAIL_TO=you@yourdomain.com


The /api/lead route is a stub; you’ll wire Mailgun later.

🎨 Design System

CSS Tokens (see app/globals.css)

bg:   900 #0F1613 · 800 #13201A · 700 #183125
fg:   100 #E7F1EB · 300 #A7B3AD · 500 #8C9A95
accent: 500 #33B07A · 400 #46C38A
gold: 400 #D4B266
line: 700 rgba(255,255,255,.08) · 600 rgba(255,255,255,.12)
state: danger #E05A5A · info #6BB4FF · warn #E6A94B


Tailwind mapping (see tailwind.config.ts)

bg.900/800/700, fg.100/300/500, accent.500/400, gold.400, line.700/600, state.danger/info/warn


Type scale

h1 48/56, h2 36/44, h3 28/36, h4 22/30, body 16/26, small 14/22, micro 12/18

Headings: Inter Tight 600–700; Body: Inter 400–500

🗂️ Project Structure
app/
  (marketing)/
    _sections/
      hero.tsx
      services.tsx
      case-studies.tsx
      approach.tsx
      contact.tsx
    page.tsx
  services/page.tsx
  work/page.tsx
  approach/page.tsx
  pricing/page.tsx
  resources/page.tsx
  about/page.tsx
  contact/page.tsx
  api/lead/route.ts
  sitemap.ts
  robots.txt
components/
  Header.tsx
  Footer.tsx
  StatChip.tsx
  ServiceCard.tsx
  CaseStudyCard.tsx
  ApproachStep.tsx
  ui/Button.tsx
lib/
  analytics.ts
  schema.ts
  utils.ts
types/
  service.ts
  case-study.ts
public/
  logos/, images/, og/*

🧩 Key Components

Header — sticky, translucent on scroll, accessible nav

Button — primary / ghost, tokenized

StatChip — KPI label/value/delta display

ServiceCard, CaseStudyCard, ApproachStep — section blocks

Footer — legal links, (optional) Saipien badge

ContactForm — labeled inputs, aria-invalid, helper text (expand later)

🧠 Accessibility

Semantic landmarks: <header> <nav> <main> <section> <footer>

One <h1> per page; consistent heading order

Visible focus ring (focus-visible)

Respect prefers-reduced-motion for transitions/animations

Forms: use <label htmlFor> + id, error states with aria-invalid and aria-describedby

Contrast AA+ for body text and controls

🔎 SEO / SGE

Basic metadata in app/layout.tsx

Organization JSON-LD helper in lib/schema.ts

app/sitemap.ts + app/robots.txt

OG images in /public/og/ (add later)

📈 Analytics

Light wrapper in lib/analytics.ts:

events.cta_click(where, label)
events.form_start(id)
events.form_submit(id, ok)


Hook from CTAs, form submit, and case study opens.

📨 API Routes

POST /api/lead — accepts JSON, returns { ok: true }.
Add zod validation + Mailgun send later.

☁️ Deploy (Vercel)

Push repo to GitHub

Import on Vercel → set Environment Variables (if any)

Build command: pnpm build (Vercel auto-detects)

Set production domain (e.g., sapient.digital)

Add sitemap & robots routes to Vercel config if needed

✅ Quality Gates (Acceptance)

No console errors in dev/production

Lighthouse (Home): ≥ 90 Perf / Accessibility / Best Practices

Keyboard navigable; visible focus; reduced-motion respected

Tokens used everywhere (no stray hex values)

Pages scaffolded: /services, /work, /approach, /pricing, /resources, /about, /contact

🛠️ Dev Workflow

Build new UI as a component in components/

Consume it in a page section under app/(marketing)/_sections/

Keep tokens (bg/fg/accent/gold/line) — no hard-coded colors

Add analytics events for interactive elements

Write brief JSDoc comments for shared utilities/components
