import type { Metadata } from 'next';
import { FaqContent } from './FaqContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Toutes les réponses à tes questions sur nos stickers, la livraison, les retours et le paiement.',
};

export default function FaqPage() {
  return <FaqContent />;
}
