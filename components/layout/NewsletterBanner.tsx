import { NewsletterSignup } from '@/app/newsletter/NewsletterSignup';

export function NewsletterBanner() {
  return (
    <section className="relative overflow-hidden border-y border-brand-pink/40 bg-brand-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-accent-main/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-brand-pink/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div className="text-center md:text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-main">
            ✦ Le club cosy
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            -10% offert<br />à l'inscription 🌸
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brand-muted md:mx-0">
            Rejoins la newsletter Cosykami et reçois ton code promo de bienvenue,
            les nouveautés en avant-première et les ventes privées du club.
          </p>
        </div>

        <div className="rounded-2xl border border-brand-pink/40 bg-white/80 p-5 backdrop-blur md:p-6">
          <p className="mb-3 text-sm font-semibold text-brand-text">
            Ton email pour recevoir ton -10%
          </p>
          <NewsletterSignup />
          <p className="mt-3 text-center text-[11px] leading-relaxed text-brand-muted/70">
            Code envoyé par email après confirmation. Désabonnement en un clic.
            Aucun spam, promis.
          </p>
        </div>
      </div>
    </section>
  );
}
