import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

function AdminRoute() {
  const { isAdmin } = useAuth()
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default AdminRoute
