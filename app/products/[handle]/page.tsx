import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { shopifyFetch } from '@/lib/shopify/client';
import { PRODUCT_QUERY, ALL_PRODUCTS_QUERY } from '@/lib/shopify/queries';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductDetail } from '@/components/product/ProductDetail';
import { ProductJsonLd } from '@/components/seo/ProductJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import type { ShopifyProduct } from '@/lib/shopify/types';

export const revalidate = 60;

type Props = {
  params: Promise<{ handle: string }>;
};

async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: PRODUCT_QUERY,
    variables: { handle },
    revalidate: 60,
  });
  return data.product;
}

export async function generateStaticParams() {
  const data = await shopifyFetch<{ products: { edges: { node: { handle: string } }[] } }>({
    query: ALL_PRODUCTS_QUERY,
    variables: { first: 250 },
    revalidate: 3600,
  });
  return data.products.edges.map(({ node }) => ({ handle: node.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const title = product.seo?.title || product.title;
  const description =
    product.seo?.description || product.description?.slice(0, 160);
  const imageUrl = product.images.edges[0]?.node.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description ?? undefined,
      url: `${siteUrl}/products/${handle}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description ?? undefined,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `${siteUrl}/products/${handle}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) notFound();

  const images = product.images.edges.map((e) => e.node);

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', href: '/' },
          { name: 'Stickers cosy', href: '/collections/stickers-cosy' },
          { name: product.title, href: `/products/${handle}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Galerie */}
          <ProductImageGallery images={images} title={product.title} />

          {/* Détail */}
          <ProductDetail product={product} />
        </div>
      </div>
    </>
  );
}
