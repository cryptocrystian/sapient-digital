import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .schema('agency')
    .from('editorial_calendar')
    .insert({
      client_id: params.clientId,
      title: body.title,
      format: body.format,
      pillar: body.pillar || null,
      status: 'planned',
      due_date: body.due_date || null,
      publish_date: body.publish_date || null,
      target_keyword: body.target_keyword || null,
      notes: body.notes || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
