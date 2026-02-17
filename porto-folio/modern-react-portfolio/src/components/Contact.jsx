import SectionTitle from './SectionTitle'
import Card from './Card'
import Button from './Button'
import { social } from '../data/social'
import { useState } from 'react'
import { LuMail, LuMapPin } from 'react-icons/lu'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionTitle center kicker="Get in Touch" title="Let's Work Together" subtitle="Have a project in mind? Let’s discuss how we can bring your ideas to life." />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-subtext">Name</label>
              <input required placeholder="Your name" className="w-full rounded-xl2 border border-outline/60 bg-surface px-4 py-3 outline-none focus:border-primary/50"/>
            </div>
            <div>
              <label className="mb-2 block text-sm text-subtext">Email</label>
              <input required type="email" placeholder="your.email@example.com" className="w-full rounded-xl2 border border-outline/60 bg-surface px-4 py-3 outline-none focus:border-primary/50"/>
            </div>
            <div>
              <label className="mb-2 block text-sm text-subtext">Message</label>
              <textarea rows="5" placeholder="Tell me about your project..." className="w-full rounded-xl2 border border-outline/60 bg-surface px-4 py-3 outline-none focus:border-primary/50"></textarea>
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
            {sent && <div className="rounded-xl2 border border-primary/40 bg-primary/10 p-3 text-sm text-primary">Message sent successfully! I’ll get back to you soon.</div>}
          </form>
        </Card>

        <div className="grid gap-4">
          <Card className="flex items-center gap-3 p-5">
            <div className="rounded-xl2 bg-primary/15 p-2 text-primary"><LuMail/></div>
            <div>
              <div className="font-medium">Email</div>
              <div className="text-subtext">alex@timetoprogram.com</div>
            </div>
          </Card>
          <Card className="flex items-center gap-3 p-5">
            <div className="rounded-xl2 bg-primary/15 p-2 text-primary"><LuMapPin/></div>
            <div>
              <div className="font-medium">Location</div>
              <div className="text-subtext">San Francisco, CA</div>
            </div>
          </Card>

          <div className="mt-2 flex gap-3">
            {social.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" className="card grid h-12 w-12 place-items-center text-xl text-subtext hover:text-text">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
