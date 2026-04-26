'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
};

const STAGGER = 0.09;

export function SlideUpByWord({
  text,
  delay = 0.05,
  duration = 0.65,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: 'bottom', paddingBottom: '0.06em' }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '115%' }}
            animate={isInView ? { y: 0 } : { y: '115%' }}
            transition={{
              duration,
              delay: delay + i * STAGGER,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
