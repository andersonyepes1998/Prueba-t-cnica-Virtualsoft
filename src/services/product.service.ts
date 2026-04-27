import type { Product } from '../types/product.interface'

const BASE_URL = 'https://fakestoreapi.com/products'

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error('Error al obtener productos')
  }

  return await response.json()
}

export const getProductById = async (
  id: string | number
): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Error al obtener producto')
  }

  return await response.json()
}