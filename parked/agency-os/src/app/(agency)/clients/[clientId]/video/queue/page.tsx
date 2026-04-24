import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { formatRelativeTime, STATUS_LABELS } from '@/lib/utils';
import { Plus, Play, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const STATUS_ICON: Record<string, React.ReactNode> = {
  queued:          <Clock size={14} className="text-slate-6" />,
  scripting:       <Clock size={14} className="text-brand-amber" />,
  script_review:   <Clock size={14} className="text-brand-amber" />,
  generating:      <Play size={14} className="text-brand-iris" />,
  internal_review: <Clock size={14} className="text-brand-cyan" />,
  client_review:   <Clock size={14} className="text-brand-cyan" />,
  revision:        <AlertCircle size={14} className="text-semantic-warning" />,
  approved:        <CheckCircle size={14} className="text-semantic-success" />,
  publishing:      <Play size={14} className="text-semantic-success" />,
  published:       <CheckCircle size={14} className="text-semantic-success" />,
  failed:          <AlertCircle size={14} className="text-semantic-danger" />,
};

export default async function ClientVideoPage({
  params,
}: {
  params: { clientId: string };
}) {
  const supabase = await createSupabaseServerClient();
  const { data: productions } = await supabase
    .schema('agency')
    .from('video_productions')
    .select('*')
    .eq('client_id', params.clientId)
    .order('created_at', { ascending: false });

  const active = (productions ?? []).filter(p => p.status !== 'published' && p.status !== 'failed');
  const published = (productions ?? []).filter(p => p.status === 'published');

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-heading-lg text-white-0">Video Productions</h2>
        <Link
          href={`/clients/${params.clientId}/video/new`}
          className="btn-agency flex items-center gap-2"
        >
          <Plus size={15} />
          New Production
        </Link>
      </div>

      {/* Active queue */}
      {active.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-slate-6 uppercase tracking-wide mb-3">
            In Progress ({active.length})
          </h3>
          <div className="panel-card divide-y divide-border-subtle">
            {active.map(prod => (
              <Link
                key={prod.id}
                href={`/clients/${params.clientId}/video/${prod.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-slate-3 transition-colors"
              >
                {/* Pipeline progress dots */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {['queued','scripting','generating','internal_review','client_review','approved','published']
                    .map((step, i) => {
                      const steps = ['queued','scripting','script_review','generating','internal_review','client_review','revision','approved','publishing','published'];
                      const currentIdx = steps.indexOf(prod.status);
                      const stepIdx = steps.indexOf(step);
                      return (
                        <div
                          key={step}
                          className={`w-2 h-2 rounded-full ${
                            stepIdx < currentIdx ? 'bg-semantic-success'
                            : stepIdx === currentIdx ? 'bg-brand-cyan'
                            : 'bg-slate-5'
                          }`}
                        />
                      );
                  })}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white-0 truncate">{prod.title}</p>
                  <p className="text-xs text-slate-6 capitalize">
                    {prod.format.replace(/_/g, ' ')}
                    {prod.revision_count > 0 && ` · ${prod.revision_count} revision${prod.revision_count > 1 ? 's' : ''}`}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`badge-${prod.status.replace(/_/g, '-')}`}>
                    {STATUS_LABELS[prod.status]}
                  </span>
                  <span className="text-xs text-slate-6">
                    {formatRelativeTime(prod.updated_at)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Published library */}
      {published.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-slate-6 uppercase tracking-wide mb-3">
            Published ({published.length})
          </h3>
          <div className="panel-card divide-y divide-border-subtle">
            {published.map(prod => (
              <div key={prod.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white-0 truncate">{prod.title}</p>
                  <p className="text-xs text-slate-6 capitalize">{prod.format.replace(/_/g, ' ')}</p>
                </div>
                <div className="flex items-center gap-3">
                  {prod.youtube_url && (
                    <a
                      href={prod.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-cyan hover:underline"
                    >
                      YouTube ↗
                    </a>
                  )}
                  <span className="text-xs text-slate-6">
                    {prod.published_at
                      ? formatRelativeTime(prod.published_at)
                      : '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(productions ?? []).length === 0 && (
        <div className="panel-card py-16 text-center">
          <p className="text-sm text-slate-6 mb-4">No video productions yet</p>
          <Link
            href={`/clients/${params.clientId}/video/new`}
            className="btn-agency inline-flex items-center gap-2"
          >
            <Plus size={15} />
            Create first production
          </Link>
        </div>
      )}
    </div>
  );
}
