'use client';

import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { staggerContainer, fadeUp } from '@/lib/animations';
import type { ShopifyProduct } from '@/lib/shopify/types';

type Props = {
  products: ShopifyProduct[];
};

export function ProductGrid({ products }: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((product, i) => (
        <motion.div key={product.id} variants={fadeUp}>
          <ProductCard product={product} priority={i < 4} />
        </motion.div>
      ))}
    </motion.div>
  );
}
