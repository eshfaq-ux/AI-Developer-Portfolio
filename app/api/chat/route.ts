import { NextRequest, NextResponse } from 'next/server'
import portfolioData from '@/data/portfolio.json'

// Fallback responses for when API fails
const fallbackResponses = {
  skills: "Ashfaq is a Full Stack Developer with expertise in React, Node.js, TypeScript, MongoDB, PostgreSQL, AI/ML technologies including OpenAI GPT, LangChain, and automation tools like n8n and Zapier.",
  projects: "Key projects include LinkVault (URL shortening service), Intelligent Workflow Automation System (35% cost reduction for 50+ companies), and AI Chatbot Framework with 95% accuracy.",
  contact: "You can reach Ashfaq at:\n📧 Email: eshfaqnabi11@gmail.com\n📱 Phone: +916006331941\n💼 LinkedIn: https://www.linkedin.com/in/ashfaq-nabi-6882401b7/\n🐙 GitHub: https://github.com/eshfaq-ux",
  experience: "Ashfaq has 2+ years of freelance full-stack development experience, MCA from BGSB University (CGPA 8.50), and BCA from Govt Degree College Ganderbal (CGPA 7.20).",
  availability: "Ashfaq is currently available for new projects and opportunities. Contact him directly for immediate response!"
}

function getSmartResponse(message: string): string {
  const msg = message.toLowerCase()
  
  if (msg.includes('skill') || msg.includes('tech') || msg.includes('programming')) {
    return fallbackResponses.skills
  }
  if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
    return fallbackResponses.projects
  }
  if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('reach')) {
    return fallbackResponses.contact
  }
  if (msg.includes('experience') || msg.includes('education') || msg.includes('background')) {
    return fallbackResponses.experience
  }
  if (msg.includes('available') || msg.includes('hire') || msg.includes('opportunity')) {
    return fallbackResponses.availability
  }
  
  return `Hi! I'm Ashfaq's AI assistant. I can help you learn about his:\n\n• 💻 Technical Skills & Expertise\n• 🚀 Featured Projects & Demos\n• 💼 Professional Experience\n• 📧 Contact Information\n• 📅 Availability for Projects\n\nWhat would you like to know?`
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Try Google AI API first
    const apiKey = process.env.GOOGLE_AI_API_KEY
    
    if (apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are Ashfaq Nabi's AI assistant. Answer this question about him: ${message}\n\nContext: ${JSON.stringify(portfolioData)}`
              }]
            }]
          })
        })

        if (response.ok) {
          const data = await response.json()
          const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
          
          if (aiResponse) {
            return NextResponse.json({ response: aiResponse })
          }
        }
      } catch (apiError) {
        console.log('API failed, using fallback')
      }
    }

    // Use smart fallback response
    const fallbackResponse = getSmartResponse(message)
    return NextResponse.json({ response: fallbackResponse })

  } catch (error) {
    return NextResponse.json({ 
      response: fallbackResponses.contact 
    })
  }
}
