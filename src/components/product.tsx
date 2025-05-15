import type { IProductProps } from '@/hooks/use-products'
import { useCartStore } from '@/lib/zustand/cart-store'
import Image from 'next/image'

interface IProduct {
  product: IProductProps
}

export const Product = ({ product }: IProduct) => {
  const addTocart = useCartStore(state => state.addToCart)

  return (
    <div key={product.id} className="border rounded-xl p-4 shadow-sm">
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="h-40 mx-auto object-contain mb-2"
      />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-sm">{product.category}</p>
      <p className="text-md">R$ {product.price.toFixed(2)}</p>
      <button
        type="button"
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        onClick={() => addTocart(product)}
      >
        Adicionar no carrinho
      </button>
    </div>
  )
}
