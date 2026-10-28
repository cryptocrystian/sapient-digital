# Sapient Digital — Wind Tunnel Implementation Audit & Controlled Revision Brief
Date: 2026-10-28
Source: current repository default branch `main` (not prior experimental root-level Next.js prototype)
Status: AUDIT, NO PRODUCTION CODE CHANGE

## Confirmed architecture
- Live-design source exists in `website/src/components/resultant/ResultantHero.tsx`, imported from `ResultantHome.tsx`.
- A full-screen WebGL canvas draws two triangles using a **fragment shader** `HERO_FRAG`, procedural FBM noise, mathematically defined bands, a convergence coordinate, rail lines, ring/glow and beam. It is **2D shader-based visualization**, not a true mesh/camera/lighting 3D wind tunnel.
- The component has no Blender/glTF model, no articulated 3D objects or camera, and no authored three-state animation timeline. The visual is driven by `u_time`; the convergence geometry is fixed in screen coordinates. Thus we cannot obtain the desired spatial reveal by changing bloom/color alone.
- `website/src/styles/resultant.css` wraps the hero in a two-column editorial layout, large headline, right-hand annotation panel `.rs-ann`, three-column `.rs-footstrip`, and top/bottom gradient scrim. The screenshot's lower-rail contrast problem is consistent with the code's bright cream fade at the base of the hero.
- WebGL safeguards: caps DPR at 1.5; pauses/resumes offscreen via IntersectionObserver; respects initial reduced-motion preference by rendering static frame; ResizeObserver tracks canvas dimensions. Needs real-device validation and context-loss/fallback review.
- Website uses Next.js 14 and React 18 under `website/`, Three.js is available as a dependency but **not used in this hero's shader implementation**.
- Earlier separate `app/resultant-preview/visual-lab` experiment is unrelated to live `website/` hero. Do not merge the old draft PR for this redesign.

## What is already working (preserve)
- Agency-first message: 'Impossible to ignore.' and 'Connected marketing. Amplified impact.'
- Dark editorial art direction, disciplined typographic hierarchy, sensible CTA destinations.
- Recognizable input / throat / output narrative, distinct PR/Content/Search practice labeling.
- Site architecture and surrounding narrative chapters.
- Run existing site as baseline: **revise only the wind-tunnel rendering and limited adjacent hero composition**.

## Core deficiencies and causes
1. Apparent geometry is composed of bright shader fields and screen-space outlines. It cannot resolve as convincing 3D physical structure because no meshes, depth geometry, or 3D lighting exist.
2. Three band shapes vary primarily by vertical position, turbulence seed and tint, not truly differentiated behavior: no visible decision-mediated calibration.
3. 'Transformation' is static in geometry: time changes procedural noise; fragmentation does not progress through intervention into resultant.
4. Strong additive brightness at the ring and convergence region produces a washed-out aperture. This is a visual and parameter issue; solve after geometry.
5. Annotation panel occupies a substantial part of the visual and repeats pillar labels that the service rail already identifies.
6. CSS scrim includes an explicit fade toward cream near bottom while the foot strip uses light text, risking unreadable contrast (visible in supplied screenshot).
7. Reduced-motion is sampled only on mount; canvas has no visible designed fallback if WebGL initialization fails. Validate mobile frame rate and context loss.

## Locked design objective and non-goals
**Objective:** a premium, convincing spatial object and meaningful transformation *within* the approved wind-tunnel metaphor. Three active but disconnected systems progressively reorient under intelligence, then create a coherent, faster resulting trajectory. The end frame must have a distinctive, excellent silhouette when paused.

**Not goals:** another site redesign, decorative particle swarms, more bloom, techno-sci-fi, rocket/engine hardware, infinite iteration, fake telemetry or algorithmic promises.

## Proposed bounded work package
### Gate 1 — Source/scene reference: complete (this audit)
Document factual technical baseline; capture desktop/mobile visual performance when browser authorization works.
### Gate 2 — Geometry signoff: one coherent concept
Create exactly one designed 3D apparatus/environment with three discernible contributor structures. Produce 3 camera-identical high-fidelity frames: disorder, calibration, resultant. Materials: restrained carbon/ceramic/anodized alloys, controlled soft illumination, sparse signal-orange. User approves silhouette and narrative before motion.
### Gate 3 — Choreography signoff: one short authored animatic
Show before/during/after causal transformation with a stronger velocity payoff. No particle-based substitute for geometric change.
### Gate 4 — Integrate in isolated website branch
Replace canvas internals with R3F/Three or 3D mesh + shader where justified; retain Next.js layout, copy, CTAs, service structure. Reduce annotation area; correct strip contrast; keep accessible 2D/still fallback and baseline performance.
### Gate 5 — Review/launch
Desktop + mobile visual, FPS/performance, accessibility, browser handling, build test. Merge only after named approval.

## Anti-drift controls
- Maximum **one structural concept** for the first production candidate; if it fails Gate 2, document why before pursuing another.
- Max **two revision rounds per gate** before an explicit decision on whether the concept is viable. Do not automatically generate a new metaphor.
- No changes to name, positioning, page hierarchy or 3 practices under this task.
- A revision must reference a specific failure of an acceptance test, not 'make it more futuristic'.
- Before/after comparison screenshots and playback are mandatory to claim improvement.
- Keep a single source of truth in this file and a bounded PR based on current `main`.
- No claim that the Blender scene was inspected: direct Blender MCP calls failed internally during this audit.

## Next action
Confirm Blender connector runtime reliability and inspect current Blender scene non-destructively. Then produce the first controlled geometry proposal (one scene, three states), not another full-site image generation.
