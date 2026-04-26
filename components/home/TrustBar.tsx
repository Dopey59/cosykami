import { Marquee } from '@/components/ui/Marquee';

const items = [
  {
    label: 'Livraison offerte dès 25€',
    icon: (
      <svg className="h-4 w-4 shrink-0 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: 'Paiement 100% sécurisé',
    icon: (
      <svg className="h-4 w-4 shrink-0 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    label: 'Expédition en 48h',
    icon: (
      <svg className="h-4 w-4 shrink-0 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Emballage soigné',
    icon: (
      <svg className="h-4 w-4 shrink-0 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H12V4.875z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.875A2.625 2.625 0 109.375 7.5H12V4.875z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 7.5v11.25M12.75 7.5v11.25M3 7.5h18M3.75 7.5A.75.75 0 013 6.75V6a.75.75 0 01.75-.75h16.5A.75.75 0 0121 6v.75a.75.75 0 01-.75.75H3.75z" />
      </svg>
    ),
  },
  {
    label: 'Retours sous 14 jours',
    icon: (
      <svg className="h-4 w-4 shrink-0 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
      </svg>
    ),
  },
  {
    label: 'Suivi de commande inclus',
    icon: (
      <svg className="h-4 w-4 shrink-0 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2 px-6 text-sm font-medium text-brand-muted">
      {icon}
      {label}
      <span className="mx-3 h-1 w-1 rounded-full bg-brand-pink" />
    </span>
  );
}

export function TrustBar() {
  return (
    <section className="border-y border-brand-pink/40 bg-brand-cream py-3">
      <Marquee>
        {items.map((item) => (
          <TrustItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </Marquee>
    </section>
  );
}
