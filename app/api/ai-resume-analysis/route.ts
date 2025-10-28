import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, currentResume } = await request.json()
    
    // Perform comprehensive AI analysis
    const analysis = await performAIAnalysis(jobDescription, currentResume)
    
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('AI Analysis error:', error)
    return NextResponse.json(
      { error: 'AI analysis failed' },
      { status: 500 }
    )
  }
}

async function performAIAnalysis(jobDescription: string, currentResume: any) {
  // Try OpenAI first, fallback to advanced local analysis
  if (process.env.OPENAI_API_KEY) {
    try {
      return await analyzeWithOpenAI(jobDescription, currentResume)
    } catch (error) {
      console.log('OpenAI failed, using advanced local analysis')
    }
  }
  
  return performAdvancedLocalAnalysis(jobDescription, currentResume)
}

async function analyzeWithOpenAI(jobDescription: string, currentResume: any) {
  const prompt = `Analyze this job description and resume. Return valid JSON only:

JOB: ${jobDescription}
RESUME: ${JSON.stringify(currentResume)}

Return JSON format:
{
  "matchScore": number,
  "atsScore": number,
  "presentKeywords": ["keyword1"],
  "missingKeywords": ["keyword2"],
  "suggestions": ["suggestion1"],
  "optimizedContent": {
    "summary": "text",
    "skills": ["skill1"],
    "experience": [{"title":"","company":"","description":"","achievements":[]}],
    "projects": [{"title":"","description":"","impact":""}]
  }
}`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a resume optimizer. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.3
    })
  })

  if (!response.ok) throw new Error('OpenAI API failed')

  const data = await response.json()
  const aiResponse = data.choices[0].message.content.replace(/```json\n?|\n?```/g, '').trim()
  
  return JSON.parse(aiResponse)
}

function performAdvancedLocalAnalysis(jobDescription: string, currentResume: any) {
  const jobKeywords = extractKeywords(jobDescription)
  const resumeKeywords = extractResumeKeywords(currentResume)
  
  const presentKeywords = jobKeywords.filter(keyword => 
    resumeKeywords.some(resumeKeyword => 
      resumeKeyword.toLowerCase().includes(keyword.toLowerCase()) ||
      keyword.toLowerCase().includes(resumeKeyword.toLowerCase())
    )
  )
  
  const missingKeywords = jobKeywords.filter(keyword => 
    !resumeKeywords.some(resumeKeyword => 
      resumeKeyword.toLowerCase().includes(keyword.toLowerCase()) ||
      keyword.toLowerCase().includes(resumeKeyword.toLowerCase())
    )
  )
  
  const matchScore = Math.round((presentKeywords.length / Math.max(jobKeywords.length, 1)) * 100)
  const atsScore = calculateATSScore(currentResume)
  
  return {
    matchScore: Math.min(matchScore, 95),
    atsScore,
    presentKeywords: presentKeywords.slice(0, 10),
    missingKeywords: missingKeywords.slice(0, 10),
    suggestions: generateSuggestions(jobDescription, missingKeywords),
    optimizedContent: generateOptimizedContent(jobKeywords, missingKeywords, currentResume)
  }
}

function extractKeywords(jobDescription: string): string[] {
  const techPatterns = [
    /\b(React|Vue|Angular|JavaScript|TypeScript|Node\.js|Python|Java|PHP|Ruby)\b/gi,
    /\b(MongoDB|PostgreSQL|MySQL|Redis|AWS|Docker|Kubernetes)\b/gi,
    /\b(REST|GraphQL|API|Git|CI\/CD|Agile|Scrum)\b/gi
  ]
  
  const keywords = new Set<string>()
  techPatterns.forEach(pattern => {
    const matches = jobDescription.match(pattern)
    if (matches) matches.forEach(match => keywords.add(match))
  })
  
  return Array.from(keywords).slice(0, 15)
}

function extractResumeKeywords(resume: any): string[] {
  const keywords = new Set<string>()
  
  if (resume.skills?.technical) {
    resume.skills.technical.forEach((skill: string) => keywords.add(skill))
  }
  if (resume.skills?.tools) {
    resume.skills.tools.forEach((tool: string) => keywords.add(tool))
  }
  
  return Array.from(keywords)
}

function calculateATSScore(resume: any): number {
  let score = 0
  if (resume.personal?.name) score += 15
  if (resume.personal?.email) score += 15
  if (resume.skills?.technical?.length > 0) score += 25
  if (resume.experience?.length > 0) score += 25
  if (resume.projects?.length > 0) score += 20
  return Math.round(score)
}

function generateSuggestions(jobDescription: string, missingKeywords: string[]): string[] {
  const suggestions = []
  
  if (missingKeywords.length > 0) {
    suggestions.push(`Add these missing skills: ${missingKeywords.slice(0, 3).join(', ')}`)
  }
  
  suggestions.push(
    'Quantify achievements with specific metrics',
    'Use action verbs: Built, Developed, Implemented',
    'Tailor project descriptions to job requirements',
    'Include relevant certifications'
  )
  
  return suggestions.slice(0, 6)
}

function generateOptimizedContent(jobKeywords: string[], missingKeywords: string[], resume: any) {
  // Add missing keywords to skills
  const enhancedSkills = [
    ...missingKeywords.slice(0, 3),
    ...(resume.skills?.technical || []),
    ...(resume.skills?.tools || [])
  ].filter((skill, index, arr) => arr.indexOf(skill) === index)
  
  // Generate optimized summary
  const summary = `Experienced ${resume.personal?.title || 'Full Stack Developer'} with expertise in ${jobKeywords.slice(0, 3).join(', ')}. Proven track record in building scalable applications and delivering innovative solutions.`
  
  // Enhance experience
  const enhancedExperience = (resume.experience || []).map((exp: any) => ({
    ...exp,
    description: enhanceDescription(exp.description, missingKeywords),
    achievements: enhanceAchievements(exp.achievements || [], jobKeywords)
  }))
  
  // Enhance projects
  const enhancedProjects = (resume.projects || []).slice(0, 4).map((project: any) => ({
    ...project,
    description: enhanceDescription(project.description, missingKeywords),
    impact: `Improved performance by 40% using ${jobKeywords[0] || 'modern technologies'}`
  }))
  
  return {
    summary,
    skills: enhancedSkills.slice(0, 12),
    experience: enhancedExperience.slice(0, 3),
    projects: enhancedProjects
  }
}

function enhanceDescription(description: string, keywords: string[]): string {
  if (!description) return `Developed applications using ${keywords.slice(0, 2).join(' and ')} technologies.`
  
  let enhanced = description
  keywords.slice(0, 2).forEach(keyword => {
    if (!enhanced.toLowerCase().includes(keyword.toLowerCase())) {
      enhanced += ` Utilized ${keyword} for enhanced functionality.`
    }
  })
  
  return enhanced
}

function enhanceAchievements(achievements: string[], keywords: string[]): string[] {
  const enhanced = achievements.map(achievement => {
    if (!/\d+%/.test(achievement)) {
      return achievement + ' (improved by 30%)'
    }
    return achievement
  })
  
  if (enhanced.length < 2) {
    enhanced.push(`Implemented ${keywords[0] || 'modern solutions'} resulting in improved performance`)
  }
  
  return enhanced.slice(0, 3)
}
