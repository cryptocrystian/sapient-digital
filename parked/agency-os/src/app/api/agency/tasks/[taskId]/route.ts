import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase
    .schema('agency').from('tasks')
    .update({ status: body.status })
    .eq('id', params.taskId);
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true });
}
