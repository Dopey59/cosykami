'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSignup() {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error ?? 'Une erreur est survenue, réessaie.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setErrorMsg('Une erreur est survenue, réessaie.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <span className="text-3xl">🌸</span>
        <p className="font-display text-lg font-bold text-brand-text">Bienvenue dans le club cosy !</p>
        <p className="text-sm text-brand-muted">
          Tu recevras nos prochaines nouveautés et offres exclusives directement dans ta boîte mail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ton@email.fr"
        className="h-12 flex-1 rounded-full border border-brand-pink/50 bg-white px-5 text-sm text-brand-text placeholder:text-brand-muted/50 focus:border-accent-main focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="h-12 rounded-full bg-accent-main px-6 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(255,133,161,0.35)] transition-colors hover:bg-accent-hover disabled:opacity-60 sm:shrink-0"
      >
        {status === 'loading' ? '…' : "Je m'inscris"}
      </button>
      {status === 'error' && (
        <p className="w-full text-xs text-red-500">{errorMsg ?? 'Une erreur est survenue, réessaie.'}</p>
      )}
    </form>
  );
}
