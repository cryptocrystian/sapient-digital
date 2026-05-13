# SAPIENT DIGITAL MARKETING SITE — DESIGN SYSTEM
**Status:** CANONICAL · For sapientdigital.io only
**Last Updated:** 2026-05-07
**Parent:** See `BRAND_LANGUAGE.md` for constants

---

## 0. Philosophy

The marketing site makes a single impression. It has 8–12 seconds to communicate:
1. We are premium
2. We are different
3. We get results
4. You should talk to us

Everything else is secondary. Every design decision serves these four in order.

The primary reference aesthetic: **Restrained editorial authority with kinetic intelligence.**
Not a nightclub. Not a corporate brochure. A publication with a point of view.

---

## 1. Typography — Marketing Site

### Display Type — Instrument Serif
The marketing site's primary differentiator is the Instrument Serif + Inter pairing.

```
Google Fonts import:
  family=Instrument+Serif:ital@0;1
  family=Inter:wght@300;400;500;600;700
```

**Instrument Serif usage rules:**
- H1 (hero): 76–96px, weight 400, line-height 1.06, letter-spacing -0.025em
- H2 (section): 48–60px, weight 400, line-height 1.1, letter-spacing -0.022em
- H3 (subsection): 36–42px, weight 400, line-height 1.15
- Italic in gold (`color: var(--gold)`) for key word emphasis ONLY — max one italic word per headline
- Minimum size: 48px. Never smaller.
- Never in nav, buttons, body copy, or data

**Inter for everything else:**
- Body: 14–15px, 400, line-height 1.75
- UI/Nav: 11–13px, 500–600
- Eyebrows: 10px, 600, 0.14em tracking, uppercase
- Metadata: 11px, 400, var(--text-tertiary)

### Eyebrow Pattern (Critical — Used Everywhere)
```css
.eyebrow {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 10px;
}
.eyebrow::before {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--gold);
  opacity: 0.6;
  display: block;
}
```
This pattern appears before every section headline. It grounds the Instrument Serif headline in context.

---

## 2. Color — Marketing Site

All base surface and brand colors from BRAND_LANGUAGE.md apply. Additional marketing-site-only colors:

### Violet Signal Accent
```css
--violet: #8B7FE8;
--violet-dim: rgba(139, 127, 232, 0.10);
--violet-border: rgba(139, 127, 232, 0.20);
```
Used for: Live indicators, AI state badges, data accent in the hero dashboard card.
NOT used for: CTAs, headlines, decorative elements.

### The Wordmark
```
SAPIENT · DIGITAL
```
Two words, one dot (gold, 5px circle between them). The dot has a subtle pulse animation (3s infinite). All uppercase. Inter 700, 0.16em tracking.

---

## 3. Motion System — Marketing Site

The marketing site uses motion to communicate intelligence and life. Motion is ORIGINAL — not templated.

### Particle Network (Hero Background)
- Canvas element behind hero content
- 40–60 gold particles drifting slowly
- Connection lines drawn when particles are within 110px (opacity: 0.12 × (1 - distance/110))
- Mouse proximity: particles gently attracted toward cursor within 160px
- Cursor forms connection lines to nearby particles (more opaque, 0.18 max)
- Color: rgba(200, 147, 74, opacity) — always gold family

This is NOT optional. The particle network is signature and required in every hero iteration.

### Hero Entrance — Staggered Reveal
Each hero element fades up with sequential delays:
```
.eyebrow     → delay 0.10s
.headline-1  → delay 0.22s
.headline-2  → delay 0.38s
.headline-3  → delay 0.52s
.body        → delay 0.68s
.cta         → delay 0.84s
.proof stats → delay 0.96s
```
Animation: `opacity 0→1, translateY 28px→0, duration 0.9s, cubic-bezier(.16,1,.3,1)`

### Dashboard Card — 3D Tilt (Mouse Parallax)
The hero dashboard card tracks the mouse and tilts in 3D perspective.
```javascript
// On mousemove over card:
const x = (e.clientX - rect.left) / rect.width - 0.5;
const y = (e.clientY - rect.top) / rect.height - 0.5;
card.style.transform = `perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateZ(12px)`;
// On mouseleave: smooth return to 0, 0 over 0.5s
```

### Counter Animations
Stat numbers count up on page load (hero stats) or intersection (section stats).
```javascript
function animCounter(el, duration = 1600) {
  // ease-out cubic: 1 - Math.pow(1 - progress, 3)
  // Decimal: toFixed(1), Integer: Math.floor
}
```

### Scroll Reveals
Elements below the fold animate in on intersection:
```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(.16,1,.3,1),
              transform 0.8s cubic-bezier(.16,1,.3,1);
}
.reveal.in { opacity: 1; transform: translateY(0); }
```
Use stagger delays (0.1s, 0.2s, 0.32s, 0.44s) for grid items.

### Marquee Strip
Between hero and first section. Pauses on hover.
```css
animation: marquee 28s linear infinite;
/* Hover: animation-play-state: paused */
```
Content: service names separated by 3px gold dots.

### Custom Cursor
Gold dot (8px) with lagging ring (32px, gold border).
Dot tracks at 1:1. Ring lags at 0.18 lerp rate.
Both expand on interactive hover.

### Grain Overlay
Very subtle film grain texture on all surfaces.
```css
/* SVG filter or base64 PNG tile */
opacity: 0.028;
position: fixed;
pointer-events: none;
z-index: 9999;
```

### Navigation
Fixed. Blurs and adds border on scroll.
```css
background: rgba(14,13,18,0.85);
backdrop-filter: blur(16px);
/* On scroll: border-bottom: 1px solid var(--border) */
```

### Button — Arrow Microinteraction
Primary CTA contains an arrow that slides right on hover:
```css
.btn-arrow { transition: transform 0.25s cubic-bezier(.16,1,.3,1); }
.btn-primary:hover .btn-arrow { transform: translateX(4px); }
```

### Link Underline Reveal
Nav links and text links reveal an underline on hover:
```css
a::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0; right: 0;
  height: 1px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(.16,1,.3,1);
}
a:hover::after { transform: scaleX(1); }
```

### The Gold Dot Wordmark Pulse
```css
@keyframes dot-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(200,147,74,0); }
  50% { opacity: 0.9; box-shadow: 0 0 0 4px rgba(200,147,74,0.15); }
}
animation: dot-pulse 3s ease-in-out infinite;
```

---

## 4. Section Patterns

### Hero
Layout: 2-column grid (1fr 420px), centered, max-width 1200px
Left: eyebrow → headline (3 lines) → body → CTAs → proof stats
Right: Dashboard card (3D tilt) + floating accent card (positioned bottom-left of card, offset by -32px)

The hero dashboard card is NOT decorative — it shows real-looking client data metrics. This is the "show don't tell" proof.

### Marquee Strip
Border top + bottom. Gold dots as separators. Pauses on hover.
10–11px uppercase Inter, var(--text-tertiary).

### Services Section
Grid of 4 cards with 1px gap dividers (background: var(--border), gap: 1px, card bg: var(--surface-base)).
Each card: number (10px mono) → icon (32px branded) → name (15px 600) → description (12px 1.7 line-height)
Card hover: background shifts to var(--surface-elevated), gold gradient overlay (opacity 0 → 1)

### Proof / Results Section
2-column: left (headline + body) + right (2×2 stat grid)
Section background: var(--surface-elevated) with border top/bottom — creates a full-width band

### Case Study / Work
Not a standard card grid. Each case study is a full-width panel with:
- Client context (industry, challenge, 1 sentence)
- Key outcomes (3 specific numbers)
- Coverage highlights or video still
- "Read more" link

### Footer
Simple. Logo · legal line. No social links cluttering it unless explicitly requested.

---

## 5. The Hero Dashboard Card — Critical Specification

This is the most important component on the marketing site. It must look like real product UI.

```
┌─────────────────────────────────────────┐
│ [Client Name] · Live          • Tracking │  ← header, 48px
├──────────────┬──────────────────────────┤
│ Coverage/Mo  │ AI citations              │  ← 2x2 stat grid
│   [GOLD]     │   [white]                 │
│ ↑ delta      │ ↑ delta [violet]          │
├──────────────┼──────────────────────────┤
│ Pitch rate   │ Pipeline attr.            │
│   [white]    │   [GOLD]                  │
│ benchmark    │ Q period                  │
├─────────────────────────────────────────┤
│ [T1] The Wall Street Journal   Apr 14   │  ← coverage list
│ [T1] [Publication]             Apr 11   │
│ [T2] [Publication]             Apr 9    │
└─────────────────────────────────────────┘
```

```
┌────────────────────┐  ← floating accent card (abs positioned, bottom-left of dashboard)
│ AI presence rank   │
│ [GOLD] #3          │
│ in [category]      │
└────────────────────┘
```

The card uses:
- `background: var(--surface-elevated)`
- `border: 1px solid var(--border)`
- The live indicator: violet dot with pulse, "Tracking" label
- Tier badges: T1 = gold bg dim + gold text, T2 = violet dim

---

## 6. Voice — Marketing Copy

**Tone:** Confident without arrogance. Specific without showing off. Direct without being blunt.

**The headline formula:** Make a statement the reader will either agree with viscerally or need to test. Avoid questions in headlines.

**DO:** "Built for brands that refuse to be invisible."
**DO:** "Coverage that compounds. Reputation that sticks."
**DON'T:** "Are you getting the PR results you deserve?"
**DON'T:** "We help brands achieve visibility through AI-powered strategies."

**Body copy rules:**
- 2–3 sentences maximum per paragraph
- Every sentence earns its place — cut anything that doesn't add specificity or proof
- Numbers over adjectives always ("38% pitch placement rate" beats "high placement rate")
- Active voice exclusively

**CTA copy:**
Not "Learn more" or "Get started."
"Get a coverage audit" — specific action.
"Challenge your current agency" — provocative.
"See our approach" — intriguing.

---

## 7. What the Marketing Site Never Does

- Never mentions tool names (SAGE, CiteMind, Claude, n8n, etc.)
- Never claims to be "AI-powered" without specific proof
- Never uses stock photography
- Never has a hero with a person holding a laptop
- Never has a testimonial section with star ratings
- Never uses a generic pricing table as the only differentiator
- Never auto-plays video or audio
- Never has a cookie banner in the hero view (defer, handle with minimal UI)
