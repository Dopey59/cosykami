'use client';

import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from 'framer-motion';

function wrapNum(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

type RowProps = {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
};

export function ScrollVelocityRow({
  children,
  baseVelocity = 5,
  direction = 1,
  className = '',
}: RowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-3000, 0, 3000], [4, 1, 4], {
    clamp: true,
  });

  const x = useTransform(baseX, (v) => `${wrapNum(-50, 0, v)}%`);
  const directionFactor = useRef<number>(direction);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -direction;
    else if (vf > 0) directionFactor.current = direction;
    moveBy += directionFactor.current * Math.abs(moveBy) * (vf - 1);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden">
      <motion.div
        className={`flex shrink-0 whitespace-nowrap ${className}`}
        style={{ x }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-flex items-center">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollVelocityContainer({ children, className = '' }: ContainerProps) {
  return <div className={className}>{children}</div>;
}
