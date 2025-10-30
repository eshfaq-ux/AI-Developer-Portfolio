import { NextRequest, NextResponse } from 'next/server'
import { chatAnalytics } from '@/utils/chatAnalytics'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (sessionId) {
      // Get specific session insights
      const sessionInsights = chatAnalytics.getSessionInsights(sessionId)
      return NextResponse.json({
        session: sessionInsights,
        timestamp: new Date().toISOString()
      })
    }

    // Get overall analytics
    const analytics = chatAnalytics.exportAnalytics()
    return NextResponse.json({
      analytics,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

// Optional: POST endpoint to manually track events
export async function POST(request: NextRequest) {
  try {
    const { event, sessionId, data } = await request.json()
    
    // Track custom events (e.g., user clicked contact link, downloaded resume)
    console.log('Custom event tracked:', { event, sessionId, data })
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}
