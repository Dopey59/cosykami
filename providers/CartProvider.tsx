'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { shopifyFetch } from '@/lib/shopify/client';
import { CREATE_CART_MUTATION, ADD_TO_CART_MUTATION, REMOVE_FROM_CART_MUTATION } from '@/lib/shopify/mutations';
import type { CartLine } from '@/lib/shopify/types';

type CartContextType = {
  cartId: string | null;
  checkoutUrl: string | null;
  lines: CartLine[];
  totalQuantity: number;
  totalAmount: string;
  currencyCode: string;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  isLoading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState('0');
  const [currencyCode, setCurrencyCode] = useState('EUR');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      setIsLoading(true);
      try {
        if (!cartId) {
          const data = await shopifyFetch<{
            cartCreate: { cart: { id: string; checkoutUrl: string; totalQuantity: number; lines: { edges: { node: CartLine }[] }; cost: { totalAmount: { amount: string; currencyCode: string } } } };
          }>({
            query: CREATE_CART_MUTATION,
            variables: { lines: [{ merchandiseId: variantId, quantity }] },
            cache: 'no-store',
          });
          const cart = data.cartCreate.cart;
          setCartId(cart.id);
          setCheckoutUrl(cart.checkoutUrl);
          setLines(cart.lines.edges.map((e) => e.node));
          setTotalQuantity(cart.totalQuantity);
          setTotalAmount(cart.cost.totalAmount.amount);
          setCurrencyCode(cart.cost.totalAmount.currencyCode);
        } else {
          const data = await shopifyFetch<{
            cartLinesAdd: { cart: { id: string; totalQuantity: number; checkoutUrl: string; lines: { edges: { node: CartLine }[] }; cost: { totalAmount: { amount: string; currencyCode: string } } } };
          }>({
            query: ADD_TO_CART_MUTATION,
            variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
            cache: 'no-store',
          });
          const cart = data.cartLinesAdd.cart;
          setLines(cart.lines.edges.map((e) => e.node));
          setTotalQuantity(cart.totalQuantity);
          setTotalAmount(cart.cost.totalAmount.amount);
          setCurrencyCode(cart.cost.totalAmount.currencyCode);
        }
        setIsOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId],
  );

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        const data = await shopifyFetch<{
          cartLinesRemove: { cart: { id: string; totalQuantity: number; lines: { edges: { node: CartLine }[] }; cost: { totalAmount: { amount: string; currencyCode: string } } } };
        }>({
          query: REMOVE_FROM_CART_MUTATION,
          variables: { cartId, lineIds: [lineId] },
          cache: 'no-store',
        });
        const cart = data.cartLinesRemove.cart;
        setLines(cart.lines.edges.map((e) => e.node));
        setTotalQuantity(cart.totalQuantity);
        setTotalAmount(cart.cost.totalAmount.amount);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId],
  );

  return (
    <CartContext.Provider
      value={{
        cartId,
        checkoutUrl,
        lines,
        totalQuantity,
        totalAmount,
        currencyCode,
        addToCart,
        removeFromCart,
        isLoading,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
