import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import Home from '@/app/page'
import { AuthContext } from '@/context/auth-provider'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

vi.mock('@/hooks/use-auth', () => ({
  useAuth: vi.fn(),
}))

describe('<LoginPage />', () => {
  const loginMock = vi.fn()
  const pushMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      login: loginMock,
      logout: vi.fn(),
    })
    vi.mocked(useRouter).mockReturnValue({ push: pushMock } as unknown as ReturnType<typeof useRouter>)
  })

  const renderLoginPage = () => {
    render(
      <AuthContext.Provider
        value={{
          user: null,
          login: loginMock,
          logout: vi.fn(),
        }}
      >
        <Home />
      </AuthContext.Provider>
    )
  }

  it('should be able renders the form inputs', async () => {
    renderLoginPage()

    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('should validates required fields', async () => {
    renderLoginPage()

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument()
      expect(screen.getByText(/mínimo de 6 caracteres/i)).toBeInTheDocument()
    })
  })

  it('should be able calls login and redirects on success', async () => {
    renderLoginPage()

    fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('test@example.com', '123456')
      expect(pushMock).toHaveBeenCalledWith('/dashboard')
    })
  })
})
