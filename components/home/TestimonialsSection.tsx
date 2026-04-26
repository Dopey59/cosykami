'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SlideUpByWord } from '@/registry/magicui/slide-up-by-word';

const CARD_THEMES = [
  { flower: '#FF85A1', bg: '#FFF5F7' },
  { flower: '#C4A8E0', bg: '#F7F3FF' },
  { flower: '#86C5A8', bg: '#F0FAF5' },
  { flower: '#FFB899', bg: '#FFF8F0' },
];

const FLOATING_PETALS = [
  { left: '4%',  top: '20%', size: 18, rot: 40,  color: '#FFB899', dur: 4.0, delay: 0 },
  { left: '91%', top: '15%', size: 14, rot: -55, color: '#C4A8E0', dur: 4.3, delay: 0.7 },
  { left: '8%',  top: '80%', size: 20, rot: 65,  color: '#FF85A1', dur: 3.6, delay: 1.1 },
  { left: '95%', top: '70%', size: 12, rot: -20, color: '#86C5A8', dur: 4.6, delay: 0.4 },
  { left: '55%', top: '92%', size: 16, rot: 15,  color: '#FFB899', dur: 4.1, delay: 0.9 },
];

const reviews = [
  {
    name: 'Charlotte B.',
    rating: 5,
    text: 'Des stickers tellement mignons, je les ai tous collés sur mes carnets de scrap en une seule soirée 🥹',
    date: 'il y a 2 jours',
    purchase: 'Planche stickers cosy automne',
  },
  {
    name: 'Julie M.',
    rating: 5,
    text: "La qualité est vraiment top, les couleurs sont fidèles à l'écran. Parfait pour mon bullet ✨",
    date: 'il y a 5 jours',
    purchase: 'Kit créatif pastel',
  },
  {
    name: 'Anaïs P.',
    rating: 5,
    text: 'Livraison rapide et emballage super soigné. Je recommande à 100% 🌸',
    date: 'il y a 1 semaine',
    purchase: 'Stickers kawaii fleurs',
  },
  {
    name: 'Marie C.',
    rating: 5,
    text: "Je cherchais des stickers kawaii depuis longtemps et j'en trouve enfin de cette qualité. Fan absolue ! 🎀",
    date: 'il y a 2 semaines',
    purchase: 'Planche stickers animaux',
  },
  {
    name: 'Clara D.',
    rating: 5,
    text: "Mes pages de scrapbooking ont complètement changé de look. C'est tellement plus joli maintenant ! 💗",
    date: 'il y a 3 semaines',
    purchase: 'Collection scrapbooking',
  },
  {
    name: 'Jade F.',
    rating: 5,
    text: 'Le service client est aux petits soins. Mon colis est arrivé bien emballé et super vite 🌿',
    date: 'il y a 1 mois',
    purchase: 'Stickers nature cosy',
  },
];

function SakuraMini({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="h-full w-full">
      <g transform="translate(50,50)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-22" rx="13" ry="25" fill={color} transform={`rotate(${a})`} />
        ))}
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={`n${a}`} cx="0" cy="-27" rx="5" ry="7" fill="white" opacity="0.4" transform={`rotate(${a})`} />
        ))}
        <circle r="11" fill="white" />
        <circle r="4.5" fill={color} />
      </g>
    </svg>
  );
}

function Petal({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.3)} viewBox="0 0 30 40" aria-hidden>
      <path d="M 15 2 C 20 2 28 10 28 22 C 28 34 22 38 15 38 C 8 38 2 34 2 22 C 2 10 10 2 15 2 Z" fill={color} opacity="0.55" />
      <ellipse cx="12" cy="10" rx="4" ry="7" fill="white" opacity="0.35" transform="rotate(-15 12 10)" />
    </svg>
  );
}

function StarIcon({ color }: { color: string }) {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill={color}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
  hover: { y: -8, transition: { type: 'spring' as const, stiffness: 280, damping: 22 } },
};

const bloomVariants = {
  hidden: { rotate: -25, scale: 0.6, opacity: 0 },
  visible: (i: number) => ({
    rotate: 0,
    scale: 1,
    opacity: 0.13,
    transition: { duration: 1.0, delay: i * 0.09 + 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
  hover: { rotate: 20, scale: 1.12, opacity: 0.22, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FFF5F7] to-[#F7F3FF]" />

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
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-main">
            Elles adorent
          </p>
          <h2 className="font-display text-4xl text-brand-text md:text-5xl">
            <SlideUpByWord text="Ce que nos clientes disent" />
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -20 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 + i * 0.07 }}
              >
                <StarIcon color="#FF85A1" />
              </motion.span>
            ))}
            <span className="ml-1.5 text-sm font-semibold text-brand-text">4.9</span>
            <span className="text-sm text-brand-muted">· 247 avis vérifiés</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => {
            const t = CARD_THEMES[i % CARD_THEMES.length];
            return (
              <motion.div
                key={review.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover="hover"
                className="relative cursor-default overflow-hidden rounded-3xl p-6 shadow-sm"
                style={{ backgroundColor: t.bg }}
              >
                {/* Sakura bloom watermark */}
                <motion.div
                  custom={i}
                  variants={bloomVariants}
                  className="pointer-events-none absolute -right-6 -top-6 h-32 w-32"
                >
                  <SakuraMini color={t.flower} />
                </motion.div>

                {/* Large decorative quote mark */}
                <div
                  className="pointer-events-none absolute left-5 top-3 font-display text-8xl font-bold leading-none"
                  style={{ color: t.flower, opacity: 0.1, lineHeight: 1 }}
                  aria-hidden
                >
                  ❝
                </div>

                {/* Reviewer header */}
                <div className="relative z-10 mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: t.flower }}
                    >
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-text">{review.name}</p>
                      <p className="text-[11px] text-brand-muted/70">{review.purchase}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] text-brand-muted">{review.date}</span>
                </div>

                {/* Stars — pop in with spring stagger */}
                <div className="relative z-10 mb-3 flex gap-0.5">
                  {[...Array(review.rating)].map((_, j) => (
                    <motion.span
                      key={j}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ type: 'spring', stiffness: 220, damping: 12, delay: i * 0.09 + 0.3 + j * 0.05 }}
                    >
                      <StarIcon color={t.flower} />
                    </motion.span>
                  ))}
                </div>

                <p className="relative z-10 text-sm leading-relaxed text-brand-muted">{review.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
