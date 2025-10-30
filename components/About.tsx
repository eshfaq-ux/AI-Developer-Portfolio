'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Code, Zap, Users, Award, ArrowRight, CheckCircle, Database, Globe, Smartphone, Brain, Shield, Rocket } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import SectionBackground from './SectionBackground'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const About = () => {
  const { about } = portfolioData
  const [activeTab, setActiveTab] = useState('overview')
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: expertiseRef, isVisible: expertiseVisible } = useScrollAnimation({ triggerOnce: true })

  const expertise = [
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'MERN Stack, Next.js, TypeScript',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      level: 95,
      color: 'from-blue-500 via-indigo-500 to-purple-600',
      bgColor: 'from-blue-50/80 via-indigo-50/60 to-purple-50/40',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'MongoDB, PostgreSQL, Redis',
      skills: ['NoSQL', 'SQL', 'Caching', 'Optimization'],
      level: 90,
      color: 'from-emerald-500 via-green-500 to-teal-600',
      bgColor: 'from-emerald-50/80 via-green-50/60 to-teal-50/40',
      shadowColor: 'shadow-emerald-500/20'
    },
    {
      icon: Globe,
      title: 'Web Technologies',
      description: 'React, Node.js, Express.js',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'APIs'],
      level: 92,
      color: 'from-violet-500 via-purple-500 to-fuchsia-600',
      bgColor: 'from-violet-50/80 via-purple-50/60 to-fuchsia-50/40',
      shadowColor: 'shadow-violet-500/20'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'React Native, Flutter',
      skills: ['iOS', 'Android', 'Cross-platform', 'Native'],
      level: 85,
      color: 'from-orange-500 via-red-500 to-pink-600',
      bgColor: 'from-orange-50/80 via-red-50/60 to-pink-50/40',
      shadowColor: 'shadow-orange-500/20'
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'OpenAI, Machine Learning APIs',
      skills: ['GPT', 'Automation', 'Chatbots', 'ML APIs'],
      level: 88,
      color: 'from-rose-500 via-pink-500 to-purple-600',
      bgColor: 'from-rose-50/80 via-pink-50/60 to-purple-50/40',
      shadowColor: 'shadow-rose-500/20'
    },
    {
      icon: Shield,
      title: 'Security & Testing',
      description: 'JWT, OAuth, Unit Testing',
      skills: ['Authentication', 'Testing', 'Security', 'DevOps'],
      level: 87,
      color: 'from-cyan-500 via-teal-500 to-blue-600',
      bgColor: 'from-cyan-50/80 via-teal-50/60 to-blue-50/40',
      shadowColor: 'shadow-cyan-500/20'
    }
  ]

  const highlights = [
    'Full Stack Development with MERN Stack',
    'AI Integration & Automation Solutions',
    'Responsive & Mobile-First Design',
    'Performance Optimization & Testing',
    'RESTful APIs & Database Management',
    'Modern DevOps & CI/CD Practices'
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'approach', label: 'Approach' }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white" id="about">
      <div className="container-custom px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div 
            ref={headerRef}
            className="text-center mb-16"
            style={animationVariants.fadeInUp(headerVisible)}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Users size={18} />
              About Me
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6 relative">
              <span className="relative z-10">Web Developer & Innovator</span>
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl rounded-2xl"></div>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Passionate developer crafting innovative solutions with modern technologies
            </p>
            
            {/* Enhanced Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  1+
                </div>
                <div className="text-sm text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  5+
                </div>
                <div className="text-sm text-gray-600 font-medium">Projects Delivered</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  95%
                </div>
                <div className="text-sm text-gray-600 font-medium">Client Satisfaction</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  8.5
                </div>
                <div className="text-sm text-gray-600 font-medium">Academic CGPA</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Content */}
            <div 
              className="space-y-8"
              style={animationVariants.fadeInLeft(contentVisible, 200)}
            >
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 p-2 bg-gray-100/80 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex-1 min-w-0 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-white/60 hover:scale-105'
                    }`}
                    style={animationVariants.fadeInUp(contentVisible, getStaggerDelay(index, 100))}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === 'overview' && (
                  <div className="space-y-6" style={animationVariants.fadeInUp(contentVisible, 400)}>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {about.description}
                    </p>
                    <div className="flex items-center gap-2 text-indigo-600 transform hover:scale-105 transition-transform duration-300">
                      <ArrowRight size={20} />
                      <span className="font-medium">Ready to bring your ideas to life</span>
                    </div>
                  </div>
                )}

                {activeTab === 'expertise' && (
                  <div className="space-y-6" style={animationVariants.fadeInUp(contentVisible, 400)}>
                    <p className="text-gray-700 leading-relaxed">
                      I specialize in building scalable web applications with modern technologies, 
                      focusing on performance, user experience, and maintainable code architecture.
                    </p>
                    <div className="grid gap-3">
                      {highlights.map((highlight, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300"
                          style={animationVariants.fadeInLeft(contentVisible, getStaggerDelay(index, 80))}
                        >
                          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'approach' && (
                  <div className="space-y-6" style={animationVariants.fadeInUp(contentVisible, 400)}>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      My development approach focuses on understanding business requirements, 
                      implementing best practices, and delivering solutions that scale with your growth.
                    </p>
                    <div className="grid gap-4">
                      {[
                        { 
                          title: 'Problem-Solving First', 
                          desc: 'Deep analysis of requirements and user needs before implementation', 
                          icon: '🎯',
                          color: 'blue',
                          metrics: 'Requirements Analysis → Solution Design → Implementation'
                        },
                        { 
                          title: 'Quality & Performance', 
                          desc: 'Clean, maintainable code with comprehensive testing and optimization', 
                          icon: '⚡',
                          color: 'green',
                          metrics: '95% Code Coverage • <2s Load Time • 99.9% Uptime'
                        },
                        { 
                          title: 'Continuous Learning', 
                          desc: 'Staying current with emerging technologies and industry best practices', 
                          icon: '📚',
                          color: 'purple',
                          metrics: 'Latest Frameworks • Modern Patterns • Industry Standards'
                        }
                      ].map((item, index) => (
                        <div 
                          key={index}
                          className={`bg-gradient-to-r from-${item.color}-50 to-${item.color}-100/50 p-6 rounded-xl border border-${item.color}-200 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg`}
                          style={animationVariants.fadeInRight(contentVisible, getStaggerDelay(index, 100))}
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-2xl">{item.icon}</div>
                            <div className="flex-1">
                              <h4 className={`font-bold text-${item.color}-900 mb-2 text-lg`}>{item.title}</h4>
                              <p className={`text-${item.color}-800 mb-3 leading-relaxed`}>{item.desc}</p>
                              <div className={`text-xs text-${item.color}-700 font-medium bg-${item.color}-200/50 px-3 py-1 rounded-full inline-block`}>
                                {item.metrics}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div 
              className="space-y-8"
              style={animationVariants.fadeInRight(contentVisible, 300)}
            >
              {/* Minimal Card Design */}
              <div className="space-y-6">
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image 
                        src="/1000003500.jpg" 
                        alt={portfolioData.personal.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-2xl object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{portfolioData.personal.name}</h3>
                      <p className="text-indigo-600 font-medium">{portfolioData.personal.title}</p>
                      <p className="text-gray-500 text-sm mt-1">📍 {portfolioData.personal.location}</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Status Cards */}
                <div className="grid gap-4">
                  {[
                    { 
                      icon: '🚀', 
                      title: 'Availability', 
                      subtitle: 'Open to opportunities',
                      detail: 'Ready for new projects',
                      color: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800'
                    },
                    { 
                      icon: '⚡', 
                      title: 'Response Time', 
                      subtitle: 'Within 24 hours',
                      detail: 'Quick communication',
                      color: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-800'
                    },
                    { 
                      icon: '🌐', 
                      title: 'Work Style', 
                      subtitle: 'Remote & Collaborative',
                      detail: 'Global team experience',
                      color: 'bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200 text-purple-800'
                    },
                    { 
                      icon: '🎯', 
                      title: 'Success Rate', 
                      subtitle: '95% Project Success',
                      detail: 'Proven track record',
                      color: 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 text-orange-800'
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`${item.color} p-4 rounded-xl border transform hover:scale-105 transition-all duration-300 hover:shadow-md`}
                      style={animationVariants.fadeInUp(contentVisible, getStaggerDelay(index, 100))}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{item.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">{item.title}</h4>
                          <p className="text-sm opacity-90">{item.subtitle}</p>
                          <p className="text-xs opacity-75 mt-1">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {[
                    { 
                      icon: '💼', 
                      title: 'Availability', 
                      subtitle: 'Open to New Projects',
                      color: 'bg-blue-50 border-blue-200 text-blue-800'
                    },
                    { 
                      icon: '🌐', 
                      title: 'Work Style', 
                      subtitle: 'Remote & Collaborative',
                      color: 'bg-purple-50 border-purple-200 text-purple-800'
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`${item.color} rounded-2xl p-4 border-2 hover:scale-105 transition-all duration-300 cursor-pointer`}
                      style={animationVariants.fadeInUp(contentVisible, getStaggerDelay(index, 100) + 400)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-sm opacity-80">{item.subtitle}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Rocket size={24} className="group-hover:translate-y-1 transition-transform duration-300" />
                    <span className="text-lg font-semibold">Let's Work Together</span>
                  </div>
                  <p className="text-indigo-100 text-sm">Ready to bring your ideas to life</p>
                </div>
              </div>
            </div>
          </div>

          {/* Expertise Section */}
          <div 
            ref={expertiseRef}
            className="mt-16"
            style={animationVariants.fadeInUp(expertiseVisible)}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent mb-4">
                Core Expertise
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Specialized skills and technologies that drive innovative solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertise.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className={`group relative bg-gradient-to-br ${item.bgColor} backdrop-blur-xl rounded-3xl p-8 border border-white/50 hover:border-white/80 transition-all duration-700 hover:scale-105 hover:shadow-2xl ${item.shadowColor} overflow-hidden`}
                    style={animationVariants.slideInUp(expertiseVisible, getStaggerDelay(index, 150))}
                  >
                    {/* Enhanced Background Pattern */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                      <div className={`absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br ${item.color} blur-3xl transform rotate-45 group-hover:rotate-90 transition-transform duration-1000`}></div>
                      <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full bg-gradient-to-tr ${item.color} blur-2xl transform -rotate-45 group-hover:-rotate-90 transition-transform duration-1000`}></div>
                    </div>

                    {/* Animated Border Glow */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 -z-10`}></div>

                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${item.color} opacity-30 animate-pulse`}
                          style={{
                            top: `${20 + i * 25}%`,
                            right: `${10 + i * 15}%`,
                            animationDelay: `${i * 500}ms`,
                            animationDuration: `${2000 + i * 500}ms`
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10">
                      {/* Enhanced Icon with Glow Effect */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-700`}></div>
                          <IconComponent size={28} className="text-white relative z-10" />
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.level}%</div>
                          <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Proficiency</div>
                        </div>
                      </div>

                      {/* Enhanced Progress Bar */}
                      <div className="mb-6">
                        <div className="w-full bg-white/40 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-inner">
                          <div 
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1500 ease-out shadow-lg relative overflow-hidden`}
                            style={{ 
                              width: expertiseVisible ? `${item.level}%` : '0%',
                              transitionDelay: `${index * 200}ms`
                            }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Title and Description */}
                      <h4 className={`text-xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:via-purple-600 group-hover:to-blue-700 transition-all duration-500`}>
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                        {item.description}
                      </p>

                      {/* Enhanced Skills Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full bg-white/70 backdrop-blur-sm text-gray-700 border border-white/60 group-hover:bg-white/90 group-hover:border-white/80 group-hover:shadow-md transition-all duration-500 hover:scale-105`}
                            style={{
                              transitionDelay: `${skillIndex * 100}ms`
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Enhanced Hover Indicator - Removed */}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
