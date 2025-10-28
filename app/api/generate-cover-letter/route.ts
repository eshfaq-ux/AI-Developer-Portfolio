import { NextRequest, NextResponse } from 'next/server';
import { customizeCoverLetter } from '@/utils/coverLetterGenerator';
import portfolioData from '@/data/portfolio.json';

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, companyName, position } = await request.json();

    if (!jobDescription || !companyName || !position) {
      return NextResponse.json(
        { error: 'Missing required fields: jobDescription, companyName, position' },
        { status: 400 }
      );
    }

    // Base cover letter template
    const baseCoverLetter = {
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      recipientName: 'Hiring Manager',
      companyName: '[Company Name]',
      position: '[Position Title]',
      content: {
        opening: `I am writing to express my strong interest in the ${portfolioData.personal.title} position at your organization. With my proven track record in full-stack development and AI-powered solutions, I am excited to contribute to your team's success.`,
        
        body: [
          `As a ${portfolioData.personal.title}, I have successfully delivered scalable web applications and automation solutions that drive business growth. My experience with ${portfolioData.skills.programming.slice(0, 5).join(', ')} enables me to build robust, maintainable systems that meet enterprise requirements.`,
          
          `In my recent projects, I have demonstrated measurable impact: developed LinkVault, a URL shortening service with enterprise-grade features; created workflow automation systems that reduced operational costs by 35% for 50+ companies; and built AI chatbot frameworks with 95% accuracy rates. These achievements showcase my ability to translate technical expertise into business value.`,
          
          `My expertise in ${portfolioData.skills.ai_ml.slice(0, 4).join(', ')} positions me well for modern development challenges. I am particularly passionate about leveraging AI to solve complex problems and streamline business processes, which aligns with the evolving needs of today's technology landscape.`
        ],
        
        closing: `I am eager to discuss how my technical skills and proven track record can contribute to your team's objectives. Thank you for considering my application. I look forward to the opportunity to speak with you further.`
      }
    };

    // Customize the cover letter based on job description
    const customizedCoverLetter = customizeCoverLetter(
      baseCoverLetter,
      jobDescription,
      companyName,
      position
    );

    return NextResponse.json({
      success: true,
      coverLetter: customizedCoverLetter,
      personalInfo: portfolioData.personal
    });

  } catch (error) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}
