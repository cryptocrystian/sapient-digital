import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { ClientSidebar } from '@/components/nav/ClientSidebar';

export default async function ClientPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { clientSlug: string };
}) {
  const supabase = await createSupabaseServerClient();

  const { data: client } = await supabase
    .schema('agency')
    .from('clients')
    .select('id, name, slug, status')
    .eq('slug', params.clientSlug)
    .single();

  if (!client) notFound();

  return (
    <div className="flex min-h-screen bg-page">
      <ClientSidebar clientSlug={client.slug} clientName={client.name} />
      <main className="flex-1 ml-56 min-w-0">
        {children}
      </main>
    </div>
  );
}
