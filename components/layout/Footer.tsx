import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-brand-pink/40 bg-brand-cream ">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-lg font-semibold text-brand-text">Cosykami</span>
            <p className="mt-2 text-xs text-brand-muted">Ton univers papier, version cosy.</p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-muted">Collections</p>
            <ul className="space-y-2 text-sm text-brand-text">
              <li><Link href="/collections/stickers-cosy" className="hover:text-accent-main">Stickers cosy</Link></li>
              <li><Link href="/collections/journaling" className="hover:text-accent-main">Journaling</Link></li>
              <li><Link href="/collections/scrapbooking" className="hover:text-accent-main">Scrapbooking</Link></li>
              <li><Link href="/collections/nouveautes" className="hover:text-accent-main">Nouveautés</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-muted">Aide</p>
            <ul className="space-y-2 text-sm text-brand-text">
              <li><Link href="/a-propos" className="hover:text-accent-main">À propos</Link></li>
              <li><Link href="/faq" className="hover:text-accent-main">FAQ</Link></li>
              <li><Link href="/livraison" className="hover:text-accent-main">Livraison</Link></li>
              <li><Link href="/retours-remboursements" className="hover:text-accent-main">Retours</Link></li>
              <li><Link href="/contact" className="hover:text-accent-main">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-muted">Légal</p>
            <ul className="space-y-2 text-sm text-brand-text">
              <li><Link href="/mentions-legales" className="hover:text-accent-main">Mentions légales</Link></li>
              <li><Link href="/cgv" className="hover:text-accent-main">CGV</Link></li>
              <li><Link href="/politique-confidentialite" className="hover:text-accent-main">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-brand-pink/40 pt-6 text-xs text-brand-muted">
          <span>Paiement sécurisé</span>
          <span>Emballage soigné</span>
          <span>Retours faciles</span>
        </div>

        <p className="mt-6 text-center text-xs text-brand-muted">
          © {year} Cosykami — Stickers cosy kawaii
        </p>
      </div>
    </footer>
  );
}
