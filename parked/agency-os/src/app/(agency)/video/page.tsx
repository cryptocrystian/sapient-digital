import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { formatRelativeTime, STATUS_LABELS } from '@/lib/utils';
import { Play, Clock } from 'lucide-react';

const STATUS_GROUPS = [
  { label: 'Needs Action', statuses: ['internal_review', 'script_review'], color: 'text-semantic-warning' },
  { label: 'With Client', statuses: ['client_review'], color: 'text-brand-cyan' },
  { label: 'In Pipeline', statuses: ['queued', 'scripting', 'generating'], color: 'text-brand-iris' },
  { label: 'Approved', statuses: ['approved', 'publishing'], color: 'text-semantic-success' },
];

export default async function VideoQueuePage() {
  const supabase = await createSupabaseServerClient();

  const { data: productions } = await supabase
    .schema('agency')
    .from('video_productions')
    .select('id, title, format, status, updated_at, client_id, revision_count, clients(name, slug)')
    .not('status', 'in', '("published","failed")')
    .order('updated_at', { ascending: false });

  const all = productions ?? [];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-heading-xl text-white-0 mb-1">Video Queue</h1>
          <p className="text-sm text-slate-6">{all.length} production{all.length !== 1 ? 's' : ''} in flight</p>
        </div>
      </div>

      {all.length === 0 ? (
        <div className="panel-card py-16 text-center">
          <Play size={32} className="text-slate-6 mx-auto mb-3" />
          <p className="text-sm text-white-0 font-medium mb-1">Queue is clear</p>
          <p className="text-xs text-slate-6">No videos currently in production</p>
        </div>
      ) : (
        <div className="space-y-8">
          {STATUS_GROUPS.map(group => {
            const items = all.filter(p => group.statuses.includes(p.status));
            if (items.length === 0) return null;
            return (
              <div key={group.label}>
                <h2 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${group.color}`}>
                  {group.label} ({items.length})
                </h2>
                <div className="panel-card divide-y divide-border-subtle">
                  {items.map(prod => {
                    const client = prod.clients as any;
                    return (
                      <Link
                        key={prod.id}
                        href={`/clients/${prod.client_id}/video/${prod.id}`}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-slate-3 transition-colors group"
                      >
                        {/* Format icon */}
                        <div className="w-8 h-8 rounded-md bg-slate-4 flex items-center justify-center flex-shrink-0">
                          <Play size={13} className="text-slate-6 group-hover:text-brand-cyan transition-colors" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white-0 truncate group-hover:text-brand-cyan transition-colors">
                            {prod.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-slate-6">{client?.name}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-slate-4 text-slate-6 capitalize">
                              {prod.format.replace(/_/g, ' ')}
                            </span>
                            {prod.revision_count > 0 && (
                              <span className="text-xs text-semantic-warning">
                                {prod.revision_count} revision{prod.revision_count > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`badge-${prod.status.replace(/_/g, '-')}`}>
                            {STATUS_LABELS[prod.status]}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-slate-6">
                            <Clock size={11} />
                            {formatRelativeTime(prod.updated_at)}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
