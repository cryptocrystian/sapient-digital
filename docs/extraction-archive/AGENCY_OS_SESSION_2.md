# Agency OS — Claude Code Session: Live Testing + Next Builds

## Context
Monorepo at `/home/saipienlabs/projects/pravado-v2/`
Agency OS runs on `http://localhost:3003` (port 3003)
n8n instance: `https://n8n.srv816212.hstgr.cloud`
Supabase project: `kroexsdyyqmlxfpbwajv`
All env vars in `apps/agency-os/.env.local`

---

## Task 1: Smoke Test All New Routes

These were added since the last verification. Test them all:

```bash
BASE="http://localhost:3003"
CLIENT_ID="c0000001-0000-0000-0000-000000000001"

echo "=== NEW ROUTES ADDED SINCE LAST VERIFICATION ==="

# Content calendar add item
echo -n "POST /api/agency/clients/[id]/content: "
curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/agency/clients/$CLIENT_ID/content" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test content item","format":"article","pillar":"content","due_date":"2026-05-01"}'

# Client settings save
echo -n "PATCH /api/agency/clients/[id]/settings: "
curl -s -o /dev/null -w "%{http_code}" -X PATCH "$BASE/api/agency/clients/$CLIENT_ID/settings" \
  -H "Content-Type: application/json" \
  -d '{"name":"Vantage Industrial","domain":"vantageindustrial.com","brand_voice":"Authoritative and technical"}'

# Video webhook (n8n callback)
echo -n "POST /api/agency/video/webhook: "
PROD_ID=$(curl -s "$SUPABASE_URL/rest/v1/video_productions?client_id=eq.$CLIENT_ID&select=id&limit=1" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Accept-Profile: agency" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")
# NOTE (2026-04-24 sanitization): Original snippet inlined a Supabase service_role
# JWT and the shared project URL. Both were revoked 2026-04-22. Values replaced
# with shell variable references for documentation purposes.

curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/agency/video/webhook" \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: sapient-video-pipeline-2026" \
  -d "{\"event\":\"production.needs_internal_review\",\"production_id\":\"$PROD_ID\",\"execution_id\":\"test-123\",\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}"

echo ""
echo "=== ALL PAGES ==="
for path in /dashboard /clients /tasks /video /settings/integrations /settings/team \
  /clients/$CLIENT_ID/overview \
  /clients/$CLIENT_ID/pr/pitches \
  /clients/$CLIENT_ID/content/calendar \
  /clients/$CLIENT_ID/video/queue \
  /clients/$CLIENT_ID/video/new \
  /clients/$CLIENT_ID/reports \
  /clients/$CLIENT_ID/settings \
  /clients/new; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
  icon="✅"
  [ "$status" != "200" ] && icon="❌"
  echo "$icon $path: $status"
done
```

Fix anything that returns non-200 (404 = missing route, 500 = runtime error).

---

## Task 2: Test Full Report Generation Flow

```bash
CLIENT_ID="c0000001-0000-0000-0000-000000000001"
BASE="http://localhost:3003"

echo "=== REPORT GENERATION FLOW ==="

# Step 1: Build snapshot
echo "Step 1: Build snapshot for March 2026..."
SNAPSHOT=$(curl -s "$BASE/api/agency/clients/$CLIENT_ID/reports/snapshot?start=2026-03-01&end=2026-03-31")
echo $SNAPSHOT | python3 -c "
import sys, json
d = json.load(sys.stdin)
s = d.get('snapshot', {})
print(f'  Coverage: {s.get(\"coverage_count\", 0)}')
print(f'  Tier 1: {s.get(\"coverage_by_tier\", {}).get(\"tier1\", 0)}')
print(f'  Pitches placed: {s.get(\"pitches_placed\", 0)}/{s.get(\"pitches_sent\", 0)}')
print(f'  Videos published: {s.get(\"videos_published\", 0)}')
print(f'  Success: {d.get(\"success\")}')
"

# Step 2: Generate narrative
echo "Step 2: Generate Claude narrative..."
NARRATIVE=$(curl -s -X POST "$BASE/api/agency/reports/narrative" \
  -H "Content-Type: application/json" \
  -d '{
    "snapshot": {
      "client_name": "Vantage Industrial",
      "period_start": "2026-03-01",
      "period_end": "2026-03-31",
      "pitches_sent": 3,
      "pitches_placed": 1,
      "pitch_rate": 33,
      "coverage_count": 2,
      "coverage_by_tier": {"tier1": 1, "tier2": 1, "tier3": 0},
      "coverage_headlines": ["Vantage Industrial Cuts Unplanned Downtime by 40% in 18 Months"],
      "videos_published": 1,
      "videos_in_progress": 1,
      "content_published": 1,
      "open_tasks": 3
    }
  }')

echo "$NARRATIVE" | python3 -c "
import sys, json
d = json.load(sys.stdin)
narr = d.get('narrative', '')
print(f'  Narrative length: {len(narr)} chars')
print(f'  Preview: {narr[:200]}...')
"

# Step 3: Save report
echo "Step 3: Save report to DB..."
SAVE_RESULT=$(curl -s -X POST "$BASE/api/agency/clients/$CLIENT_ID/reports" \
  -H "Content-Type: application/json" \
  -d "{
    \"period_start\": \"2026-04-01\",
    \"period_end\": \"2026-04-30\",
    \"type\": \"monthly\",
    \"data_snapshot\": {
      \"coverage_count\": 2,
      \"pitches_placed\": 1,
      \"ai_narrative\": \"Test narrative from Claude Code verification.\",
      \"generated_at\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
    }
  }")

REPORT_ID=$(echo $SAVE_RESULT | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('id','FAILED'))")
echo "  Saved with ID: $REPORT_ID"

# Step 4: Mark as sent
if [ "$REPORT_ID" != "FAILED" ]; then
  echo "Step 4: Mark as sent..."
  curl -s -X PATCH "$BASE/api/agency/clients/$CLIENT_ID/reports/$REPORT_ID" \
    -H "Content-Type: application/json" \
    -d '{"status":"sent"}' | python3 -c "import sys,json; print('  Result:', json.load(sys.stdin))"
fi

echo "=== REPORT FLOW COMPLETE ==="
```

---

## Task 3: Update n8n Webhook URL

The n8n workflow currently calls `https://api.pravado.io` for its Agency OS callbacks.
Update it to use the correct local dev URL for testing, and leave production URL placeholder.

```bash
N8N_KEY="$N8N_API_KEY"  # sanitized 2026-04-24; original JWT value revoked 2026-04-22
WF_ID="j0KTVuxpDt9dXERg"

# Fetch current workflow
WF=$(curl -s "https://n8n.srv816212.hstgr.cloud/api/v1/workflows/$WF_ID" \
  -H "X-N8N-API-KEY: $N8N_KEY")

# Update webhook URL from api.pravado.io to the actual Agency OS webhook endpoint
# For production, this will be the Vercel deployment URL
# For now, update to use AGENCY_OS_WEBHOOK_URL placeholder
UPDATED=$(echo "$WF" | python3 -c "
import sys, json
wf = json.load(sys.stdin)
content = json.dumps(wf)

# Replace old agency OS URL with correct webhook path
content = content.replace(
    'https://api.pravado.io/agency/v1/video/webhook',
    'https://api.pravado.io/api/agency/video/webhook'
)

# Also fix any PATCH status update URLs 
content = content.replace(
    'https://api.pravado.io/agency/v1/video/productions',
    'https://api.pravado.io/api/agency/clients'
)

wf = json.loads(content)
print(json.dumps({'name': wf['name'], 'nodes': wf['nodes'], 'connections': wf['connections'], 'settings': wf['settings']}))
")

# Push back to n8n
echo "Updating n8n workflow..."
RESULT=$(curl -s -X PUT "https://n8n.srv816212.hstgr.cloud/api/v1/workflows/$WF_ID" \
  -H "X-N8N-API-KEY: $N8N_KEY" \
  -H "Content-Type: application/json" \
  -d "$UPDATED")

echo $RESULT | python3 -c "import sys,json; d=json.load(sys.stdin); print('Updated:', d.get('id'), d.get('name'), '| Error:', d.get('message','none'))"
```

---

## Task 4: Add Supabase Realtime to Video Production Page

The video production detail page should auto-update when n8n pushes a webhook.
Find the VideoProductionDetailClient.tsx and add Supabase Realtime subscription:

File: `apps/agency-os/src/app/(agency)/clients/[clientId]/video/[productionId]/VideoProductionDetailClient.tsx`

Add this useEffect after the existing state declarations:

```typescript
// Add at top of file
import { createClient } from '@supabase/supabase-js';

// Add inside component, after useState declarations:
useEffect(() => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const channel = supabase
    .channel(`production-${prod.id}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'agency',
      table: 'video_productions',
      filter: `id=eq.${prod.id}`,
    }, (payload) => {
      const updated = payload.new as typeof prod;
      setProd(p => ({
        ...p,
        status: updated.status,
        script: updated.script ?? p.script,
        n8n_job_id: updated.n8n_job_id ?? p.n8n_job_id,
        vimeo_review_url: updated.vimeo_review_url ?? p.vimeo_review_url,
        youtube_url: updated.youtube_url ?? p.youtube_url,
        generated_at: updated.generated_at ?? p.generated_at,
        published_at: updated.published_at ?? p.published_at,
      }));
    })
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [prod.id]);
```

If you add this, also add `useEffect` to the imports at the top.

---

## Task 5: Add Pitch Status Updates

On the PR pitches page, add a way to update pitch status (e.g. mark as "placed" when coverage lands).
The pitch list items should have a status dropdown or quick-action buttons.

In `apps/agency-os/src/app/(agency)/clients/[clientId]/pr/pitches/page.tsx`:

Add a `PATCH /api/agency/clients/[clientId]/pitches/[pitchId]` route:

Create: `apps/agency-os/src/app/api/agency/clients/[clientId]/pitches/[pitchId]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { clientId: string; pitchId: string } }
) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();
  const update: Record<string, unknown> = { status: body.status };
  if (body.status === 'sent') update.sent_at = new Date().toISOString();
  if (body.follow_up_count !== undefined) update.follow_up_count = body.follow_up_count;
  const { error } = await supabase.schema('agency').from('pitches')
    .update(update).eq('id', params.pitchId);
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

Then in the pitch list, add a status update button next to each pitch (small dropdown or click-through cycle).

---

## Task 6: TypeScript Check + Cleanup

```bash
cd /home/saipienlabs/projects/pravado-v2/apps/agency-os
npx tsc --noEmit 2>&1 | head -40
```

Fix any errors found.

---

## Task 7: Report Results

Print a final status table:

```
NEW ROUTES
POST /api/agency/clients/[id]/content    ✅/❌
PATCH /api/agency/clients/[id]/settings  ✅/❌
POST /api/agency/video/webhook           ✅/❌

FLOW TESTS
Report generation flow (3-step)          ✅/❌
Webhook event → DB status update         ✅/❌

CODE ADDITIONS
Supabase Realtime on video detail        ✅/❌
Pitch status PATCH route                 ✅/❌
n8n webhook URL updated                  ✅/❌

TypeScript                               ✅/❌  [N errors]
```

---

## Key Files Reference

```
apps/agency-os/src/app/
  api/agency/
    tasks/route.ts                           # ✅ EXISTS
    tasks/[taskId]/route.ts                  # ✅ EXISTS
    clients/route.ts                         # ✅ EXISTS
    clients/[clientId]/pitches/route.ts      # ✅ EXISTS
    clients/[clientId]/pitches/[pitchId]/    # ← CREATE THIS
    clients/[clientId]/coverage/route.ts     # ✅ EXISTS
    clients/[clientId]/content/route.ts      # ✅ EXISTS
    clients/[clientId]/settings/route.ts     # ✅ EXISTS
    clients/[clientId]/reports/route.ts      # ✅ EXISTS
    clients/[clientId]/reports/snapshot/     # ✅ EXISTS
    clients/[clientId]/reports/[reportId]/   # ✅ EXISTS
    clients/[clientId]/video/productions/[id]/[action]/  # ✅ EXISTS
    video/productions/route.ts               # ✅ EXISTS
    video/webhook/route.ts                   # ✅ EXISTS
    reports/narrative/route.ts               # ✅ EXISTS
  (agency)/
    clients/[clientId]/
      video/[productionId]/VideoProductionDetailClient.tsx  # ADD REALTIME
      pr/pitches/page.tsx                    # ADD STATUS UPDATES
```

## Env Vars (apps/agency-os/.env.local)
All set. ANTHROPIC_API_KEY, N8N vars, Supabase, Higgsfield, HeyGen, ElevenLabs, Vimeo all configured.
