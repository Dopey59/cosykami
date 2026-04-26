import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { ShopifyProduct } from '@/lib/shopify/types';

type Props = {
  product: Pick<ShopifyProduct, 'handle' | 'title' | 'availableForSale' | 'priceRange' | 'compareAtPriceRange' | 'images'>;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  const image = product.images.edges[0]?.node;
  const hoverImage = product.images.edges[1]?.node;
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-brand-pink/40 bg-brand-pink/10">
        {image && (
          <>
            <Image
              src={image.url}
              alt={image.altText ?? `${product.title} stickers cosy kawaii`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-300 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
              priority={priority}
            />
            {hoverImage && (
              <Image
                src={hoverImage.url}
                alt={hoverImage.altText ?? product.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </>
        )}
        {!product.availableForSale && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/60">
            <span className="rounded-full bg-brand-muted/20 px-3 py-1 text-xs font-semibold text-brand-muted">
              Rupture de stock
            </span>
          </div>
        )}
        {hasDiscount && product.availableForSale && (
          <div className="absolute left-2 top-2">
            <span className="rounded-full bg-accent-main px-2 py-0.5 text-[11px] font-bold text-white">
              Promo
            </span>
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="mt-2 px-1">
        <p className="line-clamp-2 text-sm font-semibold leading-tight text-brand-text">
          {product.title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-base font-bold text-accent-main">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && compareAt && (
            <span className="text-xs text-brand-muted line-through">
              {formatPrice(compareAt.amount, compareAt.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
