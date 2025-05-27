import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'

import {
  type ICartItem,
  type ICartState,
  useCartStore,
} from '@/lib/zustand/cart-store'
import Checkout from '../checkout/page'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

vi.mock('@/lib/zustand/cart-store', () => ({
  useCartStore: vi.fn(),
}))

describe('<Checkout />', () => {
  const mockPush = vi.fn()

  const mockItems: ICartItem[] = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      category: 'Category 1',
      price: 100,
      quantity: 2,
      image: '/fake-image.jpg',
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description 2',
      category: 'Category 2',
      price: 100,
      quantity: 1,
      image: '/fake-image.jpg',
    },
  ]

  const mockCartState = (items: ICartItem[] = []): ICartState => ({
    items,
    addToCart: vi.fn(),
    increaseQuantity: vi.fn(),
    decreaseQuantity: vi.fn(),
    removeFromCart: vi.fn(),
    clearCart: vi.fn(),
    totalQuantity: () => items.reduce((acc, i) => acc + i.quantity, 0),
    totalPrice: () => items.reduce((acc, i) => acc + i.price * i.quantity, 0),
  })

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as unknown as ReturnType<typeof useRouter>)
    vi.clearAllMocks()
  })

  it('should be able to render purchase summary correctly', async () => {
    vi.mocked(useCartStore).mockReturnValue(mockCartState(mockItems))

    render(<Checkout />)

    expect(screen.getByText(/product 1/i)).toBeInTheDocument()
    expect(screen.getByText(/product 2/i)).toBeInTheDocument()
    expect(screen.getByText(/total: r\$ 300.00/i)).toBeInTheDocument()
  })

  it('should be able to validate and submit the form correctly', async () => {
    const state = mockCartState(mockItems)
    vi.mocked(useCartStore).mockReturnValue(state)

    render(<Checkout />)

    fireEvent.change(screen.getByPlaceholderText(/nome igual do cartão/i), {
      target: { value: 'Bruce Wayne' },
    })

    fireEvent.change(screen.getByPlaceholderText(/número do cartão/i), {
      target: { value: '1234123412341234' },
    })

    fireEvent.click(screen.getByRole('button', { name: /finalizar compra/i }))

    await waitFor(() => {
      expect(state.clearCart).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalledWith('/success')
    })
  })

  it('should be able to show errors when form is invalid', async () => {
    vi.mocked(useCartStore).mockReturnValue(mockCartState(mockItems))

    render(<Checkout />)

    fireEvent.click(screen.getByRole('button', { name: /finalizar compra/i }))

    expect(await screen.findByText(/nome obrigatório/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/número deve ter no mínimo 16 dígitos/i)
    ).toBeInTheDocument()
  })
})
