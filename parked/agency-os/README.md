# AgencyOS — Parked

Multi-tenant agency management portal. Next.js 14 application. Declared as `@sapient/agency-os` in package.json.

## Structure (as received from Pravado extraction)

- `src/` — Application source (68 TS/TSX files, 5,759 LOC)
- `package.json` — Declares four vestigial `@pravado/*` workspace dependencies; these imports are not actually used in source code. Should be removed during activation before first `pnpm install`.
- `next.config.js` — Lists same four packages in `transpilePackages`. Remove during activation.
- `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js` — Self-contained, no Pravado references
- `.env.local`, `.env.production` — Environment variable scaffolding. Values must be rotated and repointed to new Sapient Supabase project during activation.
- `deploy.sh`, `pre-deploy-check.sh` — Deployment scripts (currently reference old shared-infra setup; update during activation)

## Known issues flagged during discovery

- Four unused `@pravado/*` workspace dependencies in package.json and next.config.js
- `src/lib/api/client.ts` contains stubbed Fastify client pointing at `/agency/v1/*` with zero call sites (ready for activation, becomes the Pravado API consumer)
- Supabase Site URL conflict (was set to agency.sapientdigital.io when project was shared with Pravado; resolve during activation with new dedicated Sapient Supabase project)

## Activation sequence

Refer to `parked/README.md` for the full activation sequence.
