# Signal Code — Palette v1

**Status:** Approved
**Date:** 2026-10-16
**Visual proof:** https://claude.ai/artifact/GY3DHbRmEpfSVrHBvUa6Wv
**Direction brief:** https://claude.ai/artifact/B9CRsdSUKtTLBdAXQtrutx
**Repo brief:** [docs/brand/strategy-v1.md](strategy-v1.md)

The palette is called **Signal Code**: seven neutrals + two signals. Vermillion is the voltage; citron is the current under it.

## Tokens

| Token          | Hex       | Role |
| -------------- | --------- | ---- |
| `canvas`       | `#F6F3EE` | Page ground (warm paper, not white) |
| `paper`        | `#FDFBF6` | Raised surface over canvas |
| `rule`         | `#E2DED5` | Hairline rules |
| `muted`        | `#8A857A` | Metadata, captions |
| `body`         | `#403C35` | Running text |
| `forest`       | `#1F2A1F` | Chart ink / tertiary surface |
| `ink`          | `#0A0A08` | Primary type, ink grounds |
| `signal`       | `#FF4F1A` | Vermillion — primary signature |
| `signal-dim`   | `#C83A10` | Vermillion as text on paper |
| `spark`        | `#E8FF3A` | Citron — secondary energy |
| `spark-ink`    | `#303600` | Citron as text on signal only |

**No dark mode at launch.** Single-mode, light-first. The alternation between paper and ink surfaces inside the page is where rhythm lives.

## Rules of use

1. **80 · 15 · 5** — eighty percent neutral surface, fifteen percent vermillion, five percent citron. Hold the ratio.
2. **One signal per screen** — if the hero already has a vermillion italic word, the CTA that follows is ink. Two signals in one viewport cancel each other.
3. **Citron lives on ink** — on paper it reads radioactive. On ink it reads precise. Use it where vermillion is already saturated, or on dark grounds only.
4. **Alternate the ground** — every third section flips to ink. Rhythm is a design element.
5. **No gradients, no blurs.** One exception: a 6-pixel vermillion-to-citron strip at the top of ink sections (magazine-spine motif). Beyond that, color is flat and committed.
6. **No decorative icons.** Lucide stays out. Section marks are typographic — pins, bars, numerals, index letters. Functional UI icons only (close, menu, external).

## Typography (free fallback stack, Google Fonts)

| Role       | Family             | Weights          | Role in system |
| ---------- | ------------------ | ---------------- | -------------- |
| Display    | Instrument Serif   | 400 / 400 italic | Hero, section titles, pull quotes, display numerals |
| Body       | Inter              | 400 / 500 / 600  | Running text, UI |
| Metadata   | JetBrains Mono     | 400 / 500 / 700  | Eyebrows, chart labels, bylines, pins |

Upgrade path (post budget): PP Editorial New / PP Neue Montreal / PP Fraktion Mono (Pangram Pangram license).

## Chart language

The Visibility Index is the signature chart. Four series:

| Series             | Stroke | Width | Treatment |
| ------------------ | ------ | ----- | --------- |
| Press mentions     | `signal` vermillion | 2.8px | Hero series. Endpoint ring. Inline annotation on the first inflection. |
| Google rank share  | `forest` | 1.8px | Supporting dark series. Secondary annotation at the follow-point. |
| Perplexity cites   | `spark` on `spark-ink` double stroke | 1.2px + 2.4px | Spark layered over ink for CVD/contrast. |
| ChatGPT cites      | `muted` | 1.6px | Supporting mid-grey series. |

- Hairline grid in `rule` at 10% intervals; dashed except baseline.
- X and Y labels in JetBrains Mono 11px, `muted`.
- No dual-axis. No rainbow categorical palette. One axis.
- Annotations are inline (vermillion rect on paper, citron rect on dark). No tooltips in v1.

## Motion

- Reveal-on-scroll from a visible resting state (never `opacity: 0` left waiting).
- No parallax, no tilt, no Lottie, no cursor trails.
- Marquee is CSS-only, 42s linear infinite, paused by `prefers-reduced-motion: reduce`.
- Chart renders at rest; endpoints and annotations are static.

## Layout convictions

- 12-column grid, 1340px max wrapper.
- Side gutter: `max(28px, env(safe-area-inset-left, 0px))` desktop; 20px minimum phone.
- Section breaks are typographic hairlines (`rule`), not boxes.
- No `rounded-lg` cards floating in whitespace. Case tiles have real edges, not shadows.
- One moment of risk per page.
