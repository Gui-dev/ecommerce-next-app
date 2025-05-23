import { toast } from 'sonner'
import Image from 'next/image'

import type { IProductProps } from '@/hooks/use-products'
import { useCartStore } from '@/lib/zustand/cart-store'

interface IProduct {
  product: IProductProps
  priority: boolean
}

export const Product = ({ product, priority }: IProduct) => {
  const addTocart = useCartStore(state => state.addToCart)

  const handleAddToCart = () => {
    addTocart(product)
    toast.success(`${product.title} adicionado ao carrinho`)
  }

  return (
    <div key={product.id} className="border rounded-xl p-4 shadow-sm">
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        priority={priority}
        className="h-40 mx-auto object-contain mb-2"
      />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-sm">{product.category}</p>
      <p className="text-md">R$ {product.price.toFixed(2)}</p>
      <button
        type="button"
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        onClick={handleAddToCart}
      >
        Adicionar no carrinho
      </button>
    </div>
  )
}
