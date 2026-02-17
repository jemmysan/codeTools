import SectionTitle from './SectionTitle'
import { skills } from '../data/skills'
import Card from './Card'

function Bar({ value, level }) {
  const color = level === 'Expert' ? 'from-primary to-neon'
              : level === 'Advanced' ? 'from-primary/80 to-neon/70'
              : 'from-primary/60 to-neon/50'
  return (
    <div className="mt-2 h-2 w-full rounded-full bg-outline/50">
      <div className={`h-2 rounded-full bg-gradient-to-r ${color}`} style={{ width: value }} />
    </div>
  )
}

export default function Skills() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-12">
      <SectionTitle center title="Skills & Technologies" subtitle="A comprehensive overview of my technical skills and proficiency levels" />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {skills.map((group, i) => (
          <Card key={i} className="p-6">
            <div className="mb-4 text-lg font-semibold">{group.category}</div>
            <ul className="space-y-4">
              {group.items.map((s, idx) => (
                <li key={idx}>
                  <div className="flex items-center justify-between">
                    <span>{s.name}</span>
                    <span className="text-sm text-subtext">{s.level}</span>
                  </div>
                  <Bar value={s.progress} level={s.level} />
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}
