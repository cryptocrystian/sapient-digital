# Sapient Digital - Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

## Project Structure Overview

```
sapient-digital/
├── app/                          # Next.js 15 App Router
│   ├── (marketing)/              # Marketing pages group
│   │   ├── _sections/            # Reusable page sections
│   │   │   ├── hero.tsx          # Hero section with KPIs
│   │   │   ├── services.tsx      # Services showcase
│   │   │   ├── case-studies.tsx  # Case studies with results
│   │   │   ├── approach.tsx      # 4-step approach
│   │   │   └── contact.tsx       # Contact form section
│   │   └── page.tsx              # Home page assembly
│   ├── services/page.tsx         # Services page
│   ├── work/page.tsx             # Case studies page
│   ├── approach/page.tsx         # Approach page
│   ├── pricing/page.tsx          # Pricing page
│   ├── resources/page.tsx        # Blog/resources page
│   ├── about/page.tsx            # About page
│   ├── contact/page.tsx          # Contact page
│   ├── api/lead/route.ts         # Lead form API endpoint
│   ├── layout.tsx                # Root layout with fonts
│   ├── globals.css               # Design tokens & Tailwind
│   ├── sitemap.ts                # Dynamic sitemap
│   └── robots.ts                 # Robots.txt
├── components/                   # Reusable React components
│   ├── ui/                       # UI primitives
│   │   ├── Button.tsx            # Button with variants
│   │   └── StatChip.tsx          # KPI stat display
│   ├── Header.tsx                # Sticky navigation
│   ├── Footer.tsx                # Footer with links
│   ├── ContactForm.tsx           # Contact form with validation
│   ├── ServiceCard.tsx           # Service display card
│   └── CaseStudyCard.tsx         # Case study card with metrics
├── lib/                          # Utility functions
│   ├── analytics.ts              # Analytics event helpers
│   ├── schema.ts                 # JSON-LD schema
│   └── utils.ts                  # Tailwind merger (cn)
├── types/                        # TypeScript types
│   ├── service.ts                # Service type definition
│   └── case-study.ts             # Case study type definition
└── public/                       # Static assets
    └── (add images, logos, etc.)
```

## Design Tokens Reference

All colors are defined as CSS variables in `app/globals.css` and mapped in `tailwind.config.ts`:

### Backgrounds
- `bg-900` (#0F1613) - Primary background
- `bg-800` (#13201A) - Secondary background
- `bg-700` (#183125) - Card/elevated surfaces

### Foregrounds
- `fg-100` (#E7F1EB) - Primary text
- `fg-300` (#A7B3AD) - Secondary text
- `fg-500` (#8C9A95) - Tertiary text

### Accents
- `accent-500` (#33B07A) - Primary CTA
- `accent-400` (#46C38A) - Hover state
- `gold-400` (#D4B266) - Premium/highlight

### Borders
- `line-700` (rgba(255,255,255,.08)) - Subtle borders
- `line-600` (rgba(255,255,255,.12)) - Stronger borders

### States
- `state-danger` (#E05A5A) - Errors
- `state-info` (#6BB4FF) - Info messages
- `state-warn` (#E6A94B) - Warnings

## Common Tasks

### Add a New Page
1. Create `app/new-page/page.tsx`
2. Import Header and Footer
3. Add metadata export
4. Update `app/sitemap.ts` with new route

### Add a New Section
1. Create component in `app/(marketing)/_sections/new-section.tsx`
2. Import and use in `app/(marketing)/page.tsx`
3. Add ID for anchor navigation if needed

### Add Analytics Event
```tsx
import { events } from "@/lib/analytics";

// On button click
onClick={() => {
  events.cta_click("hero", "Book a Call");
}}
```

### Wire Up Lead Form Email
1. Set up Mailgun/SendGrid account
2. Add API keys to `.env.local`
3. Update `app/api/lead/route.ts` with email logic
4. Test with real submissions

## Development Tips

### Use Design Tokens
❌ Don't: `className="bg-[#0F1613] text-[#E7F1EB]"`
✅ Do: `className="bg-bg-900 text-fg-100"`

### Maintain Accessibility
- Always use semantic HTML
- Include labels for form inputs
- Test keyboard navigation
- Check color contrast

### Component Pattern
```tsx
import { cn } from "@/lib/utils";

export function MyComponent({ className, ...props }) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* content */}
    </div>
  );
}
```

### TypeScript Types
Define types in `/types` and import:
```tsx
import { Service } from "@/types/service";

const myService: Service = { /* ... */ };
```

## Need Help?

- Check the main [README.md](./README.md) for full documentation
- Review components in `/components` for patterns
- See design tokens in `app/globals.css`
- Reference Next.js 15 docs: https://nextjs.org/docs

## Deploy to Vercel

```bash
# 1. Install Vercel CLI (optional)
npm i -g vercel

# 2. Push to GitHub
git add .
git commit -m "Ready to deploy"
git push

# 3. Deploy
vercel

# Or use the Vercel dashboard to import your GitHub repo
```

That's it! You're ready to build. 🚀
