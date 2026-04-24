import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { clientId: string; pitchId: string } }
) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();

  const update: Record<string, unknown> = {};
  if (body.status)                       update.status            = body.status;
  if (body.status === 'sent')            update.sent_at           = new Date().toISOString();
  if (body.follow_up_count !== undefined) update.follow_up_count  = body.follow_up_count;
  if (body.response_notes)              update.response_notes     = body.response_notes;

  const { error } = await supabase.schema('agency').from('pitches')
    .update(update).eq('id', params.pitchId);

  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true });
}
