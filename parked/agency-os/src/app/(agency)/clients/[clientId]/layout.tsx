import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ClientProvider } from '@/providers/ClientProvider';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Radio, FileText, Search, Video, BarChart2, FileOutput, Settings,
} from 'lucide-react';

const CLIENT_NAV = [
  { label: 'Overview',   href: 'overview',  icon: LayoutDashboard },
  { label: 'PR',         href: 'pr',        icon: Radio },
  { label: 'Content',    href: 'content',   icon: FileText },
  { label: 'AEO',        href: 'aeo',       icon: BarChart2 },
  { label: 'Video',      href: 'video',     icon: Video },
  { label: 'Reports',    href: 'reports',   icon: FileOutput },
  { label: 'Settings',   href: 'settings',  icon: Settings },
];

export default async function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { clientId: string };
}) {
  const supabase = await createSupabaseServerClient();
  const { data: client } = await supabase
    .schema('agency')
    .from('clients')
    .select('id, name, slug, status, domain, logo_url')
    .eq('id', params.clientId)
    .single();

  if (!client) notFound();

  return (
    <ClientProvider clientId={params.clientId}>
      <div className="flex flex-col min-h-screen">
        {/* Client top bar */}
        <div className="sticky top-0 z-30 bg-panel border-b border-border-subtle">
          <div className="flex items-center gap-0 px-6">
            {/* Client identity */}
            <div className="flex items-center gap-3 py-3 pr-6 border-r border-border-subtle mr-2">
              <div className="w-7 h-7 rounded bg-slate-4 flex items-center justify-center text-xs font-bold text-white-0">
                {client.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white-0 leading-none">{client.name}</p>
                <p className="text-xs text-slate-6 mt-0.5">{client.domain}</p>
              </div>
            </div>

            {/* Pillar tabs */}
            <nav className="flex items-center gap-0">
              {CLIENT_NAV.map(item => {
                const Icon = item.icon;
                const href = `/clients/${client.id}/${item.href}`;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium',
                      'border-b-2 transition-colors',
                      'text-slate-6 border-transparent hover:text-white-0 hover:border-slate-5'
                    )}
                  >
                    <Icon size={14} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Client portal link */}
            <div className="ml-auto">
              <Link
                href={`/c/${client.slug}/overview`}
                className="text-xs text-slate-6 hover:text-white-0 transition-colors"
                target="_blank"
              >
                Client view ↗
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 bg-page">
          {children}
        </div>
      </div>
    </ClientProvider>
  );
}
