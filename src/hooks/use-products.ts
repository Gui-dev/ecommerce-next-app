import { fetchProducts } from '@/actions/fetch-products'
import { useQuery } from '@tanstack/react-query'

export interface IProductProps {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const useProducts = () => {
  return useQuery<IProductProps[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}
