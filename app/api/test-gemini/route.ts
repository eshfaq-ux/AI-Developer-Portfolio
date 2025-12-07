import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'API key not found',
        hasKey: false 
      })
    }

    console.log('Testing Gemini API in production...')
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "What is the capital of Indonesia? Answer briefly."
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 100
        }
      })
    })

    const responseText = await response.text()
    
    if (response.ok) {
      const data = JSON.parse(responseText)
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
      
      return NextResponse.json({
        success: true,
        status: response.status,
        response: aiResponse,
        hasKey: true,
        keyLength: apiKey.length
      })
    } else {
      return NextResponse.json({
        success: false,
        status: response.status,
        error: responseText,
        hasKey: true,
        keyLength: apiKey.length
      })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      hasKey: !!process.env.GOOGLE_AI_API_KEY
    })
  }
}
