# Sapient Digital — Brand Direction, Vol. 01

**Status:** Draft, pre-approval
**Date:** 2026-10-16
**Supersedes:** sapient.digital, 2025 build (dark SaaS template)
**Visual proof:** https://claude.ai/artifact/B9CRsdSUKtTLBdAXQtrutx

This document fixes the brand strategy for the public marketing site. Scope is the public site only (`sapient.digital`). AgencyOS (parked at `parked/agency-os/`) is a separate project and keeps its own system.

## 1. Positioning

**Line (v1):**
> We make B2B companies the answer — across journalists, Google, and the models that cite them both.

**Category:** Earned-first growth firm. One claim, defensible. Nobody owns it today — PR shops can't ship technical SEO, content/SEO shops don't have senior journalist relationships, AI-visibility tools aren't operators. The synthesis is unclaimed.

**Why it holds:** ~95% of links cited by LLMs come from non-paid sources (Muck Rack, 1M+ citations). ~25% are earned media. The ground is shifting to earned-first; we plant the flag before competitors wake up.

**Moat:** Four-pillar service (PR · Content · AEO · Video) backed by proprietary citation data from Pravado. No other agency can show a client their share of voice inside Perplexity next week.

## 2. Voice

A trade-press editor who also knows TypeScript. Short declarative sentences. Nouns and verbs over abstractions. No acronym worship. No performative humility, no performative swagger.

**Burn these phrases on sight:** *compounds · compounding · data-driven · ROI-focused · move the needle · agency of record · integrated · senior-led, no account managers · trusted by leading brands.*

**Burn these section patterns:** rotating hero verbs ("your best marketer / seller / operator"); "we are a [X] agency that…" openers; alphabet soup above the fold (GEO/AEO/LLMO); logo walls under "trusted by".

## 3. Design system — v1 tokens

### Color (seven tokens, one signal)

| Token    | Hex       | Role |
| -------- | --------- | ---- |
| `canvas` | `#F6F3EE` | Page background (warm paper, not white) |
| `paper`  | `#FDFBF6` | Raised surface over canvas |
| `ink`    | `#0E0E0C` | Primary text, buttons |
| `body`   | `#4A463F` | Running text |
| `muted`  | `#8A857A` | Metadata, captions |
| `rule`   | `#E2DED5` | Hairline rules |
| `signal` | `#FF4F1A` | Vermillion. Used **once per viewport.** |

Chart ink reserved: `#1F2A1F` for data visualizations.

**No dark mode at launch.** This is a positioning move against the SaaS herd. Add in v2 only if clients demand.

### Typography (free fallback stack for v1; licensed upgrade later)

| Role       | Family                     | Weights        | Role in system |
| ---------- | -------------------------- | -------------- | -------------- |
| Display    | **Instrument Serif**       | 400 / 400 ital | Hero, section titles, pull quotes |
| Body       | **Inter**                  | 400 / 500 / 600 | Running text, UI |
| Metadata   | **JetBrains Mono**         | 400 / 500      | Eyebrows, chart labels, bylines |

**Upgrade path (post-approval, if budget):** PP Editorial New + PP Neue Montreal + PP Fraktion Mono (Pangram Pangram). License required.

### Layout convictions

- 12-column grid, 1240px max width, asymmetric columns on editorial pages.
- Side gutter minimum 28px desktop, 16px phone (with `env(safe-area-inset-*)` respected).
- Section breaks are typographic rules (`var(--rule)` hairlines), not boxes.
- No decorative icons. If a section needs a mark, type is the mark. (Functional icons in UI only.)
- No `rounded-lg` cards floating in whitespace. Case tiles have real edges, not shadows.
- One moment of risk per page — the hero chart, a pull quote at 56px, a full-bleed section.

### Motion

- Reveal-on-scroll from a visible resting state (never `opacity: 0` left waiting).
- No parallax. No tilt-on-hover. No Lottie icons. No cursor trails.
- Charts interpolate on first scroll-into-view, once.
- Respect `prefers-reduced-motion`.

## 4. The hero concept

One sentence (Instrument Serif, ~96px, tight tracking, one italicized word in vermillion) + one live chart. The chart is a **Visibility Index**: a named client's share of voice over 12 months across four surfaces (Press · Google · Perplexity · ChatGPT), with press as the vermillion signal line to show the earned-first thesis — press leads, Google follows, AI engines cite what's already trusted.

Data for v1 chart is instrumented by Pravado. Shown as a sketch in the direction brief.

## 5. The template tells we're refusing

1. Dark bg + accent green + gold
2. Gradient-fill display words ("That Compounds")
3. Three rounded feature cards, same shadow, Lucide icon in the corner
4. Stat chips with gradient borders
5. "Compounds / data-driven / move the needle" copy
6. "Senior-led, no account managers" as a slogan (we show the masthead instead)
7. Rotating-verb heroes
8. Logo walls under "Trusted by"
9. Floating 3D blobs / Spline template geometry
10. Scroll-jacking, letter-by-letter hero animation, magnetic buttons everywhere

## 6. Build sequence

| # | Phase | Deliverable |
| --- | ----- | ----------- |
| 01 | Strategy, locked | This document, countersigned |
| 02 | Design system v1 | Tokens file, component kit, chart library, iconography stance |
| 03 | Brand kit v1 | Wordmark, favicon, OG image, deck template, email signature, LinkedIn kit |
| 04 | Home + Services | New hero + Visibility Index, four-pillar services, earned-first thesis, pricing floor visible |
| 05 | Work pages | 3 case studies written as trade-press features: byline, dateline, pull quotes, embedded charts, named teams |
| 06 | Team + Writing | Masthead page with named strategists; writing section where the published work is the credential |

**Out of scope:** AgencyOS (operations portal, parked). Pricing calculator (optional v2). Resources/blog MDX plumbing (optional v2).

## 7. Three bets to confirm

1. **Position as earned-first growth.** We walk away from "integrated / compounds / data-driven" and plant the flag on earned-first with the 95%/25% citation data as the backing claim.
2. **Paper and ink. One signal.** Warm canvas, near-black ink, vermillion used once per screen. No dark mode at launch. Instrument Serif + Inter + JetBrains Mono.
3. **The chart is the hero.** Home page lands on one sentence and a live Visibility Index chart powered by Pravado's data — no stat chips, no gradient blurs, no 3D blobs.

If three yeses, next phase is the design system — tokens file, component kit, iconography stance, deck template seed.
