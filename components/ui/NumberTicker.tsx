'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

type Props = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function NumberTicker({ value, duration = 1800, prefix = '', suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString('fr-FR')}{suffix}
    </span>
  );
}
