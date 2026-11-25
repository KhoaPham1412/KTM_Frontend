import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = (): void => { logout(); navigate('/') }
  return <div className="admin-shell"><aside className="admin-sidebar"><Link className="brand-mark text-white" to="/"><span className="brand-symbol">S</span><span>SEOUL BITE</span></Link><span className="admin-label">QUẢN TRỊ</span><NavLink to="/admin" end>Quản lý thực đơn</NavLink><Link to="/" className="admin-side-link">Xem cửa hàng</Link><button className="btn btn-outline-light rounded-pill mt-auto" onClick={handleLogout}>Đăng xuất</button></aside><div className="admin-content"><header className="admin-topbar"><span>Xin chào, Quản trị viên</span><Link to="/" className="text-brand">Mở cửa hàng ↗</Link></header><main className="container-fluid p-3 p-lg-5"><Outlet /></main></div></div>
}

export default AdminLayout
