import type { Metadata } from 'next';
import { DynaPuff, DM_Sans } from 'next/font/google';

import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/providers/CartProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import './globals.css';
import { cn } from "@/lib/utils";

const dynaPuff = DynaPuff({
  subsets: ['latin'],
  variable: '--font-dynapuff',
  weight: '700',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'Cosykami — Stickers & Scrapbook Cosy Kawaii',
    template: '%s | Cosykami',
  },
  description:
    'Planches de stickers cosy kawaii pour ton scrapbooking et journaling. Stickers pastel japonais, esthétique coloriage cosy. Livraison en France.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Cosykami',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cn(dynaPuff.variable, dmSans.variable)}>
      <body className="antialiased">
        <ScrollProgress />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#FFF8F4',
              color: '#1A1A1A',
              border: '1px solid #FF85A1',
              borderRadius: '16px',
              fontFamily: 'var(--font-sans)',
            },
            success: {
              iconTheme: { primary: '#FF85A1', secondary: '#FFF0E6' },
            },
          }}
        />
      </body>
    </html>
  );
}
