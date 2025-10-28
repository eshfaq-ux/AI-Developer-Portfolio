'use client'

import { useState } from 'react'
import { Mail, Linkedin, Github, MessageCircle, MapPin, Send, Phone, Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const Contact = () => {
  const { personal } = portfolioData
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ triggerOnce: true })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personal.phone || '+1 (555) 123-4567',
      href: `tel:${personal.phone || '+15551234567'}`,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personal.location,
      href: '#',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Calendar,
      label: 'Schedule',
      value: 'Book a meeting',
      href: '#',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personal.linkedin,
      color: 'text-blue-600'
    },
    {
      icon: Github,
      label: 'GitHub',
      href: personal.github,
      color: 'text-gray-800'
    },
    {
      icon: MessageCircle,
      label: 'Telegram',
      href: `https://t.me/${personal.telegram?.replace('@', '')}`,
      color: 'text-blue-500'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-cyan-400/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div 
            ref={headerRef}
            className="text-center mb-16"
            style={animationVariants.fadeInUp(headerVisible)}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Let's Work Together</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
            </p>
          </div>

          <div ref={contentRef} className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div 
                className="space-y-6"
                style={animationVariants.fadeInLeft(contentVisible, 200)}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon
                  return (
                    <a
                      key={index}
                      href={method.href}
                      className={`flex items-center p-4 ${method.bgColor} rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 group transform hover:scale-105 hover:-translate-y-1`}
                      style={animationVariants.fadeInLeft(contentVisible, getStaggerDelay(index, 100) + 300)}
                    >
                      <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent size={20} className={method.color} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{method.label}</p>
                        <p className="text-gray-600 text-sm">{method.value}</p>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Social Links */}
              <div 
                className="space-y-6"
                style={animationVariants.fadeInLeft(contentVisible, 600)}
              >
                <h3 className="text-xl font-bold text-gray-900">Connect With Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 flex items-center justify-center hover:shadow-lg transition-all duration-300 group transform hover:scale-110 hover:-translate-y-1"
                        style={animationVariants.scaleIn(contentVisible, getStaggerDelay(index, 100) + 700)}
                      >
                        <IconComponent size={20} className={`${social.color} group-hover:scale-110 transition-transform`} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div 
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 transform hover:shadow-2xl transition-all duration-300"
              style={animationVariants.fadeInRight(contentVisible, 400)}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 transform animate-pulse">
                  <CheckCircle className="text-green-600" size={20} />
                  <p className="text-green-800">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 transform animate-pulse">
                  <AlertCircle className="text-red-600" size={20} />
                  <p className="text-red-800">Failed to send message. Please try again or contact me directly.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div style={animationVariants.fadeInUp(contentVisible, 600)}>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all transform hover:scale-105 ${
                        errors.name ? 'border-red-300' : 'border-white/30'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div style={animationVariants.fadeInUp(contentVisible, 700)}>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all transform hover:scale-105 ${
                        errors.email ? 'border-red-300' : 'border-white/30'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div style={animationVariants.fadeInUp(contentVisible, 800)}>
                  <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all transform hover:scale-105 ${
                      errors.subject ? 'border-red-300' : 'border-white/30'
                    }`}
                    placeholder="Project inquiry"
                  />
                  {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                </div>
                
                <div style={animationVariants.fadeInUp(contentVisible, 900)}>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none transform hover:scale-105 ${
                      errors.message ? 'border-red-300' : 'border-white/30'
                    }`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                  {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={animationVariants.scaleIn(contentVisible, 1000)}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
