import { useCartStore } from '@/lib/zustand/cart-store'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Product } from '../product'

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
    vi.mocked(useCartStore).mockImplementation(cb =>
      cb({ addToCart: addToCartMock })
    )
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
})
