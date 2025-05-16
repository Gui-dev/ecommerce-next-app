import type { IProductProps } from '@/hooks/use-products'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ICartItem extends IProductProps {
  quantity: number
}

export interface ICartState {
  items: ICartItem[]
  addToCart: (product: IProductProps) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  totalQuantity: () => number
  totalPrice: () => number
}

export const useCartStore = create<ICartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: product => {
        const items = get().items
        const itemExists = items.find(item => item.id === product.id)

        if (itemExists) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          })
        }
      },

      increaseQuantity: id => {
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })
      },

      decreaseQuantity: id => {
        set({
          items: get()
            .items.map(item =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter(item => item.quantity > 0),
        })
      },

      removeFromCart: id => {
        set({
          items: get().items.filter(item => item.id !== id),
        })
      },

      clearCart: () => set({ items: [] }),

      totalQuantity: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
)
