import { createSupabaseServerClient } from '@/lib/supabase/server';
import ReportsClient from './ReportsClient';

export default async function ClientReportsPage({ params }: { params: { clientId: string } }) {
  const supabase = await createSupabaseServerClient();

  const [{ data: reports }, { data: client }, { data: retainer }] = await Promise.all([
    supabase.schema('agency').from('reports').select('*')
      .eq('client_id', params.clientId).order('period_start', { ascending: false }),
    supabase.schema('agency').from('clients').select('name').eq('id', params.clientId).single(),
    supabase.schema('agency').from('retainers').select('monthly_value')
      .eq('client_id', params.clientId).eq('status', 'active').single(),
  ]);

  return (
    <ReportsClient
      clientId={params.clientId}
      clientName={client?.name ?? 'Client'}
      mrr={retainer?.monthly_value ?? 0}
      initialReports={reports ?? []}
    />
  );
}
