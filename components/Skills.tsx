'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import SectionBackground from './SectionBackground'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const Skills = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation({ triggerOnce: true })
  
  const [currentSet, setCurrentSet] = useState(0)
  const [autoSlide, setAutoSlide] = useState(true)

  const handleManualNavigation = (index: number) => {
    setCurrentSet(index)
    setAutoSlide(false)
    setTimeout(() => setAutoSlide(true), 10000)
  }

  const skillSets = [
    // Frontend Development
    [
      { name: 'React', level: 94, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb' },
      { name: 'Next.js', level: 91, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#000000' },
      { name: 'TypeScript', level: 87, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178c6' },
      { name: 'Vue.js', level: 79, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', color: '#4fc08d' },
      { name: 'HTML5', level: 96, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#e34f26' },
      { name: 'CSS3', level: 93, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572b6' },
      { name: 'Tailwind', level: 89, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06b6d4' },
      { name: 'SASS', level: 83, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', color: '#cc6699' },
    ],
    
    // Backend Development
    [
      { name: 'Node.js', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#68d391' },
      { name: 'Python', level: 84, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#ffd93d' },
      { name: 'Express.js', level: 86, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg', color: '#000000' },
      { name: 'FastAPI', level: 78, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', color: '#009688' },
      { name: 'GraphQL', level: 73, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', color: '#e10098' },
      { name: 'REST API', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#ff6b35' },
      { name: 'WebSocket', level: 76, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg', color: '#4a90e2' },
      { name: 'Microservices', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#ff9500' },
    ],

    // Database & Storage
    [
      { name: 'MongoDB', level: 86, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#00ed64' },
      { name: 'PostgreSQL', level: 82, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791' },
      { name: 'MySQL', level: 78, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#4479a1' },
      { name: 'Redis', level: 74, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#dc382d' },
      { name: 'Firebase', level: 81, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#ffca28' },
      { name: 'Supabase', level: 77, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', color: '#3ecf8e' },
      { name: 'Prisma', level: 83, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg', color: '#2d3748' },
      { name: 'Mongoose', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#880000' },
    ],

    // Testing & Quality
    [
      { name: 'Jest', level: 83, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg', color: '#c21325' },
      { name: 'Cypress', level: 78, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg', color: '#17202c' },
      { name: 'Testing Library', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#e33332' },
      { name: 'Playwright', level: 73, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg', color: '#2eac4a' },
      { name: 'Postman', level: 86, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', color: '#ff6c37' },
      { name: 'ESLint', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg', color: '#4b32c3' },
      { name: 'Prettier', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#f7b93e' },
      { name: 'Husky', level: 76, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#42b883' },
    ],

    // DevOps & Tools
    [
      { name: 'Docker', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ed' },
      { name: 'AWS', level: 83, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', color: '#ff9500' },
      { name: 'Vercel', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original-wordmark.svg', color: '#000000' },
      { name: 'Netlify', level: 86, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg', color: '#00c7b7' },
      { name: 'GitHub Actions', level: 78, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#2088ff' },
      { name: 'Nginx', level: 73, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', color: '#009639' },
      { name: 'PM2', level: 76, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#2b037a' },
      { name: 'Linux', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', color: '#fcc624' },
    ],

    // AI & ML Tools
    [
      { name: 'OpenAI API', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', color: '#412991' },
      { name: 'ChatGPT API', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', color: '#10a37f' },
      { name: 'Langchain', level: 83, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg', color: '#1c3c3c' },
      { name: 'Pinecone', level: 78, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', color: '#00d4aa' },
      { name: 'Hugging Face', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', color: '#ff9d00' },
      { name: 'TensorFlow', level: 73, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', color: '#ff6f00' },
      { name: 'Anthropic', level: 76, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', color: '#d4a574' },
      { name: 'Gemini API', level: 78, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', color: '#4285f4' },
    ],
  ]

  const categoryNames = [
    'Frontend Development',
    'Backend Development', 
    'Database & Storage',
    'Testing & Quality',
    'DevOps & Tools',
    'AI & ML Tools'
  ]

  useEffect(() => {
    if (skillsVisible && autoSlide) {
      const interval = setInterval(() => {
        setCurrentSet((prev) => (prev + 1) % skillSets.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [skillsVisible, skillSets.length, autoSlide])

  return (
    <SectionBackground variant="secondary" className="section-padding" id="skills">
      <div className="container-custom px-4 sm:px-6">
        <div 
          ref={headerRef}
          className="text-center mb-12 sm:mb-16"
          style={animationVariants.fadeInUp(headerVisible)}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Technical Expertise</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Comprehensive full-stack development skills with cutting-edge AI integration
          </p>
        </div>
        
        {/* Manual Navigation Buttons */}
        <div 
          className="flex justify-center mb-6 sm:mb-8 flex-wrap gap-2 sm:gap-3 px-4"
          style={animationVariants.fadeInUp(headerVisible, 200)}
        >
          {categoryNames.map((category, index) => (
            <button
              key={index}
              onClick={() => handleManualNavigation(index)}
              className={`px-3 sm:px-4 py-2 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 min-h-[44px] transform hover:scale-105 ${
                currentSet === index
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
              style={animationVariants.scaleIn(headerVisible, getStaggerDelay(index, 80))}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Category Title */}
        <div 
          className="text-center mb-12"
          style={animationVariants.fadeInUp(headerVisible, 400)}
        >
          <div className="inline-block px-8 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-700">
              {categoryNames[currentSet]}
            </h3>
          </div>
        </div>
        
        {/* Enhanced Skills Container */}
        <div 
          className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/30 shadow-xl transform hover:shadow-2xl transition-all duration-300"
          style={animationVariants.scaleIn(headerVisible, 600)}
        >
          <div 
            ref={skillsRef}
            className="flex transition-transform duration-1000 ease-out"
            style={{ transform: `translateX(-${currentSet * 100}%)` }}
          >
            {skillSets.map((skillSet, setIndex) => (
              <div key={setIndex} className="w-full flex-shrink-0 px-4 sm:px-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                  {skillSet.map((skill, index) => (
                    <SkillRing
                      key={`${setIndex}-${skill.name}`}
                      skill={skill}
                      index={index}
                      inView={skillsVisible && currentSet === setIndex}
                      delay={index * 80}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Progress Indicators */}
        <div 
          className="flex justify-center mt-10 space-x-3"
          style={animationVariants.fadeInUp(skillsVisible, 800)}
        >
          {skillSets.map((_, setIndex) => (
            <div
              key={setIndex}
              className={`h-2 rounded-full transition-all duration-500 transform hover:scale-125 ${
                currentSet === setIndex 
                  ? 'w-12 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg' 
                  : 'w-2 bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </SectionBackground>
  )
}

interface Skill {
  name: string
  level: number
  icon: string
  color: string
}

interface SkillRingProps {
  skill: Skill
  index: number
  inView: boolean
  delay: number
}

function SkillRing({ skill, index, inView, delay }: SkillRingProps) {
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    if (inView) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        const duration = 1500 // Faster animation - 1.5 seconds
        const steps = 60 // Optimized steps for smooth but fast progress
        const increment = skill.level / steps
        const stepDuration = duration / steps
        
        let currentProgress = 0
        const interval = setInterval(() => {
          currentProgress += increment
          if (currentProgress >= skill.level) {
            currentProgress = skill.level
            setIsAnimating(false)
            clearInterval(interval)
          }
          setProgress(currentProgress)
          setCount(Math.round(currentProgress))
        }, stepDuration)
        
        return () => clearInterval(interval)
      }, delay)
      
      return () => clearTimeout(timer)
    } else {
      setProgress(0)
      setCount(0)
      setIsAnimating(false)
    }
  }, [inView, skill.level, delay])

  const circumference = 2 * Math.PI * 42
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3 sm:mb-4 transform transition-all duration-300 group-hover:scale-105">
        <svg className="w-28 h-28 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="5"
            fill="none"
          />
          {/* Progress circle - clean without shadows */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={skill.color}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 0.1s linear'
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 transform transition-transform duration-300 group-hover:scale-110">
            <Image 
              src={skill.icon} 
              alt={skill.name}
              width={32}
              height={32}
              className="w-full h-full object-contain"
              style={{ filter: skill.color === '#000000' ? 'invert(1)' : 'none' }}
            />
          </div>
          <div className={`text-sm sm:text-lg font-bold transition-colors duration-300 ${
            isAnimating ? 'text-indigo-600' : 'text-gray-800'
          }`}>
            {count}%
          </div>
        </div>
      </div>
      
      <h3 className="text-xs sm:text-sm font-semibold text-center text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 px-1">
        {skill.name}
      </h3>
    </div>
  )
}

export default Skills
