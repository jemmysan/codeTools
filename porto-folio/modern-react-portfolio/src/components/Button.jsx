import clsx from 'clsx'
export default function Button({ children, className, variant='primary', ...props }) {
  return (
    <button {...props} className={clsx('btn', variant==='primary' ? 'btn-primary' : 'btn-ghost', className)}>
      {children}
    </button>
  )
}
