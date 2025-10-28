'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Award, Calendar, Building, ExternalLink, X, Download, Star, Shield, Trophy } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const Certifications = () => {
  const { certifications } = portfolioData
  const [selectedCert, setSelectedCert] = useState<any>(null)
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: certsRef, isVisible: certsVisible } = useScrollAnimation({ triggerOnce: true })

  if (!certifications || certifications.length === 0) {
    return null
  }

  const openCertificate = (cert: any) => {
    setSelectedCert(cert)
  }

  const closeCertificate = () => {
    setSelectedCert(null)
  }

  return (
    <>
      <section id="certifications" className="section-padding bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Enhanced Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '500ms' }}></div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-16 w-4 h-4 bg-purple-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-48 right-32 w-6 h-6 bg-indigo-400 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-pink-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '700ms' }}></div>
          <div className="absolute bottom-48 right-16 w-5 h-5 bg-cyan-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1000ms' }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div 
            ref={headerRef}
            className="text-center mb-16"
            style={animationVariants.fadeInUp(headerVisible)}
          >
            <div 
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 mb-4"
              style={animationVariants.scaleIn(headerVisible, 200)}
            >
              <Trophy className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 font-semibold text-xs uppercase tracking-wider">Professional Excellence</span>
            </div>
            
            <h2 
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight"
              style={animationVariants.fadeInUp(headerVisible, 400)}
            >
              Professional Certifications
            </h2>
            
            <p 
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={animationVariants.fadeInUp(headerVisible, 600)}
            >
              Validated expertise through professional certification programs
            </p>
            
            <div 
              className="flex items-center justify-center gap-6 mt-6"
              style={animationVariants.fadeInUp(headerVisible, 800)}
            >
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="font-medium">Industry Verified</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">Professional Grade</span>
              </div>
            </div>
          </div>

          <div ref={certsRef} className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/40 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                  style={animationVariants.slideInUp(certsVisible, getStaggerDelay(index, 200))}
                >
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/3 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-200/20 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-200/20 to-transparent rounded-tr-full"></div>
                  
                  <div className="relative z-10 flex flex-col lg:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                          <Award className="w-10 h-10 text-white" />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                          <Star className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between mb-6">
                        <div className="mb-4 xl:mb-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-500 leading-tight">
                            {cert.title}
                          </h3>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full">
                              <Building className="w-4 h-4 mr-2 text-purple-600" />
                              <span className="font-semibold text-purple-700">{cert.issuer}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-xl shadow-lg">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="font-semibold">{cert.date}</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-xl p-4 mb-6 border border-gray-100">
                        <p className="text-gray-700 leading-relaxed font-medium">
                          {cert.description}
                        </p>
                      </div>
                      
                      {cert.certificate && (
                        <div className="flex flex-wrap gap-3">
                          <button 
                            onClick={() => openCertificate(cert)}
                            className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <ExternalLink className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                            View Certificate
                          </button>
                          <button className="inline-flex items-center gap-2 bg-white border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Certificate Preview Slide */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex">
          {/* Enhanced Backdrop */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/20 to-indigo-900/30 backdrop-blur-md"
            onClick={closeCertificate}
          ></div>
          
          {/* Enhanced Slide Panel */}
          <div className="ml-auto w-full max-w-3xl bg-white shadow-2xl transform transition-all duration-500 ease-out translate-x-0 border-l-4 border-purple-500">
            <div className="h-full flex flex-col">
              {/* Enhanced Header */}
              <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20"></div>
                <div className="relative z-10 flex items-center justify-between p-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{selectedCert.title}</h3>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-purple-200" />
                      <p className="text-purple-100 font-medium">{selectedCert.issuer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="font-semibold text-sm">{selectedCert.date}</span>
                    </div>
                    <button
                      onClick={closeCertificate}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Certificate Display */}
              <div className="flex-1 p-6 overflow-auto bg-gradient-to-br from-gray-50 to-purple-50/30">
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 mb-6">
                  {selectedCert.certificate.endsWith('.pdf') ? (
                    <div className="w-full h-96 bg-white rounded-lg shadow-inner border border-gray-100">
                      <iframe
                        src={selectedCert.certificate}
                        className="w-full h-full rounded-lg"
                        title={`${selectedCert.title} Certificate`}
                      />
                    </div>
                  ) : (
                    <Image
                      src={selectedCert.certificate}
                      alt={`${selectedCert.title} Certificate`}
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDIyNSAxNzVIMTc1TDIwMCAxNTBaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxNzVWMTI1TDIwMCAxNTBaIiBmaWxsPSIjQzRDNENEIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDIyNSAxMjVWMTc1TDIwMCAxNTBaIiBmaWxsPSIjQzRDNENEIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkEzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkNlcnRpZmljYXRlIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                  )}
                </div>
                
                {/* Enhanced Certificate Details */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    Certificate Details
                  </h4>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 leading-relaxed">{selectedCert.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Issued By</span>
                      </div>
                      <p className="text-gray-900 font-semibold">{selectedCert.issuer}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date Issued</span>
                      </div>
                      <p className="text-gray-900 font-semibold">{selectedCert.date}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Footer */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-purple-50/50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Download className="w-4 h-4 inline mr-2" />
                    Download Certificate
                  </button>
                  <button 
                    onClick={closeCertificate}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Certifications
