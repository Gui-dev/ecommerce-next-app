import { useCartStore } from '@/lib/zustand/cart-store'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Product } from '../product'
import { toast } from 'sonner'

vi.mock('next/image', () => ({
  __esModule: true,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  default: (props: any) => {
    // biome-ignore lint: <explanation>
    return <img alt="" {...props} />
  },
}))

vi.mock('sonner', () => ({ toast: { success: vi.fn() } }))

vi.mock('@/lib/zustand/cart-store', () => ({
  useCartStore: vi.fn(),
}))

const createCartStoreMock = (overrides = {}) => {
  return {
    addToCart: vi.fn(),
    items: [],
    increaseQuantity: vi.fn(),
    decreaseQuantity: vi.fn(),
    removeFromCart: vi.fn(),
    clearCart: vi.fn(),
    totalQuantity: vi.fn(),
    totalPrice: vi.fn(),
    ...overrides,
  }
}

describe('<Product />', () => {
  const addToCartMock = vi.fn()

  const fakeProduct = {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    category: 'Category 1',
    price: 10,
    image: 'fake-image.jpg',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    const cartMock = createCartStoreMock({ addToCart: addToCartMock })
    vi.mocked(useCartStore).mockImplementation(cb => cb(cartMock))
  })

  it('should be able to render a product component correctly', async () => {
    render(<Product product={fakeProduct} />)

    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByText('R$ 10.00')).toBeInTheDocument()
    expect(screen.getByAltText('Product 1')).toBeInTheDocument()

    const addToCartButton = screen.getByRole('button', {
      name: /adicionar no carrinho/i,
    })
    expect(addToCartButton).toBeInTheDocument()
  })

  it('should be able to call addToCart on button click', async () => {
    render(<Product product={fakeProduct} />)

    const addToCartButton = screen.getByRole('button', {
      name: /adicionar no carrinho/i,
    })

    fireEvent.click(addToCartButton)

    expect(addToCartMock).toHaveBeenCalledTimes(1)
    expect(addToCartMock).toHaveBeenCalledWith(fakeProduct)
  })

  it('should be able to call toast on buttton click', async () => {
    render(<Product product={fakeProduct} />)

    const addToCartButton = screen.getByRole('button', {
      name: /adicionar no carrinho/i,
    })

    fireEvent.click(addToCartButton)

    expect(toast.success).toHaveBeenCalledWith(
      `${fakeProduct.title} adicionado ao carrinho`
    )
    expect(addToCartMock).toHaveBeenCalledTimes(1)
    expect(addToCartMock).toHaveBeenCalledWith(fakeProduct)
  })
})
