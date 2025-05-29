'use client'

import Head from 'next/head'

import { useProducts } from '@/hooks/use-products'
import { Product } from '@/components/product'
import { CartButton } from '@/components/cart-button'
import { ThemeToggle } from '@/components/theme-toggle'

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
    <main className="py-4 px-8">
      <Head>
        <title>Dashboard - Produtos</title>
        <meta
          name="description"
          content="Veja todos os nossos produtos disponíveis"
        />
      </Head>

      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <div className="flex items-center gap-2">
          <CartButton />
          <ThemeToggle />
        </div>
      </header>

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
