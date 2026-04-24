-- ============================================================
-- Agency OS Seed Data — Sapient Digital Demo
-- Run AFTER migration 90
-- ============================================================

-- ─── 3 TEST CLIENTS ──────────────────────────────────────────
INSERT INTO agency.clients (id, tenant_id, name, slug, domain, industry, segment, status, brand_voice, icp_description, competitors)
VALUES
  ('c0000001-0000-0000-0000-000000000001',
   'a0000000-0000-0000-0000-000000000001',
   'Vantage Industrial', 'vantage-industrial', 'vantageindustrial.com',
   'Industrial Manufacturing', 'industrial', 'active',
   'Authoritative, technical, no-nonsense. Speaks to engineers and procurement leads.',
   'VP of Operations at mid-market industrial manufacturers, 200-2000 employees, focused on efficiency and reliability.',
   ARRAY['acmeindustrial.com','grainger.com']),

  ('c0000001-0000-0000-0000-000000000002',
   'a0000000-0000-0000-0000-000000000001',
   'Meridian Legal Group', 'meridian-legal', 'meridianlegal.com',
   'Legal Services', 'professional_services', 'active',
   'Sophisticated, confident, client-first. Commands respect without being unapproachable.',
   'General counsel at PE-backed companies seeking outside litigation and M&A counsel.',
   ARRAY['lathropgpm.com','sheppardmullin.com']),

  ('c0000001-0000-0000-0000-000000000003',
   'a0000000-0000-0000-0000-000000000001',
   'Nexus Analytics', 'nexus-analytics', 'nexusanalytics.io',
   'B2B SaaS / Analytics', 'b2b_saas', 'onboarding',
   'Bold, data-forward, challenger brand. Speaks to technical buyers who hate fluff.',
   'Head of Data or VP Analytics at Series B-D SaaS companies, 50-500 employees.',
   ARRAY['tableau.com','looker.com','thoughtspot.com']);

-- ─── RETAINERS ───────────────────────────────────────────────
INSERT INTO agency.retainers (client_id, tier, monthly_value, start_date, status, video_module, onboarding_fee)
VALUES
  ('c0000001-0000-0000-0000-000000000001', 'dominate',    2450000, '2026-02-01', 'active', 'pro',        250000),
  ('c0000001-0000-0000-0000-000000000002', 'accelerate',  1650000, '2026-01-15', 'active', 'essentials', 250000),
  ('c0000001-0000-0000-0000-000000000003', 'establish',   1050000, '2026-04-01', 'active', NULL,         250000);

-- ─── CLIENT PILLARS ──────────────────────────────────────────
INSERT INTO agency.client_pillars (client_id, pillar, status) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'pr',      'active'),
  ('c0000001-0000-0000-0000-000000000001', 'content', 'active'),
  ('c0000001-0000-0000-0000-000000000001', 'aeo',     'active'),
  ('c0000001-0000-0000-0000-000000000001', 'video',   'active'),
  ('c0000001-0000-0000-0000-000000000002', 'pr',      'active'),
  ('c0000001-0000-0000-0000-000000000002', 'content', 'active'),
  ('c0000001-0000-0000-0000-000000000002', 'video',   'active'),
  ('c0000001-0000-0000-0000-000000000003', 'pr',      'active'),
  ('c0000001-0000-0000-0000-000000000003', 'content', 'active'),
  ('c0000001-0000-0000-0000-000000000003', 'aeo',     'active');

-- ─── PR: PITCHES ─────────────────────────────────────────────
INSERT INTO agency.pitches (client_id, publication, tier, subject_line, angle, status, sent_at, follow_up_count)
VALUES
  ('c0000001-0000-0000-0000-000000000001', 'Manufacturing Today', 'tier1',
   'How Vantage Cut Downtime 40% Without a Single New Hire',
   'Operational efficiency story — data-led, no product pitch', 'placed',
   NOW() - INTERVAL '12 days', 1),

  ('c0000001-0000-0000-0000-000000000001', 'Industry Week', 'tier1',
   'The Hidden Cost of Legacy SCADA Systems in 2026',
   'Thought leadership on modernization — positions CEO as authority', 'responded',
   NOW() - INTERVAL '8 days', 0),

  ('c0000001-0000-0000-0000-000000000001', 'Plant Engineering', 'tier2',
   'Q1 Operations Benchmark: Where Mid-Market Manufacturers Are Falling Behind',
   'Data exclusivity angle using internal survey results', 'sent',
   NOW() - INTERVAL '3 days', 0),

  ('c0000001-0000-0000-0000-000000000002', 'The American Lawyer', 'tier1',
   'Why PE-Backed Companies Are Rethinking Outside Counsel Strategy',
   'Shifts in legal spend — positions Meridian as strategic vs. transactional', 'sent',
   NOW() - INTERVAL '5 days', 0),

  ('c0000001-0000-0000-0000-000000000002', 'Law360', 'tier1',
   'M&A Litigation Risk in a High-Rate Environment: What Boards Are Missing',
   'Timely financial angle — macro hooks into specific legal risk', 'draft',
   NULL, 0),

  ('c0000001-0000-0000-0000-000000000003', 'TechCrunch', 'tier1',
   'The Analytics Stack Is Broken — Here''s What''s Replacing It',
   'Challenger narrative — legacy BI tools vs. modern composable analytics', 'draft',
   NULL, 0);

-- ─── PR: COVERAGE ────────────────────────────────────────────
INSERT INTO agency.coverage (client_id, url, publication, headline, tier, published_at, sentiment, domain_authority, aeo_indexed)
VALUES
  ('c0000001-0000-0000-0000-000000000001',
   'https://manufacturingtoday.com/vantage-downtime',
   'Manufacturing Today', 'Vantage Industrial Cuts Unplanned Downtime by 40% in 18 Months',
   'tier1', NOW() - INTERVAL '10 days', 'positive', 71, TRUE),

  ('c0000001-0000-0000-0000-000000000001',
   'https://plantengineering.com/scada-costs',
   'Plant Engineering', 'The Real Cost of Aging Industrial Control Systems',
   'tier2', NOW() - INTERVAL '22 days', 'positive', 58, TRUE),

  ('c0000001-0000-0000-0000-000000000002',
   'https://law360.com/meridian-pe-counsel',
   'Law360', 'Why PE Firms Are Consolidating Outside Counsel Rosters',
   'tier1', NOW() - INTERVAL '18 days', 'positive', 82, FALSE),

  ('c0000001-0000-0000-0000-000000000002',
   'https://americanlawyer.com/meridian-ma',
   'The American Lawyer', 'Boutique M&A Firms See Surge as Deal Volume Returns',
   'tier1', NOW() - INTERVAL '31 days', 'positive', 79, TRUE);

-- ─── CONTENT: EDITORIAL CALENDAR ────────────────────────────
INSERT INTO agency.editorial_calendar (client_id, title, format, status, pillar, due_date, publish_date)
VALUES
  ('c0000001-0000-0000-0000-000000000001',
   'The True Cost of Reactive Maintenance in Mid-Market Manufacturing',
   'article', 'published', 'content', '2026-03-15', '2026-03-20'),

  ('c0000001-0000-0000-0000-000000000001',
   'Why Your OT Network Is Your Biggest Competitive Risk',
   'article', 'in_progress', 'aeo', '2026-04-20', '2026-04-25'),

  ('c0000001-0000-0000-0000-000000000001',
   'Q1 Plant Floor Leadership Update',
   'linkedin_post', 'approved', 'content', '2026-04-15', '2026-04-15'),

  ('c0000001-0000-0000-0000-000000000002',
   'PE Portfolio Legal Risk: A 2026 Benchmark Report',
   'whitepaper', 'in_progress', 'content', '2026-04-30', '2026-05-05'),

  ('c0000001-0000-0000-0000-000000000002',
   'What Every Board Should Know About M&A Litigation Exposure',
   'article', 'briefed', 'pr', '2026-04-22', '2026-04-28'),

  ('c0000001-0000-0000-0000-000000000003',
   'The Modern Analytics Stack: A Buyer''s Guide for 2026',
   'article', 'planned', 'aeo', '2026-05-10', '2026-05-15'),

  ('c0000001-0000-0000-0000-000000000003',
   'Why Your BI Tool Is Lying to You',
   'linkedin_post', 'planned', 'content', '2026-04-25', '2026-04-25');

-- ─── VIDEO: PRODUCTIONS ──────────────────────────────────────
INSERT INTO agency.video_productions (client_id, title, format, status, script, vimeo_review_url, revision_count, generated_at)
VALUES
  ('c0000001-0000-0000-0000-000000000001',
   'CEO Thought Leadership: Operational Excellence in 2026',
   'avatar_program', 'client_review',
   'In 2026, the manufacturers who win aren''t the ones with the newest equipment — they''re the ones who know exactly when that equipment is about to fail. At Vantage, we built a system that cut our unplanned downtime by 40% without adding a single headcount. Here''s what we learned.',
   'https://vimeo.com/example/vantage-ceo-v1',
   0, NOW() - INTERVAL '2 days'),

  ('c0000001-0000-0000-0000-000000000001',
   'Plant Floor Safety Culture — Social Short',
   'social_short', 'published',
   'Safety isn''t a program. It''s a culture. See how Vantage''s team-led safety initiatives drove a 60% reduction in incidents.',
   NULL, 1, NOW() - INTERVAL '15 days'),

  ('c0000001-0000-0000-0000-000000000002',
   'Meridian Legal — PE Portfolio Risk Series Ep.1',
   'thought_leadership', 'internal_review',
   'Private equity deal velocity is back. But with it comes a category of litigation risk most boards aren''t pricing in. In this series, Meridian partner Sarah Chen breaks down what''s changed and what your outside counsel should already be telling you.',
   NULL, 0, NOW() - INTERVAL '1 day'),

  ('c0000001-0000-0000-0000-000000000003',
   'Nexus Analytics — Product Explainer',
   'explainer', 'generating',
   NULL, NULL, 0, NULL);

-- ─── TASKS ───────────────────────────────────────────────────
INSERT INTO agency.tasks (tenant_id, client_id, title, type, priority, status, due_date)
VALUES
  ('a0000000-0000-0000-0000-000000000001',
   'c0000001-0000-0000-0000-000000000001',
   'QA and approve Vantage CEO video before client delivery', 'video', 'critical', 'open',
   CURRENT_DATE),

  ('a0000000-0000-0000-0000-000000000001',
   'c0000001-0000-0000-0000-000000000002',
   'Finalize Law360 pitch draft and send for approval', 'pr', 'high', 'open',
   CURRENT_DATE + 1),

  ('a0000000-0000-0000-0000-000000000001',
   'c0000001-0000-0000-0000-000000000001',
   'Write Industry Week follow-up — editor responded positively', 'pr', 'high', 'open',
   CURRENT_DATE + 1),

  ('a0000000-0000-0000-0000-000000000001',
   'c0000001-0000-0000-0000-000000000003',
   'Complete Nexus onboarding questionnaire and brand audit', 'admin', 'high', 'in_progress',
   CURRENT_DATE + 3),

  ('a0000000-0000-0000-0000-000000000001',
   'c0000001-0000-0000-0000-000000000002',
   'Deliver Q1 monthly report to Meridian', 'reporting', 'medium', 'open',
   CURRENT_DATE + 5),

  ('a0000000-0000-0000-0000-000000000001',
   'c0000001-0000-0000-0000-000000000001',
   'Schedule Q2 strategy call with Vantage CMO', 'admin', 'medium', 'open',
   CURRENT_DATE + 7);

-- ─── REPORTS ─────────────────────────────────────────────────
INSERT INTO agency.reports (client_id, period_start, period_end, type, status, data_snapshot)
VALUES
  ('c0000001-0000-0000-0000-000000000001',
   '2026-03-01', '2026-03-31', 'monthly', 'sent',
   '{"coverage_count": 2, "coverage_by_tier": {"tier1": 1, "tier2": 1, "tier3": 0}, "videos_published": 1, "pitches_sent": 4, "pitches_placed": 1, "generated_at": "2026-04-03T10:00:00Z"}'::jsonb),

  ('c0000001-0000-0000-0000-000000000002',
   '2026-03-01', '2026-03-31', 'monthly', 'sent',
   '{"coverage_count": 2, "coverage_by_tier": {"tier1": 2, "tier2": 0, "tier3": 0}, "videos_published": 0, "pitches_sent": 3, "pitches_placed": 1, "generated_at": "2026-04-03T10:00:00Z"}'::jsonb);

-- ─── ESCALATION (to test escalation banner) ──────────────────
INSERT INTO agency.escalations (client_id, type, severity, description, status, raised_by)
VALUES
  ('c0000001-0000-0000-0000-000000000003',
   'at_risk', 'high',
   'Nexus CEO flagged slow start to onboarding — expected first piece of coverage by end of April. Need to accelerate PR push.',
   'open', NULL);
