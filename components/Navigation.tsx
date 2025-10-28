'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Download } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#resume', label: 'Resume' },
    { href: '#cover-letter', label: 'Cover Letter' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 py-3' 
        : 'bg-white/70 backdrop-blur-sm py-4'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between w-full">
          {/* Logo Section - Left Corner */}
          <div className="flex-shrink-0 mr-16">
            <a href="#" className="group flex items-center">
              <div className="relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                  Ashfaq
                </span>
                <span className="text-2xl font-light text-gray-700 ml-1">
                  Nabi
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-300 group-hover:w-full"></div>
              </div>
            </a>
          </div>

          {/* Navigation Section - Right Side */}
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 flex-nowrap">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 relative group py-2 whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              
              <a
                href="#resume"
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full font-medium hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Download size={16} />
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-white/50 transition-all duration-300 backdrop-blur-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/20 bg-white/90 backdrop-blur-md rounded-2xl">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors rounded-lg hover:bg-white/50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#resume"
              className="inline-flex items-center gap-2 mt-4 mx-4 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full font-medium hover:from-indigo-700 hover:to-blue-700 transition-all duration-300"
            >
              <Download size={16} />
              Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
