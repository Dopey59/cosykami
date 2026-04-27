import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité Cosykami — collecte, traitement et protection de tes données personnelles conformément au RGPD.',
  robots: { index: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <Breadcrumb items={[{ label: 'Politique de confidentialité' }]} />

      <h1 className="font-display mb-10 text-3xl font-bold text-brand-text">
        Politique de confidentialité
      </h1>

      <div className="prose-sm flex flex-col gap-8 text-brand-muted [&_a]:text-accent-main [&_a:hover]:underline [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-brand-text [&_p]:leading-relaxed [&_li]:leading-relaxed">

        <section>
          <p className="rounded-lg border border-accent-main/30 bg-accent-main/5 p-4 text-sm">
            Chez Cosykami, on prend tes données personnelles au sérieux. Cette page
            t'explique simplement quelles données on collecte, pourquoi, et tes droits
            sur celles-ci, conformément au Règlement Général sur la Protection des
            Données (RGPD) et à la loi Informatique & Libertés.
          </p>
        </section>

        <section>
          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement de tes données est :
          </p>
          <p className="rounded-lg border border-brand-border/40 bg-brand-cream/40 p-4 text-brand-text">
            <strong>Cosykami</strong> — Micro-entreprise<br />
            Représentée par John Doe<br />
            7 rue du Pont Neuf, 59800 Lille — France<br />
            Email : <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a>
          </p>
        </section>

        <section>
          <h2>2. Données collectées</h2>
          <p>
            Nous collectons uniquement les données nécessaires au bon fonctionnement
            de la boutique et au traitement des commandes :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-brand-text">Identité</strong> : prénom, nom</li>
            <li><strong className="text-brand-text">Coordonnées</strong> : adresse email, adresse postale, numéro de téléphone</li>
            <li><strong className="text-brand-text">Données de commande</strong> : produits achetés, montant, date</li>
            <li><strong className="text-brand-text">Données de paiement</strong> : traitées exclusivement par nos prestataires de paiement (Shopify Payments, Stripe, PayPal). Cosykami n'a jamais accès à tes données bancaires.</li>
            <li><strong className="text-brand-text">Données de navigation</strong> : adresse IP, type de navigateur, pages visitées (via cookies)</li>
          </ul>
        </section>

        <section>
          <h2>3. Finalités et bases légales</h2>
          <p>Les données sont utilisées exclusivement pour :</p>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-brand-text">Traiter tes commandes</strong> et assurer la livraison (base légale : exécution du contrat)</li>
            <li><strong className="text-brand-text">Gérer la relation client</strong> et le SAV (base légale : exécution du contrat)</li>
            <li><strong className="text-brand-text">Respecter nos obligations légales</strong> (facturation, comptabilité — base légale : obligation légale)</li>
            <li><strong className="text-brand-text">T'envoyer notre newsletter</strong>, uniquement avec ton consentement explicite (base légale : consentement)</li>
            <li><strong className="text-brand-text">Améliorer le site</strong> via des statistiques anonymisées (base légale : intérêt légitime)</li>
          </ul>
        </section>

        <section>
          <h2>4. Destinataires des données</h2>
          <p>
            Tes données ne sont jamais vendues ni cédées à des tiers à des fins
            commerciales. Elles peuvent être partagées avec nos prestataires
            techniques, strictement dans le cadre de l'exécution de leur mission :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-brand-text">Shopify Inc.</strong> — gestion de la boutique et du back-office</li>
            <li><strong className="text-brand-text">Vercel Inc.</strong> — hébergement du site</li>
            <li><strong className="text-brand-text">Stripe / PayPal</strong> — traitement des paiements</li>
            <li><strong className="text-brand-text">Transporteurs</strong> — livraison de tes commandes</li>
            <li><strong className="text-brand-text">Resend / Gmail</strong> — envoi des emails transactionnels</li>
          </ul>
          <p>
            Certains prestataires (Shopify, Vercel, Stripe) peuvent traiter des données
            hors de l'Union européenne. Dans ce cas, ils s'engagent contractuellement
            au respect des clauses contractuelles types de la Commission européenne ou
            disposent d'un cadre de transfert reconnu (Data Privacy Framework).
          </p>
        </section>

        <section>
          <h2>5. Durée de conservation</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-brand-text">Données de commande</strong> : 10 ans (obligation légale comptable)</li>
            <li><strong className="text-brand-text">Données client</strong> : 3 ans à compter de la dernière interaction</li>
            <li><strong className="text-brand-text">Newsletter</strong> : jusqu'à désinscription, ou 3 ans d'inactivité</li>
            <li><strong className="text-brand-text">Cookies</strong> : 13 mois maximum</li>
          </ul>
        </section>

        <section>
          <h2>6. Tes droits</h2>
          <p>
            Conformément au RGPD, tu disposes des droits suivants sur tes données :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-brand-text">Droit d'accès</strong> : obtenir une copie de tes données</li>
            <li><strong className="text-brand-text">Droit de rectification</strong> : corriger une donnée inexacte</li>
            <li><strong className="text-brand-text">Droit à l'effacement</strong> : demander la suppression de tes données</li>
            <li><strong className="text-brand-text">Droit à la limitation</strong> : restreindre le traitement de tes données</li>
            <li><strong className="text-brand-text">Droit à la portabilité</strong> : récupérer tes données dans un format structuré</li>
            <li><strong className="text-brand-text">Droit d'opposition</strong> : t'opposer à un traitement (ex : marketing)</li>
            <li><strong className="text-brand-text">Droit de retirer ton consentement</strong> à tout moment</li>
          </ul>
          <p>
            Pour exercer ces droits, contacte-nous à{' '}
            <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a>. Nous te
            répondrons sous un mois.
          </p>
          <p>
            En cas de difficulté, tu peux également introduire une réclamation auprès
            de la <strong className="text-brand-text">CNIL</strong> :{' '}
            <a href="https://www.cnil.fr/plaintes" target="_blank" rel="noopener noreferrer">
              cnil.fr/plaintes
            </a>
            .
          </p>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            Notre site utilise des cookies pour assurer son bon fonctionnement
            (panier, session) et pour mesurer son audience.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-brand-text">Cookies strictement nécessaires</strong> : panier, authentification, préférences (pas de consentement requis)</li>
            <li><strong className="text-brand-text">Cookies de mesure d'audience</strong> : statistiques anonymisées (consentement requis)</li>
            <li><strong className="text-brand-text">Cookies tiers</strong> : Shopify, prestataires de paiement, réseaux sociaux (consentement requis)</li>
          </ul>
          <p>
            Tu peux à tout moment refuser ou modifier tes préférences cookies via
            le bandeau présent en bas de page, ou via les paramètres de ton
            navigateur.
          </p>
        </section>

        <section>
          <h2>8. Sécurité</h2>
          <p>
            Cosykami met en œuvre toutes les mesures techniques et organisationnelles
            appropriées pour protéger tes données contre la perte, l'altération, la
            divulgation ou l'accès non autorisé : connexions chiffrées (HTTPS/TLS),
            hébergement sécurisé, accès restreint aux données.
          </p>
        </section>

        <section>
          <h2>9. Modifications</h2>
          <p>
            Cette politique peut être mise à jour pour refléter des évolutions
            légales ou techniques. La date de dernière mise à jour est indiquée en
            bas de page. En cas de modification substantielle, nous t'en informerons
            par email ou via un bandeau d'information sur le site.
          </p>
        </section>

        <p className="mt-4 text-xs text-brand-muted/60">
          Dernière mise à jour : avril 2026
        </p>
      </div>
    </div>
  );
}
