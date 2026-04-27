'use client';

import { useEffect } from 'react';

export function ImageProtection() {
  useEffect(() => {
    const blockContextOnImages = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.tagName === 'IMG') {
        e.preventDefault();
      }
    };
    const blockDragOnImages = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.tagName === 'IMG') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', blockContextOnImages);
    document.addEventListener('dragstart', blockDragOnImages);
    return () => {
      document.removeEventListener('contextmenu', blockContextOnImages);
      document.removeEventListener('dragstart', blockDragOnImages);
    };
  }, []);

  return null;
}
