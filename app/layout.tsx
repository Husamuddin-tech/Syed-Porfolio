import type { Metadata } from 'next';
import { Geist, Geist_Mono, Indie_Flower } from 'next/font/google';
import './globals.css';
import { Dock } from '@/components/Dock';
import { ThemeProvider } from '@/components/ThemeProvider';

// 🎨 Font setup
const indieFlower = Indie_Flower({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-indie-flower',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// 🧠 SEO + Meta setup
export const metadata: Metadata = {
  metadataBase: new URL('https://syedhusamuddin.vercel.app'),
  title: 'Syed Husamuddin | Portfolio',
  description:
    'Explore the portfolio of Syed Husamuddin — a passionate AI & Full-Stack Developer crafting intelligent and impactful digital experiences.',
  openGraph: {
    title: 'Syed Husamuddin | Portfolio',
    description:
      'Explore the portfolio of Syed Husamuddin — a passionate AI & Full-Stack Developer crafting intelligent and impactful digital experiences.',
    siteName: 'Syed Husamuddin Portfolio',
    images: ['/assets/fullLogo.PNG'],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/assets/fullLogo.PNG',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F3E9DC' },
    { media: '(prefers-color-scheme: dark)', color: '#5B4635' },
  ]
}

// ⚙️ Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${indieFlower.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-(--bg-color) text-(--text-color) transition-colors duration-500`}
      >
        <ThemeProvider>
          <Dock />
          <main className="relative min-h-screen flex flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
