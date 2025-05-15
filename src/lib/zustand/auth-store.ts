import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'

export interface IUserProps {
  email: string
}

export interface IAuthState {
  user: IUserProps | null
  login: (email: string, password: string) => void
  logout: () => void
}

export const useAuthStore = create<IAuthState>()(
  persist(
    set => ({
      user: null,
      login: (email: string, _password: string) => {
        Cookies.set('auth-token', 'mock-token', {
          path: '/',
          expires: 1, // 1 dia
        })
        set({ user: { email } })
      },
      logout: () => {
        Cookies.remove('auth-token')
        set({ user: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
