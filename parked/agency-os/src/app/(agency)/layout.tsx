import { TenantProvider } from '@/providers/TenantProvider';
import { AgencySidebar } from '@/components/nav/AgencySidebar';

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return (
    <TenantProvider>
      <div className="flex min-h-screen bg-page">
        <AgencySidebar />
        <main className="flex-1 ml-60 min-w-0">
          {children}
        </main>
      </div>
    </TenantProvider>
  );
}
