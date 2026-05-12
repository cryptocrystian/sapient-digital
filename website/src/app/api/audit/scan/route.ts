import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy to the upstream EVI audit API.
 * Keeps the upstream URL hidden from the client bundle.
 * Adds a Sapient-branded follow-up email after a successful scan.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const apiUrl  = process.env.PRAVADO_API_URL;
  const apiPath = process.env.PRAVADO_AUDIT_PATH ?? '/api/v1/silo-tax/scan';

  if (!apiUrl) {
    return NextResponse.json(
      { error: 'Audit service not configured' },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(`${apiUrl}${apiPath}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    const data = (await upstream.json().catch(() => ({}))) as Record<string, unknown>;

    // Mirror upstream status (preserves rate-limit and validation responses).
    if (!upstream.ok) {
      return NextResponse.json(data, { status: upstream.status });
    }

    // Fire follow-up email — non-blocking, failure does not break the response.
    const email = typeof body.email === 'string' ? body.email : '';
    const name  = typeof body.name  === 'string' ? body.name  : '';
    if (email) {
      void sendFollowUpEmail(email, name, data).catch(() => {});
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Scan service unavailable' }, { status: 503 });
  }
}

async function sendFollowUpEmail(
  email: string,
  name: string,
  scanData: Record<string, unknown>,
) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey || !email) return;

  const score     = typeof scanData.evi_score === 'number' ? scanData.evi_score : 0;
  const band      = score <= 40 ? 'At Risk' : score <= 60 ? 'Emerging' : score <= 80 ? 'Competitive' : 'Dominant';
  const bandColor = score <= 40 ? '#EF4444' : score <= 60 ? '#F59E0B' : score <= 80 ? '#C8934A' : '#22C55E';
  const firstName = name?.split(' ')[0] || 'there';

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0A0B0F;color:#E8E4DE;margin:0;padding:40px 20px}
    .c{max-width:540px;margin:0 auto}
    .logo{font-size:10px;font-weight:700;letter-spacing:.16em;color:#E8E4DE;border-bottom:2px solid #C8934A;padding-bottom:20px;margin-bottom:28px}
    .gold{color:#C8934A} h1{font-size:22px;font-weight:700;margin:0 0 12px;letter-spacing:-.02em}
    .score{display:inline-block;font-size:42px;font-weight:800;color:${bandColor};line-height:1}
    .band{display:inline-block;margin-left:12px;padding:4px 12px;border-radius:5px;font-size:12px;font-weight:700;background:${bandColor}20;color:${bandColor}}
    .cta{display:inline-block;background:#C8934A;color:#0A0B0F;font-weight:700;font-size:13px;padding:12px 24px;border-radius:7px;text-decoration:none;margin-top:24px}
    .footer{margin-top:40px;padding-top:20px;border-top:1px solid #1F1F28;font-size:11px;color:#555}
  </style></head><body><div class="c">
    <div class="logo">SAPIENT<span class="gold"> · </span>DIGITAL</div>
    <h1>Hi ${firstName} — your visibility scorecard is ready.</h1>
    <p style="font-size:14px;color:#999;margin-bottom:20px">Powered by the Signal Engine™</p>
    <div style="background:#13131A;border:1px solid #1F1F28;border-radius:12px;padding:24px;margin-bottom:24px">
      <p style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Visibility Score</p>
      <span class="score">${score}</span><span class="band">${band}</span>
      <p style="font-size:13px;color:#999;margin-top:16px;line-height:1.6">
        ${
          score <= 60
            ? 'Your brand has significant room to build presence across PR, content, and AI platforms. The gaps we identified represent real opportunities your competitors may already be capturing.'
            : 'Your brand has established solid visibility in several areas. The variance between your pillars shows exactly where targeted effort will compound fastest.'
        }
      </p>
    </div>
    <p style="font-size:14px;color:#E8E4DE;line-height:1.7">
      We reviewed your scorecard and want to show you specifically how we'd address your lagging pillars. No commitment — just a direct conversation about where the opportunity is.
    </p>
    <a href="https://sapientdigital.io/contact" class="cta">Book a 30-minute strategy call →</a>
    <div class="footer">Sapient Digital LLC · hello@sapientdigital.io · <a href="https://sapientdigital.io" style="color:#C8934A;text-decoration:none">sapientdigital.io</a></div>
  </div></body></html>`;

  await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from:    `Sapient Digital <${process.env.RESEND_FROM_EMAIL ?? 'noreply@sapientdigital.io'}>`,
      to:      [email],
      subject: `Your visibility scorecard — ${band} (${score}/100)`,
      html,
    }),
  });
}
