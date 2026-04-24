import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { sendEmail, videoReviewEmail } from '@/lib/email';

export async function POST(
  request: NextRequest,
  { params }: { params: { clientId: string; productionId: string; action: string } }
) {
  const { productionId, action } = params;
  const supabase = createSupabaseServiceClient();

  // ── trigger ───────────────────────────────────────────────────────────────
  if (action === 'trigger') {
    const { data: prod } = await supabase.schema('agency').from('video_productions')
      .select('*, clients(name, domain, brand_voice)').eq('id', productionId).single();
    if (!prod) return NextResponse.json({ success: false, error: { message: 'Not found' } }, { status: 404 });
    if (!prod.script) return NextResponse.json({ success: false, error: { message: 'Script required before triggering pipeline' } }, { status: 400 });

    await supabase.schema('agency').from('video_productions')
      .update({ status: 'scripting' }).eq('id', productionId);

    const n8nUrl = process.env.N8N_VIDEO_PIPELINE_WEBHOOK
      ?? (process.env.N8N_BASE_URL ? `${process.env.N8N_BASE_URL}/webhook/sapient-video-trigger` : null);

    if (n8nUrl) {
      const client = prod.clients as any;
      await fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-webhook-secret': process.env.N8N_WEBHOOK_SECRET ?? '' },
        body: JSON.stringify({
          production_id: productionId,
          format: prod.format,
          script: prod.script,
          client_name: client?.name,
          client_domain: client?.domain,
          brand_voice: client?.brand_voice,
          avatar_id: null,
        }),
      }).catch(e => console.error('[trigger] n8n error:', e));
    }

    return NextResponse.json({ success: true, data: { status: 'scripting' } });
  }

  // ── approve ───────────────────────────────────────────────────────────────
  if (action === 'approve') {
    const { data: prod } = await supabase.schema('agency').from('video_productions')
      .select('*, clients(name)').eq('id', productionId).single();

    await supabase.schema('agency').from('video_productions')
      .update({ status: 'client_review' }).eq('id', productionId);

    // Send Vimeo review email to all client contacts (approver role)
    if (prod?.vimeo_review_url) {
      const { data: contacts } = await supabase.schema('agency').from('client_members')
        .select('email, name')
        .eq('client_id', params.clientId)
        .eq('role', 'approver'); // approver | viewer

      if (contacts && contacts.length > 0) {
        const client = prod.clients as any;
        await sendEmail({
          to: contacts.map((c: any) => c.email),
          subject: `Video ready for review — ${prod.title}`,
          html: videoReviewEmail({
            clientName: client?.name ?? 'Client',
            videoTitle: prod.title,
            vimeoUrl: prod.vimeo_review_url,
            agentName: 'Your Sapient Digital Team',
            feedbackDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
              .toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
          }),
        });
      }
    }

    return NextResponse.json({ success: true });
  }

  // ── publish ───────────────────────────────────────────────────────────────
  if (action === 'publish') {
    await supabase.schema('agency').from('video_productions')
      .update({ status: 'publishing' }).eq('id', productionId);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: { message: `Unknown action: ${action}` } }, { status: 400 });
}
