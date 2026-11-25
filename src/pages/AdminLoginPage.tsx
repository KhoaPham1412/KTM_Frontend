import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function AdminLoginPage() {
  const { isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  if (isAdmin) return <Navigate to="/admin" replace />

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (login(username.trim(), password)) navigate('/admin')
    else setError('Tên đăng nhập hoặc mật khẩu chưa đúng.')
  }

  return <section className="section-pad"><div className="container-wide"><div className="form-card mx-auto" style={{ maxWidth: 470 }}><span className="eyebrow">Khu vực quản trị</span><h1 className="section-title mt-2">Đăng nhập Admin</h1><p className="section-copy">Đăng nhập để quản lý thực đơn SEOUL BITE.</p><form onSubmit={handleSubmit}><div className="mb-3"><label className="form-label" htmlFor="admin-user">Tên đăng nhập</label><input className="form-control" id="admin-user" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required /></div><div className="mb-3"><label className="form-label" htmlFor="admin-pass">Mật khẩu</label><input className="form-control" id="admin-pass" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>{error && <p className="text-danger" role="alert">{error}</p>}<button className="btn btn-brand w-100 py-3" type="submit">Đăng nhập</button><p className="small text-secondary mt-3 mb-0">Tài khoản demo: <code>admin</code> / <code>seoulbite123</code></p></form><Link className="d-inline-block mt-3 text-brand" to="/">← Quay lại cửa hàng</Link></div></div></section>
}

export default AdminLoginPage
