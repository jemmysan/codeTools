import { useEffect, useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import clsx from 'clsx'

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [active])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="mt-4 flex items-center justify-between rounded-full border border-outline/60 bg-surface/80 backdrop-blur px-4 py-3">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 text-sm font-medium">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary shadow-glow">&lt;&gt;</span>
            <span className="text-text">Alex</span>
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map(l => (
              <a key={l.id} href={`#${l.id}`}
                 className={clsx("text-sm transition-colors", active===l.id ? "text-text" : "text-subtext hover:text-text")}>
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a href="#contact" className="btn btn-primary">Hire Me</a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(v => !v)} className="md:hidden text-text">
            {open ? <LuX size={22}/> : <LuMenu size={22}/>}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-outline/60 bg-surface/90 backdrop-blur md:hidden">
            <ul className="divide-y divide-outline/60">
              {links.map(l => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className={clsx("block px-5 py-3", active===l.id ? "text-text" : "text-subtext")}> {l.label} </a>
                </li>
              ))}
              <li className="p-3">
                <a href="#contact" className="btn btn-primary w-full">Hire Me</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
