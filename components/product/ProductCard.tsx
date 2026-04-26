import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { ShopifyProduct } from '@/lib/shopify/types';

type Props = {
  product: Pick<ShopifyProduct, 'handle' | 'title' | 'availableForSale' | 'priceRange' | 'compareAtPriceRange' | 'images'>;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  const image      = product.images.edges[0]?.node;
  const hoverImage = product.images.edges[1]?.node;
  const price      = product.priceRange.minVariantPrice;
  const compareAt  = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#F7F7F7]">
        {image && (
          <>
            <Image
              src={image.url}
              alt={image.altText ?? `${product.title} stickers cosy kawaii`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className={`object-contain p-3 mix-blend-multiply transition-all duration-500 group-hover:scale-[1.04] ${
                hoverImage ? 'group-hover:opacity-0' : ''
              }`}
              priority={priority}
            />
            {hoverImage && (
              <Image
                src={hoverImage.url}
                alt={hoverImage.altText ?? product.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-contain p-3 mix-blend-multiply opacity-0 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
              />
            )}
          </>
        )}

        {!product.availableForSale && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50">
            <span className="border border-black/20 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-black/50">
              Épuisé
            </span>
          </div>
        )}

        {hasDiscount && product.availableForSale && (
          <div className="absolute right-2 top-2">
            <span className="border border-black bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-black">
              −%
            </span>
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="mt-3 px-0.5">
        <p className="line-clamp-1 text-[13px] font-medium leading-snug text-brand-text">
          {product.title}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-black">
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
