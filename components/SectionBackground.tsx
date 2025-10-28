import React from 'react'

interface SectionBackgroundProps {
  variant: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'hero'
  children: React.ReactNode
  className?: string
  id?: string
}

const SectionBackground = ({ variant, children, className = '', id }: SectionBackgroundProps) => {
  const getBackgroundClasses = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
      case 'primary':
        return 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
      case 'secondary':
        return 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      case 'tertiary':
        return 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'
      case 'quaternary':
        return 'bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50'
      default:
        return 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
    }
  }

  const getDecorationElements = () => {
    const baseElements = (
      <>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-cyan-400/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </>
    )

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {baseElements}
        {/* Floating particles */}
        <div className="absolute top-32 left-16 w-2 h-2 bg-indigo-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-48 right-32 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-48 right-16 w-3 h-3 bg-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>
    )
  }

  return (
    <section id={id} className={`${getBackgroundClasses()} relative overflow-hidden ${className}`}>
      {getDecorationElements()}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

export default SectionBackground
