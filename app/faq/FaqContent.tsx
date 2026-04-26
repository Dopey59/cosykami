'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SlideUpByWord } from '@/registry/magicui/slide-up-by-word';

export const FAQ_SECTIONS = [
  {
    category: 'Commandes & Livraison',
    items: [
      {
        q: 'Combien de temps prend la livraison ?',
        a: "Les commandes sont expédiées sous 48h (jours ouvrés). La livraison en France métropolitaine prend ensuite 2 à 4 jours ouvrés. Tu recevras un email avec ton numéro de suivi dès l'expédition.",
      },
      {
        q: 'La livraison est-elle vraiment offerte ?',
        a: "Oui ! La livraison est offerte dès 25€ d'achat en France métropolitaine. En dessous de ce montant, des frais forfaitaires de 3,90€ s'appliquent.",
      },
      {
        q: 'Livrez-vous en dehors de la France ?',
        a: 'Nous livrons actuellement en France métropolitaine, Belgique, Suisse et Luxembourg. Les frais de port international varient selon la destination et sont calculés automatiquement au panier.',
      },
      {
        q: 'Puis-je modifier ou annuler ma commande ?',
        a: "Tu peux modifier ou annuler ta commande dans les 2 heures suivant l'achat, tant qu'elle n'a pas été préparée. Contacte-nous rapidement via le formulaire de contact avec ton numéro de commande.",
      },
    ],
  },
  {
    category: 'Produits',
    items: [
      {
        q: 'Quelle est la qualité des stickers ?',
        a: "Nos stickers sont imprimés sur papier semi-brillant de haute qualité, avec des encres résistantes à l'eau. Ils sont découpés à la forme pour une finition soignée. Chaque planche est emballée individuellement pour éviter les rayures.",
      },
      {
        q: 'Les couleurs correspondent-elles aux photos ?',
        a: "Nous faisons de notre mieux pour que les photos reflètent fidèlement les produits. Les couleurs peuvent varier légèrement selon ton écran. Si la teinte est importante pour toi, n'hésite pas à nous demander une photo supplémentaire avant commande.",
      },
      {
        q: 'Les stickers sont-ils réutilisables ?',
        a: 'La plupart de nos stickers ont un adhésif permanent, idéal pour les carnets et agendas. Certaines planches spécifiques (indiqué sur la fiche produit) utilisent un adhésif repositionnable.',
      },
      {
        q: "Y a-t-il un minimum de commande ?",
        a: "Non, aucun minimum ! Tu peux commander une seule planche si tu le souhaites. On recommande tout de même de regrouper tes achats pour profiter de la livraison offerte dès 25€.",
      },
    ],
  },
  {
    category: 'Retours & Remboursements',
    items: [
      {
        q: 'Comment faire un retour ?',
        a: "Tu as 14 jours à compter de la réception pour retourner un article dans son état d'origine. Contacte-nous d'abord via le formulaire de contact pour obtenir les instructions. Les frais de retour sont à ta charge, sauf en cas d'erreur de notre part.",
      },
      {
        q: 'Mon colis est abîmé, que faire ?',
        a: "Si ton colis est endommagé à la réception, prends des photos avant de l'ouvrir et contacte-nous dans les 48h. Nous ferons tout pour arranger ça rapidement — renvoi du produit ou remboursement selon ta préférence.",
      },
      {
        q: "Quand suis-je remboursé(e) ?",
        a: "Une fois le retour reçu et vérifié, le remboursement est traité sous 5 jours ouvrés sur ton moyen de paiement d'origine. Selon ta banque, il peut apparaître sous 3 à 10 jours supplémentaires.",
      },
    ],
  },
  {
    category: 'Paiement',
    items: [
      {
        q: 'Quels moyens de paiement acceptez-vous ?',
        a: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, Apple Pay et Google Pay. Tous les paiements sont sécurisés via Shopify Payments.',
      },
      {
        q: 'Le paiement est-il sécurisé ?',
        a: 'Absolument. Nous utilisons le protocole SSL et la solution de paiement de Shopify, certifiée PCI DSS niveau 1. Tes données bancaires ne transitent jamais par nos serveurs.',
      },
      {
        q: 'Puis-je payer en plusieurs fois ?',
        a: "Le paiement en 3 ou 4 fois sans frais est disponible via PayPal ou certaines cartes bancaires. L'option apparaît automatiquement au moment du paiement si ton montant est éligible.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-brand-pink/30 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-brand-text md:text-base">{q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          className={`mt-0.5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '400px' : '0' }}
      >
        <p className="pb-5 text-sm leading-relaxed text-brand-muted">{a}</p>
      </div>
    </div>
  );
}

export function FaqContent() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <Breadcrumb items={[{ label: 'FAQ' }]} />

      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-main">
          よくある質問
        </p>
        <h1 className="font-display text-3xl font-bold text-brand-text md:text-4xl">
          <SlideUpByWord text="Questions fréquentes" />
        </h1>
        <p className="mt-4 text-sm text-brand-muted">
          Une question non listée ?{' '}
          <a href="/contact" className="text-accent-main underline-offset-2 hover:underline">
            Contacte-nous
          </a>
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.category}>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent-main">
              {section.category}
            </h2>
            <div className="rounded-2xl border border-brand-pink/30 bg-brand-cream px-5">
              {section.items.map((item) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
