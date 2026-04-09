# Analytics Setup Guide

## Recommended: Vercel Analytics (Free & Easy)

### Setup Steps:
1. Go to your Vercel project dashboard
2. Click on "Analytics" tab
3. Click "Enable Analytics"
4. Install package:
```bash
npm install @vercel/analytics
```

5. Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Alternative: Google Analytics

### Setup:
1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

4. Create `lib/gtag.ts`:
```typescript
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  window.gtag('config', GA_ID, {
    page_path: url,
  })
}
```

5. Add to `app/layout.tsx`:
```typescript
<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `}
</Script>
```

## What to Track:
- Page views
- Contact form submissions
- Resume downloads
- Project link clicks
- Time on site
- Bounce rate

## Privacy:
- Add privacy policy page
- Cookie consent banner (if using GA)
- GDPR compliance for EU visitors
