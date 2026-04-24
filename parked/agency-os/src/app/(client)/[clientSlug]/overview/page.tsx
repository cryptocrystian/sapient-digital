import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatDate, STATUS_LABELS, TIER_LABELS, formatCurrency } from '@/lib/utils';
import { Radio, Video, FileText } from 'lucide-react';

export default async function ClientPortalOverviewPage({
  params,
}: {
  params: { clientSlug: string };
}) {
  const supabase = await createSupabaseServerClient();

  const { data: client } = await supabase
    .schema('agency').from('clients').select('*').eq('slug', params.clientSlug).single();
  if (!client) notFound();

  const [
    { data: retainer },
    { data: recentCoverage },
    { data: pendingVideos },
    { data: allCoverage },
    { data: allVideos },
  ] = await Promise.all([
    supabase.schema('agency').from('retainers').select('*').eq('client_id', client.id).eq('status', 'active').single(),
    supabase.schema('agency').from('coverage').select('*').eq('client_id', client.id)
      .order('published_at', { ascending: false }).limit(5),
    supabase.schema('agency').from('video_productions').select('id, title, status, vimeo_review_url')
      .eq('client_id', client.id).eq('status', 'client_review'),
    supabase.schema('agency').from('coverage').select('id').eq('client_id', client.id),
    supabase.schema('agency').from('video_productions').select('id').eq('client_id', client.id).eq('status', 'published'),
  ]);

  const coverageCount = (allCoverage ?? []).length;
  const videosPublished = (allVideos ?? []).length;
  const pendingCount = (pendingVideos ?? []).length;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-sm mb-1" style={{ color: 'var(--agency-gold)' }}>Sapient Digital</p>
        <h1 className="text-heading-xl text-white-0">{client.name}</h1>
        {retainer && (
          <p className="text-sm text-slate-6 mt-1">
            {TIER_LABELS[retainer.tier]} Program · {formatCurrency(retainer.monthly_value)}/month
          </p>
        )}
      </div>

      {/* Pending approvals banner */}
      {pendingCount > 0 && (
        <div className="alert-info mb-6">
          <p className="font-medium text-sm">
            {pendingCount} video{pendingCount > 1 ? 's' : ''} awaiting your review
          </p>
          <p className="text-xs mt-0.5 opacity-80">Click "Watch & Review" below to give feedback</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Coverage Pieces', value: coverageCount,   icon: Radio    },
          { label: 'Videos Published',value: videosPublished, icon: Video    },
          { label: 'Tier 1 Hits',     value: (allCoverage ?? []).filter((c: any) => c.tier === 'tier1').length, icon: FileText },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="panel-card p-5">
              <Icon size={16} className="text-brand-cyan mb-3" />
              <p className="text-stat text-white-0">{stat.value}</p>
              <p className="text-xs text-slate-6 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Pending video approvals */}
      {(pendingVideos ?? []).length > 0 && (
        <div className="panel-card mb-6">
          <div className="px-5 py-4 border-b border-border-subtle">
            <h3 className="text-heading-sm text-white-0">Videos Awaiting Your Review</h3>
          </div>
          <div className="divide-y divide-border-subtle">
            {(pendingVideos ?? []).map((prod: any) => (
              <div key={prod.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white-0">{prod.title}</p>
                  <p className="text-xs text-slate-6 mt-0.5">Awaiting your approval</p>
                </div>
                {prod.vimeo_review_url ? (
                  <a href={prod.vimeo_review_url} target="_blank" rel="noopener noreferrer"
                    className="btn-agency text-sm px-4 py-2">
                    Watch & Review →
                  </a>
                ) : (
                  <span className="text-xs text-slate-6">Link coming soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent coverage */}
      {(recentCoverage ?? []).length > 0 && (
        <div className="panel-card">
          <div className="px-5 py-4 border-b border-border-subtle">
            <h3 className="text-heading-sm text-white-0">Recent Coverage</h3>
          </div>
          <div className="divide-y divide-border-subtle">
            {(recentCoverage ?? []).map((item: any) => (
              <div key={item.id} className="px-5 py-4">
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium text-white-0 hover:text-brand-cyan transition-colors">
                  {item.headline}
                </a>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`badge-tier${item.tier.replace('tier','')}`}>{item.tier.toUpperCase()}</span>
                  <span className="text-xs text-slate-6">{item.publication}</span>
                  <span className="text-xs text-slate-6 ml-auto">
                    {formatDate(item.published_at, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
