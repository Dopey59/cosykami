import Link from 'next/link';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SlideUpByWord } from '@/registry/magicui/slide-up-by-word';
import type { ShopifyProduct } from '@/lib/shopify/types';

const SECTION_BG = '#ffffff';

type Props = {
  products: ShopifyProduct[];
};

function SakuraLabel() {
  return (
    <span className="mr-2 inline-flex items-center align-middle" aria-hidden>
      <svg width="13" height="13" viewBox="0 0 100 100">
        <g transform="translate(50,50)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-19" rx="9" ry="17" fill="#FF85A1" transform={`rotate(${a})`} />
          ))}
          <circle r="8" fill="white" />
          <circle r="3" fill="#FF85A1" />
        </g>
      </svg>
    </span>
  );
}

export function BestsellersSection({ products }: Props) {
  return (
    <section style={{ backgroundColor: SECTION_BG }} className="relative py-14">
      {/* Subtle scattered petals — static, no animation to keep server component */}
      <div className="pointer-events-none absolute left-[3%] top-[12%] rotate-[35deg] opacity-30" aria-hidden>
        <svg width="18" height="23" viewBox="0 0 30 40">
          <path d="M 15 2 C 20 2 28 10 28 22 C 28 34 22 38 15 38 C 8 38 2 34 2 22 C 2 10 10 2 15 2 Z" fill="#FFB899" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-[4%] top-[18%] -rotate-[50deg] opacity-25" aria-hidden>
        <svg width="14" height="18" viewBox="0 0 30 40">
          <path d="M 15 2 C 20 2 28 10 28 22 C 28 34 22 38 15 38 C 8 38 2 34 2 22 C 2 10 10 2 15 2 Z" fill="#C4A8E0" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-[10%] left-[6%] rotate-[55deg] opacity-20" aria-hidden>
        <svg width="16" height="21" viewBox="0 0 30 40">
          <path d="M 15 2 C 20 2 28 10 28 22 C 28 34 22 38 15 38 C 8 38 2 34 2 22 C 2 10 10 2 15 2 Z" fill="#FF85A1" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <p className="mb-2 flex items-center justify-center text-xs font-semibold uppercase tracking-widest text-accent-main">
            <SakuraLabel />Coup de cœur
          </p>
          <h2 className="font-display text-4xl text-brand-text md:text-5xl">
            <SlideUpByWord text="Les plus populaires" />
          </h2>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center text-brand-muted">Les produits arrivent bientôt.</p>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/collections/stickers-cosy"
            className="inline-flex min-h-[44px] items-center rounded-full border border-brand-pink px-6 py-2 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-pink/20"
          >
            Toute la collection →
          </Link>
        </div>
      </div>
    </section>
  );
}
