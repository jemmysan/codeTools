import { social } from '../data/social'

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-outline/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary">&lt;&gt;</span>
            Alex
          </div>
          <p className="mt-2 text-subtext">Crafting seamless digital experiences with modern web technologies.</p>
          <div className="mt-3 text-sm text-subtext">© 2025 Alex Johnson. All rights reserved.</div>
        </div>

        <div>
          <div className="font-medium">Quick Links</div>
          <ul className="mt-2 space-y-1 text-subtext">
            {['about','skills','projects','services','contact'].map((id) => (
              <li key={id}><a className="hover:text-text" href={`#${id}`}>{id[0].toUpperCase()+id.slice(1)}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-medium">Connect With Me</div>
          <div className="mt-3 flex gap-3">
            {social.map((s, i) => (
              <a key={i} href={s.href} className="card grid h-10 w-10 place-items-center text-subtext hover:text-text" target="_blank" rel="noreferrer">{s.icon}</a>
            ))}
          </div>
          <div className="mt-4 text-xs text-subtext">Built with <span className="text-primary">♥</span> using React & Tailwind CSS</div>
        </div>
      </div>
    </footer>
  )
}
