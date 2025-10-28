'use client'

import { useState, useEffect } from 'react'
import { Download, FileText, CheckCircle, Star, Award, Target, Zap, Share2, Linkedin, Twitter, Mail, Copy } from 'lucide-react'
import { generateResumePDF } from '@/utils/resumeGenerator'
import portfolioData from '@/data/portfolio.json'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const Resume = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ triggerOnce: true })
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadCount, setDownloadCount] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [portfolioUrl, setPortfolioUrl] = useState('')

  useEffect(() => {
    // Use production URL when deployed, fallback for development
    const currentUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const productionUrl = 'https://ashfaq-nabi-portfolio.vercel.app' // Replace with your actual domain
    
    setPortfolioUrl(currentUrl.includes('localhost') ? productionUrl : currentUrl)
  }, [])

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      generateResumePDF(portfolioData)
      setDownloadCount(prev => prev + 1)
    } catch (error) {
      console.error('Error generating resume:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const shareText = `Check out ${portfolioData.personal.name}'s professional portfolio and resume - Full Stack Developer with expertise in React, Node.js, and AI integration!`
  const shareUrl = portfolioUrl

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)
    
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      email: `mailto:?subject=${encodeURIComponent(`${portfolioData.personal.name}'s Portfolio`)}&body=${encodedText}%20${encodedUrl}`
    }
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
    setShowShareMenu(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <section id="resume" className="section-padding bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Professional Resume</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Download my ATS-optimized resume or share my portfolio across platforms
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Main Download & Share Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-white/20 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mb-6">
                <FileText size={40} className="text-white" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Download & Share Resume
              </h3>
              
              <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
                Get my comprehensive resume in ATS-optimized PDF format or share my portfolio 
                across social platforms.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    isGenerating 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download size={24} />
                      Download PDF
                    </>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
                  >
                    <Share2 size={24} />
                    Share Portfolio
                  </button>

                  {/* Share Menu */}
                  {showShareMenu && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 min-w-[280px]">
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                        >
                          <Linkedin size={20} className="text-blue-600" />
                          <span className="text-sm font-medium group-hover:text-blue-600">LinkedIn</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('twitter')}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 transition-colors group"
                        >
                          <Twitter size={20} className="text-sky-600" />
                          <span className="text-sm font-medium group-hover:text-sky-600">Twitter</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('email')}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                        >
                          <Mail size={20} className="text-gray-600" />
                          <span className="text-sm font-medium group-hover:text-gray-600">Email</span>
                        </button>
                        
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                        >
                          <Copy size={20} className="text-gray-600" />
                          <span className="text-sm font-medium group-hover:text-gray-600">
                            {copied ? 'Copied!' : 'Copy Link'}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {downloadCount > 0 && (
                <p className="text-sm text-gray-500 mt-4">
                  Generated {downloadCount} time{downloadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 text-center group hover:bg-white/80 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">ATS Optimized</h4>
              <p className="text-gray-600 text-sm">
                95%+ ATS compatibility with proper keywords and structure.
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 text-center group hover:bg-white/80 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Share2 size={24} className="text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Easy Sharing</h4>
              <p className="text-gray-600 text-sm">
                Share across LinkedIn, Twitter, and email instantly.
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 text-center group hover:bg-white/80 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Award size={24} className="text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Achievement Focused</h4>
              <p className="text-gray-600 text-sm">
                Quantified accomplishments and impact metrics that showcase real value.
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 text-center group hover:bg-white/80 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Zap size={24} className="text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Always Updated</h4>
              <p className="text-gray-600 text-sm">
                Auto-synced with latest projects and achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
