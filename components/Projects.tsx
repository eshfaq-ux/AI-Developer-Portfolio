'use client'

import { useState } from 'react'
import { ExternalLink, Github, Star, Calendar, TrendingUp } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import SectionBackground from './SectionBackground'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const Projects = () => {
  const { projects } = portfolioData
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation({ triggerOnce: true })

  return (
    <SectionBackground variant="tertiary" className="section-padding" id="projects">
      <div className="container-custom">
        <div 
          ref={headerRef}
          className="text-center mb-16"
          style={animationVariants.fadeInUp(headerVisible)}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Innovative solutions built with cutting-edge technologies and AI integration
          </p>
        </div>
        
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={animationVariants.slideInUp(projectsVisible, getStaggerDelay(index, 150))}
            >
              <ProjectCard3D project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </SectionBackground>
  )
}

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  impact: string
  github: string
  demo: string
  featured: boolean
}

interface ProjectCard3DProps {
  project: Project
  index: number
}

function ProjectCard3D({ project, index }: ProjectCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative h-[320px] sm:h-[380px] md:h-[420px] perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsFlipped(false)
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        } ${isHovered ? 'scale-105' : ''}`}
        style={{
          transform: `${isFlipped ? 'rotateY(180deg)' : ''} ${isHovered ? 'scale(1.05) translateY(-10px)' : ''}`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Project Image/Gradient */}
          <div className={`h-32 sm:h-40 md:h-48 bg-gradient-to-br ${getProjectGradient(index)} relative`}>
            {project.featured && (
              <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1">
                <Star size={14} fill="currentColor" />
                Featured
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Front Content */}
          <div className="p-3 sm:p-4 md:p-6 flex flex-col h-[calc(100%-8rem)] sm:h-[calc(100%-10rem)] md:h-[calc(100%-12rem)]">
            <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed flex-grow">
              {project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description}
            </p>
            
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {project.tech.slice(0, 3).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            <div className="text-center mt-auto">
              <p className="text-xs text-gray-500 mb-2">Tap to see details</p>
              <div className="w-8 h-1 bg-blue-500 rounded mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-xl text-white overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="p-4 sm:p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
              <Calendar size={18} className="text-indigo-200" />
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <TrendingUp size={14} className="text-green-300" />
                <span className="text-xs sm:text-sm font-medium">Impact</span>
              </div>
              <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
                {project.impact}
              </p>
            </div>

            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-indigo-200">Tech Stack</h4>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded border border-white/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex gap-2 sm:gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors py-3 sm:py-3 rounded-lg border border-white/30 min-h-[44px]"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
                <span className="text-xs sm:text-sm font-medium">Code</span>
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-white text-indigo-600 hover:bg-gray-100 transition-colors py-3 sm:py-3 rounded-lg font-medium min-h-[44px]"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                <span className="text-xs sm:text-sm">Demo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getProjectGradient(index: number) {
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600', 
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-indigo-500 to-purple-600'
  ]
  return gradients[index % gradients.length]
}

export default Projects
