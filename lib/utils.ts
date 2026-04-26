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
  let code = currencyCode || 'JPY'; // défaut Japon

  if (typeof priceInput === 'object' && priceInput !== null) {
    amount = priceInput.amount;
    code = priceInput.currencyCode;
  } else {
    amount = String(priceInput);
  }

  const price = parseFloat(amount);

  // Utiliser Intl.NumberFormat en forçant Japon pour avoir des formats propres
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
