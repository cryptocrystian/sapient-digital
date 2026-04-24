import { createSupabaseServerClient } from '@/lib/supabase/server';
import { formatDate, formatRelativeTime, STATUS_LABELS, TIER_LABELS } from '@/lib/utils';
import Link from 'next/link';
import { Users, Video, CheckSquare, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

async function getDashboardData() {
  const supabase = await createSupabaseServerClient();

  const [
    { data: clients },
    { data: videoQueue },
    { data: tasks },
    { data: recentCoverage },
    { data: escalations },
  ] = await Promise.all([
    supabase
      .schema('agency')
      .from('clients')
      .select('id, name, slug, status, logo_url')
      .order('name'),
    supabase
      .schema('agency')
      .from('video_productions')
      .select('id, title, status, client_id, updated_at, clients(name, slug)')
      .not('status', 'in', '("published","failed")')
      .order('updated_at', { ascending: false })
      .limit(8),
    supabase
      .schema('agency')
      .from('tasks')
      .select('id, title, priority, status, due_date, client_id, clients(name)')
      .neq('status', 'done')
      .order('due_date', { ascending: true, nullsFirst: false })
      .limit(10),
    supabase
      .schema('agency')
      .from('coverage')
      .select('id, headline, publication, tier, published_at, client_id, clients(name, slug)')
      .order('published_at', { ascending: false })
      .limit(5),
    supabase
      .schema('agency')
      .from('escalations')
      .select('id, type, severity, client_id, clients(name)')
      .eq('status', 'open')
      .order('created_at', { ascending: false }),
  ]);

  const activeClients = (clients ?? []).filter(c => c.status === 'active');
  const onboardingClients = (clients ?? []).filter(c => c.status === 'onboarding');

  return {
    clients: clients ?? [],
    activeClients,
    onboardingClients,
    videoQueue: videoQueue ?? [],
    tasks: tasks ?? [],
    recentCoverage: recentCoverage ?? [],
    escalations: escalations ?? [],
  };
}

export default async function DashboardPage() {
  const {
    activeClients, onboardingClients, videoQueue,
    tasks, recentCoverage, escalations,
  } = await getDashboardData();

  const urgentTasks = tasks.filter(t => t.priority === 'critical' || t.priority === 'high');
  const videoInReview = videoQueue.filter(v =>
    v.status === 'internal_review' || v.status === 'client_review'
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-heading-xl text-white-0 mb-1">Agency Dashboard</h1>
        <p className="text-sm text-slate-6">
          {formatDate(new Date(), { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Escalation banner — shown only if open escalations exist */}
      {escalations.length > 0 && (
        <div className="alert-warning mb-6 flex items-center gap-3">
          <AlertTriangle size={16} className="flex-shrink-0" />
          <span>
            <strong>{escalations.length} open escalation{escalations.length > 1 ? 's' : ''}</strong>
            {' — '}
            {escalations.map(e => (e.clients as any)?.name).join(', ')}
          </span>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Active Clients',
            value: activeClients.length,
            icon: Users,
            color: 'var(--brand-cyan)',
            href: '/clients?status=active',
          },
          {
            label: 'Onboarding',
            value: onboardingClients.length,
            icon: TrendingUp,
            color: 'var(--brand-amber)',
            href: '/clients?status=onboarding',
          },
          {
            label: 'Videos In Flight',
            value: videoQueue.length,
            icon: Video,
            color: 'var(--brand-iris)',
            href: '/video',
          },
          {
            label: 'Open Tasks',
            value: tasks.length,
            icon: CheckSquare,
            color: urgentTasks.length > 0 ? 'var(--semantic-danger)' : 'var(--semantic-success)',
            href: '/tasks',
          },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="panel-card p-5 hover:bg-slate-3 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-medium text-slate-6 uppercase tracking-wide">{stat.label}</p>
                <Icon size={16} style={{ color: stat.color }} />
              </div>
              <p className="text-stat text-white-0">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-6">

        {/* Video Queue */}
        <div className="col-span-2 panel-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
            <h2 className="text-heading-sm text-white-0">Video Queue</h2>
            <Link href="/video" className="text-xs text-brand-cyan hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-border-subtle">
            {videoQueue.length === 0 ? (
              <p className="px-5 py-6 text-sm text-slate-6 text-center">No videos in flight</p>
            ) : (
              videoQueue.map(prod => {
                const client = prod.clients as any;
                return (
                  <Link
                    key={prod.id}
                    href={`/clients/${prod.client_id}/video/${prod.id}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-3 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white-0 truncate">{prod.title}</p>
                      <p className="text-xs text-slate-6">{client?.name}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`badge-${prod.status.replace('_', '-')}`}>
                        {STATUS_LABELS[prod.status] || prod.status}
                      </span>
                      <span className="text-xs text-slate-6">
                        {formatRelativeTime(prod.updated_at)}
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Right column: Tasks + Coverage */}
        <div className="space-y-6">

          {/* Urgent Tasks */}
          <div className="panel-card">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border-subtle">
              <h2 className="text-heading-sm text-white-0">Urgent Tasks</h2>
              <Link href="/tasks" className="text-xs text-brand-cyan hover:underline">All</Link>
            </div>
            <div className="divide-y divide-border-subtle">
              {urgentTasks.length === 0 ? (
                <p className="px-4 py-4 text-sm text-slate-6">All clear</p>
              ) : (
                urgentTasks.slice(0, 5).map(task => (
                  <div key={task.id} className="px-4 py-3">
                    <p className="text-sm font-medium text-white-0 truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`badge-${task.priority}`}>
                        {STATUS_LABELS[task.priority]}
                      </span>
                      {task.due_date && (
                        <span className="flex items-center gap-1 text-xs text-slate-6">
                          <Clock size={10} />
                          {formatDate(task.due_date, { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Coverage */}
          <div className="panel-card">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border-subtle">
              <h2 className="text-heading-sm text-white-0">Recent Coverage</h2>
            </div>
            <div className="divide-y divide-border-subtle">
              {recentCoverage.length === 0 ? (
                <p className="px-4 py-4 text-sm text-slate-6">No coverage yet</p>
              ) : (
                recentCoverage.map(item => {
                  const client = item.clients as any;
                  return (
                    <div key={item.id} className="px-4 py-3">
                      <p className="text-sm text-white-0 truncate leading-snug">{item.headline}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`badge-tier${item.tier.replace('tier', '')}`}>
                          {TIER_LABELS[item.tier]}
                        </span>
                        <span className="text-xs text-slate-6 truncate">{item.publication}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
