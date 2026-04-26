'use client';

import Image from 'next/image';
import { useCart } from '@/providers/CartProvider';
import { formatPrice } from '@/lib/utils';
import type { CartLine } from '@/lib/shopify/types';

type Props = {
  line: CartLine;
};

export function CartItem({ line }: Props) {
  const { removeFromCart } = useCart();
  const image = line.merchandise.product.images.edges[0]?.node;

  return (
    <div className="flex gap-3">
      {/* Image */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-brand-pink/40 bg-brand-pink/10">
        {image && (
          <Image
            src={image.url}
            alt={image.altText ?? line.merchandise.product.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        )}
      </div>

      {/* Infos */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-sm font-semibold leading-tight text-brand-text">
            {line.merchandise.product.title}
          </p>
          {line.merchandise.title !== 'Default Title' && (
            <p className="text-xs text-brand-muted">{line.merchandise.title}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-muted">Qté : {line.quantity}</span>
            <span className="text-sm font-bold text-accent-main">
              {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
            </span>
          </div>
          <button
            onClick={() => removeFromCart(line.id)}
            className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full text-brand-muted hover:text-accent-dark"
            aria-label="Retirer du panier"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
