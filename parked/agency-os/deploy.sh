#!/usr/bin/env bash
# ==============================================================================
# PARKED ARTIFACT — awaiting activation
# ==============================================================================
# Credential placeholders replaced during sanitization 2026-04-24.
# Original values were revoked during 2026-04-22 credential rotation.
# Populate real values from Sapient's dedicated Supabase project at activation time.
# ==============================================================================
#
# Agency OS — Vercel Deployment Script (parked; originally for Pravado monorepo)
# At activation time this will need rework for Sapient's repo structure.
# ============================================================

set -e
VERCEL_TOKEN="<SET_AT_ACTIVATION>"
APP_DIR="apps/agency-os"

echo "🚀 Deploying Sapient Digital Agency OS to Vercel..."

# 1. Type check first
echo "→ Running TypeScript check..."
cd $APP_DIR
npx tsc --noEmit 2>&1 | tail -5
cd ../..

# 2. Deploy with vercel CLI (creates new project if needed)
echo "→ Deploying..."
npx vercel \
  --token "$VERCEL_TOKEN" \
  --cwd "$APP_DIR" \
  --name "sapient-agency-os" \
  --yes \
  --build-env NEXT_PUBLIC_SUPABASE_URL="<SET_AT_ACTIVATION_from_Sapient_Supabase_project>" \
  --build-env NEXT_PUBLIC_SUPABASE_ANON_KEY="<SET_AT_ACTIVATION_from_Sapient_Supabase_project>" \
  --build-env NEXT_PUBLIC_APP_URL="https://agency.sapientdigital.io"

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Add remaining env vars in Vercel dashboard (secrets can't go in CLI flags):"
echo "   SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY, RESEND_API_KEY,"
echo "   N8N_WEBHOOK_SECRET, N8N_VIDEO_PIPELINE_WEBHOOK, HIGGSFIELD_*, HEYGEN_*, etc."
echo "2. Add custom domain: agency.sapientdigital.io"
echo "3. Update Supabase redirect URLs to include https://agency.sapientdigital.io/**"
