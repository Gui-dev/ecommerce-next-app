import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect } from 'vitest'
import {
  QueryClient,
  QueryClientProvider,
  type UseQueryResult,
} from '@tanstack/react-query'

import { type IProductProps, useProducts } from '@/hooks/use-products'
import Dashboard from '@/app/dashboard/page'

// Mock do hook useProducts
vi.mock('@/hooks/use-products', () => ({
  useProducts: vi.fn(),
}))

describe('<Dashboard />', () => {
  const mockedUseProducts = vi.mocked(useProducts)

  const renderWithClient = () => {
    const client = new QueryClient()
    return render(
      <QueryClientProvider client={client}>
        <Dashboard />
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be able renders loading', () => {
    mockedUseProducts.mockReturnValue({
      isLoading: true,
      data: undefined,
    } as UseQueryResult<IProductProps[], Error>)

    renderWithClient()

    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('should be able to show message when there are no products', async () => {
    mockedUseProducts.mockReturnValue({
      isLoading: false,
      data: undefined,
    } as UseQueryResult<IProductProps[], Error>)

    renderWithClient()

    await waitFor(() => {
      expect(screen.getByText(/não há produtos/i)).toBeInTheDocument()
    })
  })

  it('should be able to show a list of products', async () => {
    mockedUseProducts.mockReturnValue({
      isLoading: false,
      data: [
        { id: 1, title: 'Product 1', price: 10 },
        { id: 2, title: 'Product 2', price: 20 },
      ],
    } as UseQueryResult<IProductProps[], Error>)

    renderWithClient()

    await waitFor(() => {
      expect(screen.getByText(/product 1/i)).toBeInTheDocument()
      expect(screen.getByText(/product 2/i)).toBeInTheDocument()
    })
  })
})
