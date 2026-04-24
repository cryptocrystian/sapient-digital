import { redirect } from 'next/navigation';
export default function VideoRootPage({ params }: { params: { clientId: string } }) {
  redirect(`/clients/${params.clientId}/video/queue`);
}
