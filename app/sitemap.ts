import type { MetadataRoute } from 'next';
import { shopifyFetch } from '@/lib/shopify/client';
import { ALL_PRODUCTS_QUERY, ALL_COLLECTIONS_QUERY } from '@/lib/shopify/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const [productsData, collectionsData] = await Promise.all([
    shopifyFetch<{ products: { edges: { node: { handle: string } }[] } }>({
      query: ALL_PRODUCTS_QUERY,
      variables: { first: 250 },
      revalidate: 3600,
    }),
    shopifyFetch<{ collections: { edges: { node: { handle: string } }[] } }>({
      query: ALL_COLLECTIONS_QUERY,
      variables: { first: 50 },
      revalidate: 3600,
    }),
  ]);

  const productUrls = productsData.products.edges.map(({ node }) => ({
    url: `${siteUrl}/products/${node.handle}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const collectionUrls = collectionsData.collections.edges.map(({ node }) => ({
    url: `${siteUrl}/collections/${node.handle}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: siteUrl, changeFrequency: 'daily', priority: 1 },
    ...collectionUrls,
    ...productUrls,
  ];
}
