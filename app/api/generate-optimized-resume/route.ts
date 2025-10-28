import { NextRequest, NextResponse } from 'next/server'
import portfolioData from '@/data/portfolio.json'

export async function POST(request: NextRequest) {
  try {
    const { optimizedContent, format, jobDescription } = await request.json()
    
    // Merge AI optimized content with portfolio data
    const completeResume = {
      personal: portfolioData.personal,
      summary: optimizedContent?.summary || generateDefaultSummary(),
      skills: optimizedContent?.skills || portfolioData.skills || {},
      experience: optimizedContent?.experience || portfolioData.experience || [],
      projects: optimizedContent?.projects || portfolioData.projects || [],
      education: portfolioData.experience.filter(e => e.type === 'Education') || [],
      certifications: portfolioData.certifications || []
    }
    
    const fileContent = generateResumeContent(completeResume, format)
    const { mimeType, fileExtension } = getFormatDetails(format)
    
    // Ensure UTF-8 encoding
    const buffer = Buffer.from(fileContent, 'utf8')
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': `${mimeType}; charset=utf-8`,
        'Content-Disposition': `attachment; filename="ashfaq-nabi-resume.${fileExtension}"`,
        'Content-Length': buffer.length.toString()
      }
    })
  } catch (error) {
    console.error('Resume generation error:', error)
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 })
  }
}

function generateResumeContent(resume: any, format: string): string {
  const content = createResumeText(resume)
  
  switch (format) {
    case 'pdf':
      return createPDFContent(content)
    case 'docx':
      return createDocxContent(content)
    default:
      return content
  }
}

function createResumeText(resume: any): string {
  const personal = resume.personal || {}
  
  const resumeText = `ASHFAQ NABI
Full Stack Developer & Prompt Engineer
${personal.location || 'Srinagar'} | ${personal.phone || '+916006331941'} | ${personal.email || 'eshfaqnabi11@gmail.com'}
LinkedIn: ${personal.linkedin || 'https://www.linkedin.com/in/ashfaq-nabi-6882401b7/'}
GitHub: ${personal.github || 'https://github.com/eshfaq-ux'}

PROFESSIONAL SUMMARY
${cleanText(resume.summary || generateDefaultSummary())}

TECHNICAL SKILLS
${formatSkillsClean(resume.skills)}

PROFESSIONAL EXPERIENCE

${generateOriginalExperience(resume.experience)}

EDUCATION

${generateOriginalEducation(resume.education)}

PROJECTS

${generateOriginalProjects(resume.projects)}

CERTIFICATIONS
${generateOriginalCertifications(resume.certifications)}
`
  
  // Clean any encoding issues
  return cleanText(resumeText)
}

function cleanText(text: string): string {
  return text
    .replace(/â€¢/g, '•')  // Fix bullet points
    .replace(/â€™/g, "'")  // Fix apostrophes
    .replace(/â€œ/g, '"')  // Fix quotes
    .replace(/â€/g, '"')   // Fix quotes
    .replace(/â€"/g, '—')  // Fix em dash
    .replace(/Â/g, '')     // Remove extra characters
    .replace(/\s+/g, ' ')  // Clean multiple spaces
    .trim()
}

function formatSkillsClean(skills: any): string {
  if (Array.isArray(skills)) {
    return skills.join(' • ')
  }
  
  // Use original portfolio structure
  const programming = skills?.programming || skills?.technical || ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL']
  const tools = skills?.tools || ['Docker', 'AWS', 'Vercel', 'Git', 'Figma', 'Postman', 'VS Code']
  const aiMl = skills?.ai_ml || ['Prompt Engineering', 'OpenAI GPT', 'LangChain', 'Machine Learning']
  
  return `Programming: ${programming.join(', ')}
Tools & Platforms: ${tools.join(', ')}
AI/ML: ${aiMl.join(', ')}`
}

function generateOriginalExperience(experience: any[]): string {
  if (!experience || experience.length === 0) {
    return `Full Stack Developer | Freelance
01/2023 - Present

Built and shipped multiple full-stack web applications, translating product requirements and Figma wireframes into responsive, accessible UI. Developed robust APIs with authentication, state management, and caching solutions.

Key Achievements:
• Built and shipped multiple full-stack web applications from concept to production
• Translated product requirements and Figma wireframes into responsive, accessible UI
• Integrated REST/GraphQL APIs with authentication, state management, and caching
• Implemented modern development practices including testing and deployment automation

Technologies: React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, TypeScript, JavaScript, HTML, CSS`
  }
  
  return experience.map((exp) => {
    const description = cleanText(exp.description || 'Developed and maintained web applications using modern technologies.')
    const achievements = exp.achievements?.map((achievement: string) => 
      cleanText(achievement.replace(/\s*\(improved by \d+%\)/, ''))
    ) || ['Developed scalable web applications', 'Collaborated with teams to deliver solutions']
    
    return `${exp.title} | ${exp.company}
${exp.duration}

${description}

Key Achievements:
${achievements.map((achievement: string) => `• ${achievement}`).join('\n')}

Technologies: ${exp.technologies?.join(', ') || 'JavaScript, React, Node.js'}`
  }).join('\n\n')
}

function generateOriginalEducation(education: any[]): string {
  if (!education || education.length === 0) {
    return `Master of Computer Applications (MCA)
BGSB University | 2021 - 2023
CGPA: 8.50
Relevant Coursework: Cloud Computing, Machine Learning, Full-Stack Development, Blockchain

Bachelor of Computer Applications (BCA)
Govt Degree College Ganderbal | 2018 - 2021
CGPA: 7.20
Relevant Coursework: Data Structures, DBMS, Web Technologies, Programming Fundamentals`
  }
  
  return education.map(edu => {
    return `${edu.degree}
${edu.institution} | ${edu.year}
${edu.details || ''}`
  }).join('\n\n')
}

function generateOriginalProjects(projects: any[]): string {
  if (!projects || projects.length === 0) {
    return `LinkVault - URL Shortening Service
A modern, full-stack URL shortening service with enterprise-grade features including analytics, password protection, and user management with real-time tracking capabilities.
Technologies: React, Node.js, PostgreSQL, Vercel, JWT, Tailwind CSS
Impact: Built scalable platform with 95% uptime, supporting unlimited users

Intelligent Workflow Automation System
AI-powered workflow automation platform that streamlined business operations for 50+ companies.
Technologies: React, Node.js, MongoDB, n8n, OpenAI
Impact: Reduced operational costs by 35% for 50+ companies

AI Chatbot Framework
Reusable AI chatbot framework with advanced prompt engineering capabilities.
Technologies: Python, LangChain, FastAPI, OpenAI, Docker
Impact: Achieved 95% accuracy across multiple client deployments`
  }
  
  return projects.map(project => {
    const description = cleanText(project.description || 'Developed a modern web application')
    const technologies = project.technologies?.join(', ') || project.tech?.join(', ') || 'JavaScript, React, Node.js'
    const impact = cleanText(project.impact || 'Enhanced user experience and system performance')
    
    return `${project.title}
${description}
Technologies: ${technologies}
Impact: ${impact}`
  }).join('\n\n')
}

function generateOriginalCertifications(certifications: any[]): string {
  if (!certifications || certifications.length === 0) {
    return `• Full Stack Web Development Certification - freeCodeCamp (2023)
• JavaScript Algorithms and Data Structures - freeCodeCamp (2022)
• Responsive Web Design Certification - freeCodeCamp (2022)
• React Developer Certification - Meta (2023)
• Node.js Application Development - IBM (2022)`
  }
  
  return certifications.map(cert => 
    `• ${cert.name} - ${cert.issuer} (${cert.year})`
  ).join('\n')
}

function createPDFContent(textContent: string): string {
  return `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R>>endobj
4 0 obj<</Length ${textContent.length}>>stream
BT
/F1 12 Tf
50 750 Td
${textContent.split('\n').map(line => `(${line.replace(/[()\\]/g, '\\$&')}) Tj 0 -14 Td`).join('\n')}
ET
endstream endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer<</Size 5/Root 1 0 R>>
startxref
${300 + textContent.length}
%%EOF`
}

function createDocxContent(textContent: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>
${textContent.split('\n').map(line => 
  `<w:p><w:r><w:t>${line.replace(/[<>&"']/g, match => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'
  }[match] || match))}</w:t></w:r></w:p>`
).join('')}
</w:body>
</w:document>`
}

function getFormatDetails(format: string) {
  switch (format) {
    case 'pdf':
      return { mimeType: 'application/pdf', fileExtension: 'pdf' }
    case 'docx':
      return { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', fileExtension: 'docx' }
    default:
      return { mimeType: 'text/plain', fileExtension: 'txt' }
  }
}

function generateDefaultSummary(): string {
  return 'Passionate Full Stack Developer with hands-on experience building modern, full-stack web applications. Skilled in translating product requirements into responsive, accessible UI, developing robust APIs, and writing maintainable, testable code. Experienced in frontend frameworks (React.js, Next.js) and backend technologies (Node.js, Express.js, MongoDB), with exposure to AI tools for enhanced productivity.'
}
