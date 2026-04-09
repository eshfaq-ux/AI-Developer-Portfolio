import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ashfaq Nabi - Full Stack Developer & AI Engineer',
  description: 'Experienced Full Stack Developer with 2 years of expertise in MERN stack, AI automation, and SaaS development. 12+ projects delivered with 95% client satisfaction.',
  keywords: ['Full Stack Developer', 'MERN Stack', 'React Developer', 'Node.js', 'AI Automation', 'Ashfaq Nabi'],
  authors: [{ name: 'Ashfaq Nabi' }],
  openGraph: {
    title: 'Ashfaq Nabi - Full Stack Developer',
    description: 'Building AI-Powered SaaS Solutions. 2 years experience, 12+ projects delivered.',
    type: 'website',
    images: ['/1681207343598.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashfaq Nabi - Full Stack Developer',
    images: ['/1681207343598.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="preload" href="/hero-3d-fallback.jpg" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-white text-gray-900 antialiased">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('load', () => {
                  setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    if (navigation) {
                      console.log('Load Time:', navigation.loadEventEnd - navigation.loadEventStart + 'ms');
                    }
                    new PerformanceObserver((list) => {
                      const entries = list.getEntries();
                      const lastEntry = entries[entries.length - 1];
                      console.log('LCP:', lastEntry.startTime + 'ms');
                    }).observe({ entryTypes: ['largest-contentful-paint'] });
                  }, 1000);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
