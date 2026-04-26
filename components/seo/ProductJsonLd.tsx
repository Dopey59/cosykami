import type { ShopifyProduct } from '@/lib/shopify/types';

type Props = {
  product: ShopifyProduct;
};

export function ProductJsonLd({ product }: Props) {
  const variant = product.variants.edges[0]?.node;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.edges.map((e) => e.node.url),
    brand: {
      '@type': 'Brand',
      name: 'Cosykami',
    },
    offers: {
      '@type': 'Offer',
      price: variant?.price.amount,
      priceCurrency: variant?.price.currencyCode,
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${siteUrl}/products/${product.handle}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
