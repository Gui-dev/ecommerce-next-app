'use client'

import {
  checkoutSchema,
  type CheckoutSchemaData,
} from '@/validations/checkout-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { useCartStore } from '@/lib/zustand/cart-store'

const Checkout = () => {
  const { clearCart, items, totalPrice } = useCartStore()
  const router = useRouter()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CheckoutSchemaData>({
    resolver: zodResolver(checkoutSchema),
  })

  const handleSubmitCheckout = async () => {
    clearCart()
    router.push('/success')
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Finalize sua compra</h1>

      <div className="mb-4">
        {items.map(item => {
          return (
            <div key={item.id} className="flex justify-between border-b py-2">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          )
        })}
      </div>

      <h2 className="text-right font-bold text-lg mb-4">
        Total: R$ {totalPrice().toFixed(2)}
      </h2>

      <form
        className="space-y-6 bg-gray-950 p-6 rounded-xl shadow-gray-400 shadow-sm mt-8"
        onSubmit={handleSubmit(handleSubmitCheckout)}
      >
        <h2 className="text-xl font-bold mb-4">Preencha seu dados</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Nome igual do cartão"
            className="text-gray-100 w-full border border-gray-800 px-3 py-2 rounded-md placeholder:text-gray-300"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Número do cartão"
            className="text-gray-100 w-full border border-gray-800 px-3 py-2 rounded-md placeholder:text-gray-300"
            {...register('cardNumber')}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cardNumber.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processando...' : 'Finalizar compra'}
        </button>
      </form>
    </main>
  )
}

export default Checkout
