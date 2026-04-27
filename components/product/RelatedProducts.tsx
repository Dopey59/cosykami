import { shopifyFetch } from '@/lib/shopify/client';
import { PRODUCT_RECOMMENDATIONS_QUERY, FEATURED_PRODUCTS_QUERY } from '@/lib/shopify/queries';
import { ProductCard } from '@/components/product/ProductCard';
import type { ShopifyProduct } from '@/lib/shopify/types';

type Props = {
  productId: string;
  currentHandle: string;
  limit?: number;
};

type RecommendationProduct = Pick<
  ShopifyProduct,
  'id' | 'title' | 'handle' | 'availableForSale' | 'priceRange' | 'compareAtPriceRange' | 'images'
>;

async function getRecommendations(productId: string): Promise<RecommendationProduct[]> {
  try {
    const data = await shopifyFetch<{ productRecommendations: RecommendationProduct[] | null }>({
      query: PRODUCT_RECOMMENDATIONS_QUERY,
      variables: { productId },
      revalidate: 600,
    });
    return data.productRecommendations ?? [];
  } catch {
    return [];
  }
}

async function getFallback(): Promise<RecommendationProduct[]> {
  try {
    const data = await shopifyFetch<{
      products: { edges: { node: RecommendationProduct }[] };
    }>({
      query: FEATURED_PRODUCTS_QUERY,
      variables: { first: 8 },
      revalidate: 600,
    });
    return data.products.edges.map((e) => e.node);
  } catch {
    return [];
  }
}

export async function RelatedProducts({ productId, currentHandle, limit = 4 }: Props) {
  let products = await getRecommendations(productId);

  if (products.length < limit) {
    const fallback = await getFallback();
    const seen = new Set(products.map((p) => p.handle));
    for (const p of fallback) {
      if (products.length >= limit) break;
      if (p.handle === currentHandle || seen.has(p.handle)) continue;
      products.push(p);
      seen.add(p.handle);
    }
  }

  products = products.filter((p) => p.handle !== currentHandle).slice(0, limit);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-main">
            ✦ Sélection cosy
          </p>
          <h2 className="font-display text-2xl font-bold text-brand-text md:text-3xl">
            Tu aimerais peut-être aussi
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.handle} product={product} />
        ))}
      </div>
    </section>
  );
}
