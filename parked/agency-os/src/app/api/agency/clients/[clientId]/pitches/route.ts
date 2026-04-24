import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.schema('agency').from('pitches')
    .insert({
      client_id: params.clientId,
      publication: body.publication,
      tier: body.tier,
      subject_line: body.subject_line,
      angle: body.angle,
      body_preview: body.body_preview || null,
      status: body.status || 'draft',
      sent_at: body.status === 'sent' ? new Date().toISOString() : null,
    }).select().single();
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
