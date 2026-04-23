# AGENCY OS — TECHNICAL SPECIFICATION
## Sapient Digital Agency Management Portal

> **Status:** CANONICAL
> **Decision ID:** D004
> **Authority:** Founder decision — April 2026
> **Classification:** INTERNAL — DO NOT DISTRIBUTE
> **Last Updated:** 2026-04-11

---

## 0. Purpose & Context

The Agency OS is a multi-tenant agency management portal purpose-built for Sapient Digital
and the future agency partner program. It is a **separate Next.js application** within the
existing Pravado monorepo (`pravado-v2`), sharing Supabase infrastructure but operating
in its own database schema and Vercel deployment.

**It is not Pravado.** It is an operational layer that sits alongside Pravado and consumes
Pravado's intelligence API for AEO/CiteMind data. The goal is to run Sapient Digital's
four-pillar managed service with maximum automation, and to serve as the foundation for
the agency partner program.

**Ultimate destiny:** This system's architecture and database schema are designed to be
merged into Pravado as a native feature set — the "Agency Mode" or "Professional Services"
layer of the platform. Every architectural decision should reflect this eventual integration.

---

## 1. Repo Decision

**Added to: pravado-v2 monorepo**

Rationale:
- Shares `packages/types`, `packages/utils`, `packages/validators`
- Shares Supabase client and auth patterns with `apps/dashboard`
- Shares turborepo coordinated build pipeline
- Shares DS v3.1 design tokens
- Eliminates need to duplicate auth/Supabase setup
- Makes eventual Pravado merge a refactor, not a rebuild

The `sapient-digital` repo (prior website only) is deprecated and not used here.

---

## 2. System Relationship Map

```
┌──────────────────────────────────────────────────────────────────────┐
│                         pravado-v2 MONOREPO                          │
│                                                                      │
│  apps/dashboard          apps/agency-os        apps/api (shared)    │
│  (Pravado Platform)      (Agency OS)           (Fastify)            │
│                                                                      │
│  pravado.io              agency.sapientdigital.io  api.pravado.io   │
│  Vercel deployment A     Vercel deployment B    Render Pro           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │    Supabase (shared)       │
                    │                           │
                    │  public schema (Pravado)  │
                    │  agency schema (Agency OS)│
                    └───────────────────────────┘
                                    │
                     ┌──────────────┴─────────────┐
                     ▼                            ▼
           ┌──────────────────┐      ┌────────────────────┐
           │  Video Pipeline   │      │  Pravado API       │
           │  (n8n → Higgs,   │      │  /agency/v1/*      │
           │   HeyGen, 11labs) │      │  (CiteMind data)   │
           └──────────────────┘      └────────────────────┘
```

---

## 3. Monorepo Structure

### 3.1 New App: apps/agency-os

```
apps/agency-os/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css                   # DS v3.1 tokens (copy from dashboard)
│   │   ├── not-found.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── invite/page.tsx
│   │   ├── (agency)/                     # Agency team views
│   │   │   ├── layout.tsx                # Auth gate: agency roles only
│   │   │   ├── page.tsx                  # Redirect → /dashboard
│   │   │   ├── dashboard/page.tsx        # Agency command center
│   │   │   ├── clients/
│   │   │   │   ├── page.tsx              # Client roster
│   │   │   │   ├── new/page.tsx          # Client onboarding wizard
│   │   │   │   └── [clientId]/
│   │   │   │       ├── layout.tsx        # Client context shell
│   │   │   │       ├── overview/page.tsx
│   │   │   │       ├── pr/
│   │   │   │       │   ├── pitches/page.tsx
│   │   │   │       │   ├── coverage/page.tsx
│   │   │   │       │   ├── media-lists/page.tsx
│   │   │   │       │   └── releases/page.tsx
│   │   │   │       ├── content/
│   │   │   │       │   ├── calendar/page.tsx
│   │   │   │       │   ├── briefs/page.tsx
│   │   │   │       │   └── assets/page.tsx
│   │   │   │       ├── aeo/              # Post-Pravado GA
│   │   │   │       │   ├── share-of-model/page.tsx
│   │   │   │       │   ├── query-clusters/page.tsx
│   │   │   │       │   └── citations/page.tsx
│   │   │   │       ├── video/
│   │   │   │       │   ├── queue/page.tsx
│   │   │   │       │   ├── [productionId]/page.tsx
│   │   │   │       │   └── library/page.tsx
│   │   │   │       └── reports/page.tsx
│   │   │   ├── video/page.tsx            # Cross-client video queue
│   │   │   ├── tasks/page.tsx
│   │   │   ├── partners/page.tsx         # Phase 6: Partner mgmt
│   │   │   └── settings/
│   │   │       ├── team/page.tsx
│   │   │       ├── integrations/page.tsx # API keys: Higgsfield, HeyGen, etc.
│   │   │       └── billing/page.tsx
│   │   └── (client)/                     # Client workspace
│   │       ├── layout.tsx                # Auth gate: client roles only
│   │       └── [clientSlug]/
│   │           ├── layout.tsx
│   │           ├── overview/page.tsx
│   │           ├── coverage/page.tsx
│   │           ├── content/page.tsx      # Approvals
│   │           ├── ai-presence/page.tsx  # Post-GA
│   │           ├── video/
│   │           │   ├── page.tsx
│   │           │   └── [productionId]/page.tsx
│   │           └── reports/page.tsx
│   ├── components/
│   │   ├── agency/
│   │   │   ├── ClientCard.tsx
│   │   │   ├── ClientRoster.tsx
│   │   │   ├── PipelineStatus.tsx
│   │   │   ├── VideoQueue.tsx
│   │   │   ├── PitchTracker.tsx
│   │   │   ├── CoverageLog.tsx
│   │   │   ├── EditorialCalendar.tsx
│   │   │   ├── RetainerStatus.tsx
│   │   │   └── TaskBoard.tsx
│   │   ├── client/
│   │   │   ├── VideoReviewPlayer.tsx
│   │   │   ├── ApprovalGate.tsx
│   │   │   ├── RevisionRequest.tsx
│   │   │   ├── CoverageCard.tsx
│   │   │   └── ReportViewer.tsx
│   │   ├── video/
│   │   │   ├── ProductionCard.tsx
│   │   │   ├── ScriptEditor.tsx
│   │   │   ├── GenerationStatus.tsx
│   │   │   └── PipelineTimeline.tsx
│   │   └── nav/
│   │       ├── AgencySidebar.tsx
│   │       └── ClientSidebar.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                 # Copy pattern from apps/dashboard
│   │   │   └── server.ts
│   │   ├── api/
│   │   │   ├── clients.ts
│   │   │   ├── video.ts
│   │   │   ├── pr.ts
│   │   │   └── content.ts
│   │   └── hooks/
│   │       ├── useClient.ts
│   │       ├── useVideoQueue.ts
│   │       ├── useTenant.ts
│   │       └── useVideoRealtime.ts
│   ├── middleware.ts
│   └── providers/
│       ├── TenantProvider.tsx
│       └── ClientProvider.tsx
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── components.json
└── .env.local
```

### 3.2 New API Routes: apps/api/src/routes/agency/

```
apps/api/src/routes/agency/
├── index.ts                    # Register all routes
├── tenants.ts
├── clients.ts
├── retainers.ts
├── pr/
│   ├── pitches.ts
│   ├── coverage.ts
│   ├── media-lists.ts
│   └── releases.ts
├── content/
│   ├── calendar.ts
│   ├── briefs.ts
│   └── assets.ts
├── video/
│   ├── productions.ts
│   ├── scripts.ts
│   ├── reviews.ts
│   ├── webhook.ts              # n8n webhook receiver
│   └── pipeline.ts
├── reports.ts
├── tasks.ts
└── client-access.ts
```

### 3.3 Pravado API Addition (GA Sprint — ~1 sprint day)

```
apps/api/src/routes/agency-intelligence/
├── index.ts
├── share-of-model.ts
├── citation-rate.ts
├── aeo-scores.ts
└── competitor-gaps.ts
```

---

## 4. Multi-Tenant Model

### 4.1 Tenant Types

| Type | Description |
|------|-------------|
| `sapient` | Sapient Digital — the operator tenant |
| `partner` | Future partner agencies — fully isolated |

### 4.2 Access Roles

| Role | Scope | Capabilities |
|------|-------|--------------|
| `super_admin` | Cross-tenant | Full access everywhere. Founder only. |
| `admin` | Own tenant | Full access. Manages team, clients, billing. |
| `account_lead` | Assigned clients | Full ops on assigned clients only. |
| `specialist` | Assigned pillars | Specific pillar access on assigned clients. |
| `client_viewer` | Own client | Read-only client workspace. |
| `client_approver` | Own client | Read + approve content, scripts, videos. |

### 4.3 Client Portal Auth

- Client users: separate Supabase Auth users with `client_approver` or `client_viewer` role
- Auth method: magic link (no password required — frictionless for clients)
- URL pattern: `agency.sapientdigital.io/[clientSlug]/overview`
- Magic links expire 24h. Client can request new link at any time.
- RLS enforces client sees only their own data even if URL is guessed.

---

## 5. Database Schema (Migration 90)

### Schema: `agency` (new, same Supabase instance)

```sql
-- ─────────────────────────────────────────────────────────
-- TENANTS
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.tenants (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  type          TEXT NOT NULL CHECK (type IN ('sapient', 'partner')),
  status        TEXT NOT NULL DEFAULT 'active'
                CHECK (status IN ('active', 'suspended', 'trial')),
  plan          TEXT NOT NULL DEFAULT 'partner_starter',
  white_label   JSONB DEFAULT '{}',
  billing_email TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- TENANT MEMBERS (Agency team users)
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.tenant_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES agency.tenants(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL CHECK (role IN (
                'super_admin','admin','account_lead','specialist','viewer')),
  name        TEXT NOT NULL,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, user_id)
);

-- ─────────────────────────────────────────────────────────
-- CLIENTS
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.clients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES agency.tenants(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL,
  domain          TEXT NOT NULL,
  industry        TEXT,
  segment         TEXT CHECK (segment IN (
                    'b2b_saas','professional_services','industrial','executive')),
  status          TEXT NOT NULL DEFAULT 'onboarding'
                  CHECK (status IN ('onboarding','active','paused','churned')),
  account_lead_id UUID REFERENCES agency.tenant_members(id),
  brand_voice     TEXT,
  logo_url        TEXT,
  brand_colors    JSONB DEFAULT '{}',
  icp_description TEXT,
  competitors     TEXT[],
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, slug)
);

-- ─────────────────────────────────────────────────────────
-- CLIENT MEMBERS (Client portal users)
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.client_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL CHECK (role IN ('viewer','approver')),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  title       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, user_id)
);

-- ─────────────────────────────────────────────────────────
-- RETAINERS
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.retainers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID NOT NULL REFERENCES agency.clients(id),
  tier            TEXT NOT NULL CHECK (tier IN (
                    'establish','accelerate','dominate','enterprise')),
  monthly_value   INTEGER NOT NULL,
  start_date      DATE NOT NULL,
  end_date        DATE,
  status          TEXT NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active','renewed','terminated','paused')),
  sow_url         TEXT,
  msa_url         TEXT,
  video_module    TEXT CHECK (video_module IN ('essentials','pro','enterprise')),
  onboarding_fee  INTEGER,
  visibility_guarantee_baseline JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- CLIENT PILLARS
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.client_pillars (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id     UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  pillar        TEXT NOT NULL CHECK (pillar IN ('pr','content','aeo','video')),
  status        TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused')),
  specialist_id UUID REFERENCES agency.tenant_members(id),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, pillar)
);

-- ─────────────────────────────────────────────────────────
-- PR: PITCHES
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.pitches (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  journalist_id   TEXT,
  publication     TEXT NOT NULL,
  tier            TEXT NOT NULL CHECK (tier IN ('tier1','tier2','tier3')),
  subject_line    TEXT NOT NULL,
  angle           TEXT NOT NULL,
  body_preview    TEXT,
  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft','sent','opened','responded',
                                    'placed','declined','no_response')),
  sent_at         TIMESTAMPTZ,
  follow_up_at    TIMESTAMPTZ,
  follow_up_count INTEGER DEFAULT 0,
  response_notes  TEXT,
  created_by      UUID REFERENCES agency.tenant_members(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- PR: COVERAGE
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.coverage (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id        UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  pitch_id         UUID REFERENCES agency.pitches(id),
  url              TEXT NOT NULL,
  publication      TEXT NOT NULL,
  headline         TEXT NOT NULL,
  tier             TEXT NOT NULL CHECK (tier IN ('tier1','tier2','tier3')),
  published_at     TIMESTAMPTZ NOT NULL,
  sentiment        TEXT CHECK (sentiment IN ('positive','neutral','negative')),
  domain_authority INTEGER,
  aeo_indexed      BOOLEAN DEFAULT FALSE,
  indexnow_sent    BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- CONTENT: EDITORIAL CALENDAR
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.editorial_calendar (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id    UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  format       TEXT NOT NULL CHECK (format IN (
                 'article','linkedin_post','press_release',
                 'whitepaper','case_study','ghostwrite','video_script')),
  status       TEXT NOT NULL DEFAULT 'planned'
               CHECK (status IN ('planned','briefed','in_progress',
                                 'review','approved','published')),
  assigned_to  UUID REFERENCES agency.tenant_members(id),
  pillar       TEXT CHECK (pillar IN ('pr','content','aeo','video')),
  due_date     DATE,
  publish_date DATE,
  brief_id     UUID,
  asset_id     UUID,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- CONTENT: BRIEFS
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.content_briefs (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id          UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  calendar_id        UUID REFERENCES agency.editorial_calendar(id),
  working_title      TEXT NOT NULL,
  target_audience    TEXT,
  primary_keyword    TEXT,
  secondary_keywords TEXT[],
  aeo_target_queries TEXT[],
  required_entities  TEXT[],
  competitive_gap    TEXT,
  word_count_target  INTEGER,
  required_schema    TEXT,
  internal_links     TEXT[],
  aeo_score          INTEGER,
  status             TEXT NOT NULL DEFAULT 'draft'
                     CHECK (status IN ('draft','pending_approval',
                                       'approved','rejected')),
  approved_by        UUID REFERENCES agency.client_members(id),
  approved_at        TIMESTAMPTZ,
  rejection_reason   TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- CONTENT: ASSETS
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.content_assets (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id             UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  brief_id              UUID REFERENCES agency.content_briefs(id),
  calendar_id           UUID REFERENCES agency.editorial_calendar(id),
  title                 TEXT NOT NULL,
  format                TEXT NOT NULL,
  body_url              TEXT,
  status                TEXT NOT NULL DEFAULT 'draft'
                        CHECK (status IN ('draft','internal_review','client_review',
                                          'revision','approved','published')),
  client_revision_notes TEXT,
  revision_count        INTEGER DEFAULT 0,
  published_url         TEXT,
  published_at          TIMESTAMPTZ,
  aeo_score             INTEGER,
  video_production_id   UUID,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- VIDEO: PRODUCTIONS
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.video_productions (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id            UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  content_asset_id     UUID REFERENCES agency.content_assets(id),
  title                TEXT NOT NULL,
  format               TEXT NOT NULL CHECK (format IN (
                         'thought_leadership','video_press_release',
                         'avatar_program','social_short','explainer','case_study')),
  status               TEXT NOT NULL DEFAULT 'queued'
                       CHECK (status IN (
                         'queued','scripting','script_review','generating',
                         'internal_review','client_review','revision',
                         'approved','publishing','published','failed')),
  script               TEXT,
  script_approved_at   TIMESTAMPTZ,
  script_approved_by   UUID REFERENCES agency.client_members(id),
  n8n_job_id           TEXT,
  higgsfield_job_id    TEXT,
  heygen_job_id        TEXT,
  elevenlabs_job_id    TEXT,
  vimeo_review_url     TEXT,
  vimeo_review_sent_at TIMESTAMPTZ,
  revision_notes       TEXT,
  revision_count       INTEGER DEFAULT 0,
  youtube_url          TEXT,
  youtube_id           TEXT,
  published_at         TIMESTAMPTZ,
  video_object_schema  JSONB,
  indexnow_sent        BOOLEAN DEFAULT FALSE,
  generated_at         TIMESTAMPTZ,
  assigned_to          UUID REFERENCES agency.tenant_members(id),
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- VIDEO: REVIEW CYCLES
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.video_reviews (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  production_id  UUID NOT NULL REFERENCES agency.video_productions(id) ON DELETE CASCADE,
  reviewer_id    UUID REFERENCES agency.client_members(id),
  round          INTEGER NOT NULL DEFAULT 1,
  decision       TEXT CHECK (decision IN ('approved','revision_requested')),
  feedback       TEXT,
  reviewed_at    TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- REPORTS
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.reports (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id     UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  period_start  DATE NOT NULL,
  period_end    DATE NOT NULL,
  type          TEXT NOT NULL CHECK (type IN ('monthly','quarterly','qbr')),
  status        TEXT NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft','ready','sent')),
  report_url    TEXT,
  data_snapshot JSONB,
  sent_at       TIMESTAMPTZ,
  sent_by       UUID REFERENCES agency.tenant_members(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- TASKS
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.tasks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES agency.tenants(id) ON DELETE CASCADE,
  client_id    UUID REFERENCES agency.clients(id),
  title        TEXT NOT NULL,
  description  TEXT,
  type         TEXT CHECK (type IN ('pr','content','aeo','video','reporting','admin')),
  priority     TEXT NOT NULL DEFAULT 'medium'
               CHECK (priority IN ('critical','high','medium','low')),
  status       TEXT NOT NULL DEFAULT 'open'
               CHECK (status IN ('open','in_progress','blocked','done')),
  assigned_to  UUID REFERENCES agency.tenant_members(id),
  due_date     DATE,
  created_by   UUID REFERENCES agency.tenant_members(id),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- ESCALATIONS
-- ─────────────────────────────────────────────────────────
CREATE TABLE agency.escalations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id    UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  type         TEXT NOT NULL CHECK (type IN (
                 'dissatisfaction','budget','scope','champion_change','at_risk')),
  severity     TEXT NOT NULL CHECK (severity IN ('low','medium','high','critical')),
  description  TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'open'
               CHECK (status IN ('open','in_progress','resolved')),
  resolution   TEXT,
  raised_by    UUID REFERENCES agency.tenant_members(id),
  assigned_to  UUID REFERENCES agency.tenant_members(id),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  resolved_at  TIMESTAMPTZ
);
```

---

## 6. Video Pipeline Webhook Contract

n8n sends status updates to `POST /agency/v1/video/webhook`:

```typescript
interface VideoPipelineWebhook {
  event:
    | 'script_extracted'
    | 'generation_started'
    | 'generation_complete'
    | 'assembly_complete'
    | 'vimeo_uploaded'
    | 'publish_complete'
    | 'failed';
  production_id: string;
  n8n_job_id: string;
  payload: {
    higgsfield_job_id?: string;
    heygen_job_id?: string;
    vimeo_review_url?: string;
    youtube_url?: string;
    error?: string;
  };
  timestamp: string;
}
```

Webhook handler: updates `video_productions.status`, broadcasts via Supabase Realtime,
auto-sends client review email on `vimeo_uploaded` event.

---

## 7. Build Phases

| Phase | Scope | Weeks | Pravado Dependency |
|-------|-------|-------|--------------------|
| 1 | Core infra + agency ops (PR, Content, Tasks) | 1–4 | None |
| 2 | Video production workflow | 3–6 | None |
| 3 | Client workspace | 4–7 | None |
| 4 | Reporting engine | 6–8 | None |
| 5 | AEO intelligence dashboard | Post-GA | **4 API endpoints** |
| 6 | Partner agency program | After 5 live clients | None |

---

## 8. GA Sprint Additions (Pravado — ~1 sprint day, ~355 LOC)

| Item | Location |
|------|---------|
| Agency intelligence route namespace | `apps/api/src/routes/agency-intelligence/` |
| Service-to-service JWT plugin | `apps/api/src/plugins/service-auth.ts` |
| CiteMind Engine 3 external domain extension | Extend existing Engine 3 |
| Register routes in server.ts | 5 LOC |

---

## 9. Revision History

| Date | Version | Change |
|------|---------|--------|
| 2026-04-11 | 1.0 | Initial Agency OS specification — D004 |
