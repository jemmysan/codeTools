import SectionTitle from './SectionTitle'
import { services } from '../data/services'
import Card from './Card'

export default function Services() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-[size:24px_24px] opacity-20"></div>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <SectionTitle center kicker="What I Offer" title="Built for innovation. Designed for results." subtitle="Comprehensive solutions to transform your ideas into exceptional digital experiences." />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Card key={idx} className="p-6 hover:border-primary/40">
              <div className="text-2xl text-primary">{s.icon}</div>
              <div className="mt-3 text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-sm text-subtext">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
