import SectionTitle from './SectionTitle'
import { projects, filters } from '../data/projects'
import Card from './Card'
import Badge from './Badge'
import { useMemo, useState } from 'react'
import { LuExternalLink, LuGithub } from 'react-icons/lu'

export default function Projects() {
  const [tab, setTab] = useState('All')
  const list = useMemo(() => {
    if (tab === 'All') return projects
    return projects.filter(p => p.tags.includes(tab))
  }, [tab])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionTitle center kicker="My Work" title="Featured Projects" subtitle="Showcasing my best work and achievements" />
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {filters.map(f => (
          <button key={f} onClick={() => setTab(f)}>
            <Badge active={tab===f}>{f}</Badge>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {list.map((p, idx) => (
          <Card key={idx} className="group flex flex-col overflow-hidden">
            <div className="relative">
              <img src={p.image} alt={p.title} className="aspect-[16/10] w-full object-cover opacity-95 transition group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 rounded-xl2 ring-1 ring-primary/20"></div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <div className="flex gap-2 text-subtext">
                  {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="hover:text-text"><LuGithub/></a>}
                  {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="hover:text-text"><LuExternalLink/></a>}
                </div>
              </div>
              <p className="mt-2 text-sm text-subtext">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s, i) => <Badge key={i} active>{s}</Badge>)}
              </div>
              {p.foot && <div className="mt-4 text-sm text-primary">{p.foot}</div>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
