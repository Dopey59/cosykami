import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Livraison',
  description:
    'Politique de livraison Cosykami — délais, frais, zones et suivi des commandes.',
};

export default function LivraisonPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <Breadcrumb items={[{ label: 'Livraison' }]} />

      <h1 className="font-display mb-10 text-3xl font-bold text-brand-text">
        Livraison
      </h1>

      <div className="prose-sm flex flex-col gap-8 text-brand-muted [&_a]:text-accent-main [&_a:hover]:underline [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-brand-text [&_p]:leading-relaxed [&_li]:leading-relaxed">

        <section>
          <p className="rounded-lg border border-accent-main/30 bg-accent-main/5 p-4 text-sm">
            <strong className="text-brand-text">En bref :</strong> expédition depuis
            la France 🇫🇷 sous 1-3 jours ouvrés. Livraison standard sous 7-10 jours
            ouvrés. <strong className="text-brand-text">Livraison offerte dès 25 €</strong> d'achats.
          </p>
        </section>

        <section>
          <h2>Zones de livraison</h2>
          <p>
            Cosykami expédie vers :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>France métropolitaine et Corse</li>
            <li>Pays de l'Union européenne</li>
          </ul>
          <p>
            Pour toute autre destination (DOM-TOM, hors UE), contacte-nous à{' '}
            <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a> avant de
            commander.
          </p>
        </section>

        <section>
          <h2>Délais</h2>
          <p>
            Les commandes sont préparées et expédiées depuis la France sous{' '}
            <strong className="text-brand-text">1 à 3 jours ouvrés</strong> après
            confirmation du paiement.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-brand-text">Livraison standard</strong> : 7 à 10 jours ouvrés</li>
            <li><strong className="text-brand-text">Livraison express</strong> : 2 à 4 jours ouvrés</li>
          </ul>
          <p>
            Les délais sont donnés à titre indicatif et peuvent varier selon la
            destination et la disponibilité du transporteur. En cas de retard
            supérieur à 30 jours, tu peux demander l'annulation de ta commande et
            un remboursement intégral (article L.216-1 du Code de la consommation).
          </p>
        </section>

        <section>
          <h2>Frais de livraison</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong className="text-brand-text">Livraison standard</strong> : 4,50 €
              — <strong className="text-brand-text">offerte dès 25 €</strong> d'achats
            </li>
            <li>
              <strong className="text-brand-text">Livraison express</strong> : 10,99 €
            </li>
          </ul>
          <p>
            Les frais et délais précis sont récapitulés dans ton panier avant
            validation de la commande.
          </p>
        </section>

        <section>
          <h2>Suivi de commande</h2>
          <p>
            Dès l'expédition de ton colis, tu reçois un email avec le numéro de
            suivi et le lien direct pour suivre ta livraison en temps réel.
          </p>
          <p>
            Tu n'as pas reçu ton email ? Vérifie tes spams, puis contacte-nous à{' '}
            <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>Réception du colis</h2>
          <p>
            À la réception, vérifie l'état extérieur du colis. En cas de colis
            endommagé ou ouvert :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Refuse le colis et fais émettre des réserves au transporteur, ou</li>
            <li>Accepte-le en émettant des réserves <strong className="text-brand-text">précises et datées</strong> sur le bon de livraison</li>
          </ul>
          <p>
            Préviens-nous ensuite sous 48 heures à{' '}
            <a href="mailto:cosykami@gmail.com">cosykami@gmail.com</a> avec photos
            à l'appui : nous nous occuperons du remplacement ou du remboursement.
          </p>
        </section>

        <section>
          <h2>Colis perdu</h2>
          <p>
            En cas d'absence de réception après 15 jours ouvrés depuis l'expédition,
            contacte-nous : nous ouvrirons une enquête auprès du transporteur. Si
            la perte est confirmée, nous te proposons soit le réenvoi de la
            commande, soit son remboursement intégral.
          </p>
        </section>

        <section>
          <h2>Retours</h2>
          <p>
            Pour les conditions de retour et de remboursement, consulte la page{' '}
            <a href="/retours-remboursements">Retours & remboursements</a>.
          </p>
        </section>

        <p className="mt-4 text-xs text-brand-muted/60">
          Dernière mise à jour : avril 2026
        </p>
      </div>
    </div>
  );
}
