import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/providers/CartProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
    <html lang="fr" className={`${plusJakartaSans.variable} ${dmSans.variable} antialiased`}>
      <body className="font-sans antialiased">
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
              background: '#FFF9F0',
              color: '#4A3F4A',
              border: '1px solid #FFD6E0',
              borderRadius: '16px',
              fontFamily: 'var(--font-sans)',
            },
            success: {
              iconTheme: { primary: '#FF85A1', secondary: '#FFF9F0' },
            },
          }}
        />
      </body>
    </html>
  );
}
