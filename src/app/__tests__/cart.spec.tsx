import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  useCartStore,
  type ICartItem,
  type ICartState,
} from '@/lib/zustand/cart-store'
import Cart from '../cart/page'

vi.mock('next/image', () => ({
  __esModule: true,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  default: (props: any) => {
    // biome-ignore lint: <explanation>
    return <img alt="" {...props} />
  },
}))

vi.mock('@/lib/zustand/cart-store', () => ({
  useCartStore: vi.fn(),
}))

describe('<Cart />', () => {
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
    vi.clearAllMocks()
  })

  it('should be able to render empty cart message when there are no items', async () => {
    vi.mocked(useCartStore).mockReturnValue(mockCartState([]))

    render(<Cart />)

    expect(screen.getByText(/seu carrinho está vazio/i)).toBeInTheDocument()
    expect(screen.getByText(/ir para a loja/i)).toBeInTheDocument()
  })

  it('should be able to render cart items and total price', async () => {
    vi.mocked(useCartStore).mockReturnValue(mockCartState(mockItems))

    render(<Cart />)

    expect(screen.getByText(/product 1/i)).toBeInTheDocument()
    expect(screen.getByText(/category 1/i)).toBeInTheDocument()
    expect(screen.getByText(/R\$ 100.00/i)).toBeInTheDocument()
    expect(screen.getByText(/total: r\$ 200.00/i)).toBeInTheDocument()
  })

  it('should be able to trigger store actions on button clicks', async () => {
    const state = mockCartState(mockItems)
    vi.mocked(useCartStore).mockReturnValue(state)

    render(<Cart />)

    const increaseQuantityButton = screen.getByRole('button', { name: '+' })
    fireEvent.click(increaseQuantityButton)
    expect(state.increaseQuantity).toHaveBeenCalledWith(1)

    const decreaseQuantityButton = screen.getByRole('button', { name: '-' })
    fireEvent.click(decreaseQuantityButton)
    expect(state.decreaseQuantity).toHaveBeenCalledWith(1)

    const removeFromCartButton = screen.getByRole('button', {
      name: /remover/i,
    })
    fireEvent.click(removeFromCartButton)
    expect(state.removeFromCart).toHaveBeenCalledWith(1)
  })
})
