import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.schema('agency').from('coverage')
    .insert({
      client_id: params.clientId,
      url: body.url,
      publication: body.publication,
      headline: body.headline,
      tier: body.tier,
      published_at: body.published_at || new Date().toISOString(),
      sentiment: body.sentiment || 'positive',
      domain_authority: body.domain_authority ? parseInt(body.domain_authority) : null,
      aeo_indexed: false,
    }).select().single();
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
