import { redirect } from 'next/navigation';
export default function ContentPage({ params }: { params: { clientId: string } }) {
  redirect(`/clients/${params.clientId}/content/calendar`);
}
