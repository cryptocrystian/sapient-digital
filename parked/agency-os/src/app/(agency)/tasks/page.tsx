import { createSupabaseServerClient } from '@/lib/supabase/server';
import TasksClient from './TasksClient';

export default async function TasksPage() {
  const supabase = await createSupabaseServerClient();

  const [{ data: tasks }, { data: clients }, { data: tenant }] = await Promise.all([
    supabase
      .schema('agency')
      .from('tasks')
      .select(`id, title, description, type, priority, status, due_date, clients(id, name)`)
      .neq('status', 'done')
      .order('due_date', { ascending: true, nullsFirst: false }),
    supabase
      .schema('agency')
      .from('clients')
      .select('id, name')
      .eq('status', 'active')
      .order('name'),
    supabase
      .schema('agency')
      .from('tenants')
      .select('id')
      .single(),
  ]);

  return (
    <TasksClient
      initialTasks={tasks ?? []}
      clients={clients ?? []}
      tenantId={tenant?.id ?? 'a0000000-0000-0000-0000-000000000001'}
    />
  );
}
