import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Certifications from '@/components/Certifications'
import Resume from '@/components/Resume'
import ResumeCustomizer from '@/components/ResumeCustomizer'
import CoverLetter from '@/components/CoverLetter'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import AIChatbot from '@/components/AIChatbot'
import portfolioData from '@/data/portfolio.json'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Resume />
        <section id="resume-customizer" className="section-padding bg-gradient-to-br from-gray-50 to-indigo-50/30">
          <div className="container-custom px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                AI-Powered Resume
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Smart Resume Optimization
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get your resume optimized for any job role with AI-powered analysis and customization
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <ResumeCustomizer />
            </div>
          </div>
        </section>
        <CoverLetter portfolioData={portfolioData} />
        <Contact />
      </main>
      <Footer />
      <AIChatbot />
    </>
  )
}
