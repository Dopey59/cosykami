'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ShopifyImage } from '@/lib/shopify/types';

type Props = {
  images: ShopifyImage[];
  title: string;
};

export function ProductImageGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="space-y-2">
      {/* Image principale */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-brand-pink/40 bg-brand-pink/10">
        <Image
          src={images[activeIndex]!.url}
          alt={images[activeIndex]!.altText ?? `${title} — vue ${activeIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails scroll snap */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActiveIndex(i)}
              className={`relative shrink-0 snap-start overflow-hidden rounded-xl border-2 transition-colors ${
                i === activeIndex
                  ? 'border-accent-main'
                  : 'border-transparent hover:border-brand-pink'
              }`}
              style={{ width: 64, height: 64 }}
              aria-label={`Image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} — miniature ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
