'use client'

import { type IUserProps, useAuthStore } from '@/lib/zustand/auth-store'
import { createContext, type ReactNode } from 'react'

export interface IAuthContextProps {
  user: IUserProps | null
  login: (email: string, password: string) => void
  logout: () => void
}

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<IAuthContextProps>(
  {} as IAuthContextProps
)

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { user, login, logout } = useAuthStore()

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
