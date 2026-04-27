'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { SlideUpByWord } from '@/registry/magicui/slide-up-by-word';
import type { ShopifyProduct } from '@/lib/shopify/types';

type Props = {
  products: ShopifyProduct[];
};

const FLOATING_PETALS = [
  { left: '5%',  top: '16%', size: 20, rot: 30,  color: '#FFB899', dur: 4.0, delay: 0 },
  { left: '92%', top: '22%', size: 14, rot: -45, color: '#C4A8E0', dur: 4.4, delay: 0.6 },
  { left: '8%',  top: '76%', size: 18, rot: 65,  color: '#FF85A1', dur: 3.7, delay: 1.1 },
  { left: '95%', top: '68%', size: 12, rot: -20, color: '#86C5A8', dur: 4.6, delay: 0.3 },
];

function Petal({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.3)} viewBox="0 0 30 40" aria-hidden>
      <path d="M 15 2 C 20 2 28 10 28 22 C 28 34 22 38 15 38 C 8 38 2 34 2 22 C 2 10 10 2 15 2 Z" fill={color} opacity="0.55" />
      <ellipse cx="12" cy="10" rx="4" ry="7" fill="white" opacity="0.35" transform="rotate(-15 12 10)" />
    </svg>
  );
}

function extractPageCount(description: string | undefined): string | null {
  if (!description) return null;
  const match = description.match(/(\d+)\s*(?:pages?|p\.)/i);
  return match ? match[1] : null;
}

export function ColoriagiSection({ products }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F5] via-white to-[#F5F0FF]" />

      {FLOATING_PETALS.map((p, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -12, 0], rotate: [p.rot, p.rot + 22, p.rot] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Petal color={p.color} size={p.size} />
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-main">
           DIY de scènes miniatures
          </p>
          <h2 className="font-display text-4xl text-brand-text md:text-5xl">
            <SlideUpByWord text="Jusqu'à 50 pages de stickers" />
          </h2>
          <p className="mt-3 text-sm text-brand-muted md:text-base">
            Créez ta propre scènes apaisante et satisfaisante avec nos carnets de sitckers
          </p>
        </motion.div>

        {/* Carousel — scroll horizontal avec snap */}
        <div className="relative -mx-4 overflow-hidden px-4">
          <motion.div
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 md:gap-6"
            style={{ scrollbarWidth: 'none' }}
          >
            {products.map((product, i) => {
              const pageCount = extractPageCount(product.description);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-[100%] snap-start sm:min-w-[calc(50%-8px)] lg:min-w-[calc(33.333%-16px)]"
                >
                  <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                    <ProductCard product={product} priority={i < 2} />

                    {/* Page count badge */}
                    {pageCount && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: i * 0.08 + 0.3, duration: 0.4 }}
                        className="absolute right-5 top-4 rounded-full bg-accent-main px-3 py-1 text-[11px] font-bold text-white"
                      >
                        {pageCount}p
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Scroll hint — mobile only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pointer-events-none mt-4 flex justify-center text-[12px] text-black sm:hidden"
          >
            ← Scroll pour découvrir →
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/collections/stickers-cosy"
            className="inline-flex min-h-[44px] items-center rounded-full border border-brand-pink px-8 py-2 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-pink/20"
          >
            Voir tous les cosy stickers →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
