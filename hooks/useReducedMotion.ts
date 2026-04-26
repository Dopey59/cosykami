'use client';

import { useReducedMotion } from 'framer-motion';

export function useMotionSafe() {
  const shouldReduceMotion = useReducedMotion();
  return {
    shouldReduceMotion: Boolean(shouldReduceMotion),
    transition: shouldReduceMotion ? { duration: 0 } : undefined,
  };
}
