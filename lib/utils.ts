import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// format-price.ts (à garder tel quel)
/**
 * Format un prix Shopify en JS standard
 * Accepte : string | number | { amount: string, currencyCode: string }
 */
export function formatPrice(
  priceInput: string | number | { amount: string; currencyCode: string },
  currencyCode?: string
) {
  let amount = '0';
  let code = currencyCode || 'EUR';

  if (typeof priceInput === 'object' && priceInput !== null) {
    amount = priceInput.amount;
    code = priceInput.currencyCode;
  } else {
    amount = String(priceInput);
  }

  const price = parseFloat(amount);

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
