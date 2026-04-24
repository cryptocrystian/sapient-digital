'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ChevronLeft, Video } from 'lucide-react';
import Link from 'next/link';

const FORMATS = [
  { value: 'thought_leadership',  label: 'Thought Leadership',  desc: '90–120s · Executive voice · Positions CEO/founder as authority',  icon: '🎤' },
  { value: 'avatar_program',      label: 'Avatar Program',      desc: '60–90s · HeyGen avatar · Polished talking-head format',           icon: '🤖' },
  { value: 'video_press_release', label: 'Video Press Release', desc: '60s · News-first · Executive quote · Announcement-ready',        icon: '📰' },
  { value: 'social_short',        label: 'Social Short',        desc: '30–45s · Hook-driven · Built for LinkedIn and X',                 icon: '⚡' },
  { value: 'explainer',           label: 'Explainer',           desc: '60–90s · Problem → Solution → Proof structure',                  icon: '💡' },
  { value: 'case_study',          label: 'Case Study',          desc: '90s · Challenge → Approach → Result → Implication',             icon: '📊' },
];

export default function NewVideoProductionPage({ clientId }: { clientId: string }) {
  const router = useRouter();
  const [format, setFormat] = useState('');
  const [title, setTitle] = useState('');
  const [script, setScript] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function create() {
    if (!format || !title.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/agency/video/productions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: clientId, format, title: title.trim(), script: script.trim() || null, status: 'queued' }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message ?? 'Failed to create');
      router.push(`/clients/${clientId}/video/${data.data.id}`);
    } catch (e: any) {
      setError(e.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href={`/clients/${clientId}/video/queue`} className="flex items-center gap-1.5 text-sm text-slate-6 hover:text-white-0 transition-colors mb-4">
          <ChevronLeft size={15} /> Back to Video Queue
        </Link>
        <h1 className="text-heading-xl text-white-0 mb-1">New Video Production</h1>
        <p className="text-sm text-slate-6">Choose a format and add a brief — Claude extracts and polishes the script</p>
      </div>

      {error && <div className="alert-error mb-6">{error}</div>}

      {/* Format picker */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-white-0 uppercase tracking-wide mb-3">Format *</label>
        <div className="grid grid-cols-2 gap-3">
          {FORMATS.map(f => (
            <button key={f.value} onClick={() => setFormat(f.value)}
              className="text-left p-4 rounded-lg border transition-all bg-slate-3 hover:border-slate-5"
              style={{ borderColor: format === f.value ? 'var(--agency-gold)' : 'var(--dark-border)' }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg">{f.icon}</span>
                <p className="text-sm font-semibold text-white-0">{f.label}</p>
              </div>
              <p className="text-xs text-slate-6 leading-relaxed">{f.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-white-0 uppercase tracking-wide mb-2">Production Title *</label>
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder="e.g. CEO Thought Leadership: Q2 2026 Market Outlook"
          className="input-field" />
      </div>

      {/* Script / Brief */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-white-0 uppercase tracking-wide mb-2">
          Script or Brief
          <span className="ml-2 text-slate-6 font-normal normal-case">Claude will extract and polish the final script</span>
        </label>
        <textarea value={script} onChange={e => setScript(e.target.value)}
          placeholder="Paste a rough script, talking points, or brief description. Leave blank to add the script manually after creation."
          className="input-field resize-none" rows={6} />
      </div>

      <div className="flex items-center gap-4">
        <button onClick={create} disabled={submitting || !format || !title.trim()}
          className="btn-agency flex items-center gap-2 disabled:opacity-50">
          {submitting
            ? <><Loader2 size={15} className="animate-spin" /> Creating...</>
            : <><Video size={15} /> Create Production</>}
        </button>
        <Link href={`/clients/${clientId}/video/queue`} className="btn-secondary">Cancel</Link>
      </div>
    </div>
  );
}
