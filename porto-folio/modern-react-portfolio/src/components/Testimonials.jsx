import SectionTitle from './SectionTitle'
import { testimonials } from '../data/testimonials'
import Card from './Card'
import { useState } from 'react'
import { LuChevronLeft, LuChevronRight, LuStar } from 'react-icons/lu'

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const next = () => setIdx((idx + 1) % testimonials.length)
  const prev = () => setIdx((idx - 1 + testimonials.length) % testimonials.length)
  const t = testimonials[idx]

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <SectionTitle center kicker="Testimonials" title="Trusted by forward‑thinking teams" />
      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={prev} className="chip"> <LuChevronLeft/> </button>
        <button onClick={next} className="chip"> <LuChevronRight/> </button>
      </div>

      <Card className="mx-auto mt-6 max-w-3xl p-8">
        <div className="text-5xl text-primary">“</div>
        <p className="-mt-6 text-lg leading-relaxed">{t.quote}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="font-medium">{t.author}</div>
            <div className="text-sm text-subtext">{t.role}</div>
          </div>
          <div className="flex gap-1 text-primary">
            {Array.from({ length: t.rating }).map((_, i) => <LuStar key={i} />)}
          </div>
        </div>
      </Card>
    </div>
  )
}
