'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, TrendingUp, Award, Code, Briefcase, Star, ChevronDown, ExternalLink } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import SectionBackground from './SectionBackground'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const Experience = () => {
  const { experience } = portfolioData
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation({ triggerOnce: true })

  return (
    <SectionBackground variant="quaternary" className="section-padding" id="experience">
      <div className="container-custom px-4 sm:px-6">
        <div 
          ref={headerRef}
          className="text-center mb-16"
          style={animationVariants.fadeInUp(headerVisible)}
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Briefcase size={16} />
            Professional Experience
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Career Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Building innovative solutions and leading teams across diverse technology landscapes
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto" ref={timelineRef}>
          <div className="relative">
            {/* Enhanced Timeline Line with Gradient */}
            <div className="absolute left-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-blue-300 to-purple-200 rounded-full"></div>
            
            {/* Animated Progress Line with Glow */}
            <div 
              className={`absolute left-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-indigo-500 via-blue-500 to-purple-500 rounded-full transition-all duration-3000 ease-out ${
                timelineVisible ? 'h-full' : 'h-0'
              }`}
              style={{ 
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.8), 0 0 60px rgba(99, 102, 241, 0.4)'
              }}
            ></div>

            {/* Floating Timeline Markers */}
            <div className="absolute left-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 top-0 bottom-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 bg-indigo-400 rounded-full transition-all duration-1000 ${
                    timelineVisible ? 'opacity-60 animate-pulse' : 'opacity-0'
                  }`}
                  style={{
                    top: `${20 + i * 15}%`,
                    left: '-4px',
                    animationDelay: `${i * 500}ms`
                  }}
                />
              ))}
            </div>

            <div className="space-y-12 sm:space-y-16">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  style={animationVariants.slideInUp(timelineVisible, getStaggerDelay(index, 200))}
                >
                  <TimelineCard 
                    experience={exp} 
                    index={index}
                    inView={timelineVisible}
                    isLast={index === experience.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionBackground>
  )
}

interface ExperienceData {
  title: string
  company: string
  duration: string
  description: string
  location?: string
  type?: string
  achievements?: string[]
  technologies?: string[]
}

interface TimelineCardProps {
  experience: ExperienceData
  index: number
  inView: boolean
  isLast: boolean
}

function TimelineCard({ experience, index, inView, isLast }: TimelineCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const isEven = index % 2 === 0

  return (
    <div 
      className={`relative transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Enhanced Timeline Dot */}
      <div className="absolute left-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-20">
        <div 
          className={`relative w-8 h-8 rounded-full border-4 border-white transition-all duration-500 cursor-pointer group ${
            isHovered ? 'bg-gradient-to-r from-indigo-500 to-purple-500 scale-150 shadow-2xl' : 'bg-gradient-to-r from-indigo-400 to-blue-400 scale-125'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Pulse Animation */}
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isHovered ? 'bg-indigo-400 animate-ping opacity-75' : ''
          }`}></div>
          
          {/* Rotating Ring */}
          <div className={`absolute -inset-2 rounded-full border-2 border-indigo-300 transition-all duration-1000 ${
            isHovered ? 'animate-spin border-indigo-500' : ''
          }`}></div>
          
          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase size={14} className="text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className={`ml-20 sm:ml-0 ${
        isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'
      } sm:w-1/2 ${
        isEven ? 'sm:mr-auto' : 'sm:ml-auto'
      }`}>
        <div 
          className={`relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 transition-all duration-500 cursor-pointer overflow-hidden ${
            isHovered || isExpanded ? 'shadow-2xl scale-105 border-indigo-200/50' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>
          
          {/* Floating Decorative Elements */}
          <div className="absolute top-4 right-4 opacity-10">
            <div className={`w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full transition-transform duration-1000 ${
              isHovered ? 'rotate-45 scale-110' : ''
            }`}></div>
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                    {experience.type || 'Full-time'}
                  </span>
                </div>
                
                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                  <ChevronDown size={20} className="text-gray-400" />
                </div>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent mb-3 leading-tight">
                {experience.title}
              </h3>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <p className="text-xl font-semibold text-indigo-600 flex items-center gap-2">
                  {experience.company}
                  <ExternalLink size={16} className="opacity-60" />
                </p>
                
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                    <Calendar size={14} />
                    <span className="text-sm font-medium">{experience.duration}</span>
                  </div>
                  
                  {experience.location && (
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                      <MapPin size={14} />
                      <span className="text-sm font-medium">{experience.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed text-base">
                {experience.description}
              </p>
            </div>

            {/* Quick Stats */}
            {(experience.achievements || experience.technologies) && (
              <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                {experience.achievements && (
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-yellow-500" />
                    <span>{experience.achievements.length} Achievements</span>
                  </div>
                )}
                {experience.technologies && (
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-blue-500" />
                    <span>{experience.technologies.length} Technologies</span>
                  </div>
                )}
              </div>
            )}

            {/* Expandable Content */}
            {(experience.achievements || experience.technologies) && (
              <div className={`transition-all duration-500 overflow-hidden ${
                isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {/* Achievements */}
                {experience.achievements && experience.achievements.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <TrendingUp size={14} className="text-white" />
                      </div>
                      Key Achievements
                    </h4>
                    <div className="space-y-3">
                      {experience.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start gap-3 group">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                          <span className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                        <Code size={14} className="text-white" />
                      </div>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 text-sm font-medium rounded-full hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Experience
