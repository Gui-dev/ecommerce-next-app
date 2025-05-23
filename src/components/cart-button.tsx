import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

import { useCartStore } from '@/lib/zustand/cart-store'

export const CartButton = () => {
  const { items } = useCartStore()
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <Link href="/cart" className="relative" aria-label="Ir para o carrinho">
      <ShoppingCart className="text-gray-100 size-7" />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-4 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
          {totalQuantity}
        </span>
      )}
    </Link>
  )
}
