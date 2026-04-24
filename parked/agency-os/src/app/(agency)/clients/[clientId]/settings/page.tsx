import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ClientSettingsClient from './ClientSettingsClient';

export default async function ClientSettingsPage({ params }: { params: { clientId: string } }) {
  const supabase = await createSupabaseServerClient();
  const { data: client } = await supabase
    .schema('agency').from('clients').select('*').eq('id', params.clientId).single();
  if (!client) notFound();
  return <ClientSettingsClient client={client} />;
}
