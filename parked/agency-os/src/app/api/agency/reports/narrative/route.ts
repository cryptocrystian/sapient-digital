import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { snapshot } = await request.json();

  const prompt = `Write a brief, professional monthly performance summary for a B2B PR agency client report. 2-3 paragraphs. Confident, results-focused, forward-looking. No bullets. No headers.

Client: ${snapshot.client_name}
Period: ${snapshot.period_start} to ${snapshot.period_end}
Pitches sent: ${snapshot.pitches_sent}, placed: ${snapshot.pitches_placed} (${snapshot.pitch_rate}% rate)
Coverage secured: ${snapshot.coverage_count} placements (${snapshot.coverage_by_tier?.tier1 ?? 0} Tier 1, ${snapshot.coverage_by_tier?.tier2 ?? 0} Tier 2)
${(snapshot.coverage_headlines ?? []).length > 0 ? `Notable headlines: ${snapshot.coverage_headlines.join('; ')}` : ''}
Videos published: ${snapshot.videos_published}, in progress: ${snapshot.videos_in_progress}
Content published: ${snapshot.content_published}
Open tasks: ${snapshot.open_tasks}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ narrative: data.content?.[0]?.text ?? '' });
  } catch {
    return NextResponse.json({ narrative: '' }, { status: 500 });
  }
}
