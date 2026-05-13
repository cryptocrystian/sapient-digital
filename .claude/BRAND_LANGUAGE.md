# SAPIENT DIGITAL — BRAND LANGUAGE
**Status:** CANONICAL · **Authority:** All products, all sessions, all Claude Code instances
**Last Updated:** 2026-05-07

---

## What This Document Is

Brand Language is the shared DNA across every Sapient Digital product surface. It defines what is constant — what never changes regardless of which product you're building — and what intentionally diverges between products.

Every Claude Code session working on any Sapient Digital surface reads this document first.

---

## 1. The Portfolio

Three products. Three distinct buyers. Zero cannibalization.

```
Saipien Labs (parent)
  ├── Pravado          → SaaS for brands managing their own visibility
  ├── Sapient Digital  → AI-native agency delivering managed outcomes
  └── [PLATFORM]       → White-label agency OS (Phase 2, name TBD)
```

**Sapient Digital** is simultaneously:
- A real agency serving real clients
- The living proof-of-concept that the delivery model works
- The most visible [PLATFORM] reference customer

These three products never share branding, never share visible tooling names, and never appear in each other's customer-facing surfaces.

---

## 2. Color Constants — Non-Negotiable Across All Surfaces

### The Brand Gold
```
--gold:        #C8934A   ← The single most identifiable Sapient color
--gold-dim:    rgba(200, 147, 74, 0.10)
--gold-border: rgba(200, 147, 74, 0.20)
```

Gold is the authority color. It appears in:
- The wordmark (the dot between SAPIENT and DIGITAL)
- Key brand moments (Tier 1 placement achieved, milestone states, CTA buttons)
- Never as a background fill
- Never decoratively — every gold appearance means something

### The Dark Surface Family
```
--surface-base:     #0E0D12   ← Base for all dark surfaces (slightly warm black, NOT navy)
--surface-elevated: #19181F   ← Cards, panels, elevated elements
--surface-overlay:  #201E27   ← Modals, tooltips, overlays
```

All Sapient products sit on dark surfaces. This is a brand constant.

### The Text Family
```
--text-primary:   #F0EDE8   ← Warm white (primary text)
--text-secondary: rgba(240, 237, 232, 0.52)   ← Secondary/body text
--text-tertiary:  rgba(240, 237, 232, 0.24)   ← Labels, metadata
```

Warm white, not pure white. The warmth works with the gold.

### The Border Family
```
--border:        rgba(255, 255, 255, 0.06)
--border-subtle: rgba(255, 255, 255, 0.04)
```

---

## 3. Typography Constants

### Inter — Universal
Inter is the typeface for ALL UI elements, ALL body copy, and ALL data across every Sapient product surface. It never changes. It never gets replaced for functional text.

```
Font stack: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Weights used: 400 (body), 500 (medium), 600 (semibold), 700 (bold)
Smoothing: -webkit-font-smoothing: antialiased always
```

### Instrument Serif — Marketing Only
Instrument Serif appears ONLY on the sapientdigital.io marketing site, and ONLY for display headlines. It never appears in Agency OS, the client portal, or any product UI.

```
Usage: Display headlines, hero text, section titles on marketing site
Style: Both regular and italic (the italic in gold creates key brand moments)
Sizes: 52px minimum. Never used below 48px. Hero: 76-96px.
```

---

## 4. The Voice

Sapient Digital speaks with confidence, not volume. The voice is:

- **Direct** — says what it means, no hedging
- **Specific** — uses real numbers, real outcomes, real client proof
- **Authoritative** — earns respect through precision, not assertion
- **Restrained** — never oversells, never uses superlatives without proof

**Words we avoid:** revolutionary, game-changing, cutting-edge, seamless, leverage (as a verb), synergy, holistic, robust, solution (unless unavoidable)

**Tone in client-facing surfaces:** Professional warmth. "Your team secured 3 Tier 1 placements this month" — not "3 Tier 1 placements were secured." The team gets the credit.

---

## 5. The Outcomes-First Principle

**Mechanism is invisible. Outcomes are front and center.**

This principle governs every client-facing surface across all products:

- Clients see what was accomplished. Never how it was accomplished.
- No tool names in client-facing surfaces. Not SAGE, not CiteMind, not Claude, not n8n, not Higgsfield, not HeyGen.
- Automation is described as team action. "Your team submitted 4 pitches" — not "4 pitches were auto-generated."
- Intelligence is presented as expertise. "Your coverage velocity is 2.3x your category average" — not "our AI detected..."

This is not deception — it is correct attribution. The agency's judgment, curation, and strategy is what makes the automation valuable. The tools are infrastructure, not the service.

---

## 6. What Diverges Between Products

| Element | Marketing Site (sapientdigital.io) | Agency OS |
|---|---|---|
| Display font | Instrument Serif (headlines) | None — Inter only |
| Signal accent | Violet `#8B7FE8` | Cyan `#14D9C4` |
| Motion | Particle network, 3D tilt, dramatic entrances | Subtle state transitions, breathing animations, data ticks |
| Information density | Editorial, spacious | Functional, high-density |
| Gold usage | Generous — headlines, CTAs, key moments | Sparse — milestones only |
| Personality | Bold, confident, slightly provocative | Precise, reliable, alive |

---

## 7. What Never Changes

Regardless of which product surface is being built:

1. Gold is always `#C8934A` — never substituted
2. Base surface is always in the `#0E0D12` family — never light mode
3. Inter is always the UI and body typeface
4. Tool names never appear in client-facing copy
5. The team always gets credit for outcomes
6. Craft quality is non-negotiable — every spacing decision is intentional

---

## 8. Revision Control

Changes to this document require review against:
- `agency-os/.claude/DESIGN_SYSTEM.md`
- `marketing/DESIGN_SYSTEM.md` (when created)
- The Agency OS design skill

Any change to a color constant or typographic constant here propagates to all dependent documents.
