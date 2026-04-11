import type { Metadata } from 'next'
import Providers from '../components/Providers'
import GoogleAnalytics from '../components/GoogleAnalytics'
import FontLoader from '../components/FontLoader'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Clipa - Screen Recording, Reimagined. Auto Cursor Zoom for Mac.',
    template: '%s | Clipa',
  },
  description:
    'Clipa auto-zooms to your cursor in real time — making every tutorial look professionally edited. Half the price, zero effort. Download free for macOS.',
  keywords: [
    'screen recording',
    'screen capture',
    'cursor zoom',
    'auto zoom',
    'tutorial maker',
    'demo recording',
    'macOS app',
    '화면 녹화',
    '스크린 레코딩',
    '커서 줌',
    '자동 줌',
    '튜토리얼 제작',
    '맥 화면 녹화',
    '전문 화면 녹화 프로그램',
  ],
  authors: [{ name: 'Clipa' }],
  applicationName: 'Clipa',
  metadataBase: new URL('https://www.clipa.studio'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.clipa.studio',
    title: 'Clipa - Screen Recording, Reimagined.',
    description:
      'Auto-zooms to your cursor in real time. Pro-quality tutorials with zero editing. Free for macOS.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    siteName: 'Clipa',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clipa - Screen Recording, Reimagined.',
    description:
      'Auto-zooms to your cursor in real time. Pro-quality tutorials with zero editing. Free for macOS.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      'naver-site-verification': '352ab6296c06bf11f07258b2ef6d00d7cf5385f4',
    },
  },
  icons: {
    icon: '/images/app_icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'apple-mobile-web-app-title': 'Clipa',
    'theme-color': '#5e3a91',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://grkyrqhgfgthpghircbu.supabase.co" />
        <link rel="dns-prefetch" href="https://cdn.paddle.com" />
      </head>
      <body>
        <FontLoader />
        <Providers>{children}</Providers>
        <GoogleAnalytics />
      </body>
    </html>
  )
}
