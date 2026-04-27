import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'
import type { Product } from '../types/product.interface'

vi.mock('@ionic/vue', () => ({
  IonCard: { name: 'IonCard', template: '<div><slot /></div>' },
  IonCardContent: { name: 'IonCardContent', template: '<div><slot /></div>' },
  IonButton: { name: 'IonButton', template: '<button><slot /></button>' },
  IonIcon: { name: 'IonIcon', template: '<div></div>' }
}))

describe('ProductCard.vue', () => {
  let mockProduct: Product

  beforeEach(() => {
    mockProduct = {
      id: 1,
      title: 'Laptop Gaming',
      price: 1299.99,
      description: 'Laptop de alto rendimiento',
      category: 'electronics',
      image: 'https://example.com/laptop.jpg'
    }
  })

  describe('Renderización', () => {
    it('debería renderizar correctamente con props', () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      expect(wrapper.find('.product-card').exists()).toBe(true)
      expect(wrapper.text()).toContain('Laptop Gaming')
      expect(wrapper.text()).toContain('1299.99')
      expect(wrapper.text()).toContain('Ver detalle')
    })

    it('debería mostrar la imagen del producto correctamente', () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      const img = wrapper.find('.product-img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('https://example.com/laptop.jpg')
    })

    it('debería mostrar el precio formateado', () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      const priceElement = wrapper.find('.price')
      expect(priceElement.text()).toContain('$')
      expect(priceElement.text()).toContain('1299.99')
    })

    it('debería truncar títulos largos correctamente', () => {
      const productLongTitle = {
        ...mockProduct,
        title: 'Este es un título muy largo que podría no caber en una sola línea'
      }

      const wrapper = mount(ProductCard, {
        props: {
          product: productLongTitle,
          isFavorite: false
        }
      })

      expect(wrapper.text()).toContain(productLongTitle.title)
    })
  })

  describe('Estado de Favorito', () => {
    it('debería mostrar corazón vacío (🤍) cuando no es favorito', () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      const favoriteBtn = wrapper.find('.favorite-btn')
      expect(favoriteBtn.text()).toBe('🤍')
    })

    it('debería mostrar corazón lleno (❤️) cuando es favorito', () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: true
        }
      })

      const favoriteBtn = wrapper.find('.favorite-btn')
      expect(favoriteBtn.text()).toBe('❤️')
    })

    it('debería actualizar el ícono cuando isFavorite cambia', async () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      expect(wrapper.find('.favorite-btn').text()).toBe('🤍')

      await wrapper.setProps({ isFavorite: true })

      expect(wrapper.find('.favorite-btn').text()).toBe('❤️')
    })
  })

  describe('Eventos', () => {
    it('debería emitir view-detail al hacer click en el card', async () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      await wrapper.find('.product-card').trigger('click')

      expect(wrapper.emitted('view-detail')).toBeTruthy()
      expect(wrapper.emitted('view-detail')?.[0]).toEqual([mockProduct.id])
    })

    it('debería emitir view-detail al hacer click en el botón', async () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      await wrapper.find('.detail-btn').trigger('click')

      expect(wrapper.emitted('view-detail')).toBeTruthy()
      expect(wrapper.emitted('view-detail')?.[0]).toEqual([mockProduct.id])
    })

    it('debería emitir toggle-favorite al hacer click en favorito', async () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      await wrapper.find('.favorite-btn').trigger('click')

      expect(wrapper.emitted('toggle-favorite')).toBeTruthy()
      expect(wrapper.emitted('toggle-favorite')?.[0]).toEqual([mockProduct])
    })

    it('debería emitir producto completo al toggle-favorite', async () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      await wrapper.find('.favorite-btn').trigger('click')

      const emittedProduct = wrapper.emitted('toggle-favorite')?.[0]?.[0] as Product
      expect(emittedProduct.id).toBe(1)
      expect(emittedProduct.title).toBe('Laptop Gaming')
      expect(emittedProduct.price).toBe(1299.99)
    })

    it('debería prevenir que toggle-favorite dispare view-detail con .stop', async () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      await wrapper.find('.favorite-btn').trigger('click')

      expect(wrapper.emitted('toggle-favorite')).toBeTruthy()
      const detailEvents = wrapper.emitted('view-detail') || []
      expect(detailEvents).toHaveLength(0)
    })

    it('debería permitir múltiples eventos toggle-favorite', async () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      await wrapper.find('.favorite-btn').trigger('click')
      await wrapper.find('.favorite-btn').trigger('click')
      await wrapper.find('.favorite-btn').trigger('click')

      expect(wrapper.emitted('toggle-favorite')).toHaveLength(3)
    })
  })

  describe('Accesibilidad y Estructura', () => {
    it('debería tener estructura semantic correcta con h3', () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      const title = wrapper.find('h3')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('Laptop Gaming')
    })

    it('debería tener botón de favorito accesible', () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      const favoriteBtn = wrapper.find('.favorite-btn')
      expect(favoriteBtn.element.tagName).toBe('BUTTON')
    })

    it('debería tener card con atributo button', () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      const card = wrapper.find('.product-card')
      expect(card.exists()).toBe(true)
    })
  })

  describe('Casos Edge', () => {
    it('debería manejar títulos muy largos', () => {
      const productLongTitle = {
        ...mockProduct,
        title: 'A'.repeat(200)
      }

      const wrapper = mount(ProductCard, {
        props: {
          product: productLongTitle,
          isFavorite: false
        }
      })

      expect(wrapper.find('h3').text()).toBe('A'.repeat(200))
    })

    it('debería manejar precios decimales precisos', () => {
      const productComplexPrice = {
        ...mockProduct,
        price: 1234.567
      }

      const wrapper = mount(ProductCard, {
        props: {
          product: productComplexPrice,
          isFavorite: false
        }
      })

      expect(wrapper.find('.price').text()).toContain('1234.567')
    })

    it('debería manejar precios de 0', () => {
      const freeProduct = {
        ...mockProduct,
        price: 0
      }

      const wrapper = mount(ProductCard, {
        props: {
          product: freeProduct,
          isFavorite: false
        }
      })

      expect(wrapper.find('.price').text()).toContain('0')
    })

    it('debería manejar URLs de imagen inválidas', () => {
      const productBadImage = {
        ...mockProduct,
        image: 'not-a-valid-url'
      }

      const wrapper = mount(ProductCard, {
        props: {
          product: productBadImage,
          isFavorite: false
        }
      })

      const img = wrapper.find('.product-img')
      expect(img.attributes('src')).toBe('not-a-valid-url')
    })

    it('debería manejar cambios rápidos de props', async () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      const newProduct = { ...mockProduct, id: 2, title: 'New Product' }

      await wrapper.setProps({ product: newProduct, isFavorite: true })
      expect(wrapper.text()).toContain('New Product')
      expect(wrapper.find('.favorite-btn').text()).toBe('❤️')

      const anotherProduct = { ...mockProduct, id: 3, title: 'Another Product' }
      await wrapper.setProps({ product: anotherProduct, isFavorite: false })
      expect(wrapper.text()).toContain('Another Product')
      expect(wrapper.find('.favorite-btn').text()).toBe('🤍')
    })
  })

  describe('Props Validación', () => {
    it('debería recibir product prop correctamente', () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      expect(wrapper.props('product')).toEqual(mockProduct)
    })

    it('debería recibir isFavorite prop correctamente', () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: true
        }
      })

      expect(wrapper.props('isFavorite')).toBe(true)
    })

    it('debería actualizar cuando props cambian', async () => {
      const wrapper = mount(ProductCard, {
        props: {
          product: mockProduct,
          isFavorite: false
        }
      })

      const newProduct = {
        ...mockProduct,
        title: 'Producto Actualizado'
      }

      await wrapper.setProps({ product: newProduct })

      expect(wrapper.props('product').title).toBe('Producto Actualizado')
      expect(wrapper.text()).toContain('Producto Actualizado')
    })
  })
})
