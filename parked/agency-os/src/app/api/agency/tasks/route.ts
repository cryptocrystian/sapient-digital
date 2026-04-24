import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .schema('agency').from('tasks')
    .insert({
      tenant_id: body.tenant_id ?? 'a0000000-0000-0000-0000-000000000001',
      client_id: body.client_id || null,
      title: body.title,
      description: body.description || null,
      type: body.type || 'admin',
      priority: body.priority || 'medium',
      status: 'open',
      due_date: body.due_date || null,
    })
    .select(`id, title, description, type, priority, status, due_date, clients(id, name)`)
    .single();
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
