/**
 * Agency OS API client
 * Routes to Pravado Fastify API — same base URL as dashboard
 */
import { cookies } from 'next/headers';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://api-url-not-configured.invalid'
    : 'http://localhost:3001');

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
}

export async function agencyApiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  const res = await fetch(`${API_URL}/agency/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `access_token=${accessToken}`,
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    return {
      success: false,
      error: { code: 'HTTP_ERROR', message: `HTTP ${res.status}` },
    };
  }

  return res.json();
}
