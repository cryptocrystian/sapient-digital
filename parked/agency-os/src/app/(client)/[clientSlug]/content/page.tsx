'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { STATUS_LABELS } from '@/lib/utils';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface Brief {
  id: string;
  working_title: string;
  target_audience?: string;
  primary_keyword?: string;
  secondary_keywords?: string[];
  aeo_target_queries?: string[];
  word_count_target?: number;
  status: string;
}

export default function ClientPortalContentPage({
  params,
}: {
  params: { clientSlug: string };
}) {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [rejections, setRejections] = useState<Record<string, string>>({});
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: client } = await supabase
        .schema('agency').from('clients').select('id')
        .eq('slug', params.clientSlug).single();

      if (!client) return;
      setClientId(client.id);

      const { data } = await supabase
        .schema('agency').from('content_briefs').select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false });

      setBriefs(data ?? []);
      setLoading(false);
    }
    load();
  }, [params.clientSlug]);

  async function submitDecision(briefId: string, approved: boolean) {
    setSubmitting(briefId);
    await fetch(`/api/agency/content/briefs/${briefId}/approve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        approved,
        rejection_reason: approved ? undefined : rejections[briefId],
      }),
    });

    setBriefs(prev =>
      prev.map(b =>
        b.id === briefId
          ? { ...b, status: approved ? 'approved' : 'rejected' }
          : b
      )
    );
    setSubmitting(null);
  }

  const pending  = briefs.filter(b => b.status === 'pending_approval');
  const approved = briefs.filter(b => b.status === 'approved');
  const others   = briefs.filter(b => !['pending_approval', 'approved'].includes(b.status));

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 size={20} className="animate-spin text-brand-cyan" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-heading-xl text-white-0 mb-1">Content</h1>
        <p className="text-sm text-slate-6">Review and approve content briefs</p>
      </div>

      {/* Pending approval */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wide mb-3 text-brand-cyan">
            Awaiting Your Approval ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.map(brief => (
              <div key={brief.id} className="panel-card p-5">
                <h3 className="text-sm font-semibold text-white-0 mb-1">{brief.working_title}</h3>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  {brief.target_audience && (
                    <div>
                      <p className="text-slate-6 mb-0.5">Target Audience</p>
                      <p className="text-white-0">{brief.target_audience}</p>
                    </div>
                  )}
                  {brief.primary_keyword && (
                    <div>
                      <p className="text-slate-6 mb-0.5">Primary Keyword</p>
                      <p className="text-white-0">{brief.primary_keyword}</p>
                    </div>
                  )}
                  {brief.word_count_target && (
                    <div>
                      <p className="text-slate-6 mb-0.5">Target Length</p>
                      <p className="text-white-0">{brief.word_count_target.toLocaleString()} words</p>
                    </div>
                  )}
                  {(brief.aeo_target_queries ?? []).length > 0 && (
                    <div>
                      <p className="text-slate-6 mb-0.5">AEO Target Queries</p>
                      <p className="text-white-0">{(brief.aeo_target_queries ?? []).slice(0, 2).join(', ')}</p>
                    </div>
                  )}
                </div>

                <textarea
                  placeholder="If rejecting, please provide feedback..."
                  value={rejections[brief.id] || ''}
                  onChange={e => setRejections(prev => ({ ...prev, [brief.id]: e.target.value }))}
                  className="input-field text-sm mb-4 resize-none"
                  rows={2}
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => submitDecision(brief.id, true)}
                    disabled={submitting === brief.id}
                    className="btn-agency flex items-center gap-2 flex-1 justify-center"
                  >
                    {submitting === brief.id
                      ? <Loader2 size={14} className="animate-spin" />
                      : <CheckCircle size={14} />}
                    Approve Brief
                  </button>
                  <button
                    onClick={() => submitDecision(brief.id, false)}
                    disabled={submitting === brief.id || !rejections[brief.id]?.trim()}
                    className="btn-secondary flex items-center gap-2 flex-1 justify-center"
                  >
                    <XCircle size={14} />
                    Request Changes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      {approved.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-slate-6 uppercase tracking-wide mb-3">
            Approved ({approved.length})
          </h2>
          <div className="panel-card divide-y divide-border-subtle">
            {approved.map(brief => (
              <div key={brief.id} className="flex items-center gap-3 px-5 py-3.5">
                <CheckCircle size={14} className="text-semantic-success flex-shrink-0" />
                <p className="text-sm text-white-0 flex-1 truncate">{brief.working_title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Others (draft, rejected) */}
      {others.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-slate-6 uppercase tracking-wide mb-3">
            Other ({others.length})
          </h2>
          <div className="panel-card divide-y divide-border-subtle">
            {others.map(brief => (
              <div key={brief.id} className="flex items-center gap-3 px-5 py-3.5">
                <p className="text-sm text-white-0 flex-1 truncate">{brief.working_title}</p>
                <span className={`badge-${brief.status.replace(/_/g, '-')}`}>
                  {STATUS_LABELS[brief.status] ?? brief.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {briefs.length === 0 && (
        <div className="panel-card py-12 text-center">
          <p className="text-sm text-slate-6">No content briefs yet</p>
        </div>
      )}
    </div>
  );
}
