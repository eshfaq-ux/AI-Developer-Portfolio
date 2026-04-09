'use client'

import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const Testimonials = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ triggerOnce: true })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Startup Founder",
      role: "E-Commerce Business Owner",
      company: "Online Retail",
      rating: 5,
      text: "Ashfaq transformed our vision into reality. The e-commerce platform he built handles thousands of transactions seamlessly. His expertise in payment integration and security was invaluable.",
      project: "E-Commerce Platform",
      result: "300% increase in sales",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Tech Entrepreneur",
      role: "SaaS Founder",
      company: "Workflow Solutions",
      rating: 5,
      text: "The workflow automation system reduced our operational costs by 35%. Ashfaq's understanding of business processes and technical implementation is exceptional. Highly recommended!",
      project: "Workflow Automation",
      result: "35% cost reduction",
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "Product Manager",
      role: "Tech Lead",
      company: "Communication Platform",
      rating: 5,
      text: "Built a scalable real-time chat application that handles 100+ concurrent users flawlessly. Professional communication, clean code, and delivered ahead of schedule.",
      project: "Chat Application",
      result: "100+ concurrent users",
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "Business Owner",
      role: "Digital Agency",
      company: "Marketing Solutions",
      rating: 5,
      text: "Ashfaq's AI-powered solutions helped us automate repetitive tasks and focus on growth. His knowledge of OpenAI integration and modern frameworks is impressive.",
      project: "AI Automation Tools",
      result: "60% time saved",
      color: "from-orange-500 to-red-600"
    },
    {
      name: "Startup CTO",
      role: "Technical Director",
      company: "Data Analytics",
      rating: 5,
      text: "The dashboard he created provides real-time insights that drive our business decisions. Beautiful UI, powerful backend, and excellent performance optimization.",
      project: "Analytics Dashboard",
      result: "Real-time insights",
      color: "from-cyan-500 to-blue-600"
    },
    {
      name: "Freelance Client",
      role: "Content Creator",
      company: "Media Production",
      rating: 5,
      text: "Quick turnaround, responsive communication, and quality work. The portfolio website he built showcases my work perfectly and loads incredibly fast.",
      project: "Portfolio Website",
      result: "2s load time",
      color: "from-violet-500 to-purple-600"
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length])
    }
    return visible
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-indigo-50 overflow-hidden" id="testimonials">
      <div className="container-custom px-4 sm:px-6">
        <div 
          ref={headerRef}
          className="text-center mb-16"
          style={animationVariants.fadeInUp(headerVisible)}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
            <Star size={18} className="animate-pulse" />
            Client Testimonials
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            95% client satisfaction rate across 12+ delivered projects
          </p>
        </div>

        {/* Desktop: Sliding Carousel */}
        <div className="hidden lg:block relative" ref={cardsRef}>
          <div className="flex gap-8 max-w-7xl mx-auto">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className="flex-1 bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 animate-slideInRight"
                style={{
                  animation: `slideInRight 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className={`w-16 h-1 bg-gradient-to-r ${testimonial.color} rounded-full mb-6`}></div>
                
                <Quote className="text-indigo-500 mb-4" size={32} />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 italic min-h-[120px]">
                  "{testimonial.text}"
                </p>

                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.color} text-white text-sm font-semibold mb-6`}>
                  {testimonial.result}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-xl`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-indigo-600 mt-1">{testimonial.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 group"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="text-indigo-600 group-hover:-translate-x-1 transition-transform" size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Next testimonials"
            >
              <ChevronRight className="text-white group-hover:translate-x-1 transition-transform" size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Grid View */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto" ref={cardsRef}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              style={animationVariants.fadeInRight(cardsVisible, getStaggerDelay(index, 150))}
            >
              <div className={`w-16 h-1 bg-gradient-to-r ${testimonial.color} rounded-full mb-6`}></div>
              
              <Quote className="text-indigo-500 mb-4" size={32} />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.color} text-white text-sm font-semibold mb-6`}>
                {testimonial.result}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-xl`}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-indigo-600 mt-1">{testimonial.project}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            Want to work together? <a href="#contact" className="text-indigo-600 font-semibold hover:underline transition-all hover:text-indigo-700">Get in touch</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}

export default Testimonials
