'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Loader2, Play, CheckCircle, AlertCircle, ExternalLink, Radio } from 'lucide-react';
import { formatDate, STATUS_LABELS } from '@/lib/utils';

const PIPELINE_STAGES = [
  { status: 'queued',          label: 'Queued'            },
  { status: 'scripting',       label: 'Script Extraction' },
  { status: 'script_review',   label: 'Script Review'     },
  { status: 'generating',      label: 'Generating'        },
  { status: 'internal_review', label: 'Internal QA'       },
  { status: 'client_review',   label: 'Client Review'     },
  { status: 'approved',        label: 'Approved'          },
  { status: 'publishing',      label: 'Publishing'        },
  { status: 'published',       label: 'Published'         },
];

interface Production {
  id: string;
  client_id: string;
  title: string;
  format: string;
  status: string;
  script?: string;
  n8n_job_id?: string;
  vimeo_review_url?: string;
  youtube_url?: string;
  revision_count: number;
  generated_at?: string;
  published_at?: string;
  created_at: string;
  video_reviews?: any[];
}

interface Props {
  production: Production;
  clientId: string;
}

export default function VideoProductionDetailClient({ production: initialProd, clientId }: Props) {
  const [prod, setProd]           = useState(initialProd);
  const [triggering, setTriggering] = useState(false);
  const [approving, setApproving]   = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError]           = useState('');
  const [realtimeActive, setRealtimeActive] = useState(false);

  const currentStageIdx = PIPELINE_STAGES.findIndex(s => s.status === prod.status);
  const reviews = prod.video_reviews ?? [];
  const isPipelineRunning = ['scripting', 'generating'].includes(prod.status);

  // Supabase Realtime — auto-updates status when n8n pushes a webhook
  useEffect(() => {
    if (!isPipelineRunning && !['queued', 'script_review'].includes(prod.status)) return;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const channel = supabase
      .channel(`video-production-${prod.id}`)
      .on(
        'postgres_changes' as any,
        {
          event: 'UPDATE',
          schema: 'agency',
          table: 'video_productions',
          filter: `id=eq.${prod.id}`,
        },
        (payload: any) => {
          const updated = payload.new;
          setProd(p => ({
            ...p,
            status:           updated.status           ?? p.status,
            script:           updated.script           ?? p.script,
            n8n_job_id:       updated.n8n_job_id       ?? p.n8n_job_id,
            vimeo_review_url: updated.vimeo_review_url ?? p.vimeo_review_url,
            youtube_url:      updated.youtube_url      ?? p.youtube_url,
            generated_at:     updated.generated_at     ?? p.generated_at,
            published_at:     updated.published_at     ?? p.published_at,
          }));
        }
      )
      .subscribe((status) => {
        setRealtimeActive(status === 'SUBSCRIBED');
      });

    return () => { supabase.removeChannel(channel); };
  }, [prod.id, prod.status]);

  async function callAction(action: string, onSuccess: (p: Production) => Production) {
    const setState = action === 'trigger' ? setTriggering : action === 'approve' ? setApproving : setPublishing;
    setState(true);
    setError('');
    try {
      const res = await fetch(
        `/api/agency/clients/${clientId}/video/productions/${prod.id}/${action}`,
        { method: 'POST' }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message ?? `${action} failed`);
      setProd(onSuccess);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setState(false);
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-heading-lg text-white-0">{prod.title}</h2>
          {isPipelineRunning && realtimeActive && (
            <div className="flex items-center gap-1.5 text-xs text-brand-cyan">
              <Radio size={11} className="animate-pulse" /> Live
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-6 capitalize">{prod.format.replace(/_/g, ' ')}</span>
          <span className={`badge-${prod.status.replace(/_/g, '-')}`}>
            {STATUS_LABELS[prod.status] ?? prod.status}
          </span>
          {prod.revision_count > 0 && (
            <span className="text-xs text-slate-6">
              {prod.revision_count} revision{prod.revision_count > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="alert-error mb-6">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Pipeline timeline */}
        <div className="col-span-2 space-y-6">
          <div className="panel-card p-5">
            <h3 className="text-heading-sm text-white-0 mb-4">Pipeline Status</h3>
            <div className="space-y-0">
              {PIPELINE_STAGES.map((stage, i) => {
                const done    = i < currentStageIdx;
                const current = i === currentStageIdx;
                return (
                  <div key={stage.status} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`pipeline-dot ${
                        done    ? 'pipeline-dot-complete' :
                        current ? 'pipeline-dot-active' :
                        'pipeline-dot-pending'
                      }`} />
                      {i < PIPELINE_STAGES.length - 1 && (
                        <div className="w-px flex-1 min-h-[20px]"
                          style={{ background: done ? 'var(--semantic-success)' : 'var(--dark-border)' }} />
                      )}
                    </div>
                    <div className="pb-4 min-w-0">
                      <p className={`text-sm font-medium ${current ? 'text-white-0' : 'text-slate-6'}`}>
                        {stage.label}
                        {current && (
                          <span className="ml-2 text-brand-cyan text-xs">
                            {prod.status === 'generating' ? '← generating...' : '← current'}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {prod.script && (
            <div className="panel-card p-5">
              <h3 className="text-heading-sm text-white-0 mb-3">Script</h3>
              <div className="bg-slate-3 rounded-md p-4 text-sm text-white-0 whitespace-pre-wrap leading-relaxed">
                {prod.script}
              </div>
            </div>
          )}

          {reviews.length > 0 && (
            <div className="panel-card p-5">
              <h3 className="text-heading-sm text-white-0 mb-3">Review History</h3>
              <div className="space-y-3">
                {reviews.map((review: any) => (
                  <div key={review.id} className={`rounded-md p-4 text-sm ${
                    review.decision === 'approved'
                      ? 'bg-green-900/20 border border-semantic-success/20'
                      : 'bg-red-900/20 border border-semantic-danger/20'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {review.decision === 'approved'
                        ? <CheckCircle size={13} className="text-semantic-success" />
                        : <AlertCircle size={13} className="text-semantic-danger" />
                      }
                      <span className="font-medium text-white-0">
                        Round {review.round} — {review.decision === 'approved' ? 'Approved' : 'Revision Requested'}
                      </span>
                    </div>
                    {review.feedback && <p className="text-slate-6 text-xs mt-1">{review.feedback}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="panel-card p-4">
            <h3 className="text-xs font-semibold text-slate-6 uppercase tracking-wide mb-3">Links</h3>
            <div className="space-y-2">
              {prod.vimeo_review_url && (
                <a href={prod.vimeo_review_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brand-cyan hover:underline">
                  <ExternalLink size={13} /> Vimeo Review
                </a>
              )}
              {prod.youtube_url && (
                <a href={prod.youtube_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brand-cyan hover:underline">
                  <ExternalLink size={13} /> YouTube
                </a>
              )}
              {!prod.vimeo_review_url && !prod.youtube_url && (
                <p className="text-xs text-slate-6">No links yet</p>
              )}
            </div>
          </div>

          <div className="panel-card p-4">
            <h3 className="text-xs font-semibold text-slate-6 uppercase tracking-wide mb-3">Actions</h3>
            <div className="space-y-2">
              {(prod.status === 'queued' || prod.status === 'script_review') && (
                <button onClick={() => callAction('trigger', p => ({ ...p, status: 'scripting' }))}
                  disabled={triggering}
                  className="btn-agency w-full text-sm py-2 flex items-center justify-center gap-2">
                  {triggering ? <><Loader2 size={14} className="animate-spin" /> Triggering...</> : <><Play size={14} /> Trigger Pipeline</>}
                </button>
              )}
              {prod.status === 'internal_review' && (
                <button onClick={() => callAction('approve', p => ({ ...p, status: 'client_review' }))}
                  disabled={approving}
                  className="btn-agency w-full text-sm py-2 flex items-center justify-center gap-2">
                  {approving ? <><Loader2 size={14} className="animate-spin" /> Approving...</> : <><CheckCircle size={14} /> Approve for Client Review</>}
                </button>
              )}
              {prod.status === 'approved' && !prod.youtube_url && (
                <button onClick={() => callAction('publish', p => ({ ...p, status: 'publishing' }))}
                  disabled={publishing}
                  className="btn-agency w-full text-sm py-2 flex items-center justify-center gap-2">
                  {publishing ? <><Loader2 size={14} className="animate-spin" /> Publishing...</> : <><Play size={14} /> Publish to YouTube</>}
                </button>
              )}
              {isPipelineRunning && (
                <div className="flex items-center justify-center gap-2 text-xs text-slate-6 py-2">
                  <Loader2 size={12} className="animate-spin text-brand-cyan" />
                  Pipeline running in n8n...
                </div>
              )}
            </div>
          </div>

          <div className="panel-card p-4">
            <h3 className="text-xs font-semibold text-slate-6 uppercase tracking-wide mb-3">Details</h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'Created',   value: formatDate(prod.created_at, { month: 'short', day: 'numeric' }) },
                { label: 'Generated', value: prod.generated_at ? formatDate(prod.generated_at, { month: 'short', day: 'numeric' }) : '—' },
                { label: 'Published', value: prod.published_at ? formatDate(prod.published_at, { month: 'short', day: 'numeric' }) : '—' },
                { label: 'n8n Job',   value: prod.n8n_job_id ? prod.n8n_job_id.substring(0, 12) + '…' : '—' },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-slate-6">{item.label}</span>
                  <span className="text-white-0 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
