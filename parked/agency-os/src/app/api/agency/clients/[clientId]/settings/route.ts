import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .schema('agency')
    .from('clients')
    .update({
      name: body.name,
      domain: body.domain,
      brand_voice: body.brand_voice || null,
      icp_description: body.icp_description || null,
      competitors: body.competitors || [],
      industry: body.industry || null,
      segment: body.segment || null,
    })
    .eq('id', params.clientId)
    .select()
    .single();

  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true, data });
}
