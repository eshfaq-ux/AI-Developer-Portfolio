'use client'

import { useState } from 'react'
import { FileText, Zap, Download, Brain, CheckCircle, AlertTriangle, Target, Sparkles } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

interface AIAnalysisResult {
  matchScore: number
  missingKeywords: string[]
  presentKeywords: string[]
  suggestions: string[]
  optimizedContent: {
    summary: string
    skills: string[]
    experience: Array<{
      title: string
      company: string
      description: string
      achievements: string[]
    }>
    projects: Array<{
      title: string
      description: string
      impact: string
    }>
  }
  atsScore: number
  improvements: string[]
}

const ResumeCustomizer = () => {
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AIAnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState('input')
  const [downloadFormat, setDownloadFormat] = useState('pdf')

  const analyzeWithAI = async () => {
    if (!jobDescription.trim()) return
    
    setIsAnalyzing(true)
    
    try {
      const response = await fetch('/api/ai-resume-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          currentResume: {
            personal: portfolioData.personal,
            skills: portfolioData.skills,
            experience: portfolioData.experience,
            projects: portfolioData.projects
          }
        })
      })
      
      if (response.ok) {
        const aiResult = await response.json()
        setResult(aiResult)
        setActiveTab('analysis')
      } else {
        throw new Error('AI analysis failed')
      }
    } catch (error) {
      console.error('Analysis error:', error)
      alert('AI analysis failed. Please check your OpenAI API configuration.')
    }
    
    setIsAnalyzing(false)
  }

  const downloadCustomizedResume = async () => {
    if (!result) return
    
    try {
      const response = await fetch('/api/generate-optimized-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          optimizedContent: result.optimizedContent,
          format: downloadFormat,
          jobDescription
        })
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `optimized-resume.${downloadFormat}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <Brain size={28} className="text-white" />
        </div>
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
            AI Resume Optimizer
          </h3>
          <p className="text-gray-600">Advanced AI-powered resume customization with ATS optimization</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-2xl">
        {[
          { id: 'input', label: 'Job Analysis', icon: Target },
          { id: 'analysis', label: 'AI Insights', icon: Brain },
          { id: 'download', label: 'Download', icon: Download }
        ].map(tab => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              disabled={tab.id === 'analysis' && !result}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-indigo-600 disabled:opacity-50'
              }`}
            >
              <IconComponent size={18} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Input Tab */}
      {activeTab === 'input' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here for AI analysis..."
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              Include requirements, responsibilities, and preferred qualifications for best results
            </p>
          </div>
          
          <button
            onClick={analyzeWithAI}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Analyze & Optimize with AI
              </>
            )}
          </button>
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && result && (
        <div className="space-y-8">
          {/* Scores */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-green-800">Match Score</h4>
                <div className="text-3xl font-bold text-green-600">{result.matchScore}%</div>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${result.matchScore}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-blue-800">ATS Score</h4>
                <div className="text-3xl font-bold text-blue-600">{result.atsScore}%</div>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${result.atsScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Keywords Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                Present Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.presentKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-600" size={20} />
                Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Optimization Suggestions</h4>
            <div className="space-y-3">
              {result.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <Zap size={18} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span className="text-indigo-800 text-sm">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Optimized Content Preview */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">AI-Optimized Content</h4>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h5 className="font-semibold text-purple-900 mb-2">Professional Summary</h5>
                <p className="text-purple-800 text-sm leading-relaxed">{result.optimizedContent.summary}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h5 className="font-semibold text-blue-900 mb-2">Prioritized Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {result.optimizedContent.skills.slice(0, 8).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Tab */}
      {activeTab === 'download' && result && (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <FileText size={32} className="text-white" />
          </div>
          
          <div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">Resume Optimized!</h4>
            <p className="text-gray-600">Your resume has been intelligently customized for maximum ATS compatibility</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <div className="text-2xl font-bold text-green-600">{result.matchScore}%</div>
                <div className="text-sm text-gray-600">Match Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{result.atsScore}%</div>
                <div className="text-sm text-gray-600">ATS Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{result.missingKeywords.length}</div>
                <div className="text-sm text-gray-600">Keywords Added</div>
              </div>
            </div>

            {/* Format Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Download Format</label>
              <div className="flex gap-2 justify-center">
                {['pdf', 'docx', 'txt'].map(format => (
                  <button
                    key={format}
                    onClick={() => setDownloadFormat(format)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      downloadFormat === format
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={downloadCustomizedResume}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Download size={20} />
            Download Optimized Resume ({downloadFormat.toUpperCase()})
          </button>
        </div>
      )}
    </div>
  )
}

export default ResumeCustomizer
