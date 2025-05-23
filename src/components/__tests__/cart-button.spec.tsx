import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CartButton } from '../cart-button'
import {
  type ICartItem,
  type ICartState,
  useCartStore,
} from '@/lib/zustand/cart-store'

vi.mock('@/lib/zustand/cart-store', () => ({
  useCartStore: vi.fn(),
}))

describe('<CartButton />', () => {
  const mockItems: ICartItem[] = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      category: 'Category 1',
      price: 100,
      quantity: 1,
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
    vi.clearAllMocks()
  })

  it('should be able to show badge with correct quantity', async () => {
    vi.mocked(useCartStore).mockReturnValue(mockCartState(mockItems))

    render(<CartButton />)

    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
