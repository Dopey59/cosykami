import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Retours & remboursements',
  description:
    'Politique de retour et de remboursement Cosykami — droit de rétractation, conditions, procédure et délais.',
  robots: { index: false },
};

export default function RetoursRemboursementsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <Breadcrumb items={[{ label: 'Retours & remboursements' }]} />

      <h1 className="font-display mb-10 text-3xl font-bold text-brand-text">
        Retours & remboursements
      </h1>

      <div className="prose-sm flex flex-col gap-8 text-brand-muted [&_a]:text-accent-main [&_a:hover]:underline [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-brand-text [&_h3]:font-display [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-brand-text [&_p]:leading-relaxed [&_li]:leading-relaxed">

        <section>
          <p className="rounded-lg border border-accent-main/30 bg-accent-main/5 p-4 text-sm">
            <strong className="text-brand-text">En résumé :</strong> tu disposes de
            14 jours pour changer d'avis après réception. Le produit doit nous
            revenir intact, dans son emballage d'origine, et les stickers ne
            doivent pas avoir été utilisés. Les frais de retour sont à ta
            charge. Le remboursement intervient sous 14 jours après réception
            du retour.
          </p>
        </section>

        <section>
          <h2>1. Droit de rétractation</h2>
          <p>
            Conformément aux articles L.221-18 et suivants du Code de la
            consommation, tu disposes d'un délai de{' '}
            <strong className="text-brand-text">14 jours calendaires</strong>{' '}
            à compter de la réception de ta commande pour exercer ton droit
            de rétractation, sans avoir à justifier de motif ni à payer de
            pénalité.
          </p>
          <p>
            Si la commande contient plusieurs articles livrés séparément, le
            délai court à partir de la réception du dernier article.
          </p>
        </section>

        <section>
          <h2>2. Conditions d'éligibilité au retour</h2>
          <p>
            Pour qu'un retour soit accepté, le produit doit impérativement :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Être <strong className="text-brand-text">neuf et inutilisé</strong> — aucun sticker décollé, déplacé ou apposé</li>
            <li>Être retourné dans son <strong className="text-brand-text">emballage d'origine intact</strong> (film plastique, livret, étui)</li>
            <li>Ne présenter <strong className="text-brand-text">aucune trace d'usage</strong> (pliure, marque, salissure, odeur)</li>
            <li>Être accompagné de la <strong className="text-brand-text">preuve d'achat</strong> (numéro de commande ou facture)</li>
          </ul>
          <p>
            Tout retour ne respectant pas ces conditions sera refusé et
            réexpédié à tes frais, ou pourra faire l'objet d'un remboursement
            partiel selon l'état du produit (article L.221-23 du Code de la
            consommation).
          </p>
        </section>

        <section>
          <h2>3. Produits non éligibles au retour</h2>
          <p>Conformément à l'article L.221-28 du Code de la consommation, certains produits ne peuvent faire l'objet d'un retour :</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Produits descellés ou utilisés (stickers décollés ou apposés)</li>
            <li>Produits personnalisés ou réalisés sur commande</li>
            <li>Produits soldés ou en promotion explicitement marqués <em>« non remboursables »</em></li>
            <li>Cartes-cadeaux et bons d'achat</li>
          </ul>
        </section>

        <section>
          <h2>4. Procédure de retour</h2>
          <h3 className="mt-4">Étape 1 — Nous prévenir</h3>
          <p>
            Envoie un email à{' '}
            <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a> avec
            pour objet <em>« Retour commande #XXXX »</em> dans les 14 jours
            suivant la réception, en précisant :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Ton numéro de commande</li>
            <li>Le ou les articles concernés</li>
            <li>Le motif du retour (facultatif mais utile pour nous améliorer)</li>
          </ul>

          <h3 className="mt-4">Étape 2 — Préparer le colis</h3>
          <p>
            Emballe soigneusement le produit dans son emballage d'origine, dans
            un colis suffisamment protégé pour éviter tout dommage durant le
            transport. Tu restes responsable du produit jusqu'à sa réception
            chez nous.
          </p>

          <h3 className="mt-4">Étape 3 — Expédier</h3>
          <p>
            Renvoie le colis à l'adresse suivante, par le transporteur de ton
            choix avec <strong className="text-brand-text">numéro de suivi obligatoire</strong> :
          </p>
          <p className="rounded-lg border border-brand-border/40 bg-brand-cream/40 p-4 text-brand-text">
            <strong>Cosykami — Service Retours</strong><br />
            7 rue du Pont Neuf<br />
            59800 Lille — France
          </p>
          <p className="text-xs">
            Nous te recommandons un envoi suivi : sans suivi, nous ne pourrons pas
            traiter le retour si le colis se perd.
          </p>
        </section>

        <section>
          <h2>5. Frais de retour</h2>
          <p>
            Les <strong className="text-brand-text">frais de retour sont à ta charge</strong>,
            conformément à l'article L.221-23 du Code de la consommation, sauf
            cas de produit défectueux ou erreur de notre part (voir section 7).
          </p>
        </section>

        <section>
          <h2>6. Remboursement</h2>
          <p>
            Une fois le retour reçu et inspecté, nous t'envoyons un email pour
            confirmer la prise en charge ou le refus du retour.
          </p>
          <p>
            Si le retour est validé, le remboursement est effectué dans un délai
            maximal de <strong className="text-brand-text">14 jours</strong> à compter
            de la réception du colis, sur le moyen de paiement utilisé lors de
            la commande (Shopify Payments, Stripe ou PayPal).
          </p>
          <p>
            Le remboursement couvre <strong className="text-brand-text">le prix des articles retournés</strong>{' '}
            et, le cas échéant, les frais de livraison initiaux <em>standards</em>.
            Si tu avais choisi une livraison express, seul le tarif d'une livraison
            standard te sera remboursé (article L.221-23 du Code de la consommation).
          </p>
        </section>

        <section>
          <h2>7. Produit défectueux, endommagé ou erreur de commande</h2>
          <p>
            Si tu reçois un produit cassé, défectueux ou différent de ta
            commande, contacte-nous sous{' '}
            <strong className="text-brand-text">48 heures</strong> après réception à{' '}
            <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a> avec :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Ton numéro de commande</li>
            <li>Une description du problème</li>
            <li>Des photos claires du produit et de l'emballage</li>
          </ul>
          <p>
            Dans ces cas, <strong className="text-brand-text">nous prenons en charge l'intégralité des frais de retour</strong>{' '}
            et te proposons soit un remplacement, soit un remboursement complet
            dans un délai de 14 jours après réception du retour.
          </p>
        </section>

        <section>
          <h2>8. Garanties légales</h2>
          <p>
            Indépendamment de la politique de retour ci-dessus, tu bénéficies des
            garanties légales prévues par le Code de la consommation et le Code
            civil :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong className="text-brand-text">Garantie légale de conformité</strong>{' '}
              (articles L.217-3 à L.217-17 du Code de la consommation) — 2 ans à compter
              de la livraison
            </li>
            <li>
              <strong className="text-brand-text">Garantie des vices cachés</strong>{' '}
              (articles 1641 à 1648 du Code civil) — 2 ans à compter de la
              découverte du vice
            </li>
          </ul>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            Pour toute question relative aux retours et remboursements :<br />
            Email : <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a><br />
            Adresse : Cosykami, 7 rue du Pont Neuf, 59800 Lille — France
          </p>
        </section>

        <p className="mt-4 text-xs text-brand-muted/60">
          Dernière mise à jour : avril 2026
        </p>
      </div>
    </div>
  );
}
