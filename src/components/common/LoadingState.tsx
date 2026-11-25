function LoadingState({ label = 'Đang tải món ngon...' }: { label?: string }) {
  return <div className="state-panel" role="status"><span className="spinner-border text-brand mb-3" aria-hidden="true" /><h2>{label}</h2><p>Chờ Seoul Bite một chút nhé.</p></div>
}

export default LoadingState
