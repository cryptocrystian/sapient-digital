import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { FileText, Download } from 'lucide-react';

export default async function ClientPortalReportsPage({
  params,
}: {
  params: { clientSlug: string };
}) {
  const supabase = await createSupabaseServerClient();

  const { data: client } = await supabase
    .schema('agency').from('clients').select('id, name').eq('slug', params.clientSlug).single();
  if (!client) notFound();

  const { data: reports } = await supabase
    .schema('agency').from('reports').select('*')
    .eq('client_id', client.id).eq('status', 'sent')
    .order('period_start', { ascending: false });

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-heading-xl text-white-0 mb-1">Performance Reports</h1>
        <p className="text-sm text-slate-6">{(reports ?? []).length} report{(reports ?? []).length !== 1 ? 's' : ''} available</p>
      </div>

      <div className="panel-card divide-y divide-border-subtle">
        {(reports ?? []).length === 0 ? (
          <div className="px-5 py-16 text-center">
            <FileText size={28} className="text-slate-6 mx-auto mb-3" />
            <p className="text-sm text-white-0 font-medium mb-1">No reports yet</p>
            <p className="text-xs text-slate-6">Your first monthly report will appear here</p>
          </div>
        ) : (reports ?? []).map((report: any) => {
          const snap = report.data_snapshot as any;
          return (
            <div key={report.id} className="px-5 py-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-white-0 capitalize">{report.type} Report</p>
                  <p className="text-xs text-slate-6">
                    {formatDate(report.period_start, { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full text-semantic-success bg-green-900/20">
                  Delivered
                </span>
              </div>

              {snap && (
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Coverage',  value: snap.coverage_count   ?? 0 },
                    { label: 'Tier 1',    value: snap.coverage_by_tier?.tier1 ?? 0 },
                    { label: 'Placements',value: snap.pitches_placed    ?? 0 },
                    { label: 'Videos',    value: snap.videos_published  ?? 0 },
                  ].map(s => (
                    <div key={s.label} className="bg-slate-3 rounded-md p-3 text-center">
                      <p className="text-lg font-bold text-white-0 tabular-nums">{s.value}</p>
                      <p className="text-xs text-slate-6 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {snap?.ai_narrative && (
                <p className="text-sm text-slate-6 leading-relaxed line-clamp-3">
                  {snap.ai_narrative}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
