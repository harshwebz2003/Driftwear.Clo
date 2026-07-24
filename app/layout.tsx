import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Bodoni_Moda, Cinzel_Decorative, Cormorant_Garamond, Libre_Bodoni, Playfair_Display } from 'next/font/google';
import './globals.css';

const romantic = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-romantic',
  display: 'swap'
});

const calista = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-calista',
  display: 'swap'
});

const brand = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-brand',
  display: 'swap'
});

const lucky = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-lucky',
  display: 'swap'
});

const grande = Libre_Bodoni({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-grande',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://driftware.netlify.app'),
  title: {
    default: 'Driftwear Clo. | Custom T-Shirts & DTF Printing in Galle',
    template: '%s | Driftwear Clo.'
  },
  description:
    'Premium Sri Lankan custom T-shirt and DTF clothing printing brand in Galle. Order custom apparel, unique designs, bulk tees, and premium DTF prints.',
  keywords: [
    'Driftwear Clo',
    'custom T-shirt printing Galle',
    'DTF printing Sri Lanka',
    'custom clothing Sri Lanka',
    'streetwear Sri Lanka',
    'bulk T-shirt printing'
  ],
  openGraph: {
    title: 'Driftwear Clo. | Wear Your Vibe',
    description: 'Custom T-shirts, unique designs, and premium DTF printing made for your style.',
    url: 'https://driftware.netlify.app',
    siteName: 'Driftwear Clo.',
    images: [{ url: '/assets/logo.png', width: 1200, height: 1200, alt: 'Driftwear Clo. logo' }],
    locale: 'en_LK',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Driftwear Clo. | Wear Your Vibe',
    description: 'Premium custom T-shirts and DTF printing from Galle, Sri Lanka.',
    images: ['/assets/logo.png']
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${romantic.variable} ${calista.variable} ${brand.variable} ${lucky.variable} ${grande.variable}`}>{children}</body>
    </html>
  );
}
