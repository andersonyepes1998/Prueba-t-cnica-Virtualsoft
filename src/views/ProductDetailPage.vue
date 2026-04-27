<template>
  <ion-page>
    <base-header title="Detalles" />
    <ion-content class="detail-content">

      <div class="top-bar">
        <ion-button class="detail-btn" fill="clear" @click="goBack">
          <ion-icon :icon="arrowBackOutline" />
          Atras
        </ion-button>

        <ion-button
          fill="clear"
          class="fav-btn"
          @click="toggleFavorite(product)"
          v-if="product"
        >
          <ion-icon
            :icon="isFavorite(product.id) ? heart : heartOutline"
          />
        </ion-button>
      </div>

      <div v-if="loading" class="loading-box">
        <ion-spinner name="crescent" />
        <p>Cargando producto...</p>
      </div>

      <EmptyState
        v-else-if="error"
        title="No pudimos cargar el producto"
        subtitle="Intenta nuevamente."
        buttonText="Reintentar"
        @action="fetchProduct"
      />

      <div v-else-if="product" class="wrapper">

        <div class="image-box">
          <img :src="product.image" class="product-img" />
        </div>

        <div class="info-box">
          <span class="category">
            {{ product.category }}
          </span>

          <h1>{{ product.title }}</h1>

          <p class="price">$ {{ product.price }}</p>

          <p class="description">
            {{ product.description }}
          </p>
        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner
} from '@ionic/vue'

import {
  arrowBackOutline,
  heartOutline,
  heart
} from 'ionicons/icons'

import EmptyState from '@/components/EmptyState.vue'
import BaseHeader from '../components/BaseHeader.vue';
import type { Product } from '@/types/product.interface'
import { getProductById } from '@/services/product.service'

const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref(false)

const favorites = ref<Product[]>([])

const loadFavorites = () => {
  const stored = localStorage.getItem('favorites')
  favorites.value = stored ? JSON.parse(stored) : []
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

const toggleFavorite = (item: Product) => {
  const exists = isFavorite(item.id)

  if (exists) {
    favorites.value = favorites.value.filter(
      fav => fav.id !== item.id
    )
  } else {
    favorites.value.push(item)
  }

  saveFavorites()
}

const fetchProduct = async () => {
  try {
    loading.value = true
    error.value = false

    const id = route.params.id as string

    product.value = await getProductById(id)

  } catch (err) {
    error.value = true
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  loadFavorites()
  fetchProduct()
})
</script>

<style scoped>
.detail-content {
  --background: #ffffff;
}

.top-bar {
  padding: 10px 10px 0;
  display: flex;
  justify-content: space-between;
}

.top-bar ion-button {
  --color: #111827;
}

.fav-btn {
  --color: #ef4444;
}

.loading-box {
  padding: 60px 20px;
  text-align: center;
}

.loading-box p {
  margin-top: 12px;
  color: #6b7280;
}

.wrapper {
  padding: 10px 18px 30px;
}

.image-box {
  background: #ffffff;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 10px 28px rgba(0,0,0,.08);
}

.product-img {
  width: 100%;
  height: 260px;
  object-fit: contain;
}

.info-box {
  margin-top: 24px;
}

.category {
  font-size: 13px;
  color: #6366f1;
  font-weight: 700;
  text-transform: capitalize;
}

h1 {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin: 10px 0;
  line-height: 1.3;
}

.price {
  font-size: 28px;
  font-weight: 900;
  color: #1bebeb;
  margin-bottom: 18px;
}

.description {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.7;
}

.favorite-action {
  margin-top: 26px;
  --background: #1bebeb;
  --border-radius: 16px;
  font-weight: 700;
  height: 52px;
}

.detail-btn {
  --background: linear-gradient(135deg, #06b6d4, #22d3ee);
  --border-radius: 14px;
  font-weight: 700;
  height: 42px;
  margin-top: 8px;
}
</style>