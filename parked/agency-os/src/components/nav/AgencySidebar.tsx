'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTenant } from '@/providers/TenantProvider';
import {
  LayoutDashboard,
  Users,
  Video,
  CheckSquare,
  Building2,
  Settings,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Clients',
    href: '/clients',
    icon: Users,
  },
  {
    label: 'Video Queue',
    href: '/video',
    icon: Video,
  },
  {
    label: 'Tasks',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    label: 'Partners',
    href: '/partners',
    icon: Building2,
    adminOnly: true,
  },
];

export function AgencySidebar() {
  const pathname = usePathname();
  const { tenant, member, isAdmin } = useTenant();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-60 flex flex-col bg-panel border-r border-border-subtle z-nav">
      {/* Logo / Brand */}
      <div className="h-16 flex items-center px-5 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          {/* Gold accent bar */}
          <div className="w-1 h-6 rounded-full" style={{ background: 'var(--agency-gold)' }} />
          <div>
            <p className="text-sm font-semibold text-white-0 leading-none">Sapient Digital</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--agency-gold)' }}>Agency OS</p>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.filter(item => !item.adminOnly || isAdmin).map(item => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all',
                'duration-[var(--motion-duration-sm)]',
                isActive
                  ? 'text-white-0 bg-slate-4'
                  : 'text-slate-6 hover:text-white-0 hover:bg-slate-3'
              )}
            >
              <Icon
                size={16}
                className={cn(
                  isActive ? 'text-brand-cyan' : 'text-slate-6'
                )}
              />
              {item.label}
              {isActive && (
                <div
                  className="ml-auto w-1 h-4 rounded-full"
                  style={{ background: 'var(--agency-gold)' }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings + User */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-border-subtle pt-4">
        <Link
          href="/settings/team"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all',
            'text-slate-6 hover:text-white-0 hover:bg-slate-3'
          )}
        >
          <Settings size={16} />
          Settings
        </Link>

        {member && (
          <div className="px-3 py-2.5 mt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-4 flex items-center justify-center text-xs font-semibold text-white-0 flex-shrink-0">
                {member.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white-0 truncate">{member.name}</p>
                <p className="text-xs text-slate-6 truncate capitalize">{member.role.replace('_', ' ')}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="text-slate-6 hover:text-white-0 transition-colors flex-shrink-0"
                title="Sign out"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
