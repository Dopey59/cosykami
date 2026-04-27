'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SlideUpByWord } from '@/registry/magicui/slide-up-by-word';
import { SparklesText } from "@/components/ui/sparkles-text"

const FLOATING_PETALS = [
  { left: '3%',  top: '22%', size: 20, rot: 30,  color: '#FFB899', dur: 4.1, delay: 0 },
  { left: '90%', top: '18%', size: 15, rot: -45, color: '#C4A8E0', dur: 4.4, delay: 0.5 },
  { left: '10%', top: '72%', size: 18, rot: 60,  color: '#FF85A1', dur: 3.7, delay: 1.0 },
  { left: '94%', top: '65%', size: 13, rot: -22, color: '#86C5A8', dur: 4.7, delay: 0.3 },
  { left: '50%', top: '88%', size: 16, rot: 18,  color: '#FFB899', dur: 4.0, delay: 0.8 },
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

function SakuraMini({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="h-full w-full">
      <g transform="translate(50,50)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-19" rx="11" ry="22" fill={color} transform={`rotate(${a})`} />
        ))}
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={`n${a}`} cx="0" cy="-24" rx="4" ry="6" fill="white" opacity="0.4" transform={`rotate(${a})`} />
        ))}
        <circle r="9" fill="white" />
        <circle r="3.5" fill={color} />
      </g>
    </svg>
  );
}

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-peach via-white to-brand-lilac/60" />

      {/* Floating petals */}
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

      {/* Large decorative blooms — section corners, desktop only */}
      <motion.div
        className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 xl:block"
        style={{ width: 200, height: 200, opacity: 0.18 }}
        initial={{ rotate: -30, scale: 0.7 }}
        animate={isInView ? { rotate: 0, scale: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <SakuraBloom color="#FF85A1" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 xl:block"
        style={{ width: 200, height: 200, opacity: 0.18 }}
        initial={{ rotate: 30, scale: 0.7 }}
        animate={isInView ? { rotate: 0, scale: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <SakuraBloom color="#C4A8E0" />
      </motion.div>

      {/* CTA card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-brand-pink/25 bg-white/90 shadow-xl shadow-brand-pink/10 backdrop-blur-sm"
      >
        {/* Inner bloom watermarks */}
        <div
          className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 opacity-[0.09]"
          aria-hidden
        >
          <SakuraBloom color="#C4A8E0" />
        </div>
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 opacity-[0.09]"
          aria-hidden
        >
          <SakuraBloom color="#FF85A1" />
        </div>

        <div className="relative z-10 p-10 text-center md:p-14">
          {/* Sakura icon */}
          <motion.div
            className="mx-auto mb-6 h-14 w-14"
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.25 }}
          >
            <SakuraMini color="#FF85A1" />
          </motion.div>

          <motion.p
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-main"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Commence aujourd&apos;hui
          </motion.p>

          <h2 className="font-display text-3xl font-bold leading-snug text-brand-text md:text-4xl">
            <SparklesText>D'autres produits arrivent bientôt !</SparklesText>
          </h2>

          <motion.p
            className="mt-4 text-sm text-brand-muted md:text-base"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Livraison offerte dès 25€ · Retours sous 14 jours · Expédition 48h
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-block"
            >
              <Link
                href="/collections/tous-les-produits"
                className="inline-flex min-h-[52px] items-center rounded-full bg-accent-main px-10 py-3 font-semibold text-white shadow-[0_4px_28px_rgba(255,133,161,0.45)] transition-colors hover:bg-accent-hover"
              >
                Découvrir la collection
              </Link>
            </motion.div>
          </motion.div>

          {/* Reassurance dots */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-5 text-[11px] text-brand-muted/70"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            {['🇫🇷 Expédié depuis la France', '🌸 Emballage soigné', '💌 Service client réactif'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
