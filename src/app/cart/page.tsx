'use client'

import { useCartStore } from '@/lib/zustand/cart-store'
import Image from 'next/image'
import Link from 'next/link'

const Cart = () => {
  const {
    decreaseQuantity,
    increaseQuantity,
    items,
    removeFromCart,
    totalPrice,
  } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Ir para a loja
        </Link>
      </div>
    )
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Carrinho de Compras</h1>

      <div className="flex flex-col gap-4">
        {items.map(item => {
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-4 rounded-xl shadow-sm"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-md">R$ {item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center text-2xl text-gray-900 size-7 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  className="flex items-center justify-center text-2xl text-gray-900 size-7 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="text-red-500 cursor-pointer hover:text-red-600 transation-colors"
                onClick={() => removeFromCart(item.id)}
              >
                Remover
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">
          Total: R$ {totalPrice().toFixed(2)}
        </h2>
      </div>
    </main>
  )
}

export default Cart
