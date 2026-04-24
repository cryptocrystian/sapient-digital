# Sapient Digital Canon

Canonical documentation for Sapient Digital — the agency services venture under the
Saipien Labs umbrella.

## Scope

This canon contains architectural, product, business, and operational decisions specific
to Sapient Digital, including:

- Agency services model (direct client operations, retainer pricing, delivery workflows)
- Multi-tenant platform architecture
- White-label partner program
- Shared technical capabilities used by Sapient (including video pipeline)

Sapient consumes Pravado's intelligence layer (journalists, CiteMind, EVI, SAGE reasoning)
as a first-party consumer of Pravado's public API, not via shared infrastructure. Sapient
operates on its own Supabase project, its own repo, and its own deployments. See Pravado's
`DECISIONS_LOG.md` D026 for the architectural principles governing cross-venture integration.

Documentation for Pravado's product is in the Pravado repository; documentation for
cross-venture infrastructure decisions will live at the Saipien Labs umbrella level when
established.

## Canon index

_This index will be populated as Sapient's canonical documentation develops._

- `AGENCY_OS_SPEC.md` — multi-tenant agency platform specification
- `VIDEO_PIPELINE.md` — video production pipeline capability (shared with Pravado's video add-on product)

## Parked artifacts

Awaiting activation post-Pravado-beta. See `parked/README.md` for full context.

- `parked/agency-os/` — Multi-tenant agency management portal extracted from Pravado's repo on 2026-04-22
- `docs/extraction-archive/` — Historical session notes and audit reports from the extraction

## Version

- v0.2 — 2026-04-22 — AgencyOS extraction received; canon scope corrected to reflect Pravado D026 (air-gapped infrastructure, API-based consumption)
- v0.1 — 2026-04-22 — initial canon directory established with two documents relocated from Pravado
