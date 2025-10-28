import jsPDF from 'jspdf'

interface PersonalInfo {
  name: string
  title: string
  email: string
  phone?: string
  linkedin: string
  github: string
  location: string
}

interface ExperienceItem {
  title: string
  company: string
  duration: string
  location?: string
  type?: string
  description: string
  achievements?: string[]
  technologies?: string[]
}

interface ProjectItem {
  title: string
  description: string
  tech: string[]
  impact: string
  github?: string
  demo?: string
}

interface PortfolioData {
  personal: PersonalInfo
  about: {
    description: string
    keywords?: string[]
  }
  skills: {
    programming: string[]
    ai_ml: string[]
    tools: string[]
    automation: string[]
  }
  projects: ProjectItem[]
  experience: ExperienceItem[]
  certifications?: {
    title: string
    issuer: string
    date: string
    description: string
    certificate?: string
  }[]
}

export const generateResumePDF = (data: PortfolioData) => {
  const pdf = new jsPDF()
  let yPosition = 20
  const pageWidth = pdf.internal.pageSize.width
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  
  // Color scheme
  const colors = {
    primary: [41, 98, 255] as [number, number, number], // Blue
    secondary: [100, 116, 139] as [number, number, number], // Gray
    accent: [16, 185, 129] as [number, number, number], // Green
    text: [31, 41, 55] as [number, number, number], // Dark gray
    light: [243, 244, 246] as [number, number, number] // Light gray
  }

  // Helper functions
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > 280) {
      pdf.addPage()
      yPosition = 20
    }
  }

  const addSectionHeader = (title: string) => {
    checkPageBreak(20)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(...colors.primary)
    pdf.text(title.toUpperCase(), margin, yPosition)
    
    // Add underline
    yPosition += 2
    pdf.setDrawColor(...colors.primary)
    pdf.setLineWidth(0.5)
    pdf.line(margin, yPosition, margin + pdf.getTextWidth(title.toUpperCase()) + 10, yPosition)
    yPosition += 8
    pdf.setTextColor(...colors.text)
  }

  // HEADER SECTION with better styling
  pdf.setFontSize(24)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(...colors.text)
  pdf.text(data.personal.name.toUpperCase(), margin, yPosition)
  
  yPosition += 8
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(...colors.secondary)
  pdf.text(data.personal.title, margin, yPosition)
  
  // Contact info with better formatting
  yPosition += 12
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(...colors.secondary)
  
  const contactLines = [
    `Email: ${data.personal.email}`,
    `Phone: ${data.personal.phone || ''}`,
    `Location: ${data.personal.location}`,
    `LinkedIn: ${data.personal.linkedin.replace('https://linkedin.com/in/', 'linkedin.com/in/')}`,
    `GitHub: ${data.personal.github.replace('https://github.com/', 'github.com/')}`
  ].filter(line => !line.includes('undefined'))
  
  contactLines.forEach((line, index) => {
    if (index % 2 === 0) {
      pdf.text(line, margin, yPosition)
    } else {
      pdf.text(line, pageWidth/2, yPosition)
    }
    if (index % 2 === 1) yPosition += 5
  })
  
  pdf.setTextColor(...colors.text)
  
  yPosition += 15

  // PROFESSIONAL SUMMARY with better formatting
  addSectionHeader('Professional Summary')
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')
  const summaryLines = pdf.splitTextToSize(data.about.description, contentWidth)
  pdf.text(summaryLines, margin, yPosition)
  yPosition += summaryLines.length * 5 + 15

  // CORE COMPETENCIES with categories
  addSectionHeader('Core Competencies')
  pdf.setFontSize(10)
  
  const skillCategories = [
    { title: 'AI & Machine Learning', skills: data.skills.ai_ml },
    { title: 'Programming & Frameworks', skills: data.skills.programming },
    { title: 'Tools & Technologies', skills: data.skills.tools },
    { title: 'Automation & Integration', skills: data.skills.automation }
  ]
  
  skillCategories.forEach(category => {
    if (category.skills.length > 0) {
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(...colors.primary)
      pdf.text(`${category.title}:`, margin, yPosition)
      yPosition += 4
      
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(...colors.text)
      const skillsText = category.skills.join(', ')
      const skillsLines = pdf.splitTextToSize(skillsText, contentWidth)
      pdf.text(skillsLines, margin, yPosition)
      yPosition += skillsLines.length * 4 + 6
    }
  })
  
  yPosition += 10

  // PROFESSIONAL EXPERIENCE with better formatting
  addSectionHeader('Professional Experience')
  
  const workExperience = data.experience.filter(exp => exp.type !== 'Education')
  workExperience.forEach((exp) => {
    checkPageBreak(50)
    
    // Job title and duration
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(...colors.text)
    pdf.text(exp.title, margin, yPosition)
    
    const durationWidth = pdf.getTextWidth(exp.duration)
    pdf.setTextColor(...colors.secondary)
    pdf.text(exp.duration, pageWidth - margin - durationWidth, yPosition)
    
    yPosition += 6
    
    // Company and location
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(...colors.primary)
    const companyLocation = exp.location ? `${exp.company} | ${exp.location}` : exp.company
    pdf.text(companyLocation, margin, yPosition)
    yPosition += 8
    
    // Description
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(...colors.text)
    const descLines = pdf.splitTextToSize(exp.description, contentWidth)
    pdf.text(descLines, margin, yPosition)
    yPosition += descLines.length * 4 + 5
    
    // Achievements with better bullets
    if (exp.achievements && exp.achievements.length > 0) {
      exp.achievements.forEach(achievement => {
        checkPageBreak(15)
        pdf.setTextColor(...colors.accent)
        pdf.text('>', margin, yPosition)
        pdf.setTextColor(...colors.text)
        const achievementLines = pdf.splitTextToSize(achievement, contentWidth - 10)
        pdf.text(achievementLines, margin + 8, yPosition)
        yPosition += achievementLines.length * 4 + 2
      })
      yPosition += 5
    }
    
    yPosition += 8
  })

  // KEY PROJECTS with better styling
  if (data.projects.length > 0) {
    addSectionHeader('Key Projects')
    
    data.projects.slice(0, 3).forEach((project) => {
      checkPageBreak(40)
      
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(...colors.text)
      pdf.text(project.title, margin, yPosition)
      yPosition += 6
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      const projectLines = pdf.splitTextToSize(project.description, contentWidth)
      pdf.text(projectLines, margin, yPosition)
      yPosition += projectLines.length * 4 + 4
      
      // Impact with highlight
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(...colors.accent)
      pdf.text('Impact:', margin, yPosition)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(...colors.text)
      const impactText = project.impact
      const impactWidth = pdf.getTextWidth('Impact:') + 4 // Add 4 units of spacing
      const impactLines = pdf.splitTextToSize(impactText, contentWidth - impactWidth)
      pdf.text(impactLines, margin + impactWidth, yPosition)
      yPosition += impactLines.length * 4 + 4
      
      // Technologies
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(...colors.secondary)
      pdf.text('Tech Stack:', margin, yPosition)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(...colors.text)
      const techText = project.tech.join(' | ')
      const techWidth = pdf.getTextWidth('Tech Stack:') + 4 // Add 4 units of spacing
      const techLines = pdf.splitTextToSize(techText, contentWidth - techWidth)
      pdf.text(techLines, margin + techWidth, yPosition)
      yPosition += techLines.length * 4 + 10
    })
  }

  // EDUCATION
  const education = data.experience.filter(exp => exp.type === 'Education')
  if (education.length > 0) {
    addSectionHeader('Education')
    
    education.forEach(edu => {
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(...colors.text)
      pdf.text(edu.title, margin, yPosition)
      
      const durationWidth = pdf.getTextWidth(edu.duration)
      pdf.setTextColor(...colors.secondary)
      pdf.text(edu.duration, pageWidth - margin - durationWidth, yPosition)
      
      yPosition += 6
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(...colors.primary)
      pdf.text(edu.company, margin, yPosition)
      yPosition += 6
      
      // Add description
      if (edu.description) {
        pdf.setTextColor(...colors.text)
        const descLines = pdf.splitTextToSize(edu.description, contentWidth)
        pdf.text(descLines, margin, yPosition)
        yPosition += descLines.length * 4 + 4
      }
      
      // Add achievements with bullets
      if (edu.achievements && edu.achievements.length > 0) {
        edu.achievements.slice(0, 3).forEach(achievement => {
          pdf.setTextColor(...colors.accent)
          pdf.text('>', margin, yPosition)
          pdf.setTextColor(...colors.text)
          const achievementLines = pdf.splitTextToSize(achievement, contentWidth - 10)
          pdf.text(achievementLines, margin + 8, yPosition)
          yPosition += achievementLines.length * 4 + 2
        })
      }
      yPosition += 8
    })
  }

  // CERTIFICATIONS
  if (data.certifications && data.certifications.length > 0) {
    checkPageBreak(30)
    addSectionHeader('Certifications')
    
    data.certifications.forEach(cert => {
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(...colors.text)
      pdf.text(cert.title, margin, yPosition)
      
      const dateWidth = pdf.getTextWidth(cert.date)
      pdf.setTextColor(...colors.secondary)
      pdf.text(cert.date, pageWidth - margin - dateWidth, yPosition)
      
      yPosition += 6
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(...colors.primary)
      pdf.text(cert.issuer, margin, yPosition)
      yPosition += 6
      
      if (cert.description) {
        pdf.setTextColor(...colors.text)
        const descLines = pdf.splitTextToSize(cert.description, contentWidth)
        pdf.text(descLines, margin, yPosition)
        yPosition += descLines.length * 4 + 8
      }
    })
  }

  // ADDITIONAL SECTIONS
  checkPageBreak(40)
  addSectionHeader('Additional Information')
  
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(...colors.primary)
  pdf.text('Availability:', margin, yPosition)
  yPosition += 4
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(...colors.text)
  pdf.text('Available for relocation to Bangalore upon offer acceptance', margin, yPosition)
  yPosition += 8
  
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(...colors.primary)
  pdf.text('Languages:', margin, yPosition)
  yPosition += 4
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(...colors.text)
  pdf.text('English (Fluent), Urdu (Native), Kashmiri (Native)', margin, yPosition)
  yPosition += 8
  
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(...colors.primary)
  pdf.text('References:', margin, yPosition)
  yPosition += 4
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(...colors.text)
  pdf.text('Available upon request', margin, yPosition)

  // FOOTER
  pdf.setFontSize(8)
  pdf.setTextColor(...colors.secondary)
  pdf.text('Generated from AI-Powered Portfolio | Always up-to-date', margin, 285)

  // Save with timestamp
  const fileName = `${data.personal.name.replace(/\s+/g, '_')}_Resume_${new Date().toISOString().split('T')[0]}.pdf`
  pdf.save(fileName)
}
