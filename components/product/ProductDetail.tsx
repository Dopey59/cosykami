'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCart } from '@/providers/CartProvider';
import { formatPrice } from '@/lib/utils';
import type { ShopifyProduct, ShopifyProductVariant } from '@/lib/shopify/types';

type Props = {
  product: ShopifyProduct;
};

function hashId(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) & 0x7fffffff;
  }
  return h;
}

const ORDER_COUNTS = [112, 134, 149, 167, 183, 201, 219, 238, 256, 274, 293, 311, 328, 347, 369, 391];

function getOrderCount(id: string) {
  return ORDER_COUNTS[hashId(id) % ORDER_COUNTS.length]!;
}

const ALL_REVIEWS = [
  { name: 'Inès T.', rating: 5, text: 'Absolument adorable, exactement comme sur les photos. Emballage super soigné 🥹', date: 'il y a 2 jours' },
  { name: 'Mathilde G.', rating: 5, text: 'Les couleurs sont fidèles, la qualité est vraiment au rendez-vous. Je recommande !', date: 'il y a 4 jours' },
  { name: 'Pauline V.', rating: 5, text: 'Livraison rapide, emballage protégé. Ces stickers sont encore plus beaux en vrai 🌸', date: 'il y a 5 jours' },
  { name: 'Chloé A.', rating: 5, text: 'Je les utilise pour décorer mes pages de scrapbooking et c\'est parfait. Merci !', date: 'il y a 1 semaine' },
  { name: 'Juliette F.', rating: 5, text: 'Top ! J\'en ai commandé plusieurs planches. Je recommande sans hésiter.', date: 'il y a 1 semaine' },
  { name: 'Amandine R.', rating: 5, text: 'Qualité premium, les stickers tiennent bien dans le temps. Ravie de mon achat 💗', date: 'il y a 10 jours' },
  { name: 'Océane M.', rating: 5, text: 'Trop mignons ces stickers ! Je les adore, exactement ce que je cherchais.', date: 'il y a 2 semaines' },
  { name: 'Laura B.', rating: 5, text: 'Arrivée rapide et bien emballée. Les visuels sont vraiment fidèles à la photo.', date: 'il y a 2 semaines' },
  { name: 'Margot D.', rating: 5, text: 'Un vrai coup de coeur ! Mes pages de scrapbooking n\'ont jamais été aussi jolies 🌿', date: 'il y a 3 semaines' },
  { name: 'Elisa N.', rating: 5, text: 'Parfait pour décorer mes carnets. La qualité est là, je recommande !', date: 'il y a 3 semaines' },
  { name: 'Noémie S.', rating: 5, text: 'Super satisfaite. Stickers résistants, couleurs vives et vraiment mignons.', date: 'il y a 1 mois' },
  { name: 'Lucie P.', rating: 5, text: 'Commande bien emballée, produits conformes à la description. Je suis fan ! 🎀', date: 'il y a 1 mois' },
];

function getProductReviews(id: string) {
  const h = hashId(id);
  const n = ALL_REVIEWS.length;
  return [ALL_REVIEWS[h % n]!, ALL_REVIEWS[(h + 4) % n]!, ALL_REVIEWS[(h + 8) % n]!];
}

function stripEmojis(html: string): string {
  return html
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
    .replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[︀-️]/g, '')
    .replace(/\s{2,}/g, ' ');
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function useShippingCountdown() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const getLeft = () => {
      const now = new Date();
      const cutoff = new Date(now);
      cutoff.setHours(17, 0, 0, 0);
      if (now >= cutoff) cutoff.setDate(cutoff.getDate() + 1);
      return Math.max(0, Math.floor((cutoff.getTime() - now.getTime()) / 1000));
    };
    setSeconds(getLeft());
    const id = setInterval(() => setSeconds(getLeft()), 1000);
    return () => clearInterval(id);
  }, []);
  return { h: Math.floor(seconds / 3600), m: Math.floor((seconds % 3600) / 60), s: seconds % 60 };
}

function IconShield() {
  return (
    <svg className="h-5 w-5 shrink-0 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconTruck() {
  return (
    <svg className="h-5 w-5 shrink-0 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function IconReturn() {
  return (
    <svg className="h-5 w-5 shrink-0 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
  );
}

function IconGift() {
  return (
    <svg className="h-5 w-5 shrink-0 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H12V4.875zM12 4.875A2.625 2.625 0 109.375 7.5H12V4.875zM11.25 7.5v11.25M12.75 7.5v11.25M3 7.5h18M3.75 7.5A.75.75 0 013 6.75V6a.75.75 0 01.75-.75h16.5A.75.75 0 0121 6v.75a.75.75 0 01-.75.75H3.75z" />
    </svg>
  );
}

export function ProductDetail({ product }: Props) {
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant>(variants[0]!);
  const { addToCart, isLoading } = useCart();
  const [viewers, setViewers] = useState(0);
  const countdown = useShippingCountdown();

  useEffect(() => {
    setViewers(hashId(product.id) % 12 + 6 + Math.floor(Math.random() * 5));
  }, [product.id]);

  const compareAt = selectedVariant.compareAtPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(selectedVariant.price.amount);
  const orderCount = getOrderCount(product.id);
  const reviews = getProductReviews(product.id);
  const cleanDescription = product.descriptionHtml ? stripEmojis(product.descriptionHtml) : null;

  async function handleAddToCart() {
    await addToCart(selectedVariant.id);
    toast.success('Ajouté à ton panier');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold leading-tight text-brand-text md:text-2xl">
        {product.title}
      </h1>

      {/* Prix */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-accent-main">
          {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
        </span>
        {hasDiscount && compareAt && (
          <span className="text-sm text-brand-muted line-through">
            {formatPrice(compareAt.amount, compareAt.currencyCode)}
          </span>
        )}
        {hasDiscount && (
          <span className="rounded-full bg-accent-main/10 px-2.5 py-0.5 text-xs font-bold text-accent-dark">
            Promo
          </span>
        )}
      </div>

      {/* Preuve sociale */}
      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-brand-muted">
          <span className="font-semibold text-brand-text">{orderCount} commandes</span> ce mois
        </p>
        {viewers > 0 && (
          <p className="flex items-center gap-1.5 text-xs text-brand-muted">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-main opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-main" />
            </span>
            <span className="font-semibold text-brand-text">{viewers} personnes</span>
            &nbsp;regardent ce produit en ce moment
          </p>
        )}
      </div>

      {/* Urgence stock */}
      {selectedVariant.availableForSale && selectedVariant.quantityAvailable <= 10 && (
        <div className="flex items-center gap-2 rounded-xl border border-accent-main/30 bg-accent-main/5 px-3 py-2.5">
          <svg className="h-4 w-4 shrink-0 text-accent-dark" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <span className="text-xs font-semibold text-accent-dark">
            Plus que {selectedVariant.quantityAvailable} en stock — dépêche-toi !
          </span>
        </div>
      )}

      {/* Options */}
      {variants.length > 1 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Options</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                disabled={!v.availableForSale}
                className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  v.id === selectedVariant.id
                    ? 'border-accent-main bg-accent-main text-white'
                    : v.availableForSale
                    ? 'border-brand-pink text-brand-text hover:border-accent-main'
                    : 'cursor-not-allowed border-brand-pink/30 text-brand-muted/50 line-through'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Compte à rebours expédition */}
      {countdown.h < 12 && countdown.h >= 0 && (
        <div className="rounded-xl border border-brand-mint/60 bg-brand-mint/20 px-4 py-3">
          <p className="text-xs font-semibold text-brand-text">
            Commande dans{' '}
            <span className="font-mono tracking-tight text-accent-dark">
              {pad(countdown.h)}h {pad(countdown.m)}m {pad(countdown.s)}s
            </span>
            {' '}pour une expédition aujourd'hui
          </p>
        </div>
      )}

      {/* CTA sticky mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-sm md:static md:bg-transparent md:p-0 md:pb-0">
        {selectedVariant.availableForSale ? (
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full min-h-[52px] rounded-full bg-accent-main px-6 py-3 font-semibold text-white shadow-[0_4px_20px_rgba(255,133,161,0.35)] transition-colors hover:bg-accent-hover disabled:opacity-70"
          >
            {isLoading ? 'Ajout en cours...' : 'Ajouter au panier'}
          </motion.button>
        ) : (
          <button className="w-full min-h-[52px] rounded-full border border-brand-pink bg-brand-cream px-6 py-3 text-sm font-semibold text-brand-muted">
            Me prévenir quand disponible
          </button>
        )}
      </div>

      <div className="h-20 md:hidden" />

      {/* Livraison */}
      <div className="rounded-2xl border border-brand-pink/40 bg-brand-cream p-4">
        <div className="flex items-start gap-3">
          <IconTruck />
          <div>
            <p className="text-sm font-semibold text-brand-text">Livraison offerte dès 25€</p>
            <p className="mt-0.5 text-xs text-brand-muted">
              Expédié sous 48h · Livraison 10–18 jours · Suivi inclus
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-brand-muted">
          Nos produits viennent d'ateliers soigneusement sélectionnés — chaque commande est préparée avec attention.
        </p>
      </div>

      {/* Description produit (sans emojis) */}
      {cleanDescription && (
        <div
          className="prose prose-sm max-w-none text-brand-muted"
          dangerouslySetInnerHTML={{ __html: cleanDescription }}
        />
      )}

      {/* Avis clients */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-brand-text">Avis clients</h2>
          <div className="flex items-center gap-1 text-xs text-brand-muted">
            <span className="text-accent-main">★★★★★</span>
            <span>4.9 / 5</span>
          </div>
        </div>
        {reviews.map((review) => (
          <div key={review.name} className="rounded-2xl border border-brand-pink/30 bg-brand-cream p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-brand-text">{review.name}</span>
                <span className="text-accent-main">{'★'.repeat(review.rating)}</span>
              </div>
              <span className="text-xs text-brand-muted">{review.date}</span>
            </div>
            <p className="mt-1 text-sm text-brand-muted">{review.text}</p>
          </div>
        ))}
      </div>

      {/* Badges réassurance */}
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-brand-pink/30 p-4 sm:grid-cols-4">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <IconShield />
          <span className="text-xs text-brand-muted">Paiement sécurisé</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <IconGift />
          <span className="text-xs text-brand-muted">Emballage soigné</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <IconReturn />
          <span className="text-xs text-brand-muted">Retours sous 14j</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <IconTruck />
          <span className="text-xs text-brand-muted">Expédition 48h</span>
        </div>
      </div>
    </div>
  );
}
