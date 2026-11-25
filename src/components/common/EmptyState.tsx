import { Link } from 'react-router-dom'

function EmptyState({ title, message, actionLabel = 'Khám phá menu', to = '/menu' }: { title: string; message: string; actionLabel?: string; to?: string }) {
  return <div className="state-panel"><span className="state-icon" aria-hidden="true">♡</span><h2>{title}</h2><p>{message}</p><Link className="btn btn-brand px-4" to={to}>{actionLabel}</Link></div>
}

export default EmptyState
