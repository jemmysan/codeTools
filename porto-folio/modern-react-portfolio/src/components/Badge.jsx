export default function Badge({ children, active=false }) {
  return (
    <span className={`chip ${active ? 'chip--active' : ''}`}>{children}</span>
  )
}
