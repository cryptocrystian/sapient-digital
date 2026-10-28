import { NextRequest, NextResponse } from 'next/server';

/**
 * Contact form submission endpoint.
 *
 * Flow:
 *   1. Server-side validation (fields + email regex + honeypot + time-to-fill)
 *   2. Simple IP rate limit (in-memory; good for a prototype launch, swap for
 *      Vercel KV / Upstash when traffic warrants it)
 *   3. Fire two emails via Resend — internal notification to the team,
 *      confirmation to the submitter
 *   4. (TODO) Forward to CRM — HubSpot or Attio once selected. Payload shape
 *      is already CRM-friendly, so the hook is a single additional fetch.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory rate limit: 3 submissions per IP per 10 minutes.
// Shared across requests in the same server instance; resets on cold start.
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true };
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  website?: unknown;
  message?: unknown;
  timeline?: unknown;
  honey?: unknown;
  renderedAt?: unknown;
};

type ValidatedPayload = {
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
  timeline: string;
};

function validate(payload: ContactPayload): { ok: true; data: ValidatedPayload } | { ok: false; error: string; field?: string } {
  if (typeof payload.honey === 'string' && payload.honey.length > 0) {
    return { ok: false, error: 'Submission rejected.' };
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const company = typeof payload.company === 'string' ? payload.company.trim() : '';
  const website = typeof payload.website === 'string' ? payload.website.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const timeline = typeof payload.timeline === 'string' ? payload.timeline.trim() : '';

  if (!name) return { ok: false, error: 'Please enter your name.', field: 'name' };
  if (!email || !EMAIL_REGEX.test(email)) {
    return { ok: false, error: 'Please enter a valid work email.', field: 'email' };
  }
  if (!company) return { ok: false, error: 'Please enter your company.', field: 'company' };
  if (!message || message.length < 10) {
    return { ok: false, error: 'Tell us a bit more about what you are trying to improve.', field: 'message' };
  }
  if (message.length > 4000) {
    return { ok: false, error: 'Message is too long. Please shorten to under 4000 characters.', field: 'message' };
  }

  const renderedAt = typeof payload.renderedAt === 'number' ? payload.renderedAt : 0;
  if (renderedAt && Date.now() - renderedAt < 2000) {
    return { ok: false, error: 'Submission rejected.' };
  }

  return {
    ok: true,
    data: { name, email, company, website, message, timeline },
  };
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

async function sendInternalNotification(data: ValidatedPayload): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const toAddr = process.env.CONTACT_FORM_RECIPIENT ?? 'hello@sapientdigital.io';
  if (!resendKey) return;

  const html = `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F6F3EA;color:#16161A;margin:0;padding:32px 20px">
  <div style="max-width:560px;margin:0 auto;background:#FFF;border:1px solid #CFCBB9;padding:28px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;color:#FF5722;text-transform:uppercase;margin-bottom:12px">Resultant Scorecard · New Contact</div>
    <h1 style="font-family:Georgia,serif;font-size:22px;letter-spacing:-.015em;margin:0 0 20px;color:#16161A">${esc(data.name)} at ${esc(data.company)}</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#16161A">
      <tr><td style="padding:8px 12px 8px 0;color:#6A6A74;font-size:11px;letter-spacing:.1em;text-transform:uppercase;vertical-align:top;width:120px">Name</td><td style="padding:8px 0">${esc(data.name)}</td></tr>
      <tr><td style="padding:8px 12px 8px 0;color:#6A6A74;font-size:11px;letter-spacing:.1em;text-transform:uppercase;vertical-align:top">Email</td><td style="padding:8px 0"><a href="mailto:${esc(data.email)}" style="color:#D44214">${esc(data.email)}</a></td></tr>
      <tr><td style="padding:8px 12px 8px 0;color:#6A6A74;font-size:11px;letter-spacing:.1em;text-transform:uppercase;vertical-align:top">Company</td><td style="padding:8px 0">${esc(data.company)}</td></tr>
      ${data.website ? `<tr><td style="padding:8px 12px 8px 0;color:#6A6A74;font-size:11px;letter-spacing:.1em;text-transform:uppercase;vertical-align:top">Website</td><td style="padding:8px 0"><a href="${esc(data.website)}" style="color:#D44214">${esc(data.website)}</a></td></tr>` : ''}
      ${data.timeline ? `<tr><td style="padding:8px 12px 8px 0;color:#6A6A74;font-size:11px;letter-spacing:.1em;text-transform:uppercase;vertical-align:top">Timeline</td><td style="padding:8px 0">${esc(data.timeline)}</td></tr>` : ''}
    </table>
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid #CFCBB9">
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;color:#6A6A74;text-transform:uppercase;margin-bottom:8px">What they want to improve</div>
      <div style="font-size:14.5px;line-height:1.6;white-space:pre-wrap">${esc(data.message)}</div>
    </div>
    <p style="font-size:12px;color:#6A6A74;margin-top:28px;padding-top:16px;border-top:1px solid #CFCBB9">
      Received at ${new Date().toISOString()} · <a href="mailto:${esc(data.email)}?subject=Re:%20Your%20note%20to%20Sapient%20Digital" style="color:#D44214">Reply directly</a>
    </p>
  </div></body></html>`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Sapient Digital <${process.env.RESEND_FROM_EMAIL ?? 'noreply@sapientdigital.io'}>`,
      to: [toAddr],
      reply_to: data.email,
      subject: `New contact · ${data.name} at ${data.company}`,
      html,
    }),
  }).catch(() => {});
}

async function sendConfirmation(data: ValidatedPayload): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const firstName = data.name.split(' ')[0] || 'there';

  const html = `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F6F3EA;color:#16161A;margin:0;padding:32px 20px">
  <div style="max-width:520px;margin:0 auto">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.22em;color:#16161A;padding-bottom:20px;margin-bottom:24px;border-bottom:2px solid #D44214">SAPIENT<span style="color:#D44214">·</span>DIGITAL</div>
    <h1 style="font-family:Georgia,serif;font-size:28px;letter-spacing:-.02em;line-height:1.1;margin:0 0 16px;color:#16161A">Thanks, ${esc(firstName)}.</h1>
    <p style="font-size:15px;color:#4A4A50;line-height:1.65;margin:0 0 20px">
      We&apos;ve got your note and we&apos;ll respond within one business day — usually faster.
    </p>
    <p style="font-size:15px;color:#4A4A50;line-height:1.65;margin:0 0 24px">
      In the meantime, if you haven&apos;t already, running the free Resultant Scorecard&trade; gives us a concrete starting point to review together.
    </p>
    <div style="padding:16px 20px;background:#EDE9DD;border-left:3px solid #D44214;margin-bottom:28px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em;color:#D44214;text-transform:uppercase;margin-bottom:8px">What You Sent</div>
      <div style="font-size:13px;line-height:1.55;color:#4A4A50;white-space:pre-wrap">${esc(data.message)}</div>
    </div>
    <a href="https://sapientdigital.io/audit" style="display:inline-block;background:#D44214;color:#FFF;padding:13px 22px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none">Score Your Presence →</a>
    <div style="margin-top:40px;padding-top:20px;border-top:1px solid #CFCBB9;font-size:11px;color:#8A8878;letter-spacing:.08em">
      Sapient Digital LLC · <a href="https://sapientdigital.io" style="color:#D44214;text-decoration:none">sapientdigital.io</a>
    </div>
  </div></body></html>`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Sapient Digital <${process.env.RESEND_FROM_EMAIL ?? 'noreply@sapientdigital.io'}>`,
      to: [data.email],
      subject: 'Got your note — we\'ll respond within one business day',
      html,
    }),
  }).catch(() => {});
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter ?? 600) } },
    );
  }

  let payload: ContactPayload = {};
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const validated = validate(payload);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error, field: validated.field }, { status: 400 });
  }

  // Fire-and-forget emails; the user's response is not blocked by email delivery.
  void sendInternalNotification(validated.data);
  void sendConfirmation(validated.data);

  // TODO: forward to CRM (HubSpot / Attio) once a system is selected.
  // Payload shape is already CRM-friendly: name / email / company / website / message / timeline.

  return NextResponse.json({ ok: true });
}
