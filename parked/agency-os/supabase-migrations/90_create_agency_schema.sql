-- ============================================================
-- Migration 90: Agency OS Schema
-- Decision: D004 | April 2026
-- Schema: agency (separate from public/Pravado schema)
-- NOTE: RLS policies use explicit CREATE POLICY statements
--       (no dynamic DO blocks) to avoid delimiter issues.
-- ============================================================

CREATE SCHEMA IF NOT EXISTS agency;

-- ─────────────────────────────────────────────────────────────
-- TENANTS
-- ─────────────────────────────────────────────────────────────
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

-- ─────────────────────────────────────────────────────────────
-- TENANT MEMBERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE agency.tenant_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES agency.tenants(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL
              CHECK (role IN ('super_admin','admin','account_lead','specialist','viewer')),
  name        TEXT NOT NULL,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, user_id)
);

-- ─────────────────────────────────────────────────────────────
-- CLIENTS
-- ─────────────────────────────────────────────────────────────
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
  competitors     TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, slug)
);

-- ─────────────────────────────────────────────────────────────
-- CLIENT MEMBERS
-- ─────────────────────────────────────────────────────────────
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

-- ─────────────────────────────────────────────────────────────
-- RETAINERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE agency.retainers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  tier            TEXT NOT NULL
                  CHECK (tier IN ('establish','accelerate','dominate','enterprise')),
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

-- ─────────────────────────────────────────────────────────────
-- CLIENT PILLARS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE agency.client_pillars (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id     UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  pillar        TEXT NOT NULL CHECK (pillar IN ('pr','content','aeo','video')),
  status        TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused')),
  specialist_id UUID REFERENCES agency.tenant_members(id),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, pillar)
);

-- ─────────────────────────────────────────────────────────────
-- PR: PITCHES
-- ─────────────────────────────────────────────────────────────
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
                  CHECK (status IN ('draft','sent','opened','responded','placed','declined','no_response')),
  sent_at         TIMESTAMPTZ,
  follow_up_at    TIMESTAMPTZ,
  follow_up_count INTEGER DEFAULT 0,
  response_notes  TEXT,
  created_by      UUID REFERENCES agency.tenant_members(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- PR: COVERAGE
-- ─────────────────────────────────────────────────────────────
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

-- ─────────────────────────────────────────────────────────────
-- CONTENT: EDITORIAL CALENDAR
-- ─────────────────────────────────────────────────────────────
CREATE TABLE agency.editorial_calendar (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id    UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  format       TEXT NOT NULL
               CHECK (format IN ('article','linkedin_post','press_release','whitepaper','case_study','ghostwrite','video_script')),
  status       TEXT NOT NULL DEFAULT 'planned'
               CHECK (status IN ('planned','briefed','in_progress','review','approved','published')),
  assigned_to  UUID REFERENCES agency.tenant_members(id),
  pillar       TEXT CHECK (pillar IN ('pr','content','aeo','video')),
  due_date     DATE,
  publish_date DATE,
  brief_id     UUID,
  asset_id     UUID,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- CONTENT: BRIEFS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE agency.content_briefs (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id          UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  calendar_id        UUID REFERENCES agency.editorial_calendar(id),
  working_title      TEXT NOT NULL,
  target_audience    TEXT,
  primary_keyword    TEXT,
  secondary_keywords TEXT[] DEFAULT '{}',
  aeo_target_queries TEXT[] DEFAULT '{}',
  required_entities  TEXT[] DEFAULT '{}',
  competitive_gap    TEXT,
  word_count_target  INTEGER,
  required_schema    TEXT,
  internal_links     TEXT[] DEFAULT '{}',
  aeo_score          INTEGER,
  status             TEXT NOT NULL DEFAULT 'draft'
                     CHECK (status IN ('draft','pending_approval','approved','rejected')),
  approved_by        UUID REFERENCES agency.client_members(id),
  approved_at        TIMESTAMPTZ,
  rejection_reason   TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- CONTENT: ASSETS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE agency.content_assets (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id             UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  brief_id              UUID REFERENCES agency.content_briefs(id),
  calendar_id           UUID REFERENCES agency.editorial_calendar(id),
  title                 TEXT NOT NULL,
  format                TEXT NOT NULL,
  body_url              TEXT,
  status                TEXT NOT NULL DEFAULT 'draft'
                        CHECK (status IN ('draft','internal_review','client_review','revision','approved','published')),
  client_revision_notes TEXT,
  revision_count        INTEGER DEFAULT 0,
  published_url         TEXT,
  published_at          TIMESTAMPTZ,
  aeo_score             INTEGER,
  video_production_id   UUID,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- VIDEO: PRODUCTIONS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE agency.video_productions (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id            UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  content_asset_id     UUID REFERENCES agency.content_assets(id),
  title                TEXT NOT NULL,
  format               TEXT NOT NULL
                       CHECK (format IN ('thought_leadership','video_press_release','avatar_program','social_short','explainer','case_study')),
  status               TEXT NOT NULL DEFAULT 'queued'
                       CHECK (status IN ('queued','scripting','script_review','generating','internal_review','client_review','revision','approved','publishing','published','failed')),
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

-- ─────────────────────────────────────────────────────────────
-- VIDEO: REVIEW CYCLES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE agency.video_reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  production_id UUID NOT NULL REFERENCES agency.video_productions(id) ON DELETE CASCADE,
  reviewer_id   UUID REFERENCES agency.client_members(id),
  round         INTEGER NOT NULL DEFAULT 1,
  decision      TEXT CHECK (decision IN ('approved','revision_requested')),
  feedback      TEXT,
  reviewed_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- REPORTS
-- ─────────────────────────────────────────────────────────────
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

-- ─────────────────────────────────────────────────────────────
-- TASKS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE agency.tasks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES agency.tenants(id) ON DELETE CASCADE,
  client_id   UUID REFERENCES agency.clients(id),
  title       TEXT NOT NULL,
  description TEXT,
  type        TEXT CHECK (type IN ('pr','content','aeo','video','reporting','admin')),
  priority    TEXT NOT NULL DEFAULT 'medium'
              CHECK (priority IN ('critical','high','medium','low')),
  status      TEXT NOT NULL DEFAULT 'open'
              CHECK (status IN ('open','in_progress','blocked','done')),
  assigned_to UUID REFERENCES agency.tenant_members(id),
  due_date    DATE,
  created_by  UUID REFERENCES agency.tenant_members(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- ESCALATIONS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE agency.escalations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID NOT NULL REFERENCES agency.clients(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('dissatisfaction','budget','scope','champion_change','at_risk')),
  severity    TEXT NOT NULL CHECK (severity IN ('low','medium','high','critical')),
  description TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved')),
  resolution  TEXT,
  raised_by   UUID REFERENCES agency.tenant_members(id),
  assigned_to UUID REFERENCES agency.tenant_members(id),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- ─────────────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────────────
CREATE INDEX idx_tenant_members_user_id    ON agency.tenant_members(user_id);
CREATE INDEX idx_tenant_members_tenant_id  ON agency.tenant_members(tenant_id);
CREATE INDEX idx_clients_tenant_id         ON agency.clients(tenant_id);
CREATE INDEX idx_clients_status            ON agency.clients(status);
CREATE INDEX idx_client_members_user_id    ON agency.client_members(user_id);
CREATE INDEX idx_client_members_client_id  ON agency.client_members(client_id);
CREATE INDEX idx_pitches_client_id         ON agency.pitches(client_id);
CREATE INDEX idx_pitches_status            ON agency.pitches(status);
CREATE INDEX idx_coverage_client_id        ON agency.coverage(client_id);
CREATE INDEX idx_coverage_tier             ON agency.coverage(tier);
CREATE INDEX idx_video_productions_client  ON agency.video_productions(client_id);
CREATE INDEX idx_video_productions_status  ON agency.video_productions(status);
CREATE INDEX idx_video_productions_updated ON agency.video_productions(updated_at DESC);
CREATE INDEX idx_tasks_tenant_id           ON agency.tasks(tenant_id);
CREATE INDEX idx_tasks_assigned_to         ON agency.tasks(assigned_to);

-- ─────────────────────────────────────────────────────────────
-- UPDATED_AT TRIGGERS
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION agency.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS
$func$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$func$;

CREATE TRIGGER set_clients_updated_at
  BEFORE UPDATE ON agency.clients
  FOR EACH ROW EXECUTE FUNCTION agency.set_updated_at();

CREATE TRIGGER set_video_productions_updated_at
  BEFORE UPDATE ON agency.video_productions
  FOR EACH ROW EXECUTE FUNCTION agency.set_updated_at();

CREATE TRIGGER set_tenants_updated_at
  BEFORE UPDATE ON agency.tenants
  FOR EACH ROW EXECUTE FUNCTION agency.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY — enable on all tables
-- ─────────────────────────────────────────────────────────────
ALTER TABLE agency.tenants           ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.tenant_members    ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.clients           ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.client_members    ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.retainers         ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.client_pillars    ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.pitches           ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.coverage          ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.editorial_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.content_briefs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.content_assets    ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.video_productions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.video_reviews     ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.reports           ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.tasks             ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency.escalations       ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────
-- HELPER FUNCTIONS
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION agency.current_tenant_id()
RETURNS UUID LANGUAGE sql SECURITY DEFINER STABLE AS
$func$
  SELECT tenant_id FROM agency.tenant_members
  WHERE user_id = auth.uid() LIMIT 1;
$func$;

CREATE OR REPLACE FUNCTION agency.is_super_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS
$func$
  SELECT EXISTS (
    SELECT 1 FROM agency.tenant_members
    WHERE user_id = auth.uid() AND role = 'super_admin'
  );
$func$;

CREATE OR REPLACE FUNCTION agency.accessible_client_ids()
RETURNS SETOF UUID LANGUAGE sql SECURITY DEFINER STABLE AS
$func$
  SELECT client_id FROM agency.client_members WHERE user_id = auth.uid();
$func$;

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — tenants
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "agency_members_see_own_tenant" ON agency.tenants
  FOR SELECT USING (id = agency.current_tenant_id() OR agency.is_super_admin());
CREATE POLICY "super_admin_manage_tenants" ON agency.tenants
  FOR ALL USING (agency.is_super_admin());

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — tenant_members
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "members_see_own_tenant_members" ON agency.tenant_members
  FOR SELECT USING (tenant_id = agency.current_tenant_id() OR agency.is_super_admin());
CREATE POLICY "admins_manage_members" ON agency.tenant_members
  FOR ALL USING (
    agency.is_super_admin() OR (
      tenant_id = agency.current_tenant_id() AND
      EXISTS (SELECT 1 FROM agency.tenant_members WHERE user_id = auth.uid() AND role IN ('admin','super_admin'))
    )
  );

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — clients
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_tenant_clients" ON agency.clients
  FOR SELECT USING (tenant_id = agency.current_tenant_id() OR agency.is_super_admin());
CREATE POLICY "client_members_see_own_client" ON agency.clients
  FOR SELECT USING (id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_clients" ON agency.clients
  FOR ALL USING (
    agency.is_super_admin() OR (
      tenant_id = agency.current_tenant_id() AND
      EXISTS (SELECT 1 FROM agency.tenant_members WHERE user_id = auth.uid() AND role IN ('super_admin','admin','account_lead'))
    )
  );

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — client_members
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_manage_client_members" ON agency.client_members
  FOR ALL USING (
    agency.is_super_admin() OR
    client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id())
  );
CREATE POLICY "client_members_see_own_record" ON agency.client_members
  FOR SELECT USING (user_id = auth.uid());

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — retainers
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_retainers" ON agency.retainers
  FOR SELECT USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()) OR client_id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_retainers" ON agency.retainers
  FOR ALL USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()));

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — client_pillars
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_client_pillars" ON agency.client_pillars
  FOR SELECT USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()) OR client_id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_client_pillars" ON agency.client_pillars
  FOR ALL USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()));

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — pitches
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_pitches" ON agency.pitches
  FOR SELECT USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()) OR client_id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_pitches" ON agency.pitches
  FOR ALL USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()));

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — coverage
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_coverage" ON agency.coverage
  FOR SELECT USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()) OR client_id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_coverage" ON agency.coverage
  FOR ALL USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()));

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — editorial_calendar
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_editorial_calendar" ON agency.editorial_calendar
  FOR SELECT USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()) OR client_id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_editorial_calendar" ON agency.editorial_calendar
  FOR ALL USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()));

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — content_briefs
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_content_briefs" ON agency.content_briefs
  FOR SELECT USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()) OR client_id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_content_briefs" ON agency.content_briefs
  FOR ALL USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()));

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — content_assets
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_content_assets" ON agency.content_assets
  FOR SELECT USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()) OR client_id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_content_assets" ON agency.content_assets
  FOR ALL USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()));

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — video_productions
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_video_productions" ON agency.video_productions
  FOR SELECT USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()) OR client_id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_video_productions" ON agency.video_productions
  FOR ALL USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()));

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — video_reviews (joins through video_productions)
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_video_reviews" ON agency.video_reviews
  FOR SELECT USING (
    agency.is_super_admin() OR
    production_id IN (
      SELECT vp.id FROM agency.video_productions vp
      JOIN agency.clients c ON c.id = vp.client_id
      WHERE c.tenant_id = agency.current_tenant_id()
    ) OR
    production_id IN (
      SELECT vp.id FROM agency.video_productions vp
      WHERE vp.client_id IN (SELECT agency.accessible_client_ids())
    )
  );
CREATE POLICY "team_manage_video_reviews" ON agency.video_reviews
  FOR ALL USING (
    agency.is_super_admin() OR
    production_id IN (
      SELECT vp.id FROM agency.video_productions vp
      JOIN agency.clients c ON c.id = vp.client_id
      WHERE c.tenant_id = agency.current_tenant_id()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — reports
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_reports" ON agency.reports
  FOR SELECT USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()) OR client_id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_reports" ON agency.reports
  FOR ALL USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()));

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — tasks (tenant-scoped, no direct client_id required)
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_tasks" ON agency.tasks
  FOR SELECT USING (tenant_id = agency.current_tenant_id() OR agency.is_super_admin());
CREATE POLICY "team_manage_tasks" ON agency.tasks
  FOR ALL USING (tenant_id = agency.current_tenant_id() OR agency.is_super_admin());

-- ─────────────────────────────────────────────────────────────
-- RLS POLICIES — escalations
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "team_see_escalations" ON agency.escalations
  FOR SELECT USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()) OR client_id IN (SELECT agency.accessible_client_ids()));
CREATE POLICY "team_manage_escalations" ON agency.escalations
  FOR ALL USING (agency.is_super_admin() OR client_id IN (SELECT id FROM agency.clients WHERE tenant_id = agency.current_tenant_id()));

-- ─────────────────────────────────────────────────────────────
-- PUBLIC VIEWS (for middleware + providers)
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.agency_tenant_members AS
  SELECT
    tm.id, tm.tenant_id, tm.user_id, tm.role, tm.name, tm.avatar_url,
    t.name   AS tenant_name,
    t.slug   AS tenant_slug,
    t.type   AS tenant_type,
    t.status AS tenant_status,
    t.plan   AS tenant_plan,
    t.white_label
  FROM agency.tenant_members tm
  JOIN agency.tenants t ON t.id = tm.tenant_id;

CREATE OR REPLACE VIEW public.agency_client_members AS
  SELECT
    cm.id, cm.client_id, cm.user_id, cm.role, cm.name, cm.email,
    c.slug AS client_slug
  FROM agency.client_members cm
  JOIN agency.clients c ON c.id = cm.client_id;

CREATE OR REPLACE VIEW public.agency_tenant_members_with_tenant AS
  SELECT * FROM public.agency_tenant_members;

CREATE OR REPLACE VIEW public.agency_client_members_with_slug AS
  SELECT * FROM public.agency_client_members;

-- ─────────────────────────────────────────────────────────────
-- SEED: Sapient Digital operator tenant
-- ─────────────────────────────────────────────────────────────
INSERT INTO agency.tenants (id, name, slug, type, status, plan)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Sapient Digital',
  'sapient-digital',
  'sapient',
  'active',
  'operator'
) ON CONFLICT (slug) DO NOTHING;
