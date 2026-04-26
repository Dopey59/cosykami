'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
  text: string;
  colors?: string[];
  delay?: number;
  duration?: number;
  className?: string;
  finalColor?: string;
};

const STAGGER = 0.038;

export function DiaTextReveal({
  text,
  delay = 0.1,
  duration = 2.2,
  className = '',
  finalColor = '#1A1A1A',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {text.split('').map((char, i) => {
        const color = [i % length];
        const charDelay = delay + i * STAGGER;

        if (char === ' ') {
          return <span key={i}>&nbsp;</span>;
        }

        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: '0.45em' }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: charDelay, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-block"
              initial={{ color }}
              animate={isInView ? { color: finalColor } : { color }}
              transition={{ duration, delay: charDelay + 0.15, ease: 'easeOut' }}
            >
              {char}
            </motion.span>
          </motion.span>
        );
      })}
    </span>
  );
}
