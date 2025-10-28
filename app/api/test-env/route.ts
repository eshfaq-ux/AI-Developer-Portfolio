import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  
  return NextResponse.json({
    hasApiKey: !!apiKey,
    keyLength: apiKey ? apiKey.length : 0,
    keyStart: apiKey ? apiKey.substring(0, 10) + '...' : 'No key'
  })
}
