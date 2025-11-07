import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Insane Todo',
  description: 'A neon, animated, mobile-first Todo app',
  icons: [{ url: '/icon.svg', rel: 'icon' }],
  manifest: '/manifest.webmanifest',
  themeColor: '#2f6cff',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="min-h-dvh antialiased selection:bg-brand-500/30 selection:text-white">
        <div className="container-safe mx-auto max-w-md px-4 py-6 sm:max-w-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
