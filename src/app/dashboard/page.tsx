'use client'

import { useProducts } from '@/hooks/use-products'
import { Product } from '@/components/product'

const Dashboard = () => {
  const { data: products, isLoading } = useProducts()

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (!products) {
    return <p>Não há produtos</p>
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map(product => {
          return <Product key={product.id} product={product} />
        })}
      </div>
    </main>
  )
}

export default Dashboard
