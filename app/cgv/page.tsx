import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description:
    'Conditions générales de vente Cosykami — commande, paiement, livraison, retours et garanties.',
  robots: { index: false },
};

export default function CGVPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <Breadcrumb items={[{ label: 'Conditions générales de vente' }]} />

      <h1 className="font-display mb-10 text-3xl font-bold text-brand-text">
        Conditions générales de vente
      </h1>

      <div className="prose-sm flex flex-col gap-8 text-brand-muted [&_a]:text-accent-main [&_a:hover]:underline [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-brand-text [&_h3]:font-display [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-brand-text [&_p]:leading-relaxed [&_li]:leading-relaxed">

        <section>
          <h2>Article 1 — Identification du vendeur</h2>
          <p>
            Le site <strong className="text-brand-text">cosykami.com</strong> est édité et exploité par :
          </p>
          <p className="rounded-lg border border-brand-border/40 bg-brand-cream/40 p-4 text-brand-text">
            <strong>Cosykami</strong> — Micro-entreprise<br />
            Représentée par John Doe<br />
            7 rue du Pont Neuf, 59800 Lille — France<br />
            Email : <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a><br />
            SIRET : <em>en cours d'immatriculation</em>
          </p>
        </section>

        <section>
          <h2>Article 2 — Champ d'application</h2>
          <p>
            Les présentes conditions générales de vente (ci-après « CGV ») régissent
            l'ensemble des ventes conclues entre Cosykami (ci-après « le Vendeur ») et
            tout client consommateur (ci-après « le Client ») effectuant un achat sur
            le site <strong className="text-brand-text">cosykami.com</strong>.
          </p>
          <p>
            Toute commande passée sur le site implique l'acceptation pleine et entière
            des présentes CGV par le Client. Cosykami se réserve le droit de modifier
            ces CGV à tout moment ; les conditions applicables sont celles en vigueur
            à la date de validation de la commande.
          </p>
        </section>

        <section>
          <h2>Article 3 — Produits</h2>
          <p>
            Cosykami commercialise des planches de stickers cosy et kawaii, ainsi que
            des accessoires de papeterie, journaling et scrapbooking.
          </p>
          <p>
            Les produits sont décrits et présentés avec la plus grande exactitude
            possible. Toutefois, les photographies des produits ne sont pas
            contractuelles : de légères variations de couleur ou de finition peuvent
            apparaître selon l'écran d'affichage.
          </p>
          <p>
            Les produits sont proposés dans la limite des stocks disponibles. En cas
            d'indisponibilité après commande, le Client en sera informé par email et
            sera intégralement remboursé.
          </p>
        </section>

        <section>
          <h2>Article 4 — Prix</h2>
          <p>
            Les prix affichés sur le site sont en euros (€), toutes taxes comprises
            (TTC), hors frais de livraison. Cosykami n'est pas assujettie à la TVA en
            application de l'article 293 B du Code général des impôts (TVA non
            applicable).
          </p>
          <p>
            Les frais de livraison sont indiqués au Client avant validation de la
            commande. Cosykami se réserve le droit de modifier ses prix à tout
            moment ; les produits seront facturés sur la base des tarifs en vigueur
            au moment de la validation de la commande.
          </p>
        </section>

        <section>
          <h2>Article 5 — Commande</h2>
          <p>
            Pour passer commande, le Client sélectionne les produits, les ajoute au
            panier, vérifie le récapitulatif, accepte les présentes CGV et procède
            au paiement.
          </p>
          <p>
            La commande est définitive après confirmation du paiement et donne lieu
            à l'envoi d'un email de confirmation à l'adresse renseignée par le
            Client. Cosykami se réserve le droit de refuser ou d'annuler toute
            commande en cas de litige antérieur, de soupçon de fraude ou de stock
            insuffisant.
          </p>
        </section>

        <section>
          <h2>Article 6 — Paiement</h2>
          <p>
            Le paiement s'effectue intégralement à la commande, par les moyens
            suivants :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Carte bancaire (Shopify Payments)</li>
            <li>Stripe</li>
            <li>PayPal</li>
          </ul>
          <p>
            Les paiements sont sécurisés via les protocoles standards (3D Secure, SSL).
            Cosykami n'a jamais accès aux données bancaires du Client. En cas
            d'impayé, la commande sera automatiquement annulée.
          </p>
        </section>

        <section>
          <h2>Article 7 — Livraison</h2>
          <h3 className="mt-4">Zone de livraison</h3>
          <p>
            Cosykami expédie ses commandes en France métropolitaine, en Corse et
            dans les pays de l'Union européenne. Pour toute autre destination,
            contacte-nous au préalable.
          </p>

          <h3 className="mt-4">Délais</h3>
          <p>
            Les commandes sont préparées et expédiées sous 1 à 3 jours ouvrés
            depuis la France. Le délai de livraison après expédition est
            généralement de <strong className="text-brand-text">7 à 10 jours ouvrés</strong>{' '}
            pour la livraison standard.
          </p>
          <p>
            Conformément à l'article L.216-1 du Code de la consommation, en cas de
            retard de livraison supérieur à 30 jours, le Client peut demander
            l'annulation de sa commande et un remboursement intégral.
          </p>

          <h3 className="mt-4">Frais de livraison</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-brand-text">Livraison standard</strong> : 4,50 € — <strong className="text-brand-text">offerte dès 25 € d'achats</strong></li>
            <li><strong className="text-brand-text">Livraison express</strong> : 10,99 €</li>
          </ul>
          <p>
            Les frais et délais précis sont confirmés au Client lors de la validation
            du panier.
          </p>

          <h3 className="mt-4">Réception</h3>
          <p>
            Le Client est tenu de vérifier l'état du colis à la réception. En cas de
            colis endommagé ou ouvert, il doit faire les réserves nécessaires auprès
            du transporteur et nous en informer sous 48 heures à{' '}
            <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>Article 8 — Droit de rétractation</h2>
          <p>
            Conformément aux articles L.221-18 et suivants du Code de la consommation,
            le Client dispose d'un délai de{' '}
            <strong className="text-brand-text">14 jours calendaires</strong> à compter
            de la réception de sa commande pour exercer son droit de rétractation,
            sans avoir à justifier de motif ni à payer de pénalité.
          </p>
          <p>
            Les modalités, conditions et exceptions sont détaillées sur la page{' '}
            <a href="/retours-remboursements">Retours & remboursements</a>.
          </p>
        </section>

        <section>
          <h2>Article 9 — Garanties légales</h2>
          <p>
            Tous les produits vendus bénéficient des garanties légales applicables :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong className="text-brand-text">Garantie légale de conformité</strong>{' '}
              (articles L.217-3 à L.217-17 du Code de la consommation) — 2 ans à
              compter de la livraison
            </li>
            <li>
              <strong className="text-brand-text">Garantie des vices cachés</strong>{' '}
              (articles 1641 à 1648 du Code civil) — 2 ans à compter de la découverte
              du vice
            </li>
          </ul>
          <p>
            Pour mettre en œuvre l'une de ces garanties, contacte-nous à{' '}
            <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>Article 10 — Service client</h2>
          <p>
            Toute question, réclamation ou demande peut être adressée à :
          </p>
          <p className="rounded-lg border border-brand-border/40 bg-brand-cream/40 p-4 text-brand-text">
            <strong>Cosykami — Service client</strong><br />
            Email : <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a><br />
            Adresse : 7 rue du Pont Neuf, 59800 Lille — France
          </p>
          <p>Nous nous engageons à répondre sous 48 heures ouvrées.</p>
        </section>

        <section>
          <h2>Article 11 — Données personnelles</h2>
          <p>
            Les données personnelles collectées dans le cadre des commandes sont
            traitées conformément au Règlement Général sur la Protection des Données
            (RGPD). Pour en savoir plus, consulte notre{' '}
            <a href="/politique-confidentialite">Politique de confidentialité</a>.
          </p>
        </section>

        <section>
          <h2>Article 12 — Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments du site (textes, images, illustrations, logo,
            charte graphique) est la propriété exclusive de Cosykami ou de ses
            partenaires, et protégé par le droit de la propriété intellectuelle.
            Toute reproduction sans autorisation préalable est interdite.
          </p>
        </section>

        <section>
          <h2>Article 13 — Responsabilité</h2>
          <p>
            Cosykami ne saurait être tenue responsable de l'inexécution ou de la
            mauvaise exécution du contrat en cas de force majeure, de fait du Client
            ou de fait imprévisible et insurmontable d'un tiers étranger au contrat
            (panne du transporteur, grève, sinistre…).
          </p>
        </section>

        <section>
          <h2>Article 14 — Médiation et litiges</h2>
          <p>
            En cas de litige, le Client s'adresse en priorité au service client de
            Cosykami pour rechercher une solution amiable. À défaut d'accord, le
            Client peut recourir gratuitement au service de médiation de la
            consommation :
          </p>
          <p>
            <strong className="text-brand-text">Centre de Médiation de la Consommation de Conciliateurs de Justice (CM2C)</strong><br />
            14 rue Saint-Jean, 75017 Paris<br />
            <a href="https://www.cm2c.net" target="_blank" rel="noopener noreferrer">www.cm2c.net</a>
          </p>
          <p>
            Le Client peut également utiliser la plateforme européenne de règlement
            en ligne des litiges :{' '}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Article 15 — Droit applicable et juridiction</h2>
          <p>
            Les présentes CGV sont régies par le droit français. En cas de litige
            non résolu à l'amiable, les tribunaux français seront seuls compétents,
            conformément aux règles de compétence du Code de procédure civile.
          </p>
        </section>

        <p className="mt-4 text-xs text-brand-muted/60">
          Dernière mise à jour : avril 2026
        </p>
      </div>
    </div>
  );
}
