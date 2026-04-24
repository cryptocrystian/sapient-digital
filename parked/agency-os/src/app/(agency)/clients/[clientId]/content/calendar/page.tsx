'use client';

/*
 * ACTIVATION TODO (parked artifact, 2026-04-24 sanitization):
 *   - This file hardcoded a Supabase SERVICE_ROLE key and project URL in
 *     client-side code. Both values were revoked 2026-04-22. Placeholders
 *     inserted below.
 *   - Anti-pattern: service_role keys must NEVER ship to the client.
 *     Before activation, refactor to use the server-side API pattern:
 *       fetch(`/api/agency/clients/${params.clientId}/calendar`)
 *     with server-side auth using the service_role key scoped to the
 *     request context.
 */

import { useEffect, useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';
import { formatDate, STATUS_LABELS } from '@/lib/utils';

// Must match agency.editorial_calendar format CHECK constraint
const FORMATS = [
  { value: 'article',         label: 'Article' },
  { value: 'linkedin_post',   label: 'LinkedIn Post' },
  { value: 'press_release',   label: 'Press Release' },
  { value: 'whitepaper',      label: 'Whitepaper' },
  { value: 'case_study',      label: 'Case Study' },
  { value: 'ghostwrite',      label: 'Ghostwrite' },
  { value: 'video_script',    label: 'Video Script' },
];

const PILLARS = ['pr', 'content', 'aeo', 'video'];

interface CalendarItem {
  id: string; title: string; format: string; pillar?: string;
  status: string; due_date?: string; publish_date?: string;
}

export default function ClientContentPage({ params }: { params: { clientId: string } }) {
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '', format: 'article', pillar: 'content',
    due_date: '', publish_date: '', target_keyword: '',
  });

  useEffect(() => {
    // TODO (activation): Replace with server-side API call. Hardcoded
    // service_role key removed 2026-04-24 (original value revoked 2026-04-22).
    const key = '<SET_AT_ACTIVATION_via_process.env>';
    const supabaseUrl = '<SET_AT_ACTIVATION_from_Sapient_Supabase_project>';
    fetch(`${supabaseUrl}/rest/v1/editorial_calendar?client_id=eq.${params.clientId}&order=due_date.asc.nullsfirst`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Accept-Profile': 'agency' }
    }).then(r => r.json()).then(d => { setCalendar(Array.isArray(d) ? d : []); setLoading(false); });
  }, [params.clientId]);

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch(`/api/agency/clients/${params.clientId}/content`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setCalendar(p => [...p, data.data]);
      setForm({ title: '', format: 'article', pillar: 'content', due_date: '', publish_date: '', target_keyword: '' });
      setShowForm(false);
    }
    setSubmitting(false);
  }

  const published  = calendar.filter(i => i.status === 'published').length;
  const inProgress = calendar.filter(i => ['briefed','in_progress','review'].includes(i.status)).length;

  if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 size={20} className="animate-spin text-brand-cyan" /></div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-heading-lg text-white-0">Content</h2>
          <p className="text-sm text-slate-6">{calendar.length} items · {inProgress} in progress · {published} published</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-agency flex items-center gap-2 text-sm px-3 py-2">
          <Plus size={14} /> Add Content
        </button>
      </div>

      {showForm && (
        <div className="panel-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-heading-sm text-white-0">New Content Item</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-6 hover:text-white-0"><X size={16} /></button>
          </div>
          <form onSubmit={addItem} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Title *</label>
              <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))}
                placeholder="Article or content title..." className="input-field" required />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Format</label>
                <select value={form.format} onChange={e => setForm(p => ({...p, format: e.target.value}))} className="input-field">
                  {FORMATS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Pillar</label>
                <select value={form.pillar} onChange={e => setForm(p => ({...p, pillar: e.target.value}))} className="input-field">
                  {PILLARS.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Due Date</label>
                <input type="date" value={form.due_date} onChange={e => setForm(p => ({...p, due_date: e.target.value}))} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Publish Date</label>
                <input type="date" value={form.publish_date} onChange={e => setForm(p => ({...p, publish_date: e.target.value}))} className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Target Keyword</label>
              <input value={form.target_keyword} onChange={e => setForm(p => ({...p, target_keyword: e.target.value}))}
                placeholder="Primary SEO/AEO keyword..." className="input-field" />
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm px-4 py-2">Cancel</button>
              <button type="submit" disabled={submitting || !form.title.trim()} className="btn-agency text-sm px-4 py-2 flex items-center gap-2 disabled:opacity-50">
                {submitting && <Loader2 size={13} className="animate-spin" />} Add Item
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="panel-card divide-y divide-border-subtle">
        <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
          <h3 className="text-heading-sm text-white-0">Editorial Calendar</h3>
          <span className="text-xs text-slate-6">{calendar.length} items</span>
        </div>
        {calendar.length === 0 ? (
          <p className="px-5 py-10 text-sm text-slate-6 text-center">Calendar is empty — add your first content item</p>
        ) : calendar.map(item => (
          <div key={item.id} className="flex items-center gap-3 px-5 py-3.5">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white-0 truncate">{item.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-1.5 py-0.5 rounded bg-slate-4 text-slate-6 capitalize">
                  {FORMATS.find(f => f.value === item.format)?.label ?? item.format.replace(/_/g,' ')}
                </span>
                {item.pillar && <span className="text-xs px-1.5 py-0.5 rounded bg-slate-4 text-slate-6 uppercase">{item.pillar}</span>}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`badge-${item.status.replace(/_/g,'-')}`}>{STATUS_LABELS[item.status]}</span>
              {item.due_date && <span className="text-xs text-slate-6">{formatDate(item.due_date, { month: 'short', day: 'numeric' })}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
