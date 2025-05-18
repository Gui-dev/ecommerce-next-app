import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  useCartStore,
  type ICartItem,
  type ICartState,
} from '@/lib/zustand/cart-store'
import Cart from '../cart/page'

vi.mock('@/lib/zustand/cart-store', () => ({
  useCartStore: vi.fn(),
}))

describe('<Cart />', () => {
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
})
