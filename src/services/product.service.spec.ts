import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getProducts, getProductById } from './product.service'
import type { Product } from '../types/product.interface'

global.fetch = vi.fn()

describe('ProductService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('getProducts', () => {
    it('debería obtener lista de productos exitosamente', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          title: 'Laptop',
          price: 999.99,
          description: 'Una laptop potente',
          category: 'electronics',
          image: 'https://example.com/laptop.jpg'
        },
        {
          id: 2,
          title: 'Mouse',
          price: 29.99,
          description: 'Mouse inalámbrico',
          category: 'electronics',
          image: 'https://example.com/mouse.jpg'
        }
      ]

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      } as Response)

      const result = await getProducts()

      expect(result).toEqual(mockProducts)
      expect(result).toHaveLength(2)
      expect(result[0].id).toBe(1)
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products')
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('debería lanzar error cuando la respuesta no es ok', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500
      } as Response)

      await expect(getProducts()).rejects.toThrow('Error al obtener productos')
    })

    it('debería hacer llamada a URL correcta', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => []
      } as Response)

      await getProducts()

      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products')
    })

    it('debería manejar errores de red', async () => {
      const networkError = new Error('Network error')
      vi.mocked(fetch).mockRejectedValueOnce(networkError)

      await expect(getProducts()).rejects.toThrow('Network error')
    })

    it('debería retornar array vacío si API devuelve vacío', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => []
      } as Response)

      const result = await getProducts()

      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })
  })

  describe('getProductById', () => {
    it('debería obtener un producto por id exitosamente', async () => {
      const mockProduct: Product = {
        id: 1,
        title: 'Laptop',
        price: 999.99,
        description: 'Una laptop potente',
        category: 'electronics',
        image: 'https://example.com/laptop.jpg'
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct
      } as Response)

      const result = await getProductById(1)

      expect(result).toEqual(mockProduct)
      expect(result.id).toBe(1)
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1')
    })

    it('debería aceptar id como string', async () => {
      const mockProduct: Product = {
        id: 5,
        title: 'Producto',
        price: 50,
        description: 'Desc',
        category: 'cat',
        image: 'img.jpg'
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct
      } as Response)

      const result = await getProductById('5')

      expect(result.id).toBe(5)
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/5')
    })

    it('debería lanzar error cuando respuesta no es ok', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404
      } as Response)

      await expect(getProductById(999)).rejects.toThrow('Error al obtener producto')
    })

    it('debería lanzar error para producto no encontrado (404)', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404
      } as Response)

      await expect(getProductById(999)).rejects.toThrow('Error al obtener producto')
    })

    it('debería construir URL correcta con diferentes ids', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({} as Product)
      } as Response)

      await getProductById(42)

      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/42')
    })

    it('debería manejar errores de red en getProductById', async () => {
      const networkError = new Error('Timeout')
      vi.mocked(fetch).mockRejectedValueOnce(networkError)

      await expect(getProductById(1)).rejects.toThrow('Timeout')
    })
  })

  describe('Casos Edge', () => {
    it('debería manejar respuesta con caracteres especiales', async () => {
      const mockProduct: Product = {
        id: 1,
        title: 'Producto con ñ, accénto & símbolos',
        price: 100,
        description: 'Descripción especial',
        category: 'categoría',
        image: 'https://example.com/img.jpg'
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct
      } as Response)

      const result = await getProductById(1)

      expect(result.title).toContain('ñ')
      expect(result.category).toContain('í')
    })

    it('debería retornar producto con precio 0', async () => {
      const mockProduct: Product = {
        id: 1,
        title: 'Producto Gratis',
        price: 0,
        description: 'Gratis',
        category: 'free',
        image: 'img.jpg'
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct
      } as Response)

      const result = await getProductById(1)

      expect(result.price).toBe(0)
    })
  })
})
