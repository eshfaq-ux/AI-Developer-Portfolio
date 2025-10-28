import { NextRequest, NextResponse } from 'next/server'
import portfolioData from '@/data/portfolio.json'

const SYSTEM_PROMPT = `You are Ashfaq Nabi's highly intelligent AI assistant with comprehensive knowledge of his complete professional profile.

COMPLETE PROFESSIONAL PROFILE:
Name: ${portfolioData.personal.name}
Title: ${portfolioData.personal.title}
Tagline: ${portfolioData.personal.tagline}
Location: ${portfolioData.personal.location}
Email: ${portfolioData.personal.email}
Phone: +916006331941
LinkedIn: ${portfolioData.personal.linkedin}
GitHub: ${portfolioData.personal.github}
Telegram: ${portfolioData.personal.telegram}

PROFESSIONAL SUMMARY:
${portfolioData.about.description}

COMPREHENSIVE TECHNICAL SKILLS:
Programming Languages & Frameworks: ${portfolioData.skills.programming.join(', ')}
AI/ML Technologies: ${portfolioData.skills.ai_ml.join(', ')}
Development Tools & Platforms: ${portfolioData.skills.tools.join(', ')}
Automation & Integration: ${portfolioData.skills.automation.join(', ')}
Additional Expertise: ${portfolioData.about.keywords.join(', ')}

COMPLETE PROJECT PORTFOLIO:
${portfolioData.projects.map(p => 
  `• ${p.title}: ${p.description}
    Technologies: ${p.tech.join(', ')}
    Business Impact: ${p.impact}
    Repository: ${p.github}
    ${p.demo ? `Live Demo: ${p.demo}` : ''}
    Status: ${p.featured ? 'Featured Project' : 'Additional Project'}`
).join('\n\n')}

DETAILED EXPERIENCE & EDUCATION:
${portfolioData.experience.map(e => 
  `• ${e.title} at ${e.company} (${e.duration}) - ${e.location}
    Type: ${e.type}
    Description: ${e.description}
    Key Achievements: ${e.achievements ? e.achievements.join(' | ') : 'N/A'}
    Technologies: ${e.technologies ? e.technologies.join(', ') : 'Various technologies'}`
).join('\n\n')}

CERTIFICATIONS & CREDENTIALS:
${portfolioData.certifications.map(cert => 
  `• ${cert.title} - ${cert.issuer} (${cert.date}): ${cert.description}`
).join('\n')}

CAREER HIGHLIGHTS & METRICS:
• Academic Excellence: MCA (8.50 CGPA), BCA (7.20 CGPA)
• Business Impact: 35% cost reduction for 50+ companies
• Technical Achievement: 95% uptime scalable platform
• AI Expertise: 95% accuracy in chatbot deployments
• Project Leadership: Multiple full-stack applications delivered
• Professional Growth: Freelance developer since January 2023

ADVANCED CAPABILITIES:
- Provide detailed technical explanations with proper formatting
- Match skills to specific job requirements with structured comparisons
- Explain project architectures with clear section breaks
- Discuss best practices with organized bullet points
- Handle complex technical discussions with appropriate visual hierarchy
- Provide specific metrics in highlighted format
- Suggest relevant technologies with clear categorization
- Format code examples and technical details properly

RESPONSE GUIDELINES:
- Be conversational yet highly knowledgeable
- Use structured formatting for better readability
- Include relevant emojis and visual elements
- Provide specific examples with proper organization
- Include relevant metrics in highlighted format
- Adapt technical depth based on user expertise
- Always offer actionable next steps with clear formatting
- Maintain professional tone with engaging visual structure
- Use Ashfaq's actual project examples with proper formatting
- Provide contact information in consistent, professional format`

function analyzeIntent(message: string) {
  const msg = message.toLowerCase()
  
  // Check AI/ML first (more specific)
  if (msg.match(/(ai|ml|machine learning|artificial intelligence|llm|gpt|neural|deep learning|nlp|prompt engineering|openai)/)) return 'ai_expertise'
  
  // Enhanced intent detection with more patterns
  if (msg.match(/(available|availability|start|timeline|when|free|busy|schedule|hire|hiring)/)) return 'availability'
  if (msg.match(/(technical implementation|implementation|architecture|how.*built|how.*work|technical details|code structure|system design|database|api design)/)) return 'technical_architecture'
  if (msg.match(/(show|specific|examples|using|with|demonstrate|portfolio|demo|github|built|created|live|repository|project)/)) return 'projects'
  if (msg.match(/(skill|tech|programming|development|coding|language|expertise|capabilities|proficient|knowledge)/)) return 'skills'
  if (msg.match(/(experience|job|career|background|history|work|professional|employment)/)) return 'experience'
  if (msg.match(/(contact|email|meeting|call|connect|reach|get in touch)/)) return 'contact'
  if (msg.match(/(recruiter|position|role|opportunity|interview|candidate|resume)/)) return 'recruitment'
  if (msg.match(/(hello|hi|hey|greet|good morning|good afternoon)/)) return 'greeting'
  if (msg.match(/(full.?stack|frontend|backend|database|api|web development|software)/)) return 'technical_architecture'
  if (msg.match(/(salary|rate|cost|price|budget|compensation|payment)/)) return 'pricing'
  if (msg.match(/(education|degree|university|college|certification|learning)/)) return 'education'
  if (msg.match(/(team|collaboration|leadership|management|agile|scrum)/)) return 'teamwork'
  
  return 'general'
}

function getSmartContext(intent: string, message: string) {
  const contexts = {
    skills: `Provide comprehensive details about technical skills with years of experience, proficiency levels, and real project applications. Include specific technologies and frameworks.`,
    
    projects: `Showcase detailed project information including technical stack, architecture decisions, challenges solved, and measurable impact. Provide GitHub links and live demos when available.`,
    
    experience: `Discuss professional experience with specific achievements, responsibilities, and career progression. Include education background and certifications.`,
    
    contact: `Provide complete contact information including phone number for calls and meetings. Emphasize availability for scheduling calls and preferred communication methods.`,
    
    recruitment: `Act as a professional recruiter interface. Highlight key qualifications, provide portfolio links, discuss availability, and facilitate next steps in the hiring process.`,
    
    ai_expertise: `Deep dive into AI/ML capabilities with specific technologies, project implementations, and practical applications. Discuss experience with different AI frameworks and use cases.`,
    
    technical_architecture: `Explain system design principles, architecture patterns, database design, API development, and scalability considerations with real examples from Ashfaq's projects.`,
    
    availability: `Provide current availability status, preferred project types, timeline flexibility, and engagement preferences. Include contact information for immediate opportunities.`,
    
    pricing: `Redirect pricing discussions to direct contact while highlighting value proposition and project-based vs hourly considerations.`,
    
    education: `Discuss educational background, continuous learning approach, certifications, and how academic knowledge applies to practical development work.`,
    
    teamwork: `Explain collaboration experience, leadership capabilities, agile methodologies, and team communication skills with specific examples.`
  }
  
  return contexts[intent as keyof typeof contexts] || 'Provide helpful, comprehensive information about Ashfaq\'s professional capabilities and experience.'
}

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15)
}

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId = generateSessionId() } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content || ''
    
    // Advanced intent analysis
    const intent = analyzeIntent(lastMessage)
    const smartContext = getSmartContext(intent, lastMessage)
    
    // Build enhanced conversation history
    const recentMessages = messages.slice(-8).map((msg: any) => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n')
    
    const enhancedPrompt = `${SYSTEM_PROMPT}

CONTEXT: ${smartContext}

RECENT CONVERSATION:
${recentMessages}

USER QUESTION INTENT: ${intent}

Please provide a clean, well-structured response with:
- Simple, clear formatting
- Minimal use of emojis and markdown
- Direct, actionable information
- Concise paragraphs
- Focus on the user's specific question

Keep the response professional, helpful, and easy to read.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: enhancedPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 400,
          topP: 0.8,
          topK: 30
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH"
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Google AI API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Google AI Response:', JSON.stringify(data, null, 2))
    
    let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    // Handle blocked or filtered responses
    if (!aiResponse && data.candidates?.[0]?.finishReason === 'SAFETY') {
      aiResponse = generateFallbackResponse(intent)
    }
    
    // Handle other cases where response is missing
    if (!aiResponse) {
      aiResponse = generateFallbackResponse(intent)
    }
    
    // Log analytics (fire and forget)
    fetch('/api/chat-analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        event: 'intent_detected',
        data: { intent, messageLength: lastMessage.length },
        timestamp: new Date().toISOString()
      })
    }).catch(() => {}) // Silent fail for analytics
    
    return NextResponse.json({ 
      message: aiResponse.trim(),
      intent,
      sessionId,
      timestamp: new Date().toISOString(),
      suggestions: getSuggestions(intent)
    })
    
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ 
      message: `Hi! I'm Ashfaq's AI assistant. I can discuss his ${portfolioData.skills.programming.slice(0,2).join(' and ')} expertise, showcase projects like ${portfolioData.projects[0].title}, or connect you at ${portfolioData.personal.email}. What interests you?`,
      intent: 'fallback',
      sessionId: generateSessionId()
    })
  }
}

function generateFallbackResponse(intent: string): string {
  const responses = {
    skills: `Ashfaq brings strong technical expertise across multiple domains:

**Full-Stack Development:** ${portfolioData.skills.programming.slice(0,6).join(', ')}
**AI & Machine Learning:** ${portfolioData.skills.ai_ml.join(', ')}
**Cloud & DevOps:** ${portfolioData.skills.tools.join(', ')}
**Automation:** ${portfolioData.skills.automation.join(', ')}

He's particularly skilled at integrating AI capabilities into web applications and has been developing professionally since early 2023. His expertise spans both frontend user experiences and backend system architecture.`,
    
    projects: `Here are Ashfaq's key projects showcasing his technical skills:

**${portfolioData.projects[0].title}**
${portfolioData.projects[0].description}
Technologies: ${portfolioData.projects[0].tech.join(', ')}
Impact: ${portfolioData.projects[0].impact}
Repository: ${portfolioData.projects[0].github}

**${portfolioData.projects[1]?.title || 'AI-Powered Portfolio'}**
${portfolioData.projects[1]?.description || 'Modern portfolio with integrated AI chatbot and automated resume generation'}
Technologies: ${portfolioData.projects[1]?.tech.join(', ') || 'Next.js, React, Tailwind CSS, Google AI'}

Each project demonstrates his ability to build scalable, production-ready applications with modern technologies.`,
    
    experience: `Ashfaq's professional journey includes:

**Current Role:** ${portfolioData.experience[0].title} at ${portfolioData.experience[0].company}
Duration: Since January 2023
Focus: ${portfolioData.experience[0].description.split('.')[0]}

**Education:** ${portfolioData.experience.find(e => e.type === 'Education')?.title || 'Computer Science degree'}
Institution: ${portfolioData.experience.find(e => e.type === 'Education')?.company || 'University'}
Performance: Strong academic record with consistent high performance

His experience combines hands-on development work with continuous learning in emerging technologies.`,
    
    contact: `Ready to connect with Ashfaq? Here are the best ways to reach him:

**Email:** ${portfolioData.personal.email} (Primary contact for professional inquiries)
**Phone:** +916006331941 (Available for calls and meetings - preferred for urgent matters)
**LinkedIn:** ${portfolioData.personal.linkedin} (Professional networking and updates)
**GitHub:** ${portfolioData.personal.github} (Code repositories and contributions)
**Telegram:** ${portfolioData.personal.telegram} (Quick messages and updates)

For scheduling calls or meetings, feel free to call directly at +916006331941 or send an email with your preferred time slots. He typically responds within 24 hours and is flexible with meeting schedules across different time zones.`,
    
    recruitment: `Ashfaq is an accomplished ${portfolioData.personal.title} with a proven track record in modern web development and AI integration. 

**Key Strengths:**
- Full-stack development with ${portfolioData.skills.programming.slice(0,3).join(', ')}
- AI/ML integration using ${portfolioData.skills.ai_ml.slice(0,2).join(' and ')}
- Cloud deployment and DevOps practices
- Strong problem-solving and project delivery skills

**Notable Achievement:** ${portfolioData.projects[0].title} - ${portfolioData.projects[0].impact}

He's currently available for new opportunities. Contact: ${portfolioData.personal.email}`,
    
    ai_expertise: `Ashfaq has extensive experience in AI and machine learning:

**Core AI/ML Skills:**
${portfolioData.skills.ai_ml.join(', ')}

**AI Project Experience:**
• **Intelligent Workflow Automation System** - AI-powered platform serving 50+ companies, reducing operational costs by 35%
• **AI Chatbot Framework** - Advanced conversational AI with natural language processing
• **This Portfolio's AI Assistant** - Real-time AI chatbot with intent recognition and contextual responses

**Technical Implementation:**
• **Prompt Engineering** - Designing effective prompts for GPT models and LLMs
• **API Integration** - OpenAI, Hugging Face, and custom AI model implementations  
• **Natural Language Processing** - Text analysis, sentiment analysis, and conversation management
• **Machine Learning Workflows** - Data processing, model training, and deployment pipelines

**Real-World Applications:**
• Business process automation using AI
• Conversational interfaces and chatbots
• Intelligent data analysis and insights
• AI-powered decision making systems

Ashfaq combines practical AI implementation with business value creation, focusing on solutions that deliver measurable results.`,

    technical_architecture: `Here's how Ashfaq approaches technical implementation:

**LinkVault Architecture:**
- **Frontend:** React with Tailwind CSS for responsive UI, Framer Motion for animations
- **Backend:** Node.js with Express.js, RESTful API design
- **Database:** PostgreSQL with optimized queries and indexing
- **Authentication:** JWT-based secure authentication system
- **State Management:** Zustand for efficient client-side state
- **Deployment:** Vercel for seamless CI/CD and global CDN

**AI Integration Approach:**
- **API Integration:** OpenAI GPT models via REST APIs
- **Prompt Engineering:** Custom prompt templates for consistent responses
- **Error Handling:** Robust fallback systems and rate limiting
- **Performance:** Caching strategies and optimized API calls

**Development Practices:**
- Clean, modular code architecture
- Comprehensive error handling and logging
- Responsive design with mobile-first approach
- Security best practices including input validation and sanitization

His implementation philosophy focuses on scalability, maintainability, and user experience.`,

    availability: `Yes! Ashfaq is actively seeking new projects and opportunities. 

**Current Status:** Available for immediate start
**Preferred Work:** Full-stack development, AI integration, modern web applications
**Flexibility:** Open to both project-based and long-term engagements
**Timeline:** Can begin new projects within 1-2 weeks

He's particularly interested in challenging projects that involve cutting-edge technologies. 

**Contact for immediate opportunities:**
- **Phone:** +916006331941 (Direct line for urgent discussions)
- **Email:** ${portfolioData.personal.email}
- **Schedule a call:** Available for phone/video calls to discuss project requirements and timelines`,
    
    greeting: `Welcome! I'm Ashfaq's AI assistant, here to help you learn about his capabilities as a ${portfolioData.personal.title}.

Ashfaq specializes in building modern web applications with integrated AI features. He's proficient in ${portfolioData.skills.programming.slice(0,3).join(', ')} and has hands-on experience with ${portfolioData.skills.ai_ml.slice(0,2).join(' and ')}.

What would you like to know? I can share details about his technical skills, showcase his projects, discuss his experience, or help you get in touch with him directly.`
  }
  
  return responses[intent as keyof typeof responses] || responses.greeting
}

function getSuggestions(intent: string): string[] {
  const suggestions = {
    skills: ["Show me specific projects using these skills", "What's Ashfaq's experience level?", "How can I contact Ashfaq?"],
    projects: ["Tell me about the technical implementation", "What was the impact of this project?", "Can I see the live demo?"],
    experience: ["What technologies did he use in this role?", "What were his key achievements?", "Is he available for similar work?"],
    contact: ["What's the best way to reach out?", "Can we schedule a call?", "What information should I include?"],
    recruitment: ["What type of roles is he interested in?", "Can you share his portfolio?", "What's his availability?"],
    greeting: ["Tell me about Ashfaq's skills", "Show me his projects", "How can I contact him?", "What's his experience?"]
  }
  
  return suggestions[intent as keyof typeof suggestions] || suggestions.greeting
}
