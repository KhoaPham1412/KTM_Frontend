import { Link } from 'react-router-dom'

function NotFoundPage() {
  return <section className="section-pad"><div className="container-wide"><div className="state-panel"><span className="eyebrow">404 · lạc đường ở Seoul</span><h1 className="page-title mt-3">Trang này chưa lên menu</h1><p>Hãy quay lại trang chủ hoặc khám phá những món ngon đang có nhé.</p><Link className="btn btn-brand px-4" to="/">Về trang chủ</Link></div></div></section>
}

export default NotFoundPage
