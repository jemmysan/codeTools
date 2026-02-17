import { stats } from '../data/stats'
import Card from './Card'

export default function Stats() {
  return (
    <div className="mx-auto hidden max-w-7xl grid-cols-4 gap-4 px-4 pb-8 sm:grid">
      {stats.map((s, i) => (
        <Card key={i} className="p-5">
          <div className="text-3xl font-semibold text-primary">{s.value}</div>
          <div className="mt-1 text-subtext">{s.label}</div>
        </Card>
      ))}
    </div>
  )
}
