import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.schema('agency').from('reports')
    .insert({
      client_id: params.clientId,
      period_start: body.period_start,
      period_end: body.period_end,
      type: body.type ?? 'monthly',
      status: 'ready',
      data_snapshot: body.data_snapshot ?? null,
    })
    .select().single();
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
