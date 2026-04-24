import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start') ?? '';
  const end   = searchParams.get('end')   ?? '';
  const supabase = createSupabaseServiceClient();

  const [pitchRes, coverageRes, videoRes, contentRes, taskRes] = await Promise.all([
    supabase.schema('agency').from('pitches').select('status').eq('client_id', params.clientId),
    supabase.schema('agency').from('coverage').select('headline,tier')
      .eq('client_id', params.clientId).gte('published_at', start).lte('published_at', end),
    supabase.schema('agency').from('video_productions').select('status').eq('client_id', params.clientId),
    supabase.schema('agency').from('editorial_calendar').select('status').eq('client_id', params.clientId),
    supabase.schema('agency').from('tasks').select('id').eq('client_id', params.clientId).neq('status', 'done'),
  ]);

  const pitches  = pitchRes.data  ?? [];
  const coverage = coverageRes.data ?? [];
  const videos   = videoRes.data  ?? [];
  const content  = contentRes.data ?? [];
  const tasks    = taskRes.data   ?? [];

  const sent   = pitches.filter((p: any) => p.status !== 'draft').length;
  const placed = pitches.filter((p: any) => p.status === 'placed').length;

  const snapshot = {
    pitches_sent:       sent,
    pitches_placed:     placed,
    pitch_rate:         sent > 0 ? Math.round((placed / sent) * 100) : 0,
    coverage_count:     coverage.length,
    coverage_by_tier: {
      tier1: coverage.filter((c: any) => c.tier === 'tier1').length,
      tier2: coverage.filter((c: any) => c.tier === 'tier2').length,
      tier3: coverage.filter((c: any) => c.tier === 'tier3').length,
    },
    coverage_headlines: coverage.slice(0, 3).map((c: any) => c.headline),
    videos_published:   videos.filter((v: any) => v.status === 'published').length,
    videos_in_progress: videos.filter((v: any) => !['published','failed'].includes(v.status)).length,
    content_published:  content.filter((c: any) => c.status === 'published').length,
    open_tasks:         tasks.length,
    period_start:       start,
    period_end:         end,
  };

  return NextResponse.json({ success: true, snapshot });
}
