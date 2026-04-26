import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SlideUpByWord } from '@/registry/magicui/slide-up-by-word';
import { NewsletterSignup } from './NewsletterSignup';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Inscris-toi à la newsletter Cosykami et reçois en avant-première nos nouveaux stickers cosy kawaii, offres exclusives et inspirations scrapbooking.',
};

const PERKS = [
  {
    icon: '✨',
    title: 'Nouveautés en avant-première',
    desc: 'Tu es la première informée à chaque nouvelle collection.',
  },
  {
    icon: '🎁',
    title: 'Offres exclusives',
    desc: '-10% de bienvenue dès ton inscription + promos réservées aux abonnées.',
  },
  {
    icon: '🌸',
    title: 'Inspirations & tutos',
    desc: 'Idées de pages scrapbooking, journaling et bullet journal directement dans ta boîte.',
  },
  {
    icon: '📦',
    title: 'Accès aux ventes privées',
    desc: 'Soldes et déstockages en avant-première, avant tout le monde.',
  },
];

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-16">
      <Breadcrumb items={[{ label: 'Newsletter' }]} />

      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-main">
          ニュースレター
        </p>
        <h1 className="font-display text-3xl font-bold text-brand-text md:text-4xl">
          <SlideUpByWord text="Le club cosy, c'est ici." />
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-brand-muted">
          Rejoins des centaines de passionnées de papeterie kawaii. Pas de spam —
          juste du contenu cosy qui donne envie de créer.
        </p>
      </div>

      {/* Avantages */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PERKS.map((p) => (
          <div
            key={p.title}
            className="flex gap-3 rounded-2xl border border-brand-pink/30 bg-brand-cream p-4"
          >
            <span className="mt-0.5 text-xl">{p.icon}</span>
            <div>
              <p className="text-sm font-semibold text-brand-text">{p.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-brand-muted">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulaire */}
      <div className="rounded-2xl border border-brand-pink/30 bg-brand-cream p-6">
        <p className="mb-4 text-sm font-semibold text-brand-text">
          Ton email pour rejoindre le club :
        </p>
        <NewsletterSignup />
        <p className="mt-3 text-center text-xs text-brand-muted/60">
          En t'inscrivant, tu acceptes de recevoir nos emails. Désabonnement en un clic à tout moment.
        </p>
      </div>
    </div>
  );
}
