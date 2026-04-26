import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { shopifyFetch } from '@/lib/shopify/client';
import { COLLECTION_QUERY, ALL_COLLECTIONS_QUERY } from '@/lib/shopify/queries';
import { ProductGrid } from '@/components/product/ProductGrid';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { ShopifyCollection } from '@/lib/shopify/types';

export const revalidate = 60;

type Props = {
  params: Promise<{ handle: string }>;
};

async function getCollection(handle: string): Promise<ShopifyCollection | null> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: COLLECTION_QUERY,
    variables: { handle, first: 24 },
    revalidate: 60,
  });
  return data.collection;
}

export async function generateStaticParams() {
  const data = await shopifyFetch<{ collections: { edges: { node: { handle: string } }[] } }>({
    query: ALL_COLLECTIONS_QUERY,
    variables: { first: 50 },
    revalidate: 3600,
  });
  return data.collections.edges.map(({ node }) => ({ handle: node.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const title = collection.seo?.title || collection.title;
  const description = collection.seo?.description || collection.description?.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description: description ?? undefined,
      url: `${siteUrl}/collections/${handle}`,
      images: collection.image ? [{ url: collection.image.url }] : [],
    },
    alternates: {
      canonical: `${siteUrl}/collections/${handle}`,
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) notFound();

  const products = collection.products.edges.map((e) => e.node);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', href: '/' },
          { name: collection.title, href: `/collections/${handle}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <Breadcrumb items={[{ label: collection.title }]} />
        {/* En-tête collection */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-brand-text md:text-3xl">
            {collection.title} — Stickers Cosy Kawaii
          </h1>
          {collection.description && (
            <p className="mt-2 text-sm text-brand-muted">{collection.description}</p>
          )}
          <p className="mt-1 text-xs text-brand-muted">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </p>
        </header>

        {/* Grille produits */}
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center text-brand-muted py-16">
            Cette collection arrive bientôt ✨
          </p>
        )}
      </div>
    </>
  );
}
