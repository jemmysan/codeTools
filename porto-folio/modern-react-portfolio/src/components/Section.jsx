import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Section({ id, className = '', children }) {
  return (
    <section id={id} data-section className={clsx(className)}>
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.995 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        {children}
      </motion.div>
    </section>
  )
}
