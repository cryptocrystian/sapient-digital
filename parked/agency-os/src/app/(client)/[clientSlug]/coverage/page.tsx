import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { ExternalLink, TrendingUp } from 'lucide-react';

export default async function ClientPortalCoveragePage({
  params,
}: {
  params: { clientSlug: string };
}) {
  const supabase = await createSupabaseServerClient();

  const { data: client } = await supabase
    .schema('agency').from('clients').select('id, name').eq('slug', params.clientSlug).single();
  if (!client) notFound();

  const { data: coverage } = await supabase
    .schema('agency').from('coverage').select('*')
    .eq('client_id', client.id)
    .order('published_at', { ascending: false });

  const all       = coverage ?? [];
  const tier1     = all.filter(c => c.tier === 'tier1').length;
  const tier2     = all.filter(c => c.tier === 'tier2').length;
  const avgDA     = all.length > 0
    ? Math.round(all.filter(c => c.domain_authority).reduce((s, c) => s + (c.domain_authority ?? 0), 0) / all.filter(c => c.domain_authority).length) || 0
    : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-heading-xl text-white-0 mb-1">Coverage</h1>
        <p className="text-sm text-slate-6">{all.length} placements secured</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Placements', value: all.length },
          { label: 'Tier 1 Hits',      value: tier1 },
          { label: 'Avg Domain Auth',  value: avgDA || '—' },
        ].map(s => (
          <div key={s.label} className="panel-card p-5">
            <TrendingUp size={16} className="text-brand-cyan mb-3" />
            <p className="text-stat text-white-0">{s.value}</p>
            <p className="text-xs text-slate-6 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Coverage list */}
      <div className="panel-card divide-y divide-border-subtle">
        {all.length === 0 ? (
          <p className="px-5 py-16 text-sm text-slate-6 text-center">
            Your first coverage placement will appear here
          </p>
        ) : all.map(item => (
          <div key={item.id} className="px-5 py-4">
            <a href={item.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2 group">
              <p className="text-sm font-medium text-white-0 group-hover:text-brand-cyan transition-colors flex-1">
                {item.headline}
              </p>
              <ExternalLink size={13} className="text-slate-6 flex-shrink-0 mt-0.5 group-hover:text-brand-cyan" />
            </a>
            <div className="flex items-center gap-3 mt-2">
              <span className={`badge-tier${item.tier.replace('tier','')}`}>{item.tier.toUpperCase()}</span>
              <span className="text-xs text-slate-6 font-medium">{item.publication}</span>
              {item.domain_authority && (
                <span className="text-xs text-slate-6">DA {item.domain_authority}</span>
              )}
              {item.aeo_indexed && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-slate-4 text-brand-cyan">AEO ✓</span>
              )}
              <span className="text-xs text-slate-6 ml-auto">
                {formatDate(item.published_at, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
