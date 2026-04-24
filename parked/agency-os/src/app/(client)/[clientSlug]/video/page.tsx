import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatDate, STATUS_LABELS } from '@/lib/utils';
import { Play, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default async function ClientPortalVideoPage({
  params,
}: {
  params: { clientSlug: string };
}) {
  const supabase = await createSupabaseServerClient();

  const { data: client } = await supabase
    .schema('agency').from('clients').select('id, name').eq('slug', params.clientSlug).single();
  if (!client) notFound();

  const { data: productions } = await supabase
    .schema('agency').from('video_productions')
    .select('id, title, format, status, vimeo_review_url, youtube_url, generated_at, published_at')
    .eq('client_id', client.id)
    .order('created_at', { ascending: false });

  const awaitingReview = (productions ?? []).filter(p => p.status === 'client_review');
  const published      = (productions ?? []).filter(p => p.status === 'published');
  const inProgress     = (productions ?? []).filter(p => !['published','client_review','failed'].includes(p.status));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-heading-xl text-white-0 mb-1">Video Productions</h1>
        <p className="text-sm text-slate-6">
          {awaitingReview.length > 0
            ? `${awaitingReview.length} video${awaitingReview.length > 1 ? 's' : ''} awaiting your review`
            : `${published.length} published · ${inProgress.length} in production`
          }
        </p>
      </div>

      {/* Awaiting review */}
      {awaitingReview.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-semantic-warning uppercase tracking-wide mb-3">
            Needs Your Review ({awaitingReview.length})
          </h2>
          <div className="panel-card divide-y divide-border-subtle">
            {awaitingReview.map((prod: any) => (
              <div key={prod.id} className="flex items-center gap-4 px-5 py-5">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white-0">{prod.title}</p>
                  <p className="text-xs text-slate-6 mt-0.5 capitalize">{prod.format.replace(/_/g,' ')}</p>
                </div>
                {prod.vimeo_review_url ? (
                  <a href={prod.vimeo_review_url} target="_blank" rel="noopener noreferrer"
                    className="btn-agency flex items-center gap-2 text-sm px-4 py-2">
                    <Play size={13} /> Watch & Review
                  </a>
                ) : (
                  <span className="text-xs text-slate-6 px-4 py-2">Review link coming</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In production */}
      {inProgress.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-brand-iris uppercase tracking-wide mb-3">
            In Production ({inProgress.length})
          </h2>
          <div className="panel-card divide-y divide-border-subtle">
            {inProgress.map((prod: any) => (
              <div key={prod.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white-0">{prod.title}</p>
                  <p className="text-xs text-slate-6 mt-0.5 capitalize">{prod.format.replace(/_/g,' ')}</p>
                </div>
                <span className={`badge-${prod.status.replace(/_/g,'-')}`}>
                  {STATUS_LABELS[prod.status] ?? prod.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Published */}
      {published.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-semantic-success uppercase tracking-wide mb-3">
            Published ({published.length})
          </h2>
          <div className="panel-card divide-y divide-border-subtle">
            {published.map((prod: any) => (
              <div key={prod.id} className="flex items-center gap-4 px-5 py-4">
                <CheckCircle size={16} className="text-semantic-success flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white-0">{prod.title}</p>
                  <p className="text-xs text-slate-6 mt-0.5">
                    Published {prod.published_at ? formatDate(prod.published_at, { month: 'short', day: 'numeric' }) : ''}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {prod.youtube_url && (
                    <a href={prod.youtube_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-brand-cyan hover:underline">
                      YouTube <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(productions ?? []).length === 0 && (
        <div className="panel-card py-16 text-center">
          <Play size={28} className="text-slate-6 mx-auto mb-3" />
          <p className="text-sm text-white-0 font-medium mb-1">No videos yet</p>
          <p className="text-xs text-slate-6">Your first production will appear here</p>
        </div>
      )}
    </div>
  );
}
