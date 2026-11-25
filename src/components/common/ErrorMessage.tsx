function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="state-panel" role="alert"><span className="state-icon" aria-hidden="true">!</span><h2>Chưa tải được dữ liệu</h2><p>{message}</p><button className="btn btn-brand px-4" onClick={onRetry}>Thử lại</button></div>
}

export default ErrorMessage
