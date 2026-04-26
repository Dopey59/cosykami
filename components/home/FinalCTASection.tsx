'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-pink via-brand-lilac to-brand-sky p-10 text-center"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-dark">
          Commence aujourd'hui
        </p>
        <h2 className="font-display text-2xl font-bold leading-tight text-brand-text md:text-4xl">
          Tes prochaines pages préférées
          <br />
          commencent ici.
        </h2>
        <p className="mt-4 text-sm text-brand-muted md:text-base">
          Livraison offerte dès 25€ · Retours sous 14 jours · Expédition 48h
        </p>
        <Link
          href="/collections/stickers-cosy"
          className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-accent-main px-10 py-3 font-semibold text-white shadow-[0_4px_24px_rgba(255,133,161,0.45)] transition-colors hover:bg-accent-hover"
        >
          Découvrir la collection
        </Link>
      </motion.div>
    </section>
  );
}
