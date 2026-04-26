import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de Cosykami — éditeur, hébergeur, propriété intellectuelle et données personnelles.',
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <Breadcrumb items={[{ label: 'Mentions légales' }]} />

      <h1 className="font-display mb-10 text-3xl font-bold text-brand-text">Mentions légales</h1>

      <div className="prose-sm flex flex-col gap-8 text-brand-muted [&_a]:text-accent-main [&_a:hover]:underline [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-brand-text [&_p]:leading-relaxed">

        <section>
          <h2>Éditeur du site</h2>
          <p>
            Le site <strong className="text-brand-text">cosykami.fr</strong> est édité par :<br />
            <strong className="text-brand-text">Cosykami</strong><br />
            Micro-entreprise — SIRET : <strong className="text-brand-text">XXX XXX XXX 00000</strong> {/* à compléter */}<br />
            Adresse : {/* à compléter */}<br />
            Email : <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a>
          </p>
          <p className="text-xs text-brand-muted/60">
            {/* Remplace les champs XXX par tes vraies informations légales */}
          </p>
        </section>

        <section>
          <h2>Directeur de la publication</h2>
          <p>
            Le directeur de la publication est le responsable de la micro-entreprise Cosykami.
          </p>
        </section>

        <section>
          <h2>Hébergeur</h2>
          <p>
            Ce site est hébergé par :<br />
            <strong className="text-brand-text">Vercel Inc.</strong><br />
            340 Pine Street, Suite 701 — San Francisco, CA 94104, États-Unis<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>
          <p>
            La boutique e-commerce est propulsée par :<br />
            <strong className="text-brand-text">Shopify Inc.</strong><br />
            151 O'Connor Street — Ottawa, Ontario, Canada K2P 2L8<br />
            <a href="https://shopify.com" target="_blank" rel="noopener noreferrer">shopify.com</a>
          </p>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, visuels, stickers, illustrations)
            sont la propriété exclusive de Cosykami ou de leurs auteurs respectifs et sont protégés par le
            droit de la propriété intellectuelle français et international.
          </p>
          <p>
            Toute reproduction, distribution, modification ou utilisation de ces contenus, même partielle,
            est strictement interdite sans autorisation écrite préalable.
          </p>
        </section>

        <section>
          <h2>Données personnelles</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
            Informatique et Libertés, tu disposes d'un droit d'accès, de rectification, de suppression
            et d'opposition aux données te concernant.
          </p>
          <p>
            Les données collectées (nom, email, adresse de livraison) sont uniquement utilisées dans le cadre
            du traitement de tes commandes et de la relation client. Elles ne sont jamais cédées à des tiers.
          </p>
          <p>
            Pour exercer tes droits, contacte-nous à{' '}
            <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            Ce site utilise des cookies techniques nécessaires au bon fonctionnement du panier
            et à la gestion de ta session. Aucun cookie publicitaire ou de tracking tiers n'est
            utilisé sans ton consentement.
          </p>
        </section>

        <section>
          <h2>Responsabilité</h2>
          <p>
            Cosykami s'efforce de maintenir les informations de ce site à jour et exactes. En cas
            d'erreur ou d'omission, merci de nous le signaler. Cosykami ne saurait être tenu responsable
            des dommages directs ou indirects liés à l'utilisation du site.
          </p>
        </section>

        <p className="mt-4 text-xs text-brand-muted/60">
          Dernière mise à jour : avril 2026
        </p>
      </div>
    </div>
  );
}
