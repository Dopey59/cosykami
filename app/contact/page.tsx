import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Une question sur ta commande, un produit ou une collaboration ? L\'équipe Cosykami répond sous 24h.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
      <Breadcrumb items={[{ label: 'Contact' }]} />

      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
        {/* Infos gauche */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-main">
            お問い合わせ
          </p>
          <h1 className="font-display text-3xl font-bold text-brand-text md:text-4xl">
            On est là pour toi.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">
            Une question sur ta commande, un produit qui te fait de l'œil, ou envie de collaborer ?
            Envoie-nous un message — on répond sous 24h (jours ouvrés).
          </p>

          <div className="mt-8 flex flex-col gap-5">
            <InfoBlock
              label="Email"
              value="cosykami@gmail.com"
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              }
            />
            <InfoBlock
              label="Délai de réponse"
              value="Sous 24h — jours ouvrés"
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <InfoBlock
              label="FAQ"
              value="Consulter les questions fréquentes →"
              href="/faq"
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Formulaire droite */}
        <div className="rounded-2xl border border-brand-pink/30 bg-brand-cream p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-accent-main">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">{label}</p>
        <p className="mt-0.5 text-sm text-brand-text">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition-opacity hover:opacity-70">
        {content}
      </a>
    );
  }

  return content;
}
