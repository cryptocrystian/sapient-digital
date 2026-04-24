'use client';

/*
 * ACTIVATION TODO (parked artifact, 2026-04-24 sanitization):
 *   - This file hardcoded a Supabase SERVICE_ROLE key and project URL at
 *     module scope. Both values were revoked 2026-04-22. Placeholders
 *     inserted below.
 *   - Anti-pattern: service_role keys must NEVER ship to the client.
 *     Before activation, refactor to use the server-side API pattern:
 *       fetch(`/api/agency/clients/${params.clientId}/pitches`)
 *       fetch(`/api/agency/clients/${params.clientId}/coverage`)
 *     with server-side auth using the service_role key scoped to the
 *     request context.
 */

import { useEffect, useState } from 'react';
import { Plus, X, Loader2, ExternalLink } from 'lucide-react';
import { formatDate, STATUS_LABELS } from '@/lib/utils';

const TIERS = ['tier1', 'tier2', 'tier3'];
const SENTIMENTS = ['positive', 'neutral', 'negative'];

interface Pitch {
  id: string; publication: string; tier: string;
  subject_line: string; angle: string; status: string;
  sent_at?: string; follow_up_count: number;
}
interface Coverage {
  id: string; url: string; publication: string;
  headline: string; tier: string; published_at: string; sentiment?: string;
}

// TODO (activation): Replace with server-side API calls. Hardcoded
// service_role key removed 2026-04-24 (original value revoked 2026-04-22).
const SUPABASE_URL = '<SET_AT_ACTIVATION_from_Sapient_Supabase_project>';
const SUPABASE_KEY = '<SET_AT_ACTIVATION_via_process.env>';

export default function PRPitchesPage({ params }: { params: { clientId: string } }) {
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [coverage, setCoverage] = useState<Coverage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPitchForm, setShowPitchForm] = useState(false);
  const [showCoverageForm, setShowCoverageForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [pf, setPf] = useState({ publication: '', tier: 'tier1', subject_line: '', angle: '', body_preview: '', status: 'draft' });
  const [cf, setCf] = useState({ url: '', publication: '', headline: '', tier: 'tier1', published_at: new Date().toISOString().split('T')[0], sentiment: 'positive', domain_authority: '' });

  useEffect(() => {
    const h = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Accept-Profile': 'agency' };
    Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/pitches?client_id=eq.${params.clientId}&order=created_at.desc`, { headers: h }).then(r => r.json()),
      fetch(`${SUPABASE_URL}/rest/v1/coverage?client_id=eq.${params.clientId}&order=published_at.desc`, { headers: h }).then(r => r.json()),
    ]).then(([p, c]) => { setPitches(Array.isArray(p) ? p : []); setCoverage(Array.isArray(c) ? c : []); setLoading(false); });
  }, [params.clientId]);

  async function createPitch(e: React.FormEvent) {
    e.preventDefault(); setSubmitting(true);
    const res = await fetch(`/api/agency/clients/${params.clientId}/pitches`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pf),
    });
    const data = await res.json();
    if (data.success) { setPitches(prev => [data.data, ...prev]); setPf({ publication: '', tier: 'tier1', subject_line: '', angle: '', body_preview: '', status: 'draft' }); setShowPitchForm(false); }
    setSubmitting(false);
  }

  async function logCoverage(e: React.FormEvent) {
    e.preventDefault(); setSubmitting(true);
    const res = await fetch(`/api/agency/clients/${params.clientId}/coverage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cf),
    });
    const data = await res.json();
    if (data.success) { setCoverage(prev => [data.data, ...prev]); setCf({ url: '', publication: '', headline: '', tier: 'tier1', published_at: new Date().toISOString().split('T')[0], sentiment: 'positive', domain_authority: '' }); setShowCoverageForm(false); }
    setSubmitting(false);
  }

  const placed = pitches.filter(p => p.status === 'placed').length;
  const sent = pitches.filter(p => p.status !== 'draft').length;
  const tier1cov = coverage.filter(c => c.tier === 'tier1').length;

  if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 size={20} className="animate-spin text-brand-cyan" /></div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-heading-lg text-white-0">PR</h2>
          <p className="text-sm text-slate-6">{sent} sent · {placed} placed · {tier1cov} Tier 1</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setShowCoverageForm(!showCoverageForm); setShowPitchForm(false); }} className="btn-secondary text-sm px-3 py-2">Log Coverage</button>
          <button onClick={() => { setShowPitchForm(!showPitchForm); setShowCoverageForm(false); }} className="btn-agency flex items-center gap-2 text-sm px-3 py-2">
            <Plus size={14} /> New Pitch
          </button>
        </div>
      </div>

      {/* New Pitch Form */}
      {showPitchForm && (
        <div className="panel-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-heading-sm text-white-0">New Pitch</h3>
            <button onClick={() => setShowPitchForm(false)} className="text-slate-6 hover:text-white-0"><X size={16} /></button>
          </div>
          <form onSubmit={createPitch} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-white-0 mb-1.5">Publication *</label>
                <input value={pf.publication} onChange={e => setPf(p => ({...p, publication: e.target.value}))} placeholder="TechCrunch, Forbes..." className="input-field" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Tier</label>
                <select value={pf.tier} onChange={e => setPf(p => ({...p, tier: e.target.value}))} className="input-field">
                  {TIERS.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Subject Line *</label>
              <input value={pf.subject_line} onChange={e => setPf(p => ({...p, subject_line: e.target.value}))} placeholder="The hook that gets editors to open..." className="input-field" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Angle *</label>
              <textarea value={pf.angle} onChange={e => setPf(p => ({...p, angle: e.target.value}))} placeholder="Story angle and why it's timely..." className="input-field resize-none" rows={2} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Body Preview</label>
              <textarea value={pf.body_preview} onChange={e => setPf(p => ({...p, body_preview: e.target.value}))} placeholder="Opening paragraph..." className="input-field resize-none" rows={3} />
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <label className="text-xs text-slate-6">Status:</label>
                <select value={pf.status} onChange={e => setPf(p => ({...p, status: e.target.value}))} className="input-field w-auto text-xs py-1.5 px-3">
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowPitchForm(false)} className="btn-secondary text-sm px-4 py-2">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-agency text-sm px-4 py-2 flex items-center gap-2 disabled:opacity-50">
                  {submitting && <Loader2 size={13} className="animate-spin" />} Save Pitch
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Log Coverage Form */}
      {showCoverageForm && (
        <div className="panel-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-heading-sm text-white-0">Log Coverage</h3>
            <button onClick={() => setShowCoverageForm(false)} className="text-slate-6 hover:text-white-0"><X size={16} /></button>
          </div>
          <form onSubmit={logCoverage} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Article URL *</label>
              <input value={cf.url} onChange={e => setCf(p => ({...p, url: e.target.value}))} placeholder="https://..." className="input-field" type="url" required />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-white-0 mb-1.5">Headline *</label>
                <input value={cf.headline} onChange={e => setCf(p => ({...p, headline: e.target.value}))} placeholder="Article headline..." className="input-field" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Publication *</label>
                <input value={cf.publication} onChange={e => setCf(p => ({...p, publication: e.target.value}))} placeholder="Forbes" className="input-field" required />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Tier</label>
                <select value={cf.tier} onChange={e => setCf(p => ({...p, tier: e.target.value}))} className="input-field">
                  {TIERS.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Sentiment</label>
                <select value={cf.sentiment} onChange={e => setCf(p => ({...p, sentiment: e.target.value}))} className="input-field">
                  {SENTIMENTS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Published</label>
                <input type="date" value={cf.published_at} onChange={e => setCf(p => ({...p, published_at: e.target.value}))} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Domain Auth</label>
                <input type="number" value={cf.domain_authority} onChange={e => setCf(p => ({...p, domain_authority: e.target.value}))} placeholder="70" min="0" max="100" className="input-field" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button type="button" onClick={() => setShowCoverageForm(false)} className="btn-secondary text-sm px-4 py-2">Cancel</button>
              <button type="submit" disabled={submitting} className="btn-agency text-sm px-4 py-2 flex items-center gap-2 disabled:opacity-50">
                {submitting && <Loader2 size={13} className="animate-spin" />} Log Coverage
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main columns */}
      <div className="grid grid-cols-2 gap-6">
        <div className="panel-card">
          <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
            <h3 className="text-heading-sm text-white-0">Pitches</h3>
            <span className="text-xs text-slate-6">{pitches.length} total</span>
          </div>
          <div className="divide-y divide-border-subtle">
            {pitches.length === 0 ? (
              <p className="px-5 py-8 text-sm text-slate-6 text-center">No pitches yet</p>
            ) : pitches.map(pitch => (
              <div key={pitch.id} className="px-5 py-3.5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-white-0 truncate flex-1">{pitch.subject_line}</p>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`badge-tier${pitch.tier.replace('tier','')}`}>{pitch.tier.toUpperCase()}</span>
                    <span className={`badge-${pitch.status.replace(/_/g,'-')}`}>{STATUS_LABELS[pitch.status]}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-6">{pitch.publication}</p>
                {pitch.angle && <p className="text-xs text-slate-6 mt-0.5 truncate">{pitch.angle}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="panel-card">
          <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
            <h3 className="text-heading-sm text-white-0">Coverage</h3>
            <span className="text-xs text-slate-6">{coverage.length} placements</span>
          </div>
          <div className="divide-y divide-border-subtle">
            {coverage.length === 0 ? (
              <p className="px-5 py-8 text-sm text-slate-6 text-center">No coverage logged yet</p>
            ) : coverage.map(item => (
              <div key={item.id} className="px-5 py-3.5">
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium text-white-0 hover:text-brand-cyan transition-colors line-clamp-1 flex items-center gap-1.5">
                  {item.headline} <ExternalLink size={11} className="flex-shrink-0 opacity-50" />
                </a>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`badge-tier${item.tier.replace('tier','')}`}>{item.tier.toUpperCase()}</span>
                  <span className="text-xs text-slate-6">{item.publication}</span>
                  {item.sentiment && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      item.sentiment === 'positive' ? 'text-semantic-success bg-green-900/20' :
                      item.sentiment === 'negative' ? 'text-semantic-danger bg-red-900/20' :
                      'text-slate-6 bg-slate-4'
                    }`}>{item.sentiment}</span>
                  )}
                  <span className="text-xs text-slate-6 ml-auto">{formatDate(item.published_at, { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
