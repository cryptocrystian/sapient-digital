/**
 * Supabase server client for Agency OS
 * Used in Server Components and Route Handlers
 */
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Service role client — bypasses RLS, admin operations only.
 * Used in dev mode (no auth session) and internal API routes.
 * NEVER expose to the client.
 */
export function createSupabaseServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

/**
 * Standard server client — respects RLS via user session cookie.
 * In development, falls back to service role so data loads without auth.
 */
export async function createSupabaseServerClient() {
  // Dev bypass: no auth session exists, so use service role to skip RLS
  if (process.env.NODE_ENV === 'development') {
    return createSupabaseServiceClient();
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component — read-only context, safe to ignore
          }
        },
      },
    }
  );
}
