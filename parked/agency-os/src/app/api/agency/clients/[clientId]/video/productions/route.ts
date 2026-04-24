import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.schema('agency').from('video_productions')
    .insert({
      client_id: body.client_id,
      format: body.format,
      title: body.title,
      script: body.script || null,
      status: 'queued',
    })
    .select().single();
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
