import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const isHomePage =
    window.location.pathname === '/' ||
    window.location.pathname === ''

  return (
    <>
      <LoadingScreen />

      {isHomePage ? (
        <div className="min-h-screen text-paper">
          <Sidebar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />

          <main
            className={`transition-all duration-300 lg:blur-0 ${
              menuOpen ? 'blur-[2px]' : 'blur-0'
            }`}
          >
            <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-12">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
              <Footer />
            </div>
          </main>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}