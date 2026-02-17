import { motion, useScroll, useTransform } from 'framer-motion'
import Button from './Button'
import Badge from './Badge'
import { LuChevronDown, LuThumbsUp, LuShare2, LuMessageSquare } from 'react-icons/lu'

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const ySoft = useTransform(scrollYProgress, [0, 1], [0, 60])
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, 90])
  const rot    = useTransform(scrollYProgress, [0, 1], [0, 8])
  const scale  = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  return (
    <div className="relative">
      <motion.div aria-hidden className="pointer-events-none absolute -top-16 left-1/2 z-[-1] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" style={{ y: yGlow }} />
      <motion.div aria-hidden className="pointer-events-none absolute top-24 right-[8%] z-[-1] h-[380px] w-[380px] rounded-full bg-neon/10 blur-3xl" style={{ y: yGlow }} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <Badge active>React Developer & UI/UX Enthusiast · Based in San Francisco, CA</Badge>
          <motion.h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            React.js Developer Portfolio
          </motion.h1>

          <motion.p className="mt-4 max-w-xl text-subtext" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            Building modern, scalable web applications with React, JavaScript and cutting‑edge technologies. Transforming ideas into exceptional digital experiences.
          </motion.p>

          <motion.div className="mt-6 flex items-center gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <a href="#contact"><Button>Get in Touch</Button></a>
            <a href="/resume.pdf" className="btn btn-ghost" download>Download Resume</a>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:hidden">
            {[
              ['3+', 'Years Experience'],
              ['50+', 'Projects Completed'],
              ['15+', 'Technologies'],
              ['98%', 'Client Satisfaction']
            ].map(([k, v], i) => (
              <div key={i} className="card p-4">
                <div className="text-2xl font-semibold text-primary">{k}</div>
                <div className="text-sm text-subtext">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div style={{ y: ySoft, rotate: rot, scale }} className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-surface to-black p-2 shadow-glow">
            <div className="aspect-[4/5] w-full rounded-xl2 bg-[radial-gradient(circle_at_70%_30%,rgba(57,255,20,.2),transparent_40%),linear-gradient(180deg,#0f1511,transparent)]">
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-subtext md:flex">
            <LuThumbsUp /><LuMessageSquare /><LuShare2 />
          </div>
        </motion.div>
      </div>

      <div className="mx-auto -mt-4 flex max-w-7xl justify-center pb-6 md:pb-0">
        <a href="#about" className="chip chip--active inline-flex items-center gap-2"><LuChevronDown size={20}/> Explore</a>
      </div>
    </div>
  )
}
