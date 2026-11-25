import { useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type UserRole, type AuthContextValue } from './authContextState'
const DEMO_USERNAME = 'admin'
const DEMO_PASSWORD = 'seoulbite123'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => sessionStorage.getItem('seoul-bite-role') === 'admin' ? 'admin' : 'customer')
  const value = useMemo<AuthContextValue>(() => ({
    role,
    isAdmin: role === 'admin',
    login: (username, password) => {
      if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) return false
      sessionStorage.setItem('seoul-bite-role', 'admin')
      setRole('admin')
      return true
    },
    logout: () => {
      sessionStorage.removeItem('seoul-bite-role')
      setRole('customer')
    },
  }), [role])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
