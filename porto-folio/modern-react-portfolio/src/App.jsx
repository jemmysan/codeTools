import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Section from './components/Section'
import Hero from './components/Hero'
import Stats from './components/Stats'
import TechStack from './components/TechStack'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sections = document.querySelectorAll('section[data-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-52% 0px -48% 0px', threshold: 0.15 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar active={active} />
      <ScrollProgress />

      <main className="pt-24">
        <Section id="home"><Hero /></Section>
        <Stats />
        <Section id="about"><About /></Section>
        <Section id="skills"><><TechStack /><Skills /></></Section>
        <Section id="projects"><Projects /></Section>
        <Section id="services"><Services /></Section>
        <Section id="contact"><Contact /></Section>
      </main>

      <Footer />
    </>
  )
}
