import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Certifications from '@/components/Certifications'
import Testimonials from '@/components/Testimonials'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import AIChatbot from '@/components/AIChatbot'
import DarkModeToggle from '@/components/DarkModeToggle'

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
        <Testimonials />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <AIChatbot />
      <DarkModeToggle />
    </>
  )
}
