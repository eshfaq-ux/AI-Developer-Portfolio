'use client'

import { Star, Quote } from 'lucide-react'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const Testimonials = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ triggerOnce: true })

  const testimonials = [
    {
      name: "Client Name",
      role: "CEO, Startup",
      image: "/1000003500.jpg",
      rating: 5,
      text: "Ashfaq delivered exceptional work on our e-commerce platform. His attention to detail and problem-solving skills are outstanding.",
      project: "E-Commerce Platform"
    },
    {
      name: "Client Name",
      role: "Product Manager",
      image: "/1000003500.jpg",
      rating: 5,
      text: "Professional, responsive, and delivered ahead of schedule. The workflow automation saved us 35% operational time.",
      project: "Workflow Automation"
    },
    {
      name: "Client Name",
      role: "Tech Lead",
      image: "/1000003500.jpg",
      rating: 5,
      text: "Great communication and technical expertise. Built a scalable solution that handles our growing user base perfectly.",
      project: "Chat Application"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white" id="testimonials">
      <div className="container-custom px-4 sm:px-6">
        <div 
          ref={headerRef}
          className="text-center mb-16"
          style={animationVariants.fadeInUp(headerVisible)}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Star size={18} />
            Client Testimonials
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            95% client satisfaction rate across 12+ delivered projects
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              style={animationVariants.slideInUp(cardsVisible, getStaggerDelay(index, 150))}
            >
              <Quote className="text-indigo-500 mb-4" size={32} />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
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
          <p className="text-gray-600">
            Want to work together? <a href="#contact" className="text-indigo-600 font-semibold hover:underline">Get in touch</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
