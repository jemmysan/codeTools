import SectionTitle from './SectionTitle'
import { tech } from '../data/tech'
import Card from './Card'

export default function TechStack() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle kicker="Tech Stack & Expertise" title="Technologies I work with" subtitle="Tools I use to build amazing products" center />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {tech.map((t, idx) => (
          <Card key={idx} className="group flex items-center justify-center gap-2 p-5 hover:border-primary/40">
            <span className="text-primary">{t.icon}</span>
            <span className="font-medium">{t.name}</span>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <a href="#skills" className="btn btn-ghost">My Expertise</a>
      </div>
    </div>
  )
}
