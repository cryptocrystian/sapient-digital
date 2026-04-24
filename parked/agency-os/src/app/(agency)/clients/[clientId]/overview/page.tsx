import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatDate, formatCurrency, STATUS_LABELS, TIER_LABELS } from '@/lib/utils';
import { Video, Radio, FileText, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';

export default async function ClientOverviewPage({
  params,
}: {
  params: { clientId: string };
}) {
  const supabase = await createSupabaseServerClient();

  const [
    { data: client },
    { data: retainer },
    { data: pillars },
    { data: recentCoverage },
    { data: videoProductions },
    { data: openTasks },
    { data: escalations },
  ] = await Promise.all([
    supabase.schema('agency').from('clients').select('*').eq('id', params.clientId).single(),
    supabase.schema('agency').from('retainers').select('*').eq('client_id', params.clientId).eq('status', 'active').single(),
    supabase.schema('agency').from('client_pillars').select('*').eq('client_id', params.clientId),
    supabase.schema('agency').from('coverage').select('*').eq('client_id', params.clientId).order('published_at', { ascending: false }).limit(5),
    supabase.schema('agency').from('video_productions').select('*').eq('client_id', params.clientId).not('status', 'in', '("published","failed")'),
    supabase.schema('agency').from('tasks').select('*').eq('client_id', params.clientId).neq('status', 'done').order('due_date'),
    supabase.schema('agency').from('escalations').select('*').eq('client_id', params.clientId).eq('status', 'open'),
  ]);

  if (!client) notFound();

  const activePillars = (pillars ?? []).filter(p => p.status === 'active');

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Escalation banner */}
      {(escalations ?? []).length > 0 && (
        <div className="alert-warning mb-6 flex items-center gap-2">
          <AlertTriangle size={15} />
          <span>
            <strong>{escalations!.length} open escalation{escalations!.length > 1 ? 's' : ''}</strong>
            {' — requires attention'}
          </span>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Retainer Tier',
            value: retainer ? TIER_LABELS[retainer.tier] : 'No retainer',
            sub: retainer ? formatCurrency(retainer.monthly_value) + '/mo' : '',
          },
          {
            label: 'Active Pillars',
            value: activePillars.length,
            sub: activePillars.map(p => p.pillar.toUpperCase()).join(' · '),
          },
          {
            label: 'Videos In Flight',
            value: (videoProductions ?? []).length,
            sub: (videoProductions ?? []).length === 0
              ? 'No active productions'
              : (videoProductions ?? []).some(v => v.status === 'client_review')
              ? 'Awaiting client review'
              : (videoProductions ?? []).some(v => v.status === 'internal_review')
              ? 'Awaiting internal QA'
              : (videoProductions ?? []).some(v => v.status === 'generating')
              ? 'Generating...'
              : 'In pipeline',
          },
          {
            label: 'Open Tasks',
            value: (openTasks ?? []).length,
            sub: (openTasks ?? []).filter(t => t.priority === 'critical').length > 0
              ? `${openTasks!.filter(t => t.priority === 'critical').length} critical`
              : 'No critical items',
          },
        ].map(card => (
          <div key={card.label} className="panel-card p-4">
            <p className="text-xs text-slate-6 uppercase tracking-wide font-medium mb-2">{card.label}</p>
            <p className="text-stat text-white-0">{card.value}</p>
            {card.sub && <p className="text-xs text-slate-6 mt-1">{card.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent Coverage */}
        <div className="panel-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
            <h3 className="text-heading-sm text-white-0">Recent Coverage</h3>
          </div>
          <div className="divide-y divide-border-subtle">
            {(recentCoverage ?? []).length === 0 ? (
              <p className="px-5 py-6 text-sm text-slate-6">No coverage secured yet</p>
            ) : (
              (recentCoverage ?? []).map(item => (
                <div key={item.id} className="px-5 py-3.5">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white-0 hover:text-brand-cyan transition-colors line-clamp-2"
                  >
                    {item.headline}
                  </a>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`badge-tier${item.tier.replace('tier', '')}`}>
                      {item.tier.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-6">{item.publication}</span>
                    <span className="text-xs text-slate-6 ml-auto">
                      {formatDate(item.published_at, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Video Productions */}
        <div className="panel-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
            <h3 className="text-heading-sm text-white-0">Video Productions</h3>
          </div>
          <div className="divide-y divide-border-subtle">
            {(videoProductions ?? []).length === 0 ? (
              <p className="px-5 py-6 text-sm text-slate-6">No active productions</p>
            ) : (
              (videoProductions ?? []).map(prod => (
                <div key={prod.id} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white-0 truncate">{prod.title}</p>
                    <p className="text-xs text-slate-6 capitalize">{prod.format.replace(/_/g, ' ')}</p>
                  </div>
                  <span className={`badge-${prod.status.replace('_', '-')} flex-shrink-0`}>
                    {STATUS_LABELS[prod.status] ?? prod.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Open Tasks */}
      {(openTasks ?? []).length > 0 && (
        <div className="panel-card mt-6">
          <div className="px-5 py-4 border-b border-border-subtle">
            <h3 className="text-heading-sm text-white-0">Open Tasks</h3>
          </div>
          <div className="divide-y divide-border-subtle">
            {(openTasks ?? []).map(task => (
              <div key={task.id} className="flex items-center gap-3 px-5 py-3.5">
                <span className={`badge-${task.priority} flex-shrink-0`}>
                  {STATUS_LABELS[task.priority]}
                </span>
                <p className="text-sm text-white-0 flex-1 truncate">{task.title}</p>
                {task.due_date && (
                  <p className="text-xs text-slate-6 flex-shrink-0">
                    Due {formatDate(task.due_date, { month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
