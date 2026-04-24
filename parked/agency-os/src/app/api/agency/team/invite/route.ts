import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const { email, name, role } = await request.json();
  if (!email || !role) return NextResponse.json({ success: false, error: 'email and role required' }, { status: 400 });

  const supabase = createSupabaseServiceClient();

  // Send Supabase invite — triggers magic link email via Resend SMTP
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003';
  const { data: authData, error: authError } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${appUrl}/auth/callback?redirect=/dashboard`,
    data: { name, role, invited_to: 'sapient_digital' },
  });

  if (authError) return NextResponse.json({ success: false, error: authError.message }, { status: 500 });

  // Pre-create tenant_member so they have access on first login
  // tenant_members schema: id, tenant_id, user_id, role, name, avatar_url, created_at
  await supabase.schema('agency').from('tenant_members').upsert({
    tenant_id: 'a0000000-0000-0000-0000-000000000001',
    user_id: authData.user.id,
    role,
    name: name || email.split('@')[0],
  }, { onConflict: 'tenant_id,user_id' });

  return NextResponse.json({ success: true, user_id: authData.user.id });
}

export async function GET() {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.schema('agency').from('tenant_members')
    .select('id, user_id, role, name, created_at')
    .eq('tenant_id', 'a0000000-0000-0000-0000-000000000001')
    .order('created_at');
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true, data });
}
