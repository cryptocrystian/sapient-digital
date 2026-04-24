import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import VideoProductionDetailClient from './VideoProductionDetailClient';
import NewVideoProductionPage from './NewVideoPage';

export default async function VideoProductionDetailPage({
  params,
}: {
  params: { clientId: string; productionId: string };
}) {
  // Intercept /video/new — render creation form
  if (params.productionId === 'new') {
    return <NewVideoProductionPage clientId={params.clientId} />;
  }

  const supabase = await createSupabaseServerClient();

  const { data: prod } = await supabase
    .schema('agency')
    .from('video_productions')
    .select(`*, video_reviews(*, client_members(name, email))`)
    .eq('id', params.productionId)
    .single();

  if (!prod) notFound();

  return (
    <VideoProductionDetailClient
      production={prod}
      clientId={params.clientId}
    />
  );
}
