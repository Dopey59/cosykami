import { shopifyFetch } from '@/lib/shopify/client';
import { PRODUCT_QUERY } from '@/lib/shopify/queries';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import type { ShopifyProduct } from '@/lib/shopify/types';

type Props = {
  children: React.ReactNode;
  params: Promise<{ handle: string }>;
};

export default async function ProductLayout({ children, params }: Props) {
  const { handle } = await params;

  const data = await shopifyFetch<{ product: Pick<ShopifyProduct, 'id' | 'handle'> | null }>({
    query: PRODUCT_QUERY,
    variables: { handle },
    revalidate: 60,
  });

  return (
    <>
      {children}
      {data.product && (
        <RelatedProducts
          productId={data.product.id}
          currentHandle={data.product.handle}
          limit={4}
        />
      )}
    </>
  );
}
