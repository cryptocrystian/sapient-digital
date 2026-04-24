import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.schema('agency').from('clients')
    .select('id, name, slug, status, domain').order('name');
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();
  const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const { data: client, error } = await supabase.schema('agency').from('clients')
    .insert({
      tenant_id: 'a0000000-0000-0000-0000-000000000001',
      name: body.name, slug,
      domain: body.domain,
      industry: body.industry || null,
      segment: body.segment || null,
      brand_voice: body.brand_voice || null,
      icp_description: body.icp_description || null,
      competitors: body.competitors || [],
      status: 'onboarding',
    }).select().single();
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  if (body.retainer) {
    await supabase.schema('agency').from('retainers').insert({
      client_id: client.id,
      tier: body.retainer.tier,
      monthly_value: body.retainer.monthly_value,
      start_date: body.retainer.start_date,
      onboarding_fee: body.retainer.onboarding_fee || null,
      video_module: body.retainer.video_module || null,
      status: 'active',
    });
  }
  if (body.pillars?.length > 0) {
    await supabase.schema('agency').from('client_pillars').insert(
      body.pillars.map((p: string) => ({ client_id: client.id, pillar: p, status: 'active' }))
    );
  }
  return NextResponse.json({ success: true, data: client }, { status: 201 });
}
