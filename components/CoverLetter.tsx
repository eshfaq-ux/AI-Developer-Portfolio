'use client';

import { useState } from 'react';
import { Download, FileText, Eye, Settings, X, Copy, Check } from 'lucide-react';
import { generateCoverLetterPDF } from '../utils/coverLetterGenerator';
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation';

interface CoverLetterProps {
  portfolioData: any;
}

const CoverLetter = ({ portfolioData }: CoverLetterProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [customData, setCustomData] = useState({
    companyName: '[Company Name]',
    position: '[Position Title]',
    jobDescription: ''
  });

  const coverLetterContent = {
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    recipientName: 'Hiring Manager',
    companyName: customData.companyName,
    position: customData.position,
    content: {
      opening: `I am writing to express my strong interest in the ${customData.position} position at ${customData.companyName}. With my proven track record in full-stack development and AI-powered solutions, I am excited to contribute to your team's success.`,
      
      body: [
        `As a ${portfolioData.personal.title}, I have successfully delivered scalable web applications and automation solutions that drive business growth. My experience with ${portfolioData.skills.programming.slice(0, 5).join(', ')} enables me to build robust, maintainable systems that meet enterprise requirements.`,
        
        `In my recent projects, I have demonstrated measurable impact: developed LinkVault, a URL shortening service with enterprise-grade features; created workflow automation systems that reduced operational costs by 35% for 50+ companies; and built AI chatbot frameworks with 95% accuracy rates. These achievements showcase my ability to translate technical expertise into business value.`,
        
        `My expertise in ${portfolioData.skills.ai_ml.slice(0, 4).join(', ')} positions me well for modern development challenges. I am particularly passionate about leveraging AI to solve complex problems and streamline business processes, which aligns with the evolving needs of today's technology landscape.`
      ],
      
      closing: `I am eager to discuss how my technical skills and proven track record can contribute to ${customData.companyName}'s objectives. Thank you for considering my application. I look forward to the opportunity to speak with you further.`
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateCoverLetterPDF(coverLetterContent, portfolioData.personal);
    } catch (error) {
      console.error('Error generating cover letter:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomize = () => {
    setIsCustomizing(false);
    // Update the cover letter content with custom data
  };

  const handleCopyText = async () => {
    const coverLetterText = `${portfolioData.personal.name}
${portfolioData.personal.email} | ${portfolioData.personal.phone} | ${portfolioData.personal.location}

${coverLetterContent.date}

${coverLetterContent.recipientName}
${coverLetterContent.companyName}

Re: Application for ${coverLetterContent.position}

Dear ${coverLetterContent.recipientName},

${coverLetterContent.content.opening}

${coverLetterContent.content.body.join('\n\n')}

${coverLetterContent.content.closing}

Sincerely,
${portfolioData.personal.name}`;

    try {
      await navigator.clipboard.writeText(coverLetterText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <section id="cover-letter" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Cover Letter
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ATS-optimized cover letter template tailored to complement my resume and showcase relevant experience
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye size={20} />
              {isPreviewOpen ? 'Hide Preview' : 'Preview Cover Letter'}
            </button>
            
            <button
              onClick={() => setIsCustomizing(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Settings size={20} />
              Customize
            </button>
            
            <button
              onClick={handleCopyText}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              {isCopied ? <Check size={20} /> : <Copy size={20} />}
              {isCopied ? 'Copied!' : 'Copy Text'}
            </button>
            
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Download size={20} />
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </button>
          </div>

          {/* Customization Modal */}
          {isCustomizing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Customize Cover Letter</h3>
                  <button
                    onClick={() => setIsCustomizing(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={customData.companyName}
                      onChange={(e) => setCustomData({...customData, companyName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position Title
                    </label>
                    <input
                      type="text"
                      value={customData.position}
                      onChange={(e) => setCustomData({...customData, position: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter position title"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleCustomize}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Apply Changes
                    </button>
                    <button
                      onClick={() => setIsCustomizing(false)}
                      className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isPreviewOpen && (
            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="max-w-3xl mx-auto bg-white p-8 shadow-sm">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {portfolioData.personal.name}
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>{portfolioData.personal.email}</p>
                    <p>{portfolioData.personal.phone}</p>
                    <p>{portfolioData.personal.location}</p>
                  </div>
                </div>

                {/* Date and Recipient */}
                <div className="mb-8">
                  <p className="text-gray-900 mb-4">{coverLetterContent.date}</p>
                  <div className="text-gray-900">
                    <p>{coverLetterContent.recipientName}</p>
                    <p>{coverLetterContent.companyName}</p>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <p className="font-semibold text-gray-900">
                    Re: Application for {coverLetterContent.position}
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-4 text-gray-800 leading-relaxed">
                  <p>Dear {coverLetterContent.recipientName},</p>
                  
                  <p>{coverLetterContent.content.opening}</p>
                  
                  {coverLetterContent.content.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  
                  <p>{coverLetterContent.content.closing}</p>
                  
                  <div className="mt-6">
                    <p>Sincerely,</p>
                    <p className="mt-4 font-semibold">{portfolioData.personal.name}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">ATS Optimized</h4>
              <p className="text-sm text-gray-600">Formatted for applicant tracking systems</p>
            </div>
            
            <div className="text-center p-4">
              <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">PDF Export</h4>
              <p className="text-sm text-gray-600">Professional PDF format ready to send</p>
            </div>
            
            <div className="text-center p-4">
              <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Customizable</h4>
              <p className="text-sm text-gray-600">Tailor for specific companies and roles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverLetter;
