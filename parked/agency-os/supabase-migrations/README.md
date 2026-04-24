# Parked Supabase Migrations

Two migrations extracted from Pravado's repo:

- `90_create_agency_schema.sql` — Creates the `agency` Postgres schema with 13 tables (clients, retainers, video_productions, tasks, coverage, escalations, client_pillars, reports, pitches, editorial_calendar, tenant_members, tenants, agency_tenant_members_with_tenant view)
- `91_seed_agency_demo_data.sql` — Seeds demo data for development

**Activation:** These migrations run against Sapient's dedicated Supabase project (to be created during activation), not the current shared Pravado project.

**Current state at parking:** The `agency` schema already exists in the shared Supabase project (the migrations have been applied there). During activation, the schema and its data must be migrated from the shared project to the new Sapient project using pg_dump/pg_restore or equivalent.
