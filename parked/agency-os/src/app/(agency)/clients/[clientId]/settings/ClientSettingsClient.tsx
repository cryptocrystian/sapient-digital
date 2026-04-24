'use client';

import { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

interface Client {
  id: string; name: string; domain: string; brand_voice?: string;
  icp_description?: string; competitors?: string[]; industry?: string; segment?: string;
}

export default function ClientSettingsClient({ client }: { client: Client }) {
  const [form, setForm] = useState({
    name:            client.name ?? '',
    domain:          client.domain ?? '',
    brand_voice:     client.brand_voice ?? '',
    icp_description: client.icp_description ?? '',
    competitors:     (client.competitors ?? []).join('\n'),
    industry:        client.industry ?? '',
    segment:         client.segment ?? '',
  });
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState('');

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSaved(false); setError('');
    try {
      const res = await fetch(`/api/agency/clients/${client.id}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          competitors: form.competitors.split('\n').map(s => s.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message ?? 'Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-heading-lg text-white-0 mb-8">Client Settings</h2>

      {error && <div className="alert-error mb-4">{error}</div>}

      <form onSubmit={save} className="space-y-6">
        <div className="panel-card p-6 space-y-4">
          <h3 className="text-heading-sm text-white-0 mb-2">Brand Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Company Name</label>
              <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} className="input-field" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Domain</label>
              <input value={form.domain} onChange={e => setForm(p => ({...p, domain: e.target.value}))} className="input-field" placeholder="example.com" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Industry</label>
              <input value={form.industry} onChange={e => setForm(p => ({...p, industry: e.target.value}))} className="input-field" placeholder="B2B SaaS, Industrial..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Segment</label>
              <input value={form.segment} onChange={e => setForm(p => ({...p, segment: e.target.value}))} className="input-field" placeholder="b2b_saas, industrial..." />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white-0 mb-1.5">Brand Voice</label>
            <textarea value={form.brand_voice} onChange={e => setForm(p => ({...p, brand_voice: e.target.value}))}
              placeholder="How does this brand sound? Tone, personality, what they avoid..." className="input-field resize-none" rows={3} />
          </div>

          <div>
            <label className="block text-xs font-medium text-white-0 mb-1.5">ICP Description</label>
            <textarea value={form.icp_description} onChange={e => setForm(p => ({...p, icp_description: e.target.value}))}
              placeholder="Ideal customer profile — title, company size, pain points..." className="input-field resize-none" rows={3} />
          </div>

          <div>
            <label className="block text-xs font-medium text-white-0 mb-1.5">
              Competitor Domains
              <span className="text-slate-6 font-normal ml-1">(one per line)</span>
            </label>
            <textarea value={form.competitors} onChange={e => setForm(p => ({...p, competitors: e.target.value}))}
              className="input-field resize-none font-mono text-xs" rows={4} placeholder="competitor1.com&#10;competitor2.com" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          {saved && (
            <div className="flex items-center gap-2 text-semantic-success text-sm">
              <CheckCircle size={15} /> Saved
            </div>
          )}
          <button type="submit" disabled={saving} className="btn-agency flex items-center gap-2 disabled:opacity-50">
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
