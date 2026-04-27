<template>
  <ion-page>
    <ion-content class="favorites-content">
      <base-header title="Favoritos" />
      <div class="header">
        <h1>Favoritos</h1>
        <p>Productos guardados por ti</p>
      </div>

      <EmptyState
        v-if="favorites.length === 0"
        title="No hay productos agregados a favoritos"
        subtitle="Explora el catálogo y guarda los productos que más te gusten."
      />

      <div v-else class="grid">
        <ProductCard
          v-for="product in favorites"
          :key="product.id"
          :product="product"
          :isFavorite="true"
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
import { IonPage, IonContent, onIonViewWillEnter } from '@ionic/vue'

import ProductCard from '@/components/ProductCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import BaseHeader from '../components/BaseHeader.vue';

import type { Product } from '@/types/product.interface'

const router = useRouter()

const favorites = ref<Product[]>([])

const loadFavorites = () => {
  const stored = localStorage.getItem('favorites')

  favorites.value = stored
    ? JSON.parse(stored)
    : []
}

const saveFavorites = () => {
  localStorage.setItem(
    'favorites',
    JSON.stringify(favorites.value)
  )
}

const toggleFavorite = (product: Product) => {
  favorites.value = favorites.value.filter(
    item => item.id !== product.id
  )

  saveFavorites()
}

const goToDetail = (id: number) => {
  router.push(`/product/${id}`)
}

onMounted(() => {
  loadFavorites()
})

onIonViewWillEnter(() => {
  loadFavorites()
})
</script>

<style scoped>
.favorites-content {
  --background: #ffffff;
}

.header {
  padding: 24px 18px 12px;
}

.header h1 {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.header p {
  font-size: 14px;
  color: #6b7280;
  margin-top: 6px;
}

.grid {
  padding: 0 14px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
</style>