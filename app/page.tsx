import type { Metadata } from 'next';
import { shopifyFetch } from '@/lib/shopify/client';
import { FEATURED_PRODUCTS_QUERY, COLLECTION_QUERY } from '@/lib/shopify/queries';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustBar } from '@/components/home/TrustBar';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';
import { VelocitySection } from '@/components/home/VelocitySection';
import { BestsellersSection } from '@/components/home/BestsellersSection';
import { ColoriagiSection } from '@/components/home/CosyStickers';
import type { ShopifyProduct } from '@/lib/shopify/types';

export const metadata: Metadata = {
  title: 'Cosykami — Stickers & Scrapbook Cosy Kawaii',
  description:
    'Planches de stickers cosy kawaii pour ton scrapbooking et journaling. Stickers pastel japonais, esthétique coloriage cosy. Livraison en France.',
};

export const revalidate = 3600;

async function getFeaturedProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
    query: FEATURED_PRODUCTS_QUERY,
    variables: { first: 8 },
    revalidate: 60,
  });
  return data.products.edges.map((e) => e.node);
}

async function getColoriagiProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ collection: { products: { edges: { node: ShopifyProduct }[] } } }>({
    query: COLLECTION_QUERY,
    variables: { handle: 'stickers-cosy', first: 12 },
    revalidate: 60,
  });
  return data.collection?.products?.edges?.map((e) => e.node) ?? [];
}

export default async function HomePage() {
  const products = await getFeaturedProducts();
  const coloriagiProducts = await getColoriagiProducts();

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cosykami',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    description: 'Stickers cosy kawaii pour scrapbooking et journaling',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <HeroSection />

      {/* <TrustBar /> */}

      <BestsellersSection products={products} />

      <div className="bg-[#E0D0FF]">
        <VelocitySection />
      </div>
      <HowItWorksSection />

      <ColoriagiSection products={coloriagiProducts} />

      {/* Badges réassurance statiques */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-brand-pink/40 bg-brand-cream p-5 md:grid-cols-4">
          {[
            { label: 'Livraison offerte', sub: 'dès 25€ d\'achat', icon: <svg className="h-6 w-6 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg> },
            { label: 'Paiement sécurisé', sub: 'CB, PayPal, Apple Pay', icon: <svg className="h-6 w-6 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
            { label: 'Expédition 48h', sub: 'suivi inclus', icon: <svg className="h-6 w-6 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { label: 'Retours gratuits', sub: 'sous 14 jours', icon: <svg className="h-6 w-6 text-accent-main" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg> },
          ].map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-2 text-center">
              {b.icon}
              <div>
                <p className="text-sm font-semibold text-brand-text">{b.label}</p>
                <p className="text-xs text-brand-muted">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
        <TestimonialsSection />
        <FinalCTASection />
    </>
  );
}
