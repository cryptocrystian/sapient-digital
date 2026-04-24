/**
 * Resend email utility for transactional emails.
 * Used for: client report delivery, video review notifications, etc.
 * Auth emails (magic links, invites) go through Supabase → Resend SMTP.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@sapientdigital.io';
const FROM_NAME = process.env.RESEND_FROM_NAME || 'Sapient Digital';

interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<{ id: string } | null> {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping email send');
    return null;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${FROM_NAME} <${FROM}>`,
      to: Array.isArray(payload.to) ? payload.to : [payload.to],
      subject: payload.subject,
      html: payload.html,
      reply_to: payload.replyTo,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[email] Resend error:', err);
    return null;
  }

  return res.json();
}

// ─── Email Templates ──────────────────────────────────────────────────────────

export function reportDeliveryEmail(params: {
  clientName: string;
  period: string;
  reportUrl: string;
  agentName: string;
  coverageCount: number;
  tier1Count: number;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0A0A0F; color: #E8E8ED; margin: 0; padding: 40px 20px; }
  .container { max-width: 560px; margin: 0 auto; }
  .header { border-bottom: 2px solid #C4A25C; padding-bottom: 20px; margin-bottom: 28px; }
  .brand { font-size: 18px; font-weight: 700; color: #E8E8ED; }
  .gold { color: #C4A25C; }
  h1 { font-size: 24px; font-weight: 700; margin: 0 0 8px; }
  .meta { font-size: 14px; color: #3D3D4A; margin-bottom: 28px; }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0; }
  .stat { background: #13131A; border: 1px solid #1F1F28; border-radius: 8px; padding: 16px; text-align: center; }
  .stat-value { font-size: 28px; font-weight: 700; color: #E8E8ED; }
  .stat-label { font-size: 11px; color: #3D3D4A; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
  .cta { display: inline-block; background: #C4A25C; color: #0A0A0F; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 20px; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #1F1F28; font-size: 12px; color: #3D3D4A; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">Sapient <span class="gold">Digital</span></div>
    </div>
    <h1>${params.clientName}</h1>
    <div class="meta">${params.period} Performance Report</div>
    <p style="font-size:15px;line-height:1.6;color:#E8E8ED;">
      Your monthly performance report is ready. Here's a snapshot of what we accomplished together this month.
    </p>
    <div class="stats">
      <div class="stat">
        <div class="stat-value">${params.coverageCount}</div>
        <div class="stat-label">Placements</div>
      </div>
      <div class="stat">
        <div class="stat-value">${params.tier1Count}</div>
        <div class="stat-label">Tier 1</div>
      </div>
      <div class="stat">
        <div class="stat-value" class="gold">↑</div>
        <div class="stat-label">Momentum</div>
      </div>
    </div>
    <a href="${params.reportUrl}" class="cta">View Full Report</a>
    <div class="footer">
      Sent by ${params.agentName} at Sapient Digital<br>
      <a href="mailto:hello@sapientdigital.io" style="color:#C4A25C;">hello@sapientdigital.io</a>
    </div>
  </div>
</body>
</html>`;
}

export function videoReviewEmail(params: {
  clientName: string;
  videoTitle: string;
  vimeoUrl: string;
  agentName: string;
  feedbackDeadline?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0A0A0F; color: #E8E8ED; margin: 0; padding: 40px 20px; }
  .container { max-width: 560px; margin: 0 auto; }
  .brand { font-size: 18px; font-weight: 700; margin-bottom: 28px; border-bottom: 2px solid #C4A25C; padding-bottom: 20px; }
  .gold { color: #C4A25C; }
  h1 { font-size: 22px; font-weight: 700; margin: 0 0 8px; }
  .video-box { background: #13131A; border: 1px solid #1F1F28; border-radius: 10px; padding: 20px; margin: 24px 0; }
  .video-title { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
  .cta { display: inline-block; background: #C4A25C; color: #0A0A0F; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 6px; text-decoration: none; }
  .deadline { font-size: 13px; color: #3D3D4A; margin-top: 16px; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #1F1F28; font-size: 12px; color: #3D3D4A; }
</style></head>
<body>
  <div class="container">
    <div class="brand">Sapient <span class="gold">Digital</span></div>
    <h1>Your video is ready for review</h1>
    <p style="font-size:15px;line-height:1.6;color:#E8E8ED;">
      We've completed production on a new video for ${params.clientName}. Please review and let us know if you'd like any changes.
    </p>
    <div class="video-box">
      <div class="video-title">${params.videoTitle}</div>
      <p style="font-size:13px;color:#3D3D4A;margin:0 0 16px;">Click below to watch the video and leave feedback directly on Vimeo.</p>
      <a href="${params.vimeoUrl}" class="cta">Watch & Review →</a>
      ${params.feedbackDeadline ? `<div class="deadline">Please provide feedback by ${params.feedbackDeadline}</div>` : ''}
    </div>
    <div class="footer">
      Sent by ${params.agentName} at Sapient Digital<br>
      Reply to this email with any questions.
    </div>
  </div>
</body>
</html>`;
}
