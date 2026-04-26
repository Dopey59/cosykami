'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/providers/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { fadeIn, slideInBottom } from '@/lib/animations';

const NAV_LINKS = [
  { href: '/collections/stickers-cosy', label: 'Stickers cosy' },
  { href: '/collections/journaling', label: 'Journaling' },
  { href: '/collections/scrapbooking', label: 'Scrapbooking' },
  { href: '/collections/nouveautes', label: 'Nouveautés' },
];

export function Header() {
  const { totalQuantity, isOpen, openCart, closeCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-shadow duration-300 ${
          scrolled ? 'bg-brand-cream/95 backdrop-blur-sm shadow-sm' : 'bg-brand-cream'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden"
            aria-label="Ouvrir le menu"
          >
            <svg className="h-5 w-5 text-brand-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <span className="font-display text-xl font-semibold tracking-tight text-brand-text">
              Cosykami
            </span>
          </Link>

          {/* Nav — desktop */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-muted transition-colors hover:text-accent-main"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Panier */}
          <button
            onClick={openCart}
            className="relative flex min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label={`Panier (${totalQuantity} articles)`}
          >
            <svg className="h-5 w-5 text-brand-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-main text-[10px] font-bold text-white">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Menu mobile full-screen */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-50 bg-black/30"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              variants={slideInBottom}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-brand-cream px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-brand-text">Cosykami</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center"
                  aria-label="Fermer le menu"
                >
                  <svg className="h-5 w-5 text-brand-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[52px] items-center rounded-2xl px-4 text-base font-medium text-brand-text transition-colors hover:bg-brand-pink/30"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isOpen} onClose={closeCart} />
    </>
  );
}
