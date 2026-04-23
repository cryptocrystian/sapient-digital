# CANON AMENDMENT — VIDEO PIPELINE
## CiteMind Engine 2 Expansion: Content Transformation Engine (Audio + Video)

> **Status:** CANONICAL AMENDMENT
> **Amends:** CITEMIND_SYSTEM.md
> **Authority:** Founder decision — April 2026
> **Decision ID:** D003
> **Classification:** Trade Secret + Patent Eligible — RESTRICTED
> **Implementation Timing:** POST-PRAVADO GA — DO NOT TOUCH CODEBASE UNTIL GA

---

> **Note on origin and ownership:** This document originated as `VIDEO_PIPELINE_AMENDMENT.md`
> in Pravado's canon, amending CITEMIND_SYSTEM.md (D003). It has been relocated to Sapient
> Digital's canon as the source of truth for the video pipeline capability, which is a
> Sapient-owned technical service.
>
> **Customer-facing productization:** When Pravado productizes a video add-on for customers,
> Pravado will maintain its own customer-facing `VIDEO_ADDON.md` describing the add-on product,
> branding, pricing, and billing. The video add-on is sold under the Pravado brand with
> Pravado billing; the underlying pipeline capability remains Sapient's technical responsibility.
>
> **Canonical pattern:** The shared-pipeline-different-brand pattern established here is the
> model for any future cross-venture capabilities — Sapient owns the capability, Pravado owns
> the customer experience, intercompany settlement handled outside canon.

---

## 0. Amendment Purpose

This amendment formally expands CiteMind Engine 2 from "Audio Transformation Engine"
to "Content Transformation Engine (Audio + Video)."

It adds a Video Production pathway to Engine 2 alongside the existing Audio/Podcast pathway,
governed by the same AUTOMATE rules and risk profile.

The amendment also defines the standalone Sapient Digital Video Pipeline — a production
system that operates independently of Pravado, proves the methodology, and serves as the
integration blueprint for the future Pravado Video Module add-on.

---

## 1. DECISIONS_LOG Entry

- **Date:** 2026-04-10
- **Decision ID:** D003
- **Area:** CITEMIND / Content Pillar / Plans
- **Decision:** Expand CiteMind Engine 2 to include Video Production pathway.
  Add Higgsfield as primary video generation infrastructure. Add Video Module
  as a Pravado plan add-on (not a tier). Build standalone pipeline in Sapient
  Digital first, then integrate into Pravado post-GA.
- **Rationale:**
  - Higgsfield's API consolidates Sora 2, Kling 3.0, Veo 3.1 under one integration point,
    eliminating the Frankenstein multi-API complexity that previously blocked this decision.
  - The Content Pillar canon (§4.3) already defines video as a secondary derivative of
    every content asset. The infrastructure now exists to automate that derivative.
  - Engine 2's architecture (governed transformation, Manual ceiling for external publish)
    maps perfectly to video production's risk profile without any structural changes.
  - Sapient Digital proves the pipeline at agency scale before platform integration.
    This follows the established flywheel: Agency proves → Platform sells.
- **Canon Files Impacted:** CITEMIND_SYSTEM.md, CONTENT_PILLAR_CANON.md, PLANS_LIMITS_ENTITLEMENTS.md
- **Contracts Impacted:** None (new feature surface, no existing contracts broken)
- **Implementation Notes:**
  - Standalone pipeline (Sapient Digital): can be built immediately, no Pravado dependency
  - Pravado integration: Month 2-5 post-GA per the phased build sequence below
  - Canon amendments here are the authoritative specification. No code until GA.

---

## 2. Engine 2 Name Change

**BEFORE:** Engine 2: Audio / Podcast Transformation Engine
**AFTER:** Engine 2: Content Transformation Engine (Audio + Video)

All existing Audio/Podcast specifications in CITEMIND_SYSTEM.md §3 remain unchanged.
The Video pathway is added as a parallel track within Engine 2.

---

## 3. Engine 2 Video Pathway — Full Specification

### 3.1 Purpose

The Video pathway transforms written content assets (articles, press releases, briefs,
LinkedIn posts) into video deliverables — automatically generating the video derivative
that the Content Pillar canon (§4.3) defines as a standard secondary output.

### 3.2 Primary Infrastructure

**Higgsfield Cloud API** is the primary video generation backbone.

| Reason | Detail |
|--------|--------|
| Single API → multiple models | Sora 2, Kling 3.0, Veo 3.1, Wan 2.5 under one integration |
| No model lock-in | Higgsfield routes to best model per generation type; Pravado never knows which |
| Metered for platform use | Cloud API is 100% pay-per-use — ideal for variable Pravado user demand |
| Content Factory | Batch generation for high-volume Sapient use cases |
| Webhook support | Job completion callbacks integrate cleanly with AUTOMATE event system |

**Routing logic within Higgsfield:**
- B-roll / generative visuals → Kling 3.0 (cost-efficiency, quality balance)
- Cinematic / high-production → Sora 2 or Veo 3.1 (SAGE-selected based on content type)
- Avatar / talking head → HeyGen API (separate integration, best lipsync quality)
- Narration without avatar → ElevenLabs API (already exists in Engine 2 Audio pathway)

### 3.3 Video Transformation Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│           CITEMIND ENGINE 2 — VIDEO PATHWAY                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  TRIGGER: Content asset reaches CiteMind AEO Score ≥ 61            │
│           (Citation-Ready threshold)                                │
│                                                                     │
│  ┌─────────────┐                                                    │
│  │ SAGE        │ Proposes: "Convert to [format] video.             │
│  │ Proposal    │  EVI impact: +[X] Visibility. Confidence: 0.82"  │
│  │ [Copilot]   │ User approves in AUTOMATE queue.                  │
│  └──────┬──────┘                                                    │
│         │                                                           │
│         ▼                                                           │
│  ┌─────────────┐                                                    │
│  │ SCRIPT      │ Claude API extracts core narrative.               │
│  │ EXTRACTION  │ 150–300 words per 60–90s video.                   │
│  │ [Autopilot] │ Format determined by content type + SAGE signal.  │
│  └──────┬──────┘                                                    │
│         │                                                           │
│         ▼                                                           │
│  ┌─────────────┐                                                    │
│  │ FORMAT      │ SAGE routes to format pathway:                    │
│  │ ROUTING     │  • Avatar → HeyGen API                            │
│  │ [Copilot]   │  • B-roll/Generative → Higgsfield Cloud API       │
│  │             │  • Narration → ElevenLabs API                     │
│  └──────┬──────┘                                                    │
│         │                                                           │
│         ▼                                                           │
│  ┌─────────────┐                                                    │
│  │ GENERATION  │ API calls execute. Webhook returns rendered video. │
│  │ [Autopilot] │ All generation is internal — no external publish. │
│  └──────┬──────┘                                                    │
│         │                                                           │
│         ▼                                                           │
│  ┌─────────────┐                                                    │
│  │ HUMAN       │ Video Lead reviews first cut.                     │
│  │ REVIEW GATE │ Brand compliance, AEO entity check, quality QA.  │
│  │ [Manual]    │ Approve → proceed. Reject → revision loop.        │
│  └──────┬──────┘                                                    │
│         │                                                           │
│         ▼                                                           │
│  ┌─────────────┐                                                    │
│  │ CLIENT      │ Unlisted review link sent to client.              │
│  │ REVIEW      │ 5 business day window. Consolidated feedback.     │
│  │ [Manual]    │ One revision round included.                      │
│  └──────┬──────┘                                                    │
│         │                                                           │
│         ▼                                                           │
│  ┌─────────────┐                                                    │
│  │ EXTERNAL    │ HARD CEILING: Manual mode only.                   │
│  │ PUBLISH     │ User executes publish after final approval.       │
│  │ [Manual]    │ VideoObject schema applied before publish.        │
│  └──────┬──────┘                                                    │
│         │                                                           │
│         ▼                                                           │
│  ┌─────────────┐                                                    │
│  │ POST-PUBLISH│ IndexNow ping (Engine 1 Autopilot).               │
│  │ AUTOMATION  │ Citation monitoring begins (Engine 3 Autopilot).  │
│  │ [Autopilot] │ EVI Visibility component updated.                 │
│  └─────────────┘                                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.4 Video Format Library

| Format | Length | AUTOMATE Mode Ceiling | AEO Value | Production Time |
|--------|--------|-----------------------|-----------|-----------------|
| Thought Leadership Reel | 60–90s | Manual (external) | High | 45 min human |
| Video Press Release | 90–120s | Manual (external) | High | 60 min human |
| Executive Avatar Program | 60–90s | Manual (external) | High | 40 min human |
| Social Short-Form | 15–45s | Manual (external) | Medium | 20 min human |
| Explainer / Product | 2–3 min | Manual (external) | Medium | 90 min human |

### 3.5 Invocation Rules — Video Pathway

| Action | Mode Eligibility | Trigger | Approval |
|--------|-----------------|---------|----------|
| SAGE video proposal | Copilot | AEO score ≥ 61 on approved content | User reviews |
| Script extraction (Claude API) | Autopilot | User approves SAGE proposal | None |
| Format routing (SAGE decision) | Copilot | Post-script extraction | Confirm format |
| Video generation (Higgsfield/HeyGen) | Autopilot | Post-format approval | None (internal) |
| Human review gate | Manual | On generation completion | Required |
| Client review delivery | Manual | Post human approval | Required |
| Revision loop | Manual | Per client feedback | Required |
| External publish | Manual | Post final approval | Required |
| Post-publish schema + IndexNow | Autopilot | On publish confirmation | None |
| Citation monitoring activation | Autopilot | On publish confirmation | None |

### 3.6 Risk Classification — Video Pathway

| Risk Dimension | Score | Rationale |
|----------------|-------|-----------|
| Externality | 0.9 | Public distribution, represents brand |
| Magnitude | 0.7 | Visual brand representation — higher than audio |
| Recovery | 0.8 | Video harder to unpublish from all surfaces than audio |
| Precedent | 0.6 | Sets visual brand standard |
| **Overall** | **High (0.75)** | Manual ceiling on external publish — same as Audio |

### 3.7 Cost Profile — Video Pathway

| Operation | Cost Class | Estimated Unit Cost | Plan Gate |
|-----------|------------|---------------------|-----------|
| SAGE video proposal | Low | ~$0.02 (SAGE call) | Growth+ |
| Script extraction (Claude API) | Low | ~$0.05 | Growth+ |
| B-roll generation (Higgsfield Kling) | Medium | ~$0.11–$0.45/clip | Video Module |
| Cinematic generation (Higgsfield Sora 2) | High | ~$0.74–$1.30/clip | Video Module |
| Avatar video (HeyGen API) | Medium | ~$0.50–$4.50/min | Video Module |
| Narration (ElevenLabs) | Low | ~$0.12/1K chars | Video Module |
| Review delivery (Vimeo API) | Free | $0 | Video Module |
| Post-publish schema + IndexNow | Free | $0 | All plans |

### 3.8 Schema Addition — VideoObject

Engine 1 must support VideoObject schema upon video publish.

| Field | Source | Required |
|-------|--------|----------|
| name | Video title from brief | Yes |
| description | Script summary | Yes |
| uploadDate | Publish date | Yes |
| contentUrl | Published video URL | Yes |
| thumbnailUrl | Auto-generated thumbnail | Yes |
| duration | PT[M]M[S]S format | Yes |
| publisher | Organization schema (existing) | Yes |
| embedUrl | Platform embed URL | Recommended |

---

## 4. CONTENT_PILLAR_CANON.md Amendment

### Section 4.3 Addition

Add "Video derivative" to the secondary derivatives list in §4.3:

**BEFORE:**
> Each asset has:
> - **Primary format** (e.g., long-form article)
> - **Secondary derivatives:**
>   - PR pitch excerpts
>   - AEO snippets
>   - AI-ready summaries
>   - Social fragments

**AFTER:**
> Each asset has:
> - **Primary format** (e.g., long-form article)
> - **Secondary derivatives:**
>   - PR pitch excerpts
>   - AEO snippets
>   - AI-ready summaries
>   - Social fragments
>   - **Video derivative** (CiteMind Engine 2 — Video Pathway; requires Video Module add-on)

---

## 5. PLANS_LIMITS_ENTITLEMENTS.md Amendment

### Add: Video Module Add-On

The Video Module is an add-on, not a plan tier. It sits on top of any Pravado plan.

| | Video Essentials | Video Pro | Video Enterprise |
|---|---|---|---|
| **Price** | $299/month | $599/month | Custom |
| **Videos/month** | 4 derivatives | 12 derivatives | Unlimited |
| **Formats** | Standard (B-roll + narration) | All formats incl. avatar | All formats |
| **Resolution** | 1080p | 4K | 4K + custom |
| **Batch generation** | No | Yes | Yes (Content Factory) |
| **Avatar program** | No | 1 executive avatar | Multi-avatar |
| **Review delivery** | Vimeo unlisted | Vimeo unlisted | Custom |
| **AUTOMATE integration** | Full | Full | Full + API access |
| **Plan minimum** | Growth | Growth | Enterprise |

**Billing:** Add-on charges alongside monthly plan. Usage above tier = overage at published rates.
**Trial:** Not available as free trial. First video included in onboarding for paid add-on subscribers.

---

## 6. Standalone Pipeline (Sapient Digital)

### 6.1 Architecture Decision

The Sapient Digital Video Pipeline is a **standalone system** — it does NOT require Pravado
integration to build or operate.

It is a Node.js service that chains API calls in sequence, governed by the production
SOP in the Sapient Digital Operations Playbook. It runs independently of Pravado's
monorepo and can be built, deployed, and operated at full scale without touching
a single line of Pravado code.

### 6.2 Why This Is the Right Sequence

| Concern | Answer |
|---------|--------|
| "Won't this create duplicate work?" | No. The standalone pipeline's architecture IS the Pravado integration blueprint. |
| "Will we have to rewrite it?" | Minimal refactoring. The API layer is identical. Only the trigger mechanism changes. |
| "What does Pravado add?" | SAGE proposals, AUTOMATE governance UI, EVI feedback, DerivativeStatusPanel. The API calls are the same. |
| "Can Sapient run this before GA?" | Yes. Fully. This is the entire point. |

### 6.3 Standalone Pipeline — Technology Stack

```
Sapient Digital Video Pipeline (Standalone)
│
├── Orchestration: n8n (self-hosted) or Make.com
│   └── Manages the step-by-step workflow, webhook handling,
│       retry logic, and error notifications
│
├── Script Extraction: Claude API (Anthropic)
│   └── Pulls narrative from approved content asset
│       Input: content text + format instructions
│       Output: video script (150–300 words)
│
├── Format Router: Internal logic (simple if/else)
│   └── Avatar → HeyGen
│       B-roll/Generative → Higgsfield Cloud API
│       Narration-only → ElevenLabs
│
├── Video Generation:
│   ├── Higgsfield Cloud API (primary backbone)
│   │   └── B-roll, generative, cinematic formats
│   │       Webhook: job completion notification
│   │       Pricing: metered per generation
│   │
│   └── HeyGen API (avatar/lipsync)
│       └── Executive avatar programs
│           Pricing: pay-as-you-go credits
│
├── Voice/Narration: ElevenLabs API
│   └── Narration-first formats without avatar
│       Pricing: Pro plan ($99/mo)
│
├── Post-Production: Descript (manual step)
│   └── Assembly, captions, brand overlays
│       Human: 15–30 min per video
│
├── Platform Formatting: CapCut Pro (manual step)
│   └── 16:9 → 9:16, platform-specific formatting
│
├── Review Delivery: Vimeo API
│   └── Upload unlisted link, send to client
│       Receive consolidated feedback
│
├── Final Distribution: YouTube Data API (manual-triggered)
│   └── Publish to YouTube with metadata
│       Platform-specific scheduling
│
└── Post-Publish: Manual trigger
    └── IndexNow ping (standalone, not via Pravado)
        VideoObject schema (applied manually in Descript/CMS)
        Citation monitoring: Sapient manually queries CiteMind
```

---

## 7. Required APIs — New Integrations

### 7.1 APIs Needed That Are NOT Currently in Place

| API | Purpose | Priority | Monthly Cost Est. |
|-----|---------|----------|-------------------|
| **Higgsfield Cloud API** | Primary video generation (B-roll, generative, cinematic) | P0 — Core backbone | Metered: ~$0.16–$4.22/gen |
| **HeyGen API** | Executive avatar + lipsync video | P0 — Avatar formats | Pay-as-you-go: ~$0.50/credit |
| **ElevenLabs API** | Voice narration (standalone from Pravado) | P1 — Narration formats | Pro: $99/mo |
| **Vimeo API** | Client review link delivery + feedback management | P1 — Review workflow | Standard: $20/mo |
| **YouTube Data API** | Final video publishing + metadata management | P1 — Distribution | Free (Google Cloud quota) |
| **n8n / Make.com API** | Workflow orchestration — chains all API calls | P0 — Pipeline glue | n8n: $20/mo self-hosted |

### 7.2 APIs Already in Place (No Action Required)

| API | Current Use | Video Pipeline Use |
|-----|-------------|-------------------|
| **Anthropic/Claude API** | SAGE, Ask Pravado, content | Script extraction — same API key works |
| **Google Indexing API** | Engine 1 SEO | Post-publish IndexNow — existing integration |
| **ElevenLabs** (Pravado plan) | Engine 2 Audio | Separate subscription needed for Sapient agency use |

---

## 8. Build Sequence — Post-GA

### Phase 1 (GA + 0–30 days): Canon + API Setup
- [ ] Submit this amendment to DECISIONS_LOG.md as D003
- [ ] Obtain Higgsfield Cloud API key (enterprise account application)
- [ ] Obtain HeyGen API key + pay-as-you-go credits
- [ ] Set up ElevenLabs Pro account (separate from Pravado)
- [ ] Set up Vimeo Standard account + API credentials
- [ ] Enable YouTube Data API v3 in Google Cloud Console
- [ ] Set up n8n instance (self-hosted on existing Render infra or Docker)
- [ ] Add all API keys to Sapient Digital secrets manager (not Pravado .env)

### Phase 2 (GA + 30–60 days): Standalone Pipeline Build
- [ ] Build n8n workflow: script extraction → format routing → generation → webhook
- [ ] Test Higgsfield Cloud API: B-roll generation, webhook callback, error handling
- [ ] Test HeyGen API: avatar creation, script-to-video, credit management
- [ ] Test ElevenLabs API: voice clone setup, narration generation
- [ ] Build Vimeo upload + review link delivery flow
- [ ] Build YouTube upload flow with metadata template
- [ ] End-to-end test: one full video asset, all formats
- [ ] First client production: Sapient Digital reference client #1

### Phase 3 (GA + 60–90 days): Sapient at Scale
- [ ] Run pipeline for 5+ clients
- [ ] Document actual costs vs. model (update Tab 5 in cost model)
- [ ] Negotiate Higgsfield enterprise rate (at 30+ videos/month)
- [ ] Negotiate HeyGen enterprise rate (at 20+ avatar videos/month)
- [ ] Refine human review SOP based on real production data

### Phase 4 (GA + 90–150 days): Pravado Integration
- [ ] Create packages/higgsfield in monorepo (API wrapper package only)
- [ ] Create packages/heygen in monorepo
- [ ] Extend DerivativeStatusPanel: add Video derivative type
- [ ] Build AUTOMATE action type: "Video Production" (per this amendment)
- [ ] Build SAGE proposal logic: video recommendations on AEO score ≥ 61
- [ ] Add VideoObject schema to Engine 1 schema generation
- [ ] UI: Video Module add-on activation and management
- [ ] Internal beta: Sapient Digital runs their pipeline through Pravado UI
- [ ] Public launch: Video Module add-on available to platform customers

---

## 9. What Stays Out of Scope (Guardrails)

These decisions are NOT made here and require separate amendment:

- [ ] LLM Ads / paid placement integration (see Citara service line — market not ready)
- [ ] HappyHorse / future model additions (integrate via Higgsfield when available)
- [ ] Real-time video streaming or live content (out of scope for V1 video module)
- [ ] Client-side video editor within Pravado UI (delivery only, not production)
- [ ] White-label video module for agency partners (evaluate at 10+ agency clients)

---

## 10. Revision History

| Date | Version | Change |
|------|---------|--------|
| 2026-04-10 | 1.0 | Initial Video Pipeline Amendment — D003 |
