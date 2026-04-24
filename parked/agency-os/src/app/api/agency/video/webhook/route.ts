import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';
import crypto from 'crypto';

const EVENT_STATUS: Record<string, string> = {
  'production.needs_internal_review': 'internal_review',
  'production.failed':                'failed',
  'script_extracted':                 'script_review',
  'generation_started':               'generating',
  'generation_complete':              'generating',
  'assembly_complete':                'internal_review',
  'vimeo_uploaded':                   'internal_review',
  'publish_complete':                 'published',
  'failed':                           'failed',
};

// Skip auth — validated by webhook secret
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const secret = process.env.N8N_WEBHOOK_SECRET;
  const body   = await request.json();

  // Validate secret
  if (secret) {
    const plain = request.headers.get('x-webhook-secret');
    const hmac  = request.headers.get('x-webhook-signature');
    let valid   = false;
    if (plain) {
      valid = plain === secret;
    } else if (hmac) {
      const expected = crypto.createHmac('sha256', secret)
        .update(JSON.stringify(body)).digest('hex');
      valid = hmac === `sha256=${expected}`;
    }
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { event, production_id, execution_id, payload = {}, error: errMsg } = body;
  if (!production_id) return NextResponse.json({ error: 'Missing production_id' }, { status: 400 });

  const supabase = createSupabaseServiceClient();
  const newStatus = EVENT_STATUS[event];
  if (!newStatus) return NextResponse.json({ received: true, skipped: true });

  const update: Record<string, unknown> = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };

  if (execution_id)           update.n8n_job_id           = execution_id;
  if (payload.vimeo_review_url) update.vimeo_review_url   = payload.vimeo_review_url;
  if (payload.youtube_url)    update.youtube_url          = payload.youtube_url;
  if (payload.youtube_id)     update.youtube_id           = payload.youtube_id;
  if (event === 'generation_complete' || event === 'production.needs_internal_review') {
    update.generated_at = new Date().toISOString();
  }
  if (event === 'publish_complete') {
    update.published_at = new Date().toISOString();
  }

  const { error } = await supabase.schema('agency')
    .from('video_productions')
    .update(update)
    .eq('id', production_id);

  if (error) {
    console.error('[video/webhook] update failed', { error, production_id });
    return NextResponse.json({ error: 'DB update failed' }, { status: 500 });
  }

  console.log('[video/webhook]', event, production_id, '->', newStatus);
  return NextResponse.json({ received: true, status: newStatus });
}
