import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { sendEmail, reportDeliveryEmail } from '@/lib/email';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { clientId: string; reportId: string } }
) {
  const body = await request.json();
  const supabase = createSupabaseServiceClient();

  const update: Record<string, unknown> = { status: body.status };
  if (body.status === 'sent') update.sent_at = new Date().toISOString();

  const { data: report, error } = await supabase.schema('agency').from('reports')
    .update(update).eq('id', params.reportId).select().single();

  if (error) return NextResponse.json({ success: false, error }, { status: 500 });

  // When marked sent — email all client approvers
  if (body.status === 'sent') {
    const snap = report.data_snapshot as any;
    const [{ data: client }, { data: contacts }] = await Promise.all([
      supabase.schema('agency').from('clients').select('name').eq('id', params.clientId).single(),
      supabase.schema('agency').from('client_members')
        .select('email, name').eq('client_id', params.clientId).eq('role', 'approver'),
    ]);

    if (contacts && contacts.length > 0) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://agency.sapientdigital.io';
      const period = snap?.period_start
        ? new Date(snap.period_start).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Monthly';

      await sendEmail({
        to: contacts.map((c: any) => c.email),
        subject: `${client?.name ?? 'Your'} ${period} Performance Report`,
        html: reportDeliveryEmail({
          clientName: client?.name ?? 'Client',
          period,
          reportUrl: `${appUrl}/clients/${params.clientId}/reports`,
          agentName: 'Your Sapient Digital Team',
          coverageCount: snap?.coverage_count ?? 0,
          tier1Count:    snap?.coverage_by_tier?.tier1 ?? 0,
        }),
      });
    }
  }

  return NextResponse.json({ success: true, data: report });
}
