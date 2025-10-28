import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, userProfile } = await request.json()
    
    // Real AI analysis using OpenAI (or fallback to intelligent parsing)
    const analysis = await analyzeWithAI(jobDescription, userProfile)
    
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('AI Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
}

async function analyzeWithAI(jobDescription: string, userProfile: any) {
  // Try OpenAI API if available
  if (process.env.OPENAI_API_KEY) {
    try {
      const openaiAnalysis = await callOpenAI(jobDescription, userProfile)
      return openaiAnalysis
    } catch (error) {
      console.log('OpenAI failed, using intelligent fallback')
    }
  }
  
  // Intelligent fallback analysis
  return performIntelligentAnalysis(jobDescription, userProfile)
}

async function callOpenAI(jobDescription: string, userProfile: any) {
  const prompt = `
Analyze this job description and user profile to optimize a resume:

JOB DESCRIPTION:
${jobDescription}

USER PROFILE:
Skills: ${JSON.stringify(userProfile.skills)}
Experience: ${userProfile.experience?.map((exp: any) => exp.title).join(', ')}
Projects: ${userProfile.projects?.map((proj: any) => proj.title).join(', ')}

Provide a JSON response with:
1. keywords: Array of relevant technical keywords from job description
2. score: Match percentage (0-100)
3. suggestions: Array of 5-6 specific optimization suggestions
4. optimizedSections: Object with prioritized skills, experience, and projects

Focus on practical, actionable advice for resume optimization.
`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume optimization AI. Provide practical, specific advice for tailoring resumes to job descriptions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })
  })

  if (!response.ok) {
    throw new Error('OpenAI API failed')
  }

  const data = await response.json()
  const aiResponse = data.choices[0].message.content

  try {
    return JSON.parse(aiResponse)
  } catch {
    // If JSON parsing fails, create structured response
    return parseAIResponse(aiResponse, jobDescription, userProfile)
  }
}

function performIntelligentAnalysis(jobDescription: string, userProfile: any) {
  const keywords = extractIntelligentKeywords(jobDescription)
  const score = calculateIntelligentScore(keywords, userProfile)
  const suggestions = generateIntelligentSuggestions(jobDescription, keywords, userProfile)
  const optimizedSections = optimizeIntelligentSections(keywords, userProfile)

  return {
    keywords,
    score,
    suggestions,
    optimizedSections
  }
}

function extractIntelligentKeywords(jobDescription: string): string[] {
  const techPatterns = [
    /\b(React|Vue|Angular|JavaScript|TypeScript|Node\.js|Python|Java|C\+\+|C#)\b/gi,
    /\b(MongoDB|PostgreSQL|MySQL|Redis|Elasticsearch|GraphQL|REST|API)\b/gi,
    /\b(AWS|Azure|GCP|Docker|Kubernetes|Jenkins|CI\/CD|DevOps)\b/gi,
    /\b(Machine Learning|AI|Data Science|Analytics|Automation)\b/gi,
    /\b(Agile|Scrum|Git|GitHub|Testing|TDD|Microservices)\b/gi
  ]

  const keywords = new Set<string>()
  
  techPatterns.forEach(pattern => {
    const matches = jobDescription.match(pattern)
    if (matches) {
      matches.forEach(match => keywords.add(match))
    }
  })

  // Add role-based keywords
  const lowerDesc = jobDescription.toLowerCase()
  if (lowerDesc.includes('full stack') || lowerDesc.includes('fullstack')) {
    keywords.add('Full Stack Development')
  }
  if (lowerDesc.includes('frontend') || lowerDesc.includes('front-end')) {
    keywords.add('Frontend Development')
  }
  if (lowerDesc.includes('backend') || lowerDesc.includes('back-end')) {
    keywords.add('Backend Development')
  }

  return Array.from(keywords)
}

function calculateIntelligentScore(keywords: string[], userProfile: any): number {
  const userSkills = [
    ...(userProfile.skills?.technical || []),
    ...(userProfile.skills?.tools || [])
  ]

  let matches = 0
  let totalWeight = 0

  keywords.forEach(keyword => {
    const weight = getKeywordWeight(keyword)
    totalWeight += weight
    
    const hasSkill = userSkills.some((skill: string) => 
      skill.toLowerCase().includes(keyword.toLowerCase()) ||
      keyword.toLowerCase().includes(skill.toLowerCase())
    )
    
    if (hasSkill) {
      matches += weight
    }
  })

  const score = totalWeight > 0 ? Math.round((matches / totalWeight) * 100) : 0
  return Math.min(95, Math.max(score, 15))
}

function getKeywordWeight(keyword: string): number {
  const highPriority = ['React', 'JavaScript', 'Node.js', 'Python', 'AWS', 'Docker']
  const mediumPriority = ['MongoDB', 'PostgreSQL', 'Git', 'API', 'REST']
  
  if (highPriority.some(tech => keyword.toLowerCase().includes(tech.toLowerCase()))) {
    return 3
  }
  if (mediumPriority.some(tech => keyword.toLowerCase().includes(tech.toLowerCase()))) {
    return 2
  }
  return 1
}

function generateIntelligentSuggestions(jobDescription: string, keywords: string[], userProfile: any): string[] {
  const suggestions = []
  const lowerDesc = jobDescription.toLowerCase()

  // Role-specific suggestions
  if (lowerDesc.includes('senior') || lowerDesc.includes('lead')) {
    suggestions.push('Emphasize leadership experience and mentoring responsibilities')
  }

  if (lowerDesc.includes('startup') || lowerDesc.includes('fast-paced')) {
    suggestions.push('Highlight adaptability and rapid prototyping experience')
  }

  // Technology-specific suggestions
  if (keywords.some(k => k.toLowerCase().includes('react'))) {
    suggestions.push('Showcase React projects with component architecture and state management')
  }

  if (keywords.some(k => k.toLowerCase().includes('aws') || k.toLowerCase().includes('cloud'))) {
    suggestions.push('Highlight cloud deployment experience and infrastructure knowledge')
  }

  if (keywords.some(k => k.toLowerCase().includes('ai') || k.toLowerCase().includes('machine learning'))) {
    suggestions.push('Feature AI integration projects and automation implementations')
  }

  // Universal suggestions
  suggestions.push(
    'Quantify achievements with specific metrics and impact numbers',
    'Tailor technical skills section to prioritize job-relevant technologies',
    'Customize professional summary with industry-specific keywords',
    'Highlight projects that demonstrate problem-solving for similar challenges'
  )

  return suggestions.slice(0, 6)
}

function optimizeIntelligentSections(keywords: string[], userProfile: any) {
  const technical = userProfile.skills?.technical || []
  const experience = userProfile.experience || []
  const projects = userProfile.projects || []

  // Prioritize skills based on keyword matches
  const prioritizedSkills = technical.sort((a: string, b: string) => {
    const aMatches = keywords.some(k => 
      a.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(a.toLowerCase())
    )
    const bMatches = keywords.some(k => 
      b.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(b.toLowerCase())
    )
    
    if (aMatches && !bMatches) return -1
    if (!aMatches && bMatches) return 1
    return 0
  })

  return {
    skills: prioritizedSkills.slice(0, 8),
    experience: experience.map((exp: any) => exp.title || exp.company || 'Professional Role').slice(0, 3),
    projects: projects.map((proj: any) => proj.title || proj.name || 'Project').slice(0, 4)
  }
}

function parseAIResponse(response: string, jobDescription: string, userProfile: any) {
  // Fallback parsing if AI doesn't return valid JSON
  return performIntelligentAnalysis(jobDescription, userProfile)
}
