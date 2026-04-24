'use client';

import { useState } from 'react';
import { FileText, Loader2, Sparkles, TrendingUp, Video, Radio } from 'lucide-react';
import { formatDate, STATUS_LABELS } from '@/lib/utils';

interface Report {
  id: string; period_start: string; period_end: string;
  type: string; status: string; report_url?: string;
  data_snapshot?: Record<string, any>;
}

interface Props {
  clientId: string;
  clientName: string;
  mrr: number;
  initialReports: Report[];
}

function getLastMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end   = new Date(now.getFullYear(), now.getMonth(), 0);
  return {
    start: start.toISOString().split('T')[0],
    end:   end.toISOString().split('T')[0],
    label: start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  };
}

export default function ReportsClient({ clientId, clientName, mrr, initialReports }: Props) {
  const [reports, setReports]       = useState<Report[]>(initialReports);
  const [showGenerator, setShow]    = useState(false);
  const [period, setPeriod]         = useState(getLastMonthRange);
  const [snapshot, setSnapshot]     = useState<Record<string, any> | null>(null);
  const [aiNarrative, setNarrative] = useState('');
  const [building, setBuilding]     = useState(false);
  const [genNarr, setGenNarr]       = useState(false);
  const [saving, setSaving]         = useState(false);

  async function buildSnapshot() {
    setBuilding(true); setSnapshot(null); setNarrative('');
    const res  = await fetch(`/api/agency/clients/${clientId}/reports/snapshot?start=${period.start}&end=${period.end}`);
    const data = await res.json();
    if (data.success) setSnapshot(data.snapshot);
    setBuilding(false);
  }

  async function generateNarrative() {
    if (!snapshot) return;
    setGenNarr(true);
    const res  = await fetch('/api/agency/reports/narrative', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ snapshot: { ...snapshot, client_name: clientName } }),
    });
    const data = await res.json();
    setNarrative(data.narrative ?? 'Unable to generate — please write manually.');
    setGenNarr(false);
  }

  async function saveReport() {
    if (!snapshot) return;
    setSaving(true);
    const res  = await fetch(`/api/agency/clients/${clientId}/reports`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        period_start: period.start, period_end: period.end, type: 'monthly',
        data_snapshot: { ...snapshot, ai_narrative: aiNarrative, generated_at: new Date().toISOString() },
      }),
    });
    const data = await res.json();
    if (data.success) {
      setReports(p => [data.data, ...p]);
      setShow(false); setSnapshot(null); setNarrative('');
    }
    setSaving(false);
  }

  async function markSent(id: string) {
    await fetch(`/api/agency/clients/${clientId}/reports/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'sent' }),
    });
    setReports(p => p.map(r => r.id === id ? { ...r, status: 'sent' } : r));
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-heading-lg text-white-0">Reports</h2>
          <p className="text-sm text-slate-6">{reports.length} report{reports.length !== 1 ? 's' : ''} generated</p>
        </div>
        {!showGenerator && (
          <button onClick={() => setShow(true)} className="btn-agency flex items-center gap-2 text-sm px-4 py-2">
            <FileText size={15} /> Generate Monthly Report
          </button>
        )}
      </div>

      {showGenerator && (
        <div className="panel-card p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-heading-sm text-white-0">Monthly Report Generator</h3>
            <button onClick={() => { setShow(false); setSnapshot(null); setNarrative(''); }} className="text-xs text-slate-6 hover:text-white-0">Cancel</button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Period Start</label>
              <input type="date" value={period.start} onChange={e => setPeriod(p => ({ ...p, start: e.target.value }))} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Period End</label>
              <input type="date" value={period.end} onChange={e => setPeriod(p => ({ ...p, end: e.target.value }))} className="input-field" />
            </div>
          </div>

          {!snapshot ? (
            <button onClick={buildSnapshot} disabled={building} className="btn-agency flex items-center gap-2 text-sm disabled:opacity-50">
              {building ? <><Loader2 size={14} className="animate-spin" /> Building...</> : <><TrendingUp size={14} /> Build Snapshot</>}
            </button>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Coverage',  value: snapshot.coverage_count,  sub: `${snapshot.coverage_by_tier?.tier1 ?? 0} T1`,  Icon: TrendingUp },
                  { label: 'Placed',    value: snapshot.pitches_placed,  sub: `${snapshot.pitch_rate}% rate`,                 Icon: Radio },
                  { label: 'Videos',    value: snapshot.videos_published,sub: `${snapshot.videos_in_progress} active`,         Icon: Video },
                  { label: 'Content',   value: snapshot.content_published,sub: 'published',                                   Icon: FileText },
                ].map(({ label, value, sub, Icon }) => (
                  <div key={label} className="bg-slate-3 rounded-lg p-4 text-center">
                    <Icon size={14} className="text-brand-cyan mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white-0 tabular-nums">{value}</p>
                    <p className="text-xs text-slate-6 mt-0.5">{label}</p>
                    <p className="text-xs text-slate-6">{sub}</p>
                  </div>
                ))}
              </div>

              {(snapshot.coverage_headlines ?? []).length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-6 uppercase tracking-wide mb-2">Coverage Highlights</p>
                  {snapshot.coverage_headlines.map((h: string, i: number) => (
                    <p key={i} className="text-sm text-white-0 pl-3 border-l-2 mb-1.5" style={{ borderColor: 'var(--agency-gold)' }}>{h}</p>
                  ))}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-slate-6 uppercase tracking-wide">Executive Narrative</p>
                  <button onClick={generateNarrative} disabled={genNarr} className="flex items-center gap-1.5 text-xs text-brand-cyan hover:underline disabled:opacity-50">
                    {genNarr ? <><Loader2 size={11} className="animate-spin" /> Generating...</> : <><Sparkles size={11} /> {aiNarrative ? 'Regenerate' : 'Generate with Claude'}</>}
                  </button>
                </div>
                <textarea value={aiNarrative} onChange={e => setNarrative(e.target.value)}
                  placeholder="Click 'Generate with Claude' or write manually..."
                  className="input-field resize-none text-sm leading-relaxed" rows={5} />
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-border-subtle">
                <button onClick={saveReport} disabled={saving} className="btn-agency flex items-center gap-2 text-sm disabled:opacity-50">
                  {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><FileText size={14} /> Save Report</>}
                </button>
                <p className="text-xs text-slate-6">Saves as draft — mark sent when delivered</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="panel-card divide-y divide-border-subtle">
        {reports.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <FileText size={28} className="text-slate-6 mx-auto mb-3" />
            <p className="text-sm text-white-0 font-medium mb-1">No reports yet</p>
            <p className="text-xs text-slate-6">Generate your first monthly report above</p>
          </div>
        ) : reports.map(report => {
          const snap = report.data_snapshot as any;
          return (
            <div key={report.id} className="px-5 py-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-white-0 capitalize">{report.type} Report</p>
                  <p className="text-xs text-slate-6">{formatDate(report.period_start, { month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`badge-${report.status}`}>{STATUS_LABELS[report.status] ?? report.status}</span>
                  {report.status === 'ready' && (
                    <button onClick={() => markSent(report.id)} className="text-xs text-brand-cyan hover:underline">Mark as Sent</button>
                  )}
                </div>
              </div>
              {snap && (
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {[
                    { label: 'Coverage', value: snap.coverage_count ?? 0 },
                    { label: 'Tier 1',   value: snap.coverage_by_tier?.tier1 ?? 0 },
                    { label: 'Placed',   value: snap.pitches_placed ?? 0 },
                    { label: 'Videos',   value: snap.videos_published ?? 0 },
                  ].map(s => (
                    <div key={s.label} className="bg-slate-3 rounded-md p-3 text-center">
                      <p className="text-lg font-bold text-white-0 tabular-nums">{s.value}</p>
                      <p className="text-xs text-slate-6 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {snap?.ai_narrative && <p className="text-xs text-slate-6 leading-relaxed line-clamp-2">{snap.ai_narrative}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
