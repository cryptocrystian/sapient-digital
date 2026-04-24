# Pre-Launch Codebase Audit Report

**Date:** 2026-04-03
**Repo:** pravado-v2 (main branch, commit 9bed07a)
**Live URL:** https://app.pravado.io
**API URL:** https://pravado-api.onrender.com

---

## Launch Blockers (must fix before any beta user logs in)

### LB-1: No `.env.example` Files Committed
Neither `apps/dashboard/` nor `apps/api/` have `.env.example` templates in the repo. Any new developer or CI environment has zero guidance on required variables. Production may be missing vars silently.

**Fix:** Create `.env.example` for both apps listing every required var with placeholder values.

### LB-2: Command Center Has No Empty State
`/app/command-center/page.tsx` renders `TriPaneShell` immediately with ActionStream, IntelligenceCanvas, and StrategyPanel panes. For a brand-new user whose onboarding activation polling timed out or whose SAGE proposals haven't populated yet, this renders as an empty shell with no guidance.

**Fix:** Add empty-state cards in each pane ("Your first SAGE proposals are generating..." / "Connect data sources to populate intelligence") and loading skeletons.

### LB-3: `strategy-panel` API Route Not Found
The Command Center's StrategyPanel pane calls `/api/command-center/strategy-panel`. No explicit route was found in either the Fastify backend or dashboard API routes under that exact path. The SAGE proposal generator exists at `/api/v1/sage/...` but the proxy may be missing or misnamed.

**Fix:** Verify the dashboard proxy route exists at `apps/dashboard/src/app/api/command-center/strategy-panel/route.ts` and correctly forwards to the SAGE backend.

### LB-4: `LLM_PROVIDER` Defaults to `stub`
The API env schema defaults `LLM_PROVIDER` to `"stub"`. If this is not overridden in production, all AI-powered endpoints (pitch generation, press releases, briefs, CiteMind) will return deterministic stub responses, not real AI output.

**Fix:** Confirm `LLM_PROVIDER=anthropic` (or `openai`) is set in Render production env vars.

---

## High Priority (fix before first week of beta ends)

### HP-1: Calendar Icon Bug in Sidebar
`AppSidebar.tsx` line ~89 uses `icons.commandCenter` for the Calendar nav item instead of `icons.calendar`. Visual-only but creates user confusion.

### HP-2: 3 TypeScript Errors in API (non-blocking for runtime)
All in `apps/api`:
| File | Line | Error |
|------|------|-------|
| `src/routes/prOutreachDeliverability/index.ts` | 432 | `'rawBody'` does not exist in type `FastifyContextConfig` |
| `src/scripts/configureRenderProduction.ts` | 143 | `'body'` is of type `'unknown'` (x2) |

These don't block the running server but will block CI if `typecheck` is enforced.

**Fix:** Add `rawBody` to FastifyContextConfig declaration merge; cast `body` in the config script.

### HP-3: EVI Polling Timeout During Onboarding
Onboarding activation step polls `GET /api/evi/current` up to 12 times at 2-second intervals (24s max). If EVI calculation is slow (cold-start Render, large signal set), the polling silently gives up and defaults EVI to 0. User sees "Your EVI: 0" with no explanation.

**Fix:** Extend timeout or show "EVI is still calculating, check back in a few minutes" with a refresh button on Command Center.

### HP-4: Feature Flags Gate Critical Features
Multiple endpoints are behind feature flags that default to OFF:
- `ENABLE_EVI` - EVI scoring
- `ENABLE_CITEMIND` - CiteMind scoring
- `ENABLE_JOURNALIST_ENRICHMENT` - Journalist discovery
- `ENABLE_PR_GENERATOR` - Press release generation
- `ENABLE_PR_PITCH_ENGINE` - Pitch sequences

**Fix:** Ensure all flags are explicitly set to `true` in production environment.

### HP-5: Dual Route Architecture Creates Confusion
Most endpoints exist in BOTH the Fastify backend (`/api/v1/*`) and Next.js dashboard API routes (`/api/*`). Dashboard routes sometimes proxy to Fastify, sometimes hit Supabase directly. This creates maintenance burden and potential inconsistencies.

**Action:** Document which path is canonical for each endpoint. For beta, this is acceptable but should be consolidated post-launch.

### HP-6: Onboarding Completion Race Condition
`POST /api/onboarding/complete` is retried up to 3 times. If all 3 fail (DB timeout, Render cold start), the user's `completed_onboarding_at` is never set, and middleware will redirect them back to onboarding on every page load — an infinite loop.

**Fix:** Add a client-side escape hatch or a "Skip" button after 3 failures.

---

## Acceptable for Beta (known gaps, documented)

### AB-1: Stub Routes Exist but Are Unreachable
28+ stub routes exist (`/app/pr-legacy/*`, `/app/exec/*`, `/app/scenarios/*`, `/app/governance/*`, `/app/risk-radar/*`, `/app/reality-maps/*`, etc.) but **none are linked from the sidebar navigation**. Users cannot reach them unless they type URLs manually. Acceptable for beta.

### AB-2: Hidden Live Routes Not in Navigation
Two fully functional pages exist but aren't in the sidebar:
- `/app/agents` - AI Agent Registry (complete UI)
- `/app/personas` - Audience Personas (complete UI with API integration)

These can be exposed when ready; no beta user will miss them.

### AB-3: No `.env.example` Templates
Covered in LB-1 but acceptable for beta since production is already deployed. Priority is documentation, not runtime.

### AB-4: Content Quality Analysis is Heuristic-Only
`contentQualityService.ts` uses Flesch-Kincaid + keyword checks + pgvector similarity. No LLM involved. Produces useful but basic scores. Acceptable for beta; can enhance later.

### AB-5: PR Pitch System Prompt Could Be Richer
The system prompt for pitch generation (`"You are an expert PR pitch writer..."`) is functional but shorter than other prompts. It works but could benefit from explicit beat-matching and outlet-tier awareness instructions.

### AB-6: Media Monitoring Live but Hidden
`/app/media-monitoring` has full implementation (sources, articles, mentions, sentiment) but isn't in main sidebar navigation. Can be exposed via settings or a future nav update.

---

## Route Status Map

### Primary Navigation Routes (In Sidebar)
| URL | Status | Notes |
|-----|--------|-------|
| `/app/command-center` | LIVE | Main dashboard, TriPaneShell |
| `/app/pr` | LIVE | 3-mode PR work surface (Manual/Copilot/Autopilot) |
| `/app/pr/journalists` | LIVE | Journalist database with enrichment |
| `/app/pr/outreach` | LIVE | Outreach management |
| `/app/pr/coverage` | LIVE | Coverage tracking hub |
| `/app/pr/pitches` | LIVE | Pitch sequence management |
| `/app/pr/pitches/new` | LIVE | New pitch creation |
| `/app/pr/generator` | LIVE | Press release generator |
| `/app/pr/discovery` | LIVE | Journalist discovery |
| `/app/pr/enrichment` | LIVE | Data enrichment |
| `/app/pr/crisis` | LIVE | Crisis monitoring |
| `/app/pr/intelligence` | LIVE | PR intelligence |
| `/app/pr/media-lists` | LIVE | Media list management |
| `/app/pr/media-monitoring` | LIVE | Media monitoring |
| `/app/pr/deliverability` | LIVE | Email deliverability |
| `/app/content` | LIVE | Content work surface (tabs: Overview/Library/Calendar/Insights) |
| `/app/content/new` | LIVE | Content creation |
| `/app/content/[documentId]` | LIVE | Document editor |
| `/app/seo` | LIVE | SEO overview (3-mode) |
| `/app/seo/topics` | LIVE | Topic research |
| `/app/seo/competitors` | LIVE | Competitor analysis |
| `/app/seo/citations` | LIVE | CiteMind citations |
| `/app/seo/recommendations` | LIVE | SEO recommendations |
| `/app/calendar` | LIVE | Calendar view |
| `/app/analytics` | LIVE | Analytics overview |
| `/app/analytics/pr` | LIVE | PR analytics |
| `/app/analytics/content` | LIVE | Content analytics |
| `/app/analytics/seo` | LIVE | SEO analytics |
| `/app/analytics/reports` | LIVE | Reports |
| `/app/team` | LIVE | Team management |
| `/app/settings` | LIVE | Settings hub |
| `/app/settings/billing` | LIVE | Billing settings |
| `/app/settings/brand-voice` | LIVE | Brand voice configuration |
| `/app/settings/knowledge-base` | LIVE | Knowledge base |
| `/app/settings/security` | LIVE | Security/MFA settings |
| `/app/admin` | LIVE | Admin panel (conditional, requires `is_admin`) |

### Auth & Onboarding Routes
| URL | Status | Notes |
|-----|--------|-------|
| `/login` | LIVE | OAuth + magic link auth |
| `/callback` | LIVE | OAuth callback handler |
| `/beta` | LIVE | Beta signup page |
| `/onboarding` | REDIRECT | Redirects to `/onboarding/ai-intro` |
| `/onboarding/ai-intro` | LIVE | 7-step AI-led onboarding wizard |
| `/legal/privacy` | LIVE | Privacy policy |
| `/legal/terms` | LIVE | Terms of service |
| `/legal/cookies` | LIVE | Cookie policy |
| `/legal/acceptable-use` | LIVE | Acceptable use policy |

### Hidden Live Routes (Not in Navigation)
| URL | Status | Notes |
|-----|--------|-------|
| `/app/agents` | LIVE | AI agent registry, full UI |
| `/app/personas` | LIVE | Audience personas, full UI + API |
| `/app/media-monitoring` | LIVE | Full media monitoring suite |
| `/app/media-monitoring/rss` | LIVE | RSS feed monitoring |
| `/app/media-performance` | LIVE | Media performance metrics |
| `/app/reputation` | LIVE | Reputation dashboard |
| `/app/reputation/alerts` | LIVE | Reputation alerts |
| `/app/ops` | LIVE | Operations view |
| `/app/audit` | LIVE | Audit logs |
| `/app/audit/replay` | LIVE | Audit replay |
| `/app/billing` | LIVE | Billing overview |
| `/app/billing/history` | LIVE | Billing history |
| `/app/playbooks` | LIVE | Playbooks list |
| `/app/playbooks/[id]` | LIVE | Playbook detail |
| `/app/playbooks/editor` | LIVE | Playbook editor |

### Stub Routes (Not in Navigation - Dead Ends)
| URL | Status | Notes |
|-----|--------|-------|
| `/app/pr-legacy` | STUB | Entire deprecated module (12 routes). All "Coming soon" |
| `/app/pr-legacy/pitches` | STUB | |
| `/app/pr-legacy/coverage/[id]` | STUB | |
| `/app/pr-legacy/journalists` | STUB | |
| `/app/pr-legacy/outreach` | STUB | |
| `/app/pr-legacy/generator` | STUB | |
| `/app/pr-legacy/enrichment` | STUB | |
| `/app/pr-legacy/media-lists` | STUB | |
| `/app/pr-legacy/media-monitoring` | STUB | |
| `/app/pr-legacy/deliverability` | STUB | |
| `/app/exec` | STUB | Executive hub - 8 routes, all "Coming soon" |
| `/app/exec/investors` | STUB | |
| `/app/exec/digests` | STUB | |
| `/app/exec/board-reports` | STUB | |
| `/app/exec/strategy` | STUB | |
| `/app/exec/graph` | STUB | |
| `/app/scenarios` | STUB | Scenario playbooks |
| `/app/scenarios/simulations` | STUB | |
| `/app/scenarios/orchestrations` | STUB | |
| `/app/governance` | STUB | Compliance |
| `/app/risk-radar` | STUB | Risk monitoring |
| `/app/reality-maps` | STUB | Strategic mapping |
| `/app/unified-narratives` | STUB | |
| `/app/insight-conflicts` | STUB | |
| `/app/crisis` | STUB | (separate from `/app/pr/crisis` which is LIVE) |
| `/app/media-briefings` | STUB | |
| `/app/media-alerts` | STUB | |
| `/app/competitive-intelligence` | STUB | |

### Redirect Routes
| URL | Status | Target |
|-----|--------|--------|
| `/app` | REDIRECT | `/app/command-center` |
| `/` | REDIRECT | `/app` or `/login` (auth check) |

---

## API Endpoint Status

### Command Center
| Endpoint | Method | Status | Data Source | Auth | Notes |
|----------|--------|--------|-------------|------|-------|
| `/api/command-center/entity-map` | GET | FUNCTIONAL | Supabase (via SAGE) | YES | Proxies to `/api/v1/sage/entity-map` |
| `/api/command-center/strategy-panel` | GET | **NOT FOUND** | - | - | No explicit route found - LAUNCH BLOCKER |
| `/api/command-center/action-stream` | GET/POST | FUNCTIONAL | Supabase | YES | Proxy route |
| `/api/command-center/intelligence-canvas` | GET | FUNCTIONAL | Supabase | YES | Proxy route |
| `/api/evi/current` | GET | FUNCTIONAL | Supabase (calculated) | YES | Requires `ENABLE_EVI` flag |

### PR Surface
| Endpoint | Method | Status | Data Source | Auth | Notes |
|----------|--------|--------|-------------|------|-------|
| `/api/pr/journalists` | GET/POST | FUNCTIONAL | Supabase | YES | Dual route (Fastify + Dashboard direct DB) |
| `/api/journalists/discover` | GET | FUNCTIONAL | Supabase (enrichment) | YES | Requires `ENABLE_JOURNALIST_ENRICHMENT` |
| `/api/pr/outreach/generate-draft` | POST | FUNCTIONAL | AI Generated (Claude) | YES | Full pitch generation pipeline |
| `/api/pr/releases/generate` | POST | FUNCTIONAL | AI Generated | YES | 3-stage: angles -> headlines -> draft. Requires `ENABLE_PR_GENERATOR` |
| `/api/pr/coverage` | GET | FUNCTIONAL | Supabase (`earned_mentions`) | YES | |
| `/api/pr/pitches` | GET/POST | FUNCTIONAL | Supabase | YES | Requires `ENABLE_PR_PITCH_ENGINE` |

### Content Surface
| Endpoint | Method | Status | Data Source | Auth | Notes |
|----------|--------|--------|-------------|------|-------|
| `/api/content/items` | GET/POST/PUT | FUNCTIONAL | Supabase | YES | CRUD with CiteMind score queueing |
| `/api/content/briefs/generate` | POST | FUNCTIONAL | AI Generated | YES | Playbook-based orchestration |
| `/api/content/gaps` | GET | FUNCTIONAL | Supabase | YES | Cross-references SEO keywords vs content |
| `/api/content/quality/analyze` | POST | FUNCTIONAL | Supabase + Heuristic | YES | Flesch-Kincaid + keyword + similarity |

### SEO Surface
| Endpoint | Method | Status | Data Source | Auth | Notes |
|----------|--------|--------|-------------|------|-------|
| `/api/seo/keywords` | GET | FUNCTIONAL | Supabase | YES | Search, filter, sort |
| `/api/seo/opportunities` | GET | FUNCTIONAL | Supabase | YES | Priority scoring |
| `/api/seo/serp` | GET | FUNCTIONAL | Supabase | YES | SERP snapshots |
| `/api/citemind/monitor/summary` | GET | FUNCTIONAL | Supabase (`citation_summaries`) | YES | 30-day summary. Requires `ENABLE_CITEMIND` |

### Onboarding
| Endpoint | Method | Status | Data Source | Auth | Notes |
|----------|--------|--------|-------------|------|-------|
| `/api/onboarding/status` | GET | FUNCTIONAL | Supabase | YES | Returns progress + entity counts |
| `/api/onboarding/brand` | POST | FUNCTIONAL | Supabase (creates/updates org) | YES | Step 1 |
| `/api/onboarding/competitors` | POST/GET/DELETE | FUNCTIONAL | Supabase (`org_competitors`) | YES | Step 3 |
| `/api/onboarding/complete` | POST | FUNCTIONAL | Supabase | YES | Triggers SAGE activation via BullMQ |

### Health
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/health/` | GET | FUNCTIONAL | Full health with DB + Redis checks |
| `/health/live` | GET | FUNCTIONAL | Kubernetes liveness probe |
| `/health/ready` | GET | FUNCTIONAL | Readiness probe with DB check |
| `/health/info` | GET | FUNCTIONAL | App metadata (no secrets) |

---

## AI Prompt Quality Report

| Endpoint | Service File | Grade | Output Format | Org Context | Notes |
|----------|-------------|-------|---------------|-------------|-------|
| SAGE Proposals | `sageProposalGenerator.ts` | PRODUCTION_READY | STRUCTURED_JSON | Org name, signal data, EVI impact, confidence | 14+ template stubs as fallback; 500K token/month budget |
| PR Pitch Generation | `prPitchService.ts` | PRODUCTION_READY | STRUCTURED_JSON | Journalist profile, org, personality, interaction history | Personalization score in response |
| Press Release (3-stage) | `pressReleaseService.ts` | PRODUCTION_READY | STRUCTURED_JSON | Company, news type, keywords, tone, spokesperson | AP style; angle -> headline -> draft pipeline |
| Content Brief | `briefGeneratorService.ts` | PRODUCTION_READY | STRUCTURED_JSON | Keyword, intent, personality, clusters, gaps | Playbook-based S13 architecture |
| CiteMind Recommendations | `citeMindQualityScorer.ts` | PRODUCTION_READY | STRUCTURED_JSON | 6 factor scores, gate status | Main scoring is heuristic; LLM for recommendations only |
| Content Rewrite | `contentRewriteService.ts` | PRODUCTION_READY | FREEFORM_TEXT | Personality, keyword, intent, quality scores | Deterministic stub fallback |
| Content Quality | `contentQualityService.ts` | PRODUCTION_READY | STRUCTURED_JSON (heuristic) | N/A | No LLM - fully deterministic |

**Summary:** All 7 AI endpoints are production-ready with domain-specific prompts. No placeholder/generic prompts found. All use structured JSON output (except content rewrite). All inject org-specific context. All have fallback/stub logic for budget exhaustion or LLM failure.

### Prompt Strengths
- Domain-specific instructions in every prompt (no "helpful assistant" generics)
- Structured JSON output enforced with schema specifications
- 500K token/month budget enforcement with graceful degradation
- Personality (tone + voice attributes) injected across content generation
- LLM usage logged to `llm_usage_ledger` for compliance

### Prompt Enhancement Opportunities
- PR Pitch system prompt is shorter than others; could add explicit beat-matching instructions
- `brand_voice` from onboarding is fetched but not consistently formatted across all services
- No prompt versioning system to track changes across sprints

---

## TypeScript Errors

### Dashboard: CLEAN (0 errors)
### Packages (types, utils, validators, feature-flags): CLEAN (0 errors)
### Mobile: CLEAN (0 errors)

### API: 3 errors
| # | File | Line | Error | Severity |
|---|------|------|-------|----------|
| 1 | `src/routes/prOutreachDeliverability/index.ts` | 432 | `'rawBody'` does not exist in type `FastifyContextConfig` | Low - webhook handler type, doesn't affect runtime |
| 2 | `src/scripts/configureRenderProduction.ts` | 143 | `'body'` is of type `'unknown'` | Low - deployment script only |
| 3 | `src/scripts/configureRenderProduction.ts` | 143 | `'body'` is of type `'unknown'` | Low - deployment script only |

**Assessment:** None are launch-blocking. Error 1 is in a webhook route that works at runtime but needs a type declaration merge. Errors 2-3 are in a one-time deployment script. All can be deferred.

---

## Navigation & Onboarding Flow

### Sidebar Navigation (AppSidebar.tsx)
| Section | Label | Path | Status |
|---------|-------|------|--------|
| Primary | Command Center | `/app/command-center` | LIVE |
| Primary | PR | `/app/pr` | LIVE |
| Primary | Content | `/app/content` | LIVE |
| Primary | SEO | `/app/seo` | LIVE |
| Primary | Calendar | `/app/calendar` | LIVE (icon bug: shows command-center icon) |
| Primary | Analytics | `/app/analytics` | LIVE |
| Settings | Team | `/app/team` | LIVE |
| Settings | Settings | `/app/settings` | LIVE |
| Admin | Admin | `/app/admin` | LIVE (conditional: `is_admin=true`) |

**No nav items point to stub pages.** All sidebar links target functional routes.

### Onboarding Flow (7-Step AI Wizard)
| Step | Name | API Endpoint | Required | Notes |
|------|------|-------------|----------|-------|
| 1 | Brand Setup | `POST /api/onboarding/brand` | YES | Creates org record |
| 2 | Google Search Console | `/api/integrations/gsc/auth-url` | NO (skip allowed) | OAuth connection |
| 3 | Competitors | `POST /api/onboarding/competitors` | NO (skip allowed) | 1-5 competitor domains |
| 4 | Journalists | `POST /api/onboarding/journalists` | NO (skip allowed) | Max 10 entries |
| 5 | Content | `POST /api/onboarding/content` | NO (skip allowed) | Existing content URLs |
| 6 | Activation | `POST /api/onboarding/activate` | AUTO | Polls EVI + SAGE; retries `/complete` 3x |
| 7 | Proposals | (display only) | AUTO | Shows first 5 SAGE proposals, routes to Command Center |

### Auth Redirect Logic
```
User visits any /app/* route
  -> middleware.ts checks Supabase session
  -> No session? -> /login
  -> Session exists?
    -> Check 24-hour hard limit (S-INT-10)
    -> Expired? -> /login?reason=session_expired
    -> Valid? -> Check completed_onboarding_at in orgs table
      -> NULL? -> /onboarding/ai-intro
      -> Set? -> Allow through
      -> Check MFA requirement (if org.require_mfa=true)
        -> No TOTP factor? -> /app/settings/security
```

### Post-Login Flow
1. `/login` -> Supabase OAuth/magic link -> `/auth/callback` (PKCE)
2. Middleware intercepts first `/app/*` load
3. Checks `completed_onboarding_at`
4. If null -> `/onboarding/ai-intro` (7-step wizard)
5. If set -> `/app/command-center` (main dashboard)

---

## Environment & Configuration

### Dashboard Required Variables (12)
| Variable | Purpose | Critical |
|----------|---------|----------|
| `SUPABASE_URL` | Supabase project URL | YES |
| `SUPABASE_ANON_KEY` | Client-side Supabase key | YES |
| `NODE_ENV` | Environment mode | YES |
| `API_URL` | Backend API base URL | YES |
| `STRIPE_SECRET_KEY` | Billing | YES (for billing) |
| `CLOUDFLARE_ACCOUNT_ID` | CDN | NO |
| `CLOUDFLARE_API_TOKEN` | CDN | NO |
| `OPENAI_API_KEY` | Agent execution | Conditional |
| `ANTHROPIC_API_KEY` | Agent execution | Conditional |
| `SENTRY_DSN` | Error tracking | NO |
| `POSTHOG_API_KEY` | Analytics | NO |
| `SUPABASE_STORAGE_BUCKET` | Media storage | YES |

### API Required Variables (30+)
| Category | Variables | Critical |
|----------|-----------|----------|
| Supabase | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY` | YES |
| Server | `API_PORT`, `NODE_ENV`, `CORS_ORIGIN`, `DASHBOARD_URL` | YES |
| Auth | `JWT_SECRET`, `SUPABASE_JWT_SECRET` | YES |
| LLM | `LLM_PROVIDER`, `LLM_ANTHROPIC_API_KEY`, `LLM_ANTHROPIC_MODEL` | YES |
| Billing | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, price IDs | YES (for billing) |
| Email | `EMAIL_PROVIDER`, provider-specific keys | YES (for outreach) |
| Feature Flags | `ENABLE_EVI`, `ENABLE_CITEMIND`, `ENABLE_PR_GENERATOR`, etc. | YES |
| Enrichment | `WHOIS_XML_API_KEY`, `PEOPLE_DATA_LABS_API_KEY`, `HUNTER_API_KEY` | Conditional |

### Health Check Endpoints
| Path | Purpose | Tests |
|------|---------|-------|
| `GET /health/` | Full health | Database + Redis |
| `GET /health/live` | Liveness probe | Process alive |
| `GET /health/ready` | Readiness probe | Database connectivity |
| `GET /health/info` | App metadata | Version, features, env |

### Architecture Note
The API uses **Fastify** (not Hono as documented in CLAUDE.md). The Hono reference in CLAUDE.md is outdated. Server entry point is at `apps/api/src/server.ts`.

### Database
- 89 Supabase migrations covering all product modules
- All tables use UUID PKs, timestamps, and RLS policies
- Org-scoped access via `org_members` membership checks
- Rate limiting: 200 req/min per org/user globally; specialized limits on AI endpoints

---

## Recommendations

### Pre-Beta Checklist (Do Now)
1. Verify `strategy-panel` proxy route exists and is wired correctly (LB-3)
2. Confirm `LLM_PROVIDER=anthropic` in Render production env (LB-4)
3. Confirm all `ENABLE_*` feature flags are set to `true` in production (HP-4)
4. Add empty state handling to Command Center panes (LB-2)
5. Fix Calendar icon in AppSidebar.tsx (HP-1)

### Week 1 of Beta
6. Fix 3 TypeScript errors in API (HP-2)
7. Add onboarding completion escape hatch (HP-6)
8. Improve EVI polling timeout UX (HP-3)
9. Create `.env.example` files for both apps (LB-1)

### Post-Beta Backlog
10. Consolidate dual-route architecture (Fastify + Next.js API routes) (HP-5)
11. Expose hidden live routes (`/app/agents`, `/app/personas`, `/app/media-monitoring`) via navigation
12. Remove or redirect `/app/pr-legacy/*` entirely (28 dead stubs)
13. Add prompt versioning system for AI endpoints
14. Update CLAUDE.md: change "Hono" to "Fastify" in tech stack section
15. Enrich PR Pitch system prompt with beat-matching and outlet-tier awareness
16. Integrate `brand_voice` consistently across all AI services

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total routes discovered | 119 |
| LIVE routes | ~68 |
| STUB routes (coming soon) | ~28 |
| Routes in navigation | 9 (+ admin conditional) |
| Hidden live routes (not in nav) | ~15 |
| API endpoints audited | 23 |
| API endpoints FUNCTIONAL | 22 |
| API endpoints NOT FOUND | 1 (strategy-panel) |
| AI prompts audited | 7 |
| AI prompts PRODUCTION_READY | 7/7 |
| TypeScript errors (dashboard) | 0 |
| TypeScript errors (API) | 3 |
| TypeScript errors (packages) | 0 |
| Launch blockers | 4 |
| High priority items | 6 |
| Acceptable for beta | 6 |
