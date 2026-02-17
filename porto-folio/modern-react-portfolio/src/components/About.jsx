import SectionTitle from './SectionTitle'
import Card from './Card'

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionTitle kicker="Full‑Stack Developer" title="Crafting Digital Experiences That Matter" subtitle="I specialize in building scalable, performant web apps with a focus on clean code and UX." />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <p className="text-subtext leading-relaxed">
          I’m a passionate React developer with 3+ years of experience creating intuitive interfaces and robust web applications. My expertise spans React, Next.js, TypeScript and modern CSS frameworks. I’m committed to writing maintainable code and staying current with the latest web technologies. When I’m not coding, I contribute to open‑source, write technical articles, or explore design trends.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: 'Expertise', desc: 'Scalable apps with modern practices' },
            { title: 'Clean Code', desc: 'Maintainable, well-documented' },
            { title: 'Performance', desc: 'Speed & efficiency focused' },
            { title: '100%', desc: 'Client Satisfaction' },
            { title: '24/7', desc: 'Support Available' },
            { title: 'Fast', desc: 'Delivery Time' },
          ].map((i, idx) => (
            <Card key={idx} className="p-5">
              <div className="font-semibold">{i.title}</div>
              <div className="mt-1 text-sm text-subtext">{i.desc}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
