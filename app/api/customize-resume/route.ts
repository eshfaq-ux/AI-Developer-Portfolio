import { NextRequest, NextResponse } from 'next/server'
import portfolioData from '@/data/portfolio.json'

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json()

    if (!jobDescription) {
      return NextResponse.json({ error: 'Job description is required' }, { status: 400 })
    }

    // This would integrate with OpenAI API to customize resume based on job description
    // For now, returning a mock customized version
    const customizedData = {
      ...portfolioData,
      about: {
        ...portfolioData.about,
        description: `${portfolioData.about.description} Specifically experienced in technologies and methodologies mentioned in the target role, with proven ability to adapt and excel in similar environments.`
      },
      projects: portfolioData.projects.map(project => ({
        ...project,
        description: `${project.description} This project demonstrates direct relevance to the requirements outlined in the job posting.`
      }))
    }

    return NextResponse.json({ customizedData })
  } catch (error) {
    console.error('Error customizing resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
