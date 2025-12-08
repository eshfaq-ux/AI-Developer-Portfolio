'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import portfolioData from '@/data/portfolio.json'

const Hero = () => {
  const { personal } = portfolioData
  const [displayedName, setDisplayedName] = useState('')
  const [isNameComplete, setIsNameComplete] = useState(false)
  const [currentRole, setCurrentRole] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number, opacity: number}>>([])
  
  const fullName = personal.name
  const roles = useMemo(() => [
    'Full Stack Developer',
    'AI Integration Specialist', 
    'Software Engineer',
    'Web Application Developer'
  ], [])
  
  // Name typing effect
  useEffect(() => {
    if (!fullName) return
    
    let timeout: NodeJS.Timeout
    let currentIndex = 0
    
    const typeCharacter = () => {
      if (currentIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, currentIndex))
        currentIndex++
        
        if (currentIndex <= fullName.length) {
          timeout = setTimeout(typeCharacter, 100)
        } else {
          setTimeout(() => setIsNameComplete(true), 500)
        }
      }
    }
    
    // Start typing after delay
    timeout = setTimeout(typeCharacter, 1000)
    
    return () => clearTimeout(timeout)
  }, [fullName])

  // Role rotation effect
  useEffect(() => {
    if (!isNameComplete) return
    
    let typeTimeout: NodeJS.Timeout
    let eraseTimeout: NodeJS.Timeout
    let cycleTimeout: NodeJS.Timeout
    
    const typeRole = (role: string) => {
      let charIndex = 0
      setIsTyping(true)
      
      const typeChar = () => {
        if (charIndex <= role.length) {
          setCurrentRole(role.slice(0, charIndex))
          charIndex++
          
          if (charIndex <= role.length) {
            typeTimeout = setTimeout(typeChar, 80)
          } else {
            setIsTyping(false)
          }
        }
      }
      
      typeChar()
    }
    
    const eraseRole = (callback: () => void) => {
      const currentText = roles[roleIndex]
      let charIndex = currentText.length
      
      const eraseChar = () => {
        if (charIndex >= 0) {
          setCurrentRole(currentText.slice(0, charIndex))
          charIndex--
          
          if (charIndex >= 0) {
            eraseTimeout = setTimeout(eraseChar, 50)
          } else {
            setTimeout(callback, 200)
          }
        }
      }
      
      eraseChar()
    }
    
    const cycleRoles = () => {
      // Type current role
      typeRole(roles[roleIndex])
      
      // After 3 seconds, erase and move to next
      cycleTimeout = setTimeout(() => {
        eraseRole(() => {
          setRoleIndex(prev => (prev + 1) % roles.length)
        })
      }, 3000)
    }
    
    // Start the cycle
    const initialTimeout = setTimeout(cycleRoles, 500)
    
    return () => {
      clearTimeout(typeTimeout)
      clearTimeout(eraseTimeout)
      clearTimeout(cycleTimeout)
      clearTimeout(initialTimeout)
    }
  }, [isNameComplete, roleIndex, roles])

  // Optimized particles
  useEffect(() => {
    const particleCount = 50
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.6 + 0.2
    }))
    setParticles(newParticles)

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y <= -5 ? 105 : particle.y - particle.speed
      })))
    }

    const interval = setInterval(animateParticles, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-950 to-black pt-20 relative overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-green-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-3xl top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl bottom-20 right-10"></div>
      </div>

      {/* Content Layer */}
      <div className="container-custom text-center relative z-10 px-4 sm:px-6">
        {/* Professional Profile Image */}
        <div className="mb-12 mt-16 flex justify-center">
          <div className="relative group">
            {/* Subtle glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            {/* Main image container with perfect circular properties */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 p-1 shadow-xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <img 
                  src="/1681207343598.jpg" 
                  alt={`${personal.name} - Professional Profile`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                  loading="eager"
                  style={{
                    filter: 'contrast(1.1) brightness(1.05) saturate(1.02)',
                  }}
                />
              </div>
            </div>
            
            {/* Subtle ring animation */}
            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-all duration-500"></div>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-12">
          <p className={`text-xl sm:text-2xl text-gray-300 mb-6 font-medium transition-all duration-1000 ${isNameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Hello, I'm
          </p>
          <h1 className="leading-none mb-8" role="banner">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                {displayedName.split(' ')[0]}
              </span>
              {displayedName.split(' ')[1] && (
                <span className="text-white font-light ml-3 sm:ml-4">
                  {displayedName.split(' ')[1]}
                </span>
              )}
              <span className={`text-white ${isNameComplete ? 'animate-pulse' : 'animate-pulse'}`}>|</span>
            </span>
          </h1>
        </div>
        
        <div className="mb-12">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl mb-6 font-medium transition-all duration-1000 delay-500 ${isNameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Full Stack Web Developer
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed min-h-[2rem] transition-all duration-300">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {currentRole}
            </span>
            {isNameComplete && (
              <span className="animate-pulse text-green-400">|</span>
            )}
          </p>
          
          <p className={`text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed transition-all duration-1000 delay-1000 ${isNameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Building scalable web applications with intelligent automation
          </p>
        </div>

        {/* CTA */}
        <div className={`mb-8 transition-all duration-1000 delay-1500 ${isNameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a 
            href="#projects" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 group relative overflow-hidden"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
