import { NextRequest, NextResponse } from 'next/server'

interface ChatEvent {
  sessionId: string
  event: 'message_sent' | 'intent_detected' | 'contact_requested'
  data: any
  timestamp: string
}

// In production, use a database
let analytics: ChatEvent[] = []

export async function POST(req: NextRequest) {
  try {
    const event: ChatEvent = await req.json()
    analytics.push(event)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 })
  }
}

export async function GET() {
  const stats = {
    totalSessions: new Set(analytics.map(a => a.sessionId)).size,
    totalMessages: analytics.filter(a => a.event === 'message_sent').length,
    topIntents: analytics
      .filter(a => a.event === 'intent_detected')
      .reduce((acc, curr) => {
        acc[curr.data.intent] = (acc[curr.data.intent] || 0) + 1
        return acc
      }, {} as Record<string, number>),
    contactRequests: analytics.filter(a => a.event === 'contact_requested').length
  }
  
  return NextResponse.json(stats)
}
