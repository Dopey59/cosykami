'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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
    text: 'La qualité est vraiment top, les couleurs sont fidèles à l\'écran. Parfait pour mon bullet ✨',
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
    text: 'Je cherchais des stickers kawaii depuis longtemps et j\'en trouve enfin de cette qualité. Fan absolue ! 🎀',
    date: 'il y a 2 semaines',
    purchase: 'Planche stickers animaux',
  },
  {
    name: 'Clara D.',
    rating: 5,
    text: 'Mes pages de scrapbooking ont complètement changé de look. C\'est tellement plus joli maintenant ! 💗',
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

function StarIcon() {
  return (
    <svg className="h-3.5 w-3.5 fill-accent-main text-accent-main" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const, delay: i * 0.08 },
  }),
};

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-gradient-to-b from-brand-cream to-brand-pink/20 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-3 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-main">
            Elles adorent
          </p>
          <h2 className="font-display text-2xl font-bold text-brand-text md:text-3xl">
            Ce que nos clientes disent
          </h2>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            <span className="ml-1.5 text-sm font-semibold text-brand-text">4.9</span>
            <span className="text-sm text-brand-muted">· 247 avis vérifiés</span>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-col rounded-2xl border border-brand-pink/40 bg-white/80 p-5 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-brand-text">{review.name}</p>
                  <p className="text-xs text-brand-muted/70">{review.purchase}</p>
                </div>
                <span className="text-xs text-brand-muted">{review.date}</span>
              </div>
              <div className="mt-2 flex gap-0.5">
                {[...Array(review.rating)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
