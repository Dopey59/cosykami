'use client';

import { useState } from 'react';

const SUBJECTS = [
  'Ma commande',
  'Un produit',
  'Livraison & suivi',
  'Retour & remboursement',
  'Collaboration / presse',
  'Autre',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName:  (form.elements.namedItem('lastName')  as HTMLInputElement).value,
      email:     (form.elements.namedItem('email')     as HTMLInputElement).value,
      subject:   (form.elements.namedItem('subject')   as HTMLSelectElement).value,
      message:   (form.elements.namedItem('message')   as HTMLTextAreaElement).value,
    };
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? 'success' : 'error');
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <svg width="48" height="48" viewBox="0 0 100 100" aria-hidden>
          <g transform="translate(50,50)">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-19" rx="9" ry="17" fill="#FF85A1" opacity="0.88" transform={`rotate(${a})`} />
            ))}
            <circle r="9" fill="white" />
            <circle r="3.5" fill="#FF85A1" />
          </g>
        </svg>
        <h2 className="font-display text-xl font-bold text-brand-text">Message envoyé !</h2>
        <p className="max-w-sm text-sm text-brand-muted">
          Merci pour ton message. On te répond généralement sous 24h (jours ouvrés).
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-accent-main underline-offset-2 hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Prénom" name="firstName" required />
        <Field label="Nom" name="lastName" required />
      </div>

      <Field label="Email" name="email" type="email" required />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
          Sujet <span className="text-accent-main">*</span>
        </label>
        <select
          name="subject"
          required
          className="h-11 rounded-xl border border-brand-pink/40 bg-white px-3 text-sm text-brand-text focus:border-accent-main focus:outline-none"
        >
          <option value="">Choisir un sujet…</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
          Message <span className="text-accent-main">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Décris ta demande..."
          className="resize-none rounded-xl border border-brand-pink/40 bg-white px-3 py-2.5 text-sm text-brand-text placeholder:text-brand-muted/50 focus:border-accent-main focus:outline-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-500">Une erreur est survenue. Merci de réessayer.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 inline-flex min-h-[52px] items-center justify-center rounded-full bg-accent-main px-10 font-semibold text-white shadow-[0_4px_24px_rgba(255,133,161,0.35)] transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === 'loading' ? 'Envoi…' : 'Envoyer le message'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
        {label} {required && <span className="text-accent-main">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="h-11 rounded-xl border border-brand-pink/40 bg-white px-3 text-sm text-brand-text placeholder:text-brand-muted/50 focus:border-accent-main focus:outline-none"
      />
    </div>
  );
}
