import { NextRequest, NextResponse } from 'next/server'
import portfolioData from '@/data/portfolio.json'

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, keywords, optimizations } = await request.json()
    
    // Generate PDF content
    const pdfContent = generatePDFContent(jobDescription, keywords, optimizations)
    
    // Create simple PDF-like content (in production, use jsPDF or similar)
    const pdfBuffer = Buffer.from(pdfContent, 'utf-8')
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="customized-resume.pdf"',
        'Content-Length': pdfBuffer.length.toString()
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate resume' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Generate a basic resume PDF
    const resumeContent = generateBasicResume()
    const pdfBuffer = Buffer.from(resumeContent, 'utf-8')
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="resume.txt"',
        'Content-Length': pdfBuffer.length.toString()
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate resume' },
      { status: 500 }
    )
  }
}

function generatePDFContent(jobDescription: string, keywords: string[], optimizations: any): string {
  const { personal, experience, projects, skills } = portfolioData
  
  return `
CUSTOMIZED RESUME
=================

${personal.name}
${personal.title}
Email: ${personal.email}
Phone: ${personal.phone || 'Available on request'}
Location: ${personal.location}
LinkedIn: ${personal.linkedin}
GitHub: ${personal.github}

PROFESSIONAL SUMMARY
===================
Experienced Full Stack Developer with expertise in ${keywords.slice(0, 5).join(', ')}. 
Proven track record in building scalable web applications and delivering innovative solutions.
Specialized in modern web technologies with focus on ${keywords.slice(0, 3).join(' and ')}.

TECHNICAL SKILLS
===============
${[...skills.programming, ...skills.ai_ml, ...skills.tools].join(', ') || 'JavaScript, React, Node.js, MongoDB, Express'}

PROFESSIONAL EXPERIENCE
======================
${experience.map(exp => `
${exp.title} - ${exp.company}
${exp.duration}
${exp.description}
${exp.achievements?.map(achievement => `• ${achievement}`).join('\n') || ''}
`).join('\n')}

PROJECTS
========
${projects.slice(0, 4).map(project => `
${project.title}
${project.description}
Technologies: ${project.tech?.join(', ') || 'Modern web technologies'}
`).join('\n')}

OPTIMIZATION NOTES
=================
Keywords matched: ${keywords.join(', ')}
Customized for: Job requirements analysis
Generated: ${new Date().toLocaleDateString()}
`
}

function generateBasicResume(): string {
  const { personal, experience, projects, skills } = portfolioData
  
  return `
${personal.name} - Resume
========================

Contact Information:
Email: ${personal.email}
Location: ${personal.location}
LinkedIn: ${personal.linkedin}
GitHub: ${personal.github}

Professional Summary:
Full Stack Developer with experience in modern web technologies.

Technical Skills:
${[...skills.programming, ...skills.ai_ml, ...skills.tools].join(', ') || 'JavaScript, React, Node.js'}

Experience:
${experience.map(exp => `${exp.title} at ${exp.company} (${exp.duration})`).join('\n')}

Projects:
${projects.map(project => project.title).join('\n')}

Generated: ${new Date().toLocaleDateString()}
`
}
