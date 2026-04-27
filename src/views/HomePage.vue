<template>
  <ion-page>
    <base-header title="Inicio" />
    <ion-content class="home-content">

      <div class="header">
        <span class="badge">Nueva Colección</span>
        <h1>Productos</h1>
        <p>Artículos seleccionados para tu estilo diario</p>
      </div>

      <div v-if="loading" class="grid">
        <ProductSkeleton v-for="item in 6" :key="item" />
      </div>

      <EmptyState
        v-else-if="error"
        title="Oops..."
        subtitle="No pudimos cargar los productos"
        buttonText="Reintentar"
        @action="fetchProducts"
      />

      <div v-else class="grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :isFavorite="isFavorite(product.id)"
          @view-detail="goToDetail"
          @toggle-favorite="toggleFavorite"
        />
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage, IonContent, onIonViewWillEnter  } from '@ionic/vue'

import ProductCard from '@/components/ProductCard.vue'
import BaseHeader from '../components/BaseHeader.vue';
import ProductSkeleton from '@/components/ProductSkeleton.vue'
import EmptyState from '@/components/EmptyState.vue'

import type { Product } from '@/types/product.interface'
import { getProducts } from '@/services/product.service'

const router = useRouter()

const products = ref<Product[]>([])
const favorites = ref<Product[]>([])
const loading = ref(true)
const error = ref(false)

const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = false

    const data = await getProducts()
    products.value = data
  } catch (err) {
    error.value = true
  } finally {
    loading.value = false
  }
}

const goToDetail = (id: number) => {
  router.push(`/product/${id}`)
}

const loadFavorites = () => {
  const stored = localStorage.getItem('favorites')

  if (stored) {
    favorites.value = JSON.parse(stored)
  }
}

const saveFavorites = () => {
  localStorage.setItem(
    'favorites',
    JSON.stringify(favorites.value)
  )
}

const isFavorite = (id: number) => {
  return favorites.value.some(item => item.id === id)
}

const toggleFavorite = (product: Product) => {
  const exists = isFavorite(product.id)

  if (exists) {
    favorites.value = favorites.value.filter(
      item => item.id !== product.id
    )
  } else {
    favorites.value.push(product)
  }

  saveFavorites()
}

onMounted(() => {
  fetchProducts()
  loadFavorites()
})

onIonViewWillEnter(() => {
  loadFavorites()
})
</script>

<style scoped>
.home-content {
  --background: #ffffff;
}

.header {
  padding: 35px 20px 15px;
  background: #ffffff;
}

.badge {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: #1bebeb;
  margin-bottom: 8px;
  display: block;
}

.header h1 {
  font-size: 34px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -1px;
  margin: 0;
}

.header p {
  font-size: 15px;
  color: #6b7280;
  margin-top: 5px;
  font-weight: 400;
}

.grid {
  padding: 0 14px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
</style>