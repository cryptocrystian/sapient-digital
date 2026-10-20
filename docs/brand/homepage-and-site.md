# Sapient Digital — Homepage & Site Architecture

**Version:** 1.1 · 2026-10-20
**Supersedes:** everything Prism-era, and the v1.0 of this document.
**Sits above:** section implementations in `/components/vectorlock/` and route pages in `/app/*`.
**Must honor:** `Brand & Messaging Architecture 3.0 — Vector Lock`, `GTM & Commercial Operating Model 1.0`, AND `Website & Brand Experience Blueprint v1.1`.

**v1.1 changes:**
- Daylight palette set to spec `#F4F4F6` (reverted from `#F5F2EC`).
- Hero subhead: `Connected marketing. Amplified impact.` (replaces banned `Zero-drag marketing…`).
- Primary hero CTA: `Let's talk` (replaces `Begin a Vector Audit`); audit CTA retained for section 08 Close.
- Nav: `Services | Vector Lock | Insights | About | Let's Talk`. `Work` suppressed until verified cases exist.
- Chapter marker reads `01 of 08` (one chapter per homepage section).
- `/mission-control` collapsed into `/vector-lock` as a dark subsection — not its own route.
- Hero schematic treated as a visual "study"; the forensic/interactive detail belongs in homepage Section 04 (Vector Lock interactive explainer).

This document is the canonical source for the full homepage flow, every inner page's purpose and copy, and the shared voice/component conventions. Nothing on the site is written or built without first checking it against this doc.

---

## 0 · Guardrails that apply to everything

**Voice.** Confident, direct, articulate, warm, precise. Short sentences by default. Technical vocabulary (vector, trajectory, telemetry, course correction, momentum) used only when it earns its place — never decoratively. Lead with buyer problems and outcomes, explain the mechanism second. Never physics-adjacent words used as metaphor filler.

**Burn list.** Never use: *engine, fuel, ignition, combustion, accelerator, rocket ship, exponential, 10x, compounding (as a verb-adjective-noun combo), total market dominance, best-in-class, disrupt, synergy, next-generation, end-to-end, holistic, 360°, cutting-edge, world-class, bespoke*. Dash-caps eyebrows (`— SOMETHING IN CAPS —`) are banned.

**Claims policy.** No invented client logos, no fabricated KPIs, no "live" telemetry claimed as real, no guaranteed placements/rankings/revenue, no "AI will cite you" promises. Benchmarks are "collecting" until we have the data. If a number appears on-page it is either methodology-qualified or clearly symbolic.

**Named-brand rule.** Never publicly name Pravado, SAGE, CiteMind, or AgencyOS on the site. The intelligence layer is described at capability level. Mission Control is a PROCESS name, not a software name.

**Three disciplines, not four pillars.** Retainer = Digital PR + Strategic Content + SEO/AEO/GEO. Video Production is optional, separately scoped, and visually shown as "Optional · 04."

---

## 1 · Full homepage sequence

Eight sections, read in order. Daylight is the default surface; carbon flips are intentional and carry weight.

```
01  HERO                       daylight    (Vector Lock)
02  WORLDVIEW                  daylight    (Authority economy)
03  SILO FRICTION              daylight    (The drag problem)
04  MISSION CONTROL            CARBON      (The operating layer)
05  VECTOR LOCK · METHOD       daylight    (How the lock works)
06  THE DISCIPLINES            daylight    (Three + optional)
07  EVIDENCE                   daylight    (Verified proof)
08  CONVERSION                 CARBON      (Begin a Vector Audit)
```

Two carbon sections — Mission Control (section 4) and Conversion (section 8) — book-end the daylight middle, creating a rhythm the eye can feel without noticing.

### 01 · HERO · Vector Lock

**Purpose.** Say what we promise, show the method as a diagram, let the visitor know within 5 seconds that this is a different kind of agency.

**Treatment.** Daylight. Left column: copy. Right column (wider): Vector Lock schematic with multi-color momentum beam, kinetic particles, convergence drama. Animated on load (~4s), breathes on loop. Full nav strip above. Discipline footstrip below.

**Copy (shipped — v1.1):**
- Nav: SAPIENT ↗ DIGITAL · Services · Vector Lock · Insights · About · [Let's talk]
- Eyebrow: `Platform · Vector Lock // Live Signal · T−00:04`
- Headline: **Impossible to ignore.**
- Supporting: *Connected marketing. Amplified impact.*
- Lead: *Vector Lock converges Digital PR, Strategic Content, and search visibility into a single locked trajectory — the only signal that keeps gaining when the market shifts.*
- CTAs: Let's talk (primary → `#contact`) · Explore Vector Lock (secondary → `#method`)
- Status strip: Version 3.0 · Canonical / Coherence ƒ(signal) · 0.986 / Phase: Lock Established
- Discipline footstrip: Vector 01 Digital PR / Vector 02 Strategic Content / Vector 03 SEO · AEO · GEO / Optional 04 Video Production

**Hero schematic treatment:** per Blueprint v1.1, the hero vector illustration is a *"visually stunning but intellectually clean trajectory study."* The dense technical annotations currently on it should migrate to Section 04 (Vector Lock interactive explainer), where course-correction interaction lives. The hero stays poetic and iconic; Section 04 carries the forensic detail.

### 02 · WORLDVIEW · The authority economy

**Purpose.** State the thesis the whole brand hangs on, in plain words. Give the visitor the mental model we're about to spend the rest of the page proving.

**Treatment.** Daylight. Full-width editorial. Large display headline. Two-column lead paragraph. One supporting visual: a small side-by-side chart — "Attention: unlimited, decreasing in value" vs "Authority: finite, increasing in value." Monospace axis labels. Signal orange on the authority curve.

**Copy:**
- Eyebrow: `01 · Worldview`
- Headline: **Attention is everywhere. Authority is not.**
- Lead: *Every category now has more content, more posts, and more AI-generated noise than any buyer could ever read. What is scarce is not reach. What is scarce is the credibility that lets a specific brand be recognized, cited, and trusted when a decision has to be made.*
- Body (two paragraphs):
  > *Attention compounds down. The more sources, the less any one of them is heard. Authority compounds up — the more a brand is independently recognized, the more every subsequent placement, article, and citation carries. That asymmetry is the whole game.*
  >
  > *Sapient Digital is built for the compounding side of the curve.*
- Three convictions block (three columns, each a short statement + 2-line expansion):
  - **Authority is earned, not manufactured.** Volume alone will not build it. Independent recognition will.
  - **PR, content, and discoverability belong on one trajectory.** Pursued separately, they contradict. Pursued together, they reinforce.
  - **The market moves. Direction holds.** We adjust tactics with evidence; we do not drift from strategy.

**Visual.** Small inline chart (SVG). Two curves on a shared axis: *Attention* in a soft gray, trending shallow-up but with diminishing returns; *Authority* in signal orange, trending compounding-up. One monospace callout: `authority · ƒ(credibility)^t`. Not interactive. 440×280 right-aligned.

### 03 · SILO FRICTION · The drag problem

**Purpose.** Frame the specific operational pain of running four separate vendors. Make the problem visceral before the solution lands.

**Treatment.** Daylight. Text column + diagnostic schematic. The schematic is the inverse of the hero — four vectors scattered, out of phase, no lock, no convergence, drag indicators on each. Then a second small schematic ("after") showing the clean lock. Side-by-side comparison, same visual language as the hero.

**Copy:**
- Eyebrow: `02 · The silo problem`
- Headline: **Four vendors. Four briefs. Four sets of drag.**
- Lead: *When PR, content, and search are run by different firms on different calendars, the work doesn't just stay separate — it fights itself. Press hits land outside content moments. Content is published without the search surfaces primed. Search is optimized for yesterday's narrative. Every pillar burns calories undoing the others.*
- Body:
  > *The cost is not visible on any one invoice. It shows up as a flat visibility curve, press coverage that doesn't move pipeline, and quarterly reviews where no one can explain why the number stayed where it was.*
  >
  > *We've seen this pattern enough times to name it. Drag is not a vendor problem; it's a topology problem. Fix the topology and the vendors stop fighting each other.*
- Diagnostic callout row (three mono labels):
  - `BRIEF DRIFT · ±18°`
  - `TIMING OVERLAP · 42% waste`
  - `MEASUREMENT GAP · unknown`
  *(These are symbolic diagnostic language, not fabricated client stats — label them accordingly: "Symptoms we see on first-call diagnostics.")*

**Visual.** Twin small schematics side by side in the right column, labeled `BEFORE` and `AFTER`. Before: four misaligned vectors pointing in different directions, no convergence, drag arrows marked. After: three vectors locking into one unified trajectory — the hero schematic in miniature. Same Swiss-technical register as the hero.

### 04 · MISSION CONTROL · The operating layer

**Purpose.** Prove the method exists operationally. This is where we convert the Vector Lock promise from a slogan into a visible system. Carbon flip gives the first drama break.

**Treatment.** CARBON. Full-width. Narrative header (left-leaning) → full HUD (6 panels) → three proof points → section CTA → status footer. Already built.

**Copy (shipped):**
- Eyebrow: `Sapient · Mission Control // The operating layer`
- Headline: **We watch the pillars. You run the business.**
- Lead: *Mission Control is the operating HUD our team watches every day. It tracks pillar sync, flags drift, and tells us when a course correction is due — before the market tells you.*
- HUD panels 01–06 (as built)
- Proof points:
  - **01 Live pillar sync** — *Three disciplines tracked against one trajectory. If any pillar drifts out of phase, we see it in the HUD before the client does — and before it compounds into lost quarters.*
  - **02 Corrections on a 30-day rhythm** — *No annual-replan surprises. Material adjustments go through partner-led approval monthly, with a documented reason recorded against the engagement.*
  - **03 Partner-led governance** — *Nothing reputation-sensitive leaves the queue without a named partner's sign-off. The HUD shows the queue; a human calls the shot.*
- CTA: Begin a Vector Audit
- Status strip: SYS_STATUS · NOMINAL / UPLINK · ACTIVE / TELEMETRY · ∞ / REV 3.0 · CANONICAL

**Known debt — Mission Control needs a reframe pass.** As currently built, the HUD reads too much like a live SaaS dashboard: pulsing live-signal eyebrow, ticking countdown timer, `SYS_STATUS NOMINAL` / `UPLINK ACTIVE` footer, `Request a tour` CTA (now removed). Sapient is not a product. The visualization should present as a method diagram — "this is how we see your account on our side" — not as an operator-ops tool we're inviting demos of. Future revision should: strip the live-signal framing, retire the countdown and operational chrome, reframe the section as "The method, visualized" (or similar), and treat the HUD as an infographic of our process rather than a product UI. The UI component library stays — it will be reused for AgencyOS internal tooling. The marketing framing is what needs to change.

### 05 · VECTOR LOCK · METHOD

**Purpose.** Step down from the operational HUD into the four-phase method. Show how any engagement actually runs: Define → Sense → Lock → Measure. The daylight comeback after the carbon drama.

**Treatment.** Daylight. Full-width. A horizontal four-phase schematic across the top (large). Below it, four columns, one per phase, each with a headline + 3–4 bullet points describing what happens inside that phase.

**Copy:**
- Eyebrow: `03 · Method`
- Headline: **Four phases. One trajectory.**
- Lead: *Every engagement runs the same loop. Define the destination, sense the market, lock the vectors, measure the drift, correct the course. It takes thirty days to run once, and we run it every month.*
- Four columns:
  - **01 Define**
    - Strategic mandate: brands, markets, objectives
    - 90-day roadmap and approval rules
    - Baseline capture and measurement spec
    - Who holds the authority to say yes
  - **02 Sense**
    - Market, press, content, and AI-visibility intelligence
    - Opportunity detection against the mandate
    - Risk and friction surfaced early
    - Priorities proposed, not executed
  - **03 Lock**
    - Partner-led prioritization against capacity
    - Three-vector execution in step
    - Approval gates where reputation sits
    - A verified deliverable log for every move
  - **04 Measure**
    - Transparent visibility and authority trends
    - Documented reason behind every reallocation
    - Monthly scorecard in plain English
    - Correction window opens on a 30-day cycle

**Visual.** A horizontal timeline-schematic above the four columns: four phase markers on a trajectory arc (daylight · structural lines), each tagged with its monospace label. Signal orange on the active-phase indicator, which the user can hover to highlight that column.

### 06 · THE DISCIPLINES

**Purpose.** Make clear what the three retainer disciplines are and what Video adds on. Explicit, concrete, no mystery.

**Treatment.** Daylight. 3+1 card grid. Three equal-weight discipline cards (PR / Content / Search) and one offset "Optional" card (Video). Each card: discipline name, 1-line role, 3-bullet "what we do," 3-bullet "what you get," and a link to the discipline page.

**Copy:**
- Eyebrow: `04 · Disciplines`
- Headline: **Three in retainer. Video on invitation.**
- Lead: *Every engagement locks three disciplines on one trajectory. Video is added when it earns its place — not because the retainer calls for it.*

- **Discipline 01 · Digital PR**
  - Role: *Earn credible recognition for the brands we represent.*
  - What we do: strategic story development · journalist relevance · thought-leadership placement · targeted outreach
  - What you get: independent authority · trusted citations · a verified placements log
  - Link: Read the discipline brief →

- **Discipline 02 · Strategic Content**
  - Role: *Turn expertise into narratives the market wants to read.*
  - What we do: narrative architecture · original analysis · buyer-education assets · discoverability-grade long-form
  - What you get: owned authority · compounding search surface · content that serves PR and SEO at once
  - Link: Read the discipline brief →

- **Discipline 03 · SEO · AEO · GEO**
  - Role: *Be discoverable on every surface the buyer touches — classic search and AI-assisted answer alike.*
  - What we do: entity-grade structure · citation preparation · schema and sitemap hygiene · AI-answer monitoring
  - What you get: visible in Google, visible in Perplexity, visible in ChatGPT, visible in trade search
  - Link: Read the discipline brief →

- **Optional 04 · Video Production**
  - Role: *Amplify the story when a visual format carries it better than text.*
  - What we do: original multimedia storytelling · brand film · content amplification cuts
  - Scope: separate from the retainer. Project or recurring, specified by SOW.
  - Link: Discuss a video program →

### 07 · EVIDENCE

**Purpose.** Show the work and the honest proof we have, with the methodology framing the brand doc requires. No fake logos; no invented KPIs.

**Treatment.** Daylight. Three horizontal strips:
1. **Case strip** — anonymized shapes until an engagement permits attribution. Each case: industry, duration, three-pillar role, outcome described in evidence-grade language.
2. **Visibility composite** — small line chart with methodology-qualified callouts (Visibility 40% / Authority 35% / Momentum 25% per brand doc). Caption: "Composite methodology · v1.0 · versioned, verified."
3. **What we don't claim** — a short honest paragraph naming the limits.

**Copy:**
- Eyebrow: `05 · Evidence`
- Headline: **The composite is published. The claims are checked.**
- Lead: *We measure what we can verify. The rest we call "collecting." Nothing on this page is unanchored.*
- Case strip (three cards, anonymized unless permission granted):
  - *Enterprise SaaS · 7 months · PR + Content + Search · Share-of-model movement traced to three sustained placements.*
  - *AI infrastructure · 11 months · PR + Content + Search · Earned coverage sequence sourced from one Vector Lock cycle.*
  - *Cybersecurity · 4 months (ongoing) · PR + Content + Search · Visibility baseline established; first measurement window opens Q+1.*
- Visibility composite caption:
  - Chart title: `Earned Visibility Composite · v1.0`
  - Weights: `V · 40% / A · 35% / M · 25%`
  - Note: *Methodology published. Benchmarks are directional. Causal claims are distinguished from associations in every monthly scorecard.*
- "What we don't claim" paragraph:
  > *We do not guarantee press placements, Google ranks, or AI citations. We do not stage client testimonials. We do not display fabricated dashboards. When data is unavailable, we label it "collecting," not "zero."*

### 08 · CONVERSION · Begin a Vector Audit

**Purpose.** Convert. Match the Mission Control carbon drama. End the page where the hero began — one named action.

**Treatment.** CARBON. Full-width. Center-aligned (or left-aligned max-width). Short, no fluff. The audit is the only thing we're selling here.

**Copy:**
- Eyebrow: `06 · Audit`
- Headline: **Begin a Vector Audit.**
- Lead: *Thirty minutes with a partner. We pull your current pillar state against the Vector Lock method, name three fixable gaps, and send the audit in writing. No deck. No SDR.*
- Three mini-bullets:
  - *Who you talk to:* a named Sapient partner
  - *What you leave with:* a written audit of three gaps and the recommended first-month moves
  - *What it costs:* nothing, if we decide we're not a fit
- CTAs: Begin a Vector Audit · Email the partners
- Fine print: *We take two to four new engagements per quarter. The audit is the only way to find out whether we're one of them.*
- Below: footer (nav + legal)

---

## 2 · Footer

Two tiers.

**Top tier** (operational meta — carbon):
- Signature: `SAPIENT · DIGITAL — AUTHORITY & VISIBILITY MARKETING`
- Status: `SYS_STATUS · NOMINAL  |  REV 3.0 · CANONICAL  |  © 2026`
- Three columns:
  - **Disciplines:** Digital PR / Strategic Content / SEO · AEO · GEO / Video Production
  - **The Firm:** Vector Lock / Mission Control / About / Insights / Careers
  - **Get in touch:** Begin a Vector Audit / hello@sapient.digital / press@sapient.digital / LinkedIn

**Bottom tier** (legal, paper):
- `©2026 Sapient Digital · All rights reserved · Privacy · Terms`

---

## 3 · Site map and inner pages

```
/                              Homepage (sections 01–08)
/vector-lock                   Approach — Vector Lock story + Mission Control subsection
/services                      Discipline hub (integrated-only engagement framing)
/services/digital-pr           Discipline brief
/services/strategic-content    Discipline brief
/services/seo-aeo-geo          Discipline brief
/services/video-production     Optional capability brief
/about                         The firm
/insights                      Editorial territories (worldview-led)
/insights/[slug]               Essay template
/contact                       Let's-talk form (surfaced via nav CTA and section 08)
/legal/privacy                 Privacy policy
/legal/terms                   Terms
```

**Note:** `/mission-control` has been retired as a route per Blueprint v1.1. Mission Control lives inside `/vector-lock` as a dark subsection ("The Means"), not as its own top-level navigation item.

### `/vector-lock`

**Purpose.** The Vector Lock method, taught end to end, for buyers who need the full argument before they book an audit. One scroll, no interactive gates.

**Hero.** Reuse the Vector Lock schematic hero at reduced height. Copy: `Vector Lock — the method in full`.

**Sections:**
1. The authority economy problem (reprise, longer)
2. Why alignment beats coordination (two agencies vs one agency with three disciplines)
3. The four phases: Define → Sense → Lock → Measure (expand each from one-sentence to one-paragraph)
4. Mission Control in context (one paragraph + link to tour)
5. The 30-day correction cycle (visualization: a looping timeline)
6. What we don't do (the explicit scope boundary from the brand doc)
7. Audit CTA

### `/mission-control`

**Purpose.** The destination for a visitor who wants to understand the method in more depth. Explains what Mission Control IS (process, not product), how we govern the three disciplines, and what accountability we commit to. Credential page for serious buyers — not a product demo page.

**Hero.** Carbon. Reuse the HUD compressed as a method visualization. Copy: `Mission Control — the method, visualized`.

**Sections:**
1. What Mission Control is (process, not product name — explicitly disclaim the SaaS interpretation)
2. The six observable disciplines of our method (reuse the panels as *infographic*, not as live app)
3. The 30-day correction cycle
4. Governance: approval gates, correction cadence, verified logs
5. What it is not (not a logged-in SaaS product; not sold as a seat license; not interactive on this page)
6. CTA: Begin a Vector Audit

### `/services` (hub)

**Purpose.** One-page map of the three disciplines + optional video, with clear role boundaries and links to each discipline brief.

**Hero.** Daylight. Copy: `Three in retainer. Video on invitation.`

**Content.** Repurpose homepage section 06 at full depth. Each discipline card expands into: role (one sentence), what we do (bullet list), what we don't do (bullet list — explicit boundary), what a monthly deliverable looks like, link to the full brief.

**Scope boundary section** (critical, per brand doc):
- *We do not run paid acquisition.*
- *We do not operate CRM, RevOps, or sales ops.*
- *We do not sell outsourced demand generation.*
- *We complement these functions. We do not replace them.*

### `/services/digital-pr`

**Hero.** Copy: `Digital PR — earn the recognition that compounds.`

**Sections:**
1. What this discipline does
2. How we work: journalist relevance → strategic stories → placement → amplification
3. What a quarter looks like (sample cadence, not fabricated outcomes)
4. The intersection with Content and Search (one paragraph each)
5. Boundary: *We do not pay for placements. We do not run press-release-only programs. We do not promise coverage.*
6. CTA: Begin a Vector Audit

### `/services/strategic-content`

**Hero.** Copy: `Strategic Content — expertise, rendered as narrative.`

**Sections:**
1. What this discipline does
2. Formats: executive essays, original analysis, buyer-education assets, long-form discoverability pieces
3. Editorial standards: evidence first, byline integrity, no AI-generated finished copy
4. The intersection with PR and Search
5. Boundary: *We do not operate content mills. We do not produce AI-generated finished copy. We do not publish anonymously.*
6. CTA: Begin a Vector Audit

### `/services/seo-aeo-geo`

**Hero.** Copy: `SEO · AEO · GEO — discoverable on every surface.`

**Sections:**
1. What this discipline does (and the acronym expansion)
2. What AEO and GEO are, in plain English: *AEO is "Answer Engine Optimization" — appearing in Perplexity, ChatGPT, and Gemini answers. GEO is "Generative Engine Optimization" — the broader surface of being present in AI-generated results across every model that matters.*
3. Entity work: schema, citations, authoritativeness signals
4. Measurement: visibility composite, share-of-model, placement-linked observations
5. Boundary: *We do not purchase links. We do not run technical SEO as a standalone product unless it serves the three-vector program.*
6. CTA: Begin a Vector Audit

### `/services/video-production`

**Hero.** Copy: `Video Production — the format that carries the moment.`

**Sections:**
1. What this capability does
2. How it attaches: separately scoped project OR recurring production program
3. Formats: brand film, executive narrative, short-form explainer, documentary conversations
4. Scope note: *This is a complementary capability. We do not sell it inside the Vector Lock retainer unless the SOW explicitly scopes it.*
5. CTA: Discuss a video program

### `/about`

**Hero.** Copy: `A specialist firm, by design.`

**Sections:**
1. The firm (what we are and are not — reinforces the three-discipline positioning)
2. The partners (short bios, 3–5 people, role names, no stock photos)
3. The commercial posture: *We take two to four new engagements per quarter. We work on quarterly commitment, month-to-month after Q1. Pricing is deliberate; the audit will share it with the right fits.*
4. What we're building (one paragraph on Mission Control as an operating layer, no software naming)
5. CTA: Begin a Vector Audit

### `/insights`

**Hero.** Copy: `Writing on authority, alignment, and the market we work in.`

**Treatment.** Editorial. List of essays by territory (from brand doc section 11):
- The authority economy
- The alignment problem
- Intelligence and momentum
- The measurement problem

Each essay is a single-column long-form piece in daylight, Archivo for headlines, Inter for body, pullquotes in signal orange rules, monospace captions.

### `/contact`

**Hero.** Copy: `Begin a Vector Audit.`

**Form:**
- Name
- Company
- Role
- Primary market (text)
- Where authority gaps are showing up (short text)
- Approximate timing
- *Submit · Begin the audit*

**Side column:** *Thirty minutes with a partner. We pull your current pillar state against the Vector Lock method, name three fixable gaps, and send the audit in writing.*

---

## 4 · Component inventory

Shared components that span the site (building these once pays everywhere):

- **Nav strip** (sticky, carbon-on-daylight / daylight-on-carbon aware)
- **Vector Lock Schematic** (hero + reusable at reduced sizes)
- **Mission Control HUD panels** (reusable individually: PillarSync / SignalBus / Correction / Margin / Approval / Phase)
- **Phase timeline** (four-node, horizontal — used on hero section 05 and `/vector-lock`)
- **Discipline card** (3+1 grid cell — used on homepage 06 and `/services`)
- **Case card** (anonymized shape or named — evidence section 07)
- **Visibility chart** (composite line chart with methodology callout — section 07 and `/vector-lock`)
- **Diagnostic callout row** (three mono labels — section 03)
- **Status strip** (version / coherence / phase — section 01)
- **Section CTA block** (headline + 2 CTAs — reused on multiple sections)
- **Footer** (two-tier: carbon operational meta + daylight legal)
- **Essay template** (long-form editorial — `/insights/[slug]`)
- **Short form** (contact / tour request — `/contact`, `/mission-control`)

Design tokens are already locked in `.vl-proof` scope in `app/globals.css` and need to graduate to the global default once the proof is approved.

---

## 5 · What ships next (recommended order)

1. **Lift tokens out of `.vl-proof` scope** into global defaults; retire the Signal Code palette and Space Grotesk type stack from the live site.
2. **Build sections 02 (Worldview) and 03 (Silo Friction)** — the daylight pair that leads into Mission Control. These need the "before" schematic as a new component.
3. **Build sections 05 (Method) and 06 (Disciplines)** — the daylight recovery after Mission Control, including the phase timeline and discipline cards.
4. **Build section 07 (Evidence)** — case strip and visibility composite chart. Verified data only; anonymized until permissions granted.
5. **Build section 08 (Conversion)** — carbon audit CTA.
6. **Build the full footer** — two-tier.
7. **Build inner pages** in this order: `/vector-lock` → `/services` and discipline briefs → `/mission-control` → `/about` → `/insights` scaffold → `/contact`.
8. **Delete** everything Prism-era: `PrismMark`, `PrismReveal`, `FracturedLight`, `Wavelengths`, `PrismOS`, old `Hero`, old `Masthead`, old inner pages' Prism copy. Keep the component skeletons we're reusing.
9. **Mobile pass** on every section — verify stack order, nav collapse, HUD panel reflow, schematic readability.
10. **Impeccable full-site audit** before go-live.

---

## 6 · Open decisions still to lock

- Final tone of the "What we don't claim" paragraph in section 07 — currently drafted candidly; may need lawyer pass.
- Case strip anonymization policy — do we show industry + duration only, or named clients with permission? Default is anonymized; named requires written approval.
- `/insights` publish cadence — monthly? bi-weekly? Needs editorial calendar.
- Pricing visibility — the brand doc says public pricing is optional until economics are validated. For launch: no pricing on the site; audit conversation reveals it to qualified fits.
- Who the named partners on `/about` are — needs real bios, roles, LinkedIn URLs. No stock photos. Head-and-shoulders only, consistent treatment.
- The `/mission-control` tour form — handled in-house or routed through a scheduling tool? If scheduling tool, which (no public Calendly branding — custom URL).

Lock these in a follow-up before any inner-page copy is finalized.
