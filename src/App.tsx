import { MotionConfig } from 'framer-motion'
import { useSmoothAnchors } from './hooks/useSmoothAnchors'
import { Background } from './components/layout/Background'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { BackToTop } from './components/layout/BackToTop'
import { Toaster } from './components/ui/Toaster'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Education } from './sections/Education'
import { Contact } from './sections/Contact'

export default function App() {
  useSmoothAnchors()

  return (
    // "user" respects the OS-level prefers-reduced-motion setting for every animation.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:shadow-card"
      >
        Skip to content
      </a>
      <Background />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </MotionConfig>
  )
}
