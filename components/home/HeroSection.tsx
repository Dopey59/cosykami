'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { NumberTicker } from '@/components/ui/NumberTicker';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: i * 0.12 },
  }),
};

const stats = [
  { value: 2347, suffix: '', label: 'commandes' },
  { value: 48, suffix: 'h', label: 'expédition' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 text-center md:py-32">
      
      {/* BACKGROUND IMAGE */}
      <Image
        src="https://images.unsplash.com/vector-1757199990469-b6e3c43099e7?q=80&w=1548&auto=format&fit=crop"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* OVERLAY (optionnel pour lisibilité) */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      {/* DECOR */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-pink/40 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand-lilac/50 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative mx-auto max-w-2xl">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-main/30 bg-white/60 px-4 py-1.5 text-xs font-semibold text-accent-dark backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-main" />
          Plus de 2 000 créatrices heureuses
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl font-bold leading-tight text-brand-text md:text-6xl"
        >
          Plongez dans un univers coloré
          <br />
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-5 text-base text-black md:text-lg"
        >
          Des stickers cosy et colorés pour embellir vos créations et exprimer votre personnalité.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/collections/stickers-cosy"
            className="inline-flex min-h-[52px] items-center rounded-full bg-accent-main px-8 py-3 font-semibold text-white shadow-[0_4px_24px_rgba(255,133,161,0.4)] transition-colors hover:bg-accent-hover"
          >
            Découvrir la collection
          </Link>
          <Link
            href="/collections/nouveautes"
            className="inline-flex min-h-[52px] items-center rounded-full border border-brand-pink bg-white/70 px-8 py-3 font-semibold text-brand-text backdrop-blur-sm transition-colors hover:bg-brand-pink/30"
          >
            Voir les nouveautés
          </Link>
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-12 flex items-center justify-center gap-8 md:gap-12"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-brand-text md:text-3xl">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-0.5 text-xs text-brand-muted">{s.label}</p>
            </div>
          ))}

          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5 fill-accent-main" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mt-0.5 text-xs text-brand-muted">4.9 / 5 · 247 avis</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}