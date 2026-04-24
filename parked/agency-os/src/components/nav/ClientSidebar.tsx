'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Radio,
  FileText,
  Video,
  BarChart2,
  FileOutput,
} from 'lucide-react';

const CLIENT_NAV = [
  { label: 'Overview',    href: 'overview',    icon: LayoutDashboard },
  { label: 'Coverage',    href: 'coverage',    icon: Radio },
  { label: 'Content',     href: 'content',     icon: FileText },
  { label: 'AI Presence', href: 'ai-presence', icon: BarChart2 },
  { label: 'Video',       href: 'video',       icon: Video },
  { label: 'Reports',     href: 'reports',     icon: FileOutput },
];

export function ClientSidebar({ clientSlug, clientName }: {
  clientSlug: string;
  clientName: string;
}) {
  const pathname = usePathname();
  const base = `/c/${clientSlug}`;

  return (
    <aside className="fixed inset-y-0 left-0 w-56 flex flex-col bg-panel border-r border-border-subtle z-nav">
      {/* Header */}
      <div className="h-16 flex items-center px-5 border-b border-border-subtle">
        <div>
          <p className="text-xs font-medium" style={{ color: 'var(--agency-gold)' }}>
            Sapient Digital
          </p>
          <p className="text-sm font-semibold text-white-0 truncate">{clientName}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {CLIENT_NAV.map(item => {
          const Icon = item.icon;
          const href = `${base}/${item.href}`;
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all',
                isActive
                  ? 'text-white-0 bg-slate-4'
                  : 'text-slate-6 hover:text-white-0 hover:bg-slate-3'
              )}
            >
              <Icon size={16} className={cn(isActive ? 'text-brand-cyan' : 'text-slate-6')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 pb-5">
        <p className="text-xs text-slate-6">
          Powered by{' '}
          <span style={{ color: 'var(--agency-gold)' }}>Sapient Digital</span>
        </p>
      </div>
    </aside>
  );
}
