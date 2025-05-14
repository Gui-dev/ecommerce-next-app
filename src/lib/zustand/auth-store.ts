import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
      login: (email: string, _password: string) => set({ user: { email } }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
