# Parked Artifacts — Awaiting Activation

This directory holds code, configuration, and operational artifacts that have been relocated here pending formal activation within Sapient Digital's infrastructure.

## Current contents

### `agency-os/`
Multi-tenant agency management portal (Next.js 14 application) extracted from Pravado's repo on 2026-04-22. This is Sapient Digital's frontend application for agency operations.

**Status:** Parked. Not integrated into Sapient's active codebase.

**Activation trigger:** Immediately after Pravado beta launches.

**Activation steps (documented for future session):**
1. Stand up dedicated Sapient Supabase project (separate from Pravado's)
2. Migrate `agency` schema and data from Pravado's shared Supabase project to the new Sapient project
3. Update environment variables to point to new Supabase project
4. Move `parked/agency-os/` to `apps/agency-os/` (or desired structure)
5. Establish Sapient's own pnpm workspace configuration
6. Wire AgencyOS to consume Pravado's public API (endpoint stub already exists at `src/lib/api/client.ts`)
7. Set up Vercel deployment for Sapient domain
8. Reconcile Supabase auth (AgencyOS has its own auth flow; verify against new project)

## Why parked rather than active

Sapient Digital operates as an independent venture under the Saipien Labs umbrella. Complete infrastructure separation from Pravado is the architectural principle (air-gapped Supabase, separate repo, separate deployments, separate brand).

Activation is sequenced to follow Pravado's beta launch so engineering attention isn't split across two concurrent build-outs. Parking duration: approximately 2-6 weeks.

## Canonical references

- Extraction context: see `docs/extraction-archive/` for session notes and audit reports from the Pravado → Sapient extraction
- Architectural principles: see Pravado's DECISIONS_LOG D026 for the extraction decision and rationale
- Supabase architecture: the current shared Supabase project serves Pravado only post-extraction; Sapient's project does not yet exist

## Do not

- Do not attempt to build or run code from `parked/agency-os/` without first completing activation
- Do not import from parked code into any active Sapient source
- Do not add new files to `parked/` directly — parking is a short-term relocation pattern, not a long-term storage pattern
