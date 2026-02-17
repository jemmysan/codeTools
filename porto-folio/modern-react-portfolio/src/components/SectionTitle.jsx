export default function SectionTitle({ kicker, title, subtitle, center=false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {kicker && <span className="chip chip--active">{kicker}</span>}
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-subtext">{subtitle}</p>}
    </div>
  )
}
