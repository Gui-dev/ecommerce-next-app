import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import Home from '@/app/page'
import { AuthContext } from '@/context/auth-provider'
import { beforeEach } from 'node:test'
import { useRouter } from 'next/navigation'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

describe('<LoginPage />', () => {
  const loginMock = vi.fn()
  const pushMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useRouter).mockReturnValue({ push: pushMock } as any)
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
})
