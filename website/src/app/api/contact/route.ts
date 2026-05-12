import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONTACT_INBOX = process.env.CONTACT_INBOX ?? 'hello@sapientdigital.io';
const FROM_EMAIL    = process.env.RESEND_FROM_EMAIL ?? 'noreply@sapientdigital.io';
const FROM_NAME     = process.env.RESEND_FROM_NAME ?? 'Sapient Digital Website';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 503 },
    );
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  // Honeypot — silently accept and discard. Bots fill this; humans don't see it.
  if (typeof body.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const name    = typeof body.name    === 'string' ? body.name.trim()    : '';
  const email   = typeof body.email   === 'string' ? body.email.trim()   : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  const url     = typeof body.url     === 'string' ? body.url.trim()     : '';
  const tier    = typeof body.tier    === 'string' ? body.tier.trim()    : '';
  const how     = typeof body.how     === 'string' ? body.how.trim()     : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const source  = typeof body.source  === 'string' ? body.source.trim()  : '';

  if (!name || !email || !company) {
    return NextResponse.json(
      { error: 'Name, email, and company are required.' },
      { status: 400 },
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const internalBody = `
New inquiry from sapientdigital.io

Name:     ${name}
Email:    ${email}
Company:  ${company}
Website:  ${url || 'Not provided'}
Tier:     ${tier || 'Not specified'}
Heard:    ${how || 'Not specified'}
Source:   ${source || 'contact-page'}

Message:
${message || '(no message provided)'}
  `.trim();

  const confirmationBody = `Hi ${name.split(' ')[0] || 'there'},

Thanks for reaching out. We received your inquiry and will review it within one business day.
If we see a strong fit, we'll reply to schedule time.

In the meantime, you can run a free visibility audit at https://sapientdigital.io/audit
to see exactly where you stand across PR, content, and AI presence.

—
Sapient Digital
hello@sapientdigital.io`;

  try {
    // Internal notification
    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [CONTACT_INBOX],
      replyTo: email,
      subject: `New inquiry: ${company} — ${tier || 'General'}`,
      text: internalBody,
    });

    // Confirmation to prospect — non-blocking, don't fail the request if this errors.
    resend.emails
      .send({
        from: `Sapient Digital <${FROM_EMAIL}>`,
        to: [email],
        subject: "We received your inquiry — we'll be in touch",
        text: confirmationBody,
      })
      .catch(() => {
        // Best-effort; the internal notification is what matters for response correctness.
      });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Send failed — please email us at hello@sapientdigital.io' },
      { status: 500 },
    );
  }
}
