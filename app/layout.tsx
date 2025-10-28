import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ashfaq - Full Stack Developer & Prompt Engineer',
  description: 'Experienced Full Stack Developer specializing in MERN stack development and AI automation. Expert in Prompt Engineering, SaaS Development, and Workflow Automation.',
  keywords: ['Full Stack Developer', 'Prompt Engineer', 'MERN Stack', 'AI Automation', 'SaaS Development', 'Workflow Automation', 'React', 'Node.js', 'OpenAI'],
  authors: [{ name: 'Ashfaq' }],
  openGraph: {
    title: 'Ashfaq - Full Stack Developer & Prompt Engineer',
    description: 'Building AI-Powered SaaS Solutions & Workflow Automation',
    type: 'website',
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
              // Performance monitoring
              if (typeof window !== 'undefined') {
                window.addEventListener('load', () => {
                  // Measure Core Web Vitals
                  setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    if (navigation) {
                      console.log('Load Time:', navigation.loadEventEnd - navigation.loadEventStart + 'ms');
                    }
                    
                    // Measure LCP
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
