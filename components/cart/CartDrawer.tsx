'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/providers/CartProvider';
import { CartItem } from './CartItem';
import { formatPrice } from '@/lib/utils';
import { slideInBottom, fadeIn } from '@/lib/animations';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function CartDrawer({ isOpen, onClose }: Props) {
  const { lines, totalAmount, currencyCode, checkoutUrl, totalQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 bg-black/30"
            onClick={onClose}
          />

          <motion.div
            variants={slideInBottom}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[85vh] flex-col rounded-t-2xl bg-brand-cream md:bottom-0 md:left-auto md:right-0 md:top-0 md:h-full md:w-96 md:max-h-none md:rounded-none md:rounded-l-2xl"
          >
            <div className="flex items-center justify-between border-b border-brand-pink/40 px-5 py-4">
              <h2 className="font-semibold text-brand-text">
                Panier
                {totalQuantity > 0 && (
                  <span className="ml-2 rounded-full bg-accent-main/10 px-2 py-0.5 text-xs text-accent-main">
                    {totalQuantity}
                  </span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full hover:bg-brand-pink/30"
                aria-label="Fermer le panier"
              >
                <svg className="h-5 w-5 text-brand-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="text-sm text-brand-muted">
                    Ton panier est vide.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lines.map((line) => (
                    <CartItem key={line.id} line={line} />
                  ))}
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-brand-pink/40 px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-brand-muted">Total</span>
                  <span className="text-lg font-bold text-brand-text">
                    {formatPrice(totalAmount, currencyCode)}
                  </span>
                </div>
                {parseFloat(totalAmount) < 25 && (
                  <p className="mb-3 rounded-xl bg-brand-mint/40 px-3 py-2 text-xs text-brand-text">
                    Plus que{' '}
                    <strong>{formatPrice(String(25 - parseFloat(totalAmount)), currencyCode)}</strong>{' '}
                    pour la livraison offerte
                  </p>
                )}
                <a
                  href={checkoutUrl ?? '#'}
                  className="block w-full rounded-full bg-accent-main py-3 text-center font-semibold text-white shadow-[0_4px_20px_rgba(255,133,161,0.35)] hover:bg-accent-hover"
                >
                  Commander →
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
