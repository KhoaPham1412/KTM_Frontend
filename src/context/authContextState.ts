import { createContext } from 'react'

export type UserRole = 'admin' | 'customer'
export interface AuthContextValue { role: UserRole; isAdmin: boolean; login: (username: string, password: string) => boolean; logout: () => void }
export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
