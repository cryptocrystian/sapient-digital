#!/usr/bin/env bash
# Pre-deploy verification — run in WSL before pushing to Vercel
# Usage: bash apps/agency-os/pre-deploy-check.sh

set -e
cd /home/saipienlabs/projects/pravado-v2

echo "=== Agency OS Pre-Deploy Checks ==="

echo ""
echo "1. TypeScript..."
cd apps/agency-os
npx tsc --noEmit 2>&1 | grep -E "error TS|warning|✓" | head -20
TSC_RESULT=$?
if [ $TSC_RESULT -eq 0 ]; then echo "   ✅ TypeScript OK"; else echo "   ❌ TypeScript errors found"; fi
cd ../..

echo ""
echo "2. Route file audit..."
ROUTES=(
  "apps/agency-os/src/app/api/agency/tasks/route.ts"
  "apps/agency-os/src/app/api/agency/tasks/[taskId]/route.ts"
  "apps/agency-os/src/app/api/agency/clients/route.ts"
  "apps/agency-os/src/app/api/agency/clients/[clientId]/pitches/route.ts"
  "apps/agency-os/src/app/api/agency/clients/[clientId]/pitches/[pitchId]/route.ts"
  "apps/agency-os/src/app/api/agency/clients/[clientId]/coverage/route.ts"
  "apps/agency-os/src/app/api/agency/clients/[clientId]/content/route.ts"
  "apps/agency-os/src/app/api/agency/clients/[clientId]/settings/route.ts"
  "apps/agency-os/src/app/api/agency/clients/[clientId]/reports/route.ts"
  "apps/agency-os/src/app/api/agency/clients/[clientId]/reports/snapshot/route.ts"
  "apps/agency-os/src/app/api/agency/clients/[clientId]/reports/[reportId]/route.ts"
  "apps/agency-os/src/app/api/agency/clients/[clientId]/video/productions/route.ts"
  "apps/agency-os/src/app/api/agency/clients/[clientId]/video/productions/[productionId]/[action]/route.ts"
  "apps/agency-os/src/app/api/agency/video/productions/route.ts"
  "apps/agency-os/src/app/api/agency/video/webhook/route.ts"
  "apps/agency-os/src/app/api/agency/reports/narrative/route.ts"
  "apps/agency-os/src/app/api/agency/team/invite/route.ts"
)
MISSING=0
for f in "${ROUTES[@]}"; do
  if [ -f "$f" ]; then echo "   ✅ $f"; else echo "   ❌ MISSING: $f"; MISSING=$((MISSING+1)); fi
done
echo "   $((${#ROUTES[@]} - MISSING))/${#ROUTES[@]} route files present"

echo ""
echo "3. Dev server smoke test..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3003/dashboard | grep -q "200"; then
  echo "   ✅ Dev server healthy"
  # Quick API check
  SNAP=$(curl -s "http://localhost:3003/api/agency/clients/c0000001-0000-0000-0000-000000000001/reports/snapshot?start=2026-03-01&end=2026-03-31")
  if echo $SNAP | python3 -c "import sys,json; d=json.load(sys.stdin); assert d['success']" 2>/dev/null; then
    echo "   ✅ Snapshot API healthy"
  else
    echo "   ❌ Snapshot API failed"
  fi
else
  echo "   ⚠️  Dev server not running — start with: pnpm --filter @sapient/agency-os dev"
fi

echo ""
echo "=== Pre-deploy check complete ==="
echo ""
echo "To deploy: bash apps/agency-os/deploy.sh"
echo "Or via Vercel UI: vercel.com/new → Import pravado-v2 → Root: apps/agency-os"
