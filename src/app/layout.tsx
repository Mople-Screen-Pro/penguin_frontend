import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '../components/Providers'
import GoogleAnalytics from '../components/GoogleAnalytics'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Penguin - Screen Recording, Reimagined. Auto Cursor Zoom for Mac.',
    template: '%s | Penguin',
  },
  description:
    'Penguin auto-zooms to your cursor in real time — making every tutorial look professionally edited. Half the price, zero effort. Download free for macOS.',
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
  authors: [{ name: 'Penguin' }],
  applicationName: 'Penguin',
  metadataBase: new URL('https://www.penguin-editor.com'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ko: '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.penguin-editor.com',
    title: 'Penguin - Screen Recording, Reimagined.',
    description:
      'Auto-zooms to your cursor in real time. Pro-quality tutorials with zero editing. Free for macOS.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    siteName: 'Penguin',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penguin - Screen Recording, Reimagined.',
    description:
      'Auto-zooms to your cursor in real time. Pro-quality tutorials with zero editing. Free for macOS.',
    images: ['/og-image.png'],
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
    icon: '/logo.png',
  },
  manifest: '/manifest.json',
  other: {
    'apple-mobile-web-app-title': 'Penguin',
    'theme-color': '#0ea5e9',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://grkyrqhgfgthpghircbu.supabase.co" />
        <link rel="dns-prefetch" href="https://cdn.paddle.com" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <GoogleAnalytics />
      </body>
    </html>
  )
}
