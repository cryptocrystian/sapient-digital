import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { formatDate, STATUS_LABELS, TIER_LABELS } from '@/lib/utils';
import { Plus, Search } from 'lucide-react';

async function getClients() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .schema('agency')
    .from('clients')
    .select(`
      id, name, slug, status, segment, domain, logo_url,
      retainers(tier, monthly_value, status, video_module),
      client_pillars(pillar, status)
    `)
    .order('name');
  return data ?? [];
}

const SEGMENT_LABELS: Record<string, string> = {
  b2b_saas: 'B2B SaaS',
  professional_services: 'Professional Services',
  industrial: 'Industrial',
  executive: 'Executive',
};

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const clients = await getClients();
  const statusFilter = searchParams.status;
  const filtered = statusFilter
    ? clients.filter(c => c.status === statusFilter)
    : clients;

  const counts = {
    all: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    onboarding: clients.filter(c => c.status === 'onboarding').length,
    paused: clients.filter(c => c.status === 'paused').length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-heading-xl text-white-0 mb-1">Clients</h1>
          <p className="text-sm text-slate-6">{counts.all} total · {counts.active} active</p>
        </div>
        <Link href="/clients/new" className="btn-agency flex items-center gap-2">
          <Plus size={15} />
          New Client
        </Link>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1 mb-6">
        {[
          { label: `All (${counts.all})`, value: undefined },
          { label: `Active (${counts.active})`, value: 'active' },
          { label: `Onboarding (${counts.onboarding})`, value: 'onboarding' },
          { label: `Paused (${counts.paused})`, value: 'paused' },
        ].map(tab => (
          <Link
            key={tab.label}
            href={tab.value ? `/clients?status=${tab.value}` : '/clients'}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              statusFilter === tab.value
                ? 'bg-slate-4 text-white-0'
                : 'text-slate-6 hover:text-white-0 hover:bg-slate-3'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Client table */}
      <div className="panel-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-slate-6">No clients found</p>
            <Link href="/clients/new" className="btn-agency mt-4 inline-flex items-center gap-2">
              <Plus size={15} /> Add first client
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                {['Client', 'Segment', 'Tier', 'Pillars', 'MRR', 'Status'].map(h => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold text-slate-6 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((client, i) => {
                const retainer = (client.retainers as any[])?.[0];
                const pillars = (client.client_pillars as any[]) ?? [];
                return (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-3 transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/clients/${client.id}/overview`}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-md bg-slate-4 flex items-center justify-center text-xs font-bold text-white-0 flex-shrink-0">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white-0">{client.name}</p>
                          <p className="text-xs text-slate-6">{client.domain}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-6">
                      {SEGMENT_LABELS[client.segment ?? ''] || '—'}
                    </td>
                    <td className="px-5 py-4">
                      {retainer ? (
                        <span className="badge-tier1">
                          {TIER_LABELS[retainer.tier] || retainer.tier}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {pillars.filter(p => p.status === 'active').map((p: any) => (
                          <span
                            key={p.pillar}
                            className="text-xs px-2 py-0.5 rounded bg-slate-4 text-slate-6 uppercase font-medium"
                          >
                            {p.pillar}
                          </span>
                        ))}
                        {retainer?.video_module && (
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-4 uppercase font-medium"
                            style={{ color: 'var(--agency-gold)' }}>
                            VID
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-white-0">
                      {retainer
                        ? `$${(retainer.monthly_value / 100).toLocaleString()}`
                        : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`badge-${client.status}`}>
                        {STATUS_LABELS[client.status]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
