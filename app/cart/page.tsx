'use client';

import Link from 'next/link';
import { useCart } from '@/providers/CartProvider';
import { CartItem } from '@/components/cart/CartItem';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { lines, totalAmount, currencyCode, checkoutUrl } = useCart();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-brand-text">Ton panier</h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <span className="text-5xl">🛒</span>
          <p className="text-brand-muted">Ton panier est encore vide... mais pas pour longtemps ✨</p>
          <Link
            href="/"
            className="mt-2 inline-flex min-h-[44px] items-center rounded-full bg-accent-main px-6 py-2 font-semibold text-white hover:bg-accent-hover"
          >
            Voir la boutique
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {lines.map((line) => (
              <CartItem key={line.id} line={line} />
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-pink/40 bg-brand-cream p-6">
            <div className="flex items-center justify-between">
              <span className="font-medium text-brand-muted">Total</span>
              <span className="text-xl font-bold text-brand-text">
                {formatPrice(totalAmount, currencyCode)}
              </span>
            </div>
            {parseFloat(totalAmount) < 25 && (
              <p className="mt-3 rounded-xl bg-brand-mint/40 px-3 py-2 text-xs text-brand-text">
                Plus que{' '}
                <strong>{formatPrice(String(25 - parseFloat(totalAmount)), currencyCode)}</strong>{' '}
                pour la livraison offerte 🎀
              </p>
            )}
            <a
              href={checkoutUrl ?? '#'}
              className="mt-4 block w-full rounded-full bg-accent-main py-3 text-center font-semibold text-white shadow-[0_4px_20px_rgba(255,133,161,0.35)] hover:bg-accent-hover"
            >
              Commander maintenant →
            </a>
            <Link
              href="/"
              className="mt-3 block text-center text-sm text-brand-muted hover:text-accent-main"
            >
              Continuer mes achats
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
