import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[59] h-[3px] bg-outline/40"></div>
      <motion.div className="fixed left-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary to-neon shadow-glow" style={{ scaleX }} />
    </>
  )
}
