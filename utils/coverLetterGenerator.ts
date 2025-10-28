import jsPDF from 'jspdf';

interface CoverLetterContent {
  date: string;
  recipientName: string;
  companyName: string;
  position: string;
  content: {
    opening: string;
    body: string[];
    closing: string;
  };
}

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export const generateCoverLetterPDF = async (
  coverLetter: CoverLetterContent,
  personal: PersonalInfo
): Promise<void> => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Page dimensions
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;
  const lineHeight = 6;
  const paragraphSpacing = 8;

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize: number = 11, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = pdf.splitTextToSize(text, contentWidth);
    
    // Check if we need a new page
    if (yPosition + (lines.length * lineHeight) > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    lines.forEach((line: string) => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    
    yPosition += paragraphSpacing;
  };

  // Header - Personal Information
  addText(personal.name, 16, true);
  yPosition -= paragraphSpacing; // Reduce spacing after name
  
  addText(`${personal.email} | ${personal.phone} | ${personal.location}`, 10);
  yPosition += 5; // Extra spacing after header

  // Date
  addText(coverLetter.date, 11);

  // Recipient Information
  addText(coverLetter.recipientName, 11);
  yPosition -= paragraphSpacing;
  addText(coverLetter.companyName, 11);
  yPosition += 5;

  // Subject Line
  addText(`Re: Application for ${coverLetter.position}`, 11, true);

  // Salutation
  addText(`Dear ${coverLetter.recipientName},`, 11);

  // Opening paragraph
  addText(coverLetter.content.opening, 11);

  // Body paragraphs
  coverLetter.content.body.forEach(paragraph => {
    addText(paragraph, 11);
  });

  // Closing paragraph
  addText(coverLetter.content.closing, 11);

  // Sign-off
  addText('Sincerely,', 11);
  yPosition += 10; // Space for signature
  addText(personal.name, 11, true);

  // Add footer with generation timestamp
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    margin,
    pageHeight - 10
  );

  // Save the PDF
  const fileName = `${personal.name.replace(/\s+/g, '_')}_Cover_Letter.pdf`;
  pdf.save(fileName);
};

// Function to customize cover letter for specific job
export const customizeCoverLetter = (
  baseContent: CoverLetterContent,
  jobDescription: string,
  companyName: string,
  position: string
): CoverLetterContent => {
  // Extract key skills and requirements from job description
  const keywords = extractKeywords(jobDescription);
  
  return {
    ...baseContent,
    companyName,
    position,
    content: {
      ...baseContent.content,
      opening: baseContent.content.opening
        .replace('[Position Title]', position)
        .replace('[Company Name]', companyName),
      body: baseContent.content.body.map(paragraph => 
        paragraph
          .replace('[Company Name]', companyName)
          .replace('[Position Title]', position)
      )
    }
  };
};

// Helper function to extract keywords from job description
const extractKeywords = (jobDescription: string): string[] => {
  const commonTechKeywords = [
    'react', 'node.js', 'javascript', 'typescript', 'python',
    'mongodb', 'postgresql', 'aws', 'docker', 'kubernetes',
    'api', 'rest', 'graphql', 'microservices', 'agile'
  ];
  
  const lowerCaseDescription = jobDescription.toLowerCase();
  return commonTechKeywords.filter(keyword => 
    lowerCaseDescription.includes(keyword)
  );
};
