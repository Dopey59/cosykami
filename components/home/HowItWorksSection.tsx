'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Tu choisis',
    desc: 'Parcours nos planches cosy kawaii et trouve celles qui correspondent à ton univers.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'On prépare',
    desc: 'Ta commande est préparée avec soin et expédiée sous 48h directement chez toi.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H12V4.875zM12 4.875A2.625 2.625 0 109.375 7.5H12V4.875zM11.25 7.5v11.25M12.75 7.5v11.25M3 7.5h18M3.75 7.5A.75.75 0 013 6.75V6a.75.75 0 01.75-.75h16.5A.75.75 0 0121 6v.75a.75.75 0 01-.75.75H3.75z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Tu crées',
    desc: 'Colle, décore, exprime-toi. Tes pages deviennent l\'œuvre d\'art qu\'elles ont toujours voulu être.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: i * 0.15 },
  }),
};

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-main">
          Simple comme bonjour
        </p>
        <h2 className="font-display text-2xl font-bold text-brand-text md:text-3xl">
          De la commande à ta page, en 3 étapes
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative rounded-2xl border border-brand-pink/40 bg-brand-cream p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-main/10 text-accent-main">
                {step.icon}
              </div>
              <span className="font-display text-3xl font-bold text-brand-pink/50">{step.number}</span>
            </div>
            <h3 className="mb-2 font-display text-lg font-bold text-brand-text">{step.title}</h3>
            <p className="text-sm leading-relaxed text-brand-muted">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
