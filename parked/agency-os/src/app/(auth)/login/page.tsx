'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [sent, setSent]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const router                  = useSearchParams();
  const redirect                = router.get('redirect') || '/dashboard';

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${appUrl}/auth/callback?redirect=${redirect}` },
    });

    setLoading(false);
    if (error) { setError(error.message); return; }
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-1 h-7 rounded-full" style={{ background: 'var(--agency-gold)' }} />
            <span className="text-xl font-bold text-white-0">Sapient Digital</span>
          </div>
          <p className="text-sm text-slate-6">Agency OS</p>
        </div>

        <div className="panel-card p-6">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-slate-4 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✉️</span>
              </div>
              <h2 className="text-heading-md text-white-0 mb-2">Check your email</h2>
              <p className="text-sm text-slate-6">
                We sent a sign-in link to <strong className="text-white-0">{email}</strong>.
                Click it to access your workspace.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-heading-md text-white-0 mb-1">Sign in</h2>
              <p className="text-sm text-slate-6 mb-6">
                Enter your email to receive a magic link.
              </p>

              {error && (
                <div className="alert-error mb-4">{error}</div>
              )}

              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white-0 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="input-field"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="btn-agency w-full"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    'Send magic link'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-slate-6 mt-6">
          A{' '}
          <span style={{ color: 'var(--agency-gold)' }}>Saipien Labs</span>{' '}
          venture
        </p>
      </div>
    </div>
  );
}
