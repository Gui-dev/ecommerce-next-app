'use client'

import Head from 'next/head'

import { useProducts } from '@/hooks/use-products'
import { Product } from '@/components/product'

const Dashboard = () => {
  const { data: products, isLoading } = useProducts()
  if (isLoading) {
    return (
      <main className="p-4">
        <h1 className="sr-only">Carregando produtos</h1>
        <p>Carregando...</p>
      </main>
    )
  }

  if (!products || products.length === 0) {
    return (
      <main className="p-4">
        <h1 className="sr-only">Nenhum produto encontrado</h1>
        <p>Não há produtos</p>
      </main>
    )
  }

  return (
    <main className="p-4">
      <Head>
        <title>Dashboard - Produtos</title>
        <meta
          name="description"
          content="Veja todos os nossos produtos disponíveis"
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product, index) => {
          return (
            <Product key={product.id} product={product} priority={index < 3} />
          )
        })}
      </div>
    </main>
  )
}

export default Dashboard
