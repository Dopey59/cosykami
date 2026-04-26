'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SlideUpByWord } from '@/registry/magicui/slide-up-by-word';

const THEMES = [
  { flower: '#FF85A1', bg: '#FFF5F7', badge: '#FFD6E3' },
  { flower: '#C4A8E0', bg: '#F7F3FF', badge: '#E8DCFF' },
  { flower: '#86C5A8', bg: '#F0FAF5', badge: '#C8F0E0' },
];

const FLOATING_PETALS = [
  { left: '5%',  top: '14%', size: 22, rot: 35,  color: '#FFB899', dur: 3.8, delay: 0 },
  { left: '88%', top: '10%', size: 16, rot: -50, color: '#C4A8E0', dur: 4.2, delay: 0.6 },
  { left: '12%', top: '74%', size: 20, rot: 70,  color: '#FF85A1', dur: 3.5, delay: 1.2 },
  { left: '93%', top: '66%', size: 14, rot: -25, color: '#86C5A8', dur: 4.5, delay: 0.3 },
  { left: '48%', top: '86%', size: 18, rot: 20,  color: '#FFB899', dur: 3.9, delay: 0.9 },
  { left: '72%', top: '50%', size: 12, rot: -10, color: '#C4A8E0', dur: 4.1, delay: 1.5 },
];

const steps = [
  {
    title: 'Tu choisis',
    desc: 'Parcours nos planches cosy kawaii et trouve celles qui correspondent à ton univers.',
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    title: 'On prépare',
    desc: 'Ta commande est préparée avec soin et expédiée sous 48h directement chez toi.',
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H12V4.875zM12 4.875A2.625 2.625 0 109.375 7.5H12V4.875zM11.25 7.5v11.25M12.75 7.5v11.25M3 7.5h18M3.75 7.5A.75.75 0 013 6.75V6a.75.75 0 01.75-.75h16.5A.75.75 0 0121 6v.75a.75.75 0 01-.75.75H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Tu crées',
    desc: "Colle, décore, exprime-toi. Tes pages deviennent l'œuvre d'art qu'elles ont toujours voulu être.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
];

function SakuraBloom({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className="h-full w-full">
      <g transform="translate(100,100)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-44" rx="26" ry="50" fill={color} transform={`rotate(${a})`} />
        ))}
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={`n${a}`} cx="0" cy="-54" rx="10" ry="14" fill="white" opacity="0.4" transform={`rotate(${a})`} />
        ))}
        <circle r="22" fill="white" />
        <circle r="9" fill={color} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <line x1="0" y1="-11" x2="0" y2="-21" stroke={color} strokeWidth="1.5" />
            <circle cx="0" cy="-23" r="2.2" fill={color} />
          </g>
        ))}
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

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
  hover: {
    y: -12,
    transition: { type: 'spring' as const, stiffness: 280, damping: 22 },
  },
};

const bloomVariants = {
  hidden: { rotate: -30, scale: 0.6, opacity: 0 },
  visible: (i: number) => ({
    rotate: 0,
    scale: 1,
    opacity: 0.14,
    transition: { duration: 1.1, delay: i * 0.13 + 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
  hover: {
    rotate: 22,
    scale: 1.14,
    opacity: 0.24,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

const badgeVariants = {
  hidden: { scale: 0, rotate: -45 },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 190, damping: 13, delay: i * 0.13 + 0.2 },
  }),
  hover: {
    scale: 1.1,
    rotate: 10,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  },
};

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-main">
            Simple comme bonjour
          </p>
          <h2 className="font-display text-4xl text-brand-text md:text-5xl">
            <SlideUpByWord text="De la commande à ta page, en 3 étapes" />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => {
            const t = THEMES[i];
            return (
              <motion.div
                key={step.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover="hover"
                className="relative cursor-default overflow-hidden rounded-3xl p-8 shadow-sm"
                style={{ backgroundColor: t.bg }}
              >
                {/* Sakura bloom watermark — responds to parent hover via variant propagation */}
                <motion.div
                  custom={i}
                  variants={bloomVariants}
                  className="pointer-events-none absolute -right-10 -top-10 h-52 w-52"
                >
                  <SakuraBloom color={t.flower} />
                </motion.div>

                {/* Ghost step number */}
                <motion.span
                  className="pointer-events-none absolute bottom-6 right-7 font-display font-bold leading-none"
                  style={{ color: t.flower, opacity: 0.07, fontSize: '88px' }}
                  initial={{ opacity: 0, x: 18 }}
                  animate={isInView ? { opacity: 0.07, x: 0 } : {}}
                  transition={{ duration: 0.9, delay: i * 0.13 + 0.4 }}
                >
                  0{i + 1}
                </motion.span>

                {/* Flower-shaped icon badge — also propagates hover */}
                <motion.div
                  custom={i}
                  variants={badgeVariants}
                  className="relative mb-6 h-[72px] w-[72px]"
                >
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 72 72" aria-hidden>
                    <g transform="translate(36,36)">
                      {[0, 72, 144, 216, 288].map((a) => (
                        <ellipse key={a} cx="0" cy="-14" rx="10" ry="16" fill={t.badge} transform={`rotate(${a})`} />
                      ))}
                      <circle r="14" fill={t.badge} />
                    </g>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center" style={{ color: t.flower }}>
                    {step.icon}
                  </div>
                </motion.div>

                <div className="relative z-10">
                  <h3 className="mb-3 font-display text-2xl font-bold text-brand-text">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-muted">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
