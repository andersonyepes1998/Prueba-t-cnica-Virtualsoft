<template>
  <ion-card
    class="product-card"
    button
    @click="handleDetail"
  >
    <button
      class="favorite-btn"
      @click.stop="handleFavorite"
    >
      {{ isFavorite ? '❤️' : '🤍' }}
    </button>

    <div class="image-wrapper">
      <img :src="product.image" class="product-img" />
    </div>

    <ion-card-content>
      <h3>{{ product.title }}</h3>

      <p class="price">$ {{ product.price }}</p>

      <ion-button
        class="detail-btn"
        expand="block"
        size="small"
        @click.stop="handleDetail"
      >
        Ver detalle
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/vue'

import type { Product } from '../types/product.interface'

const props = defineProps<{
  product: Product
  isFavorite: boolean
}>()

const emit = defineEmits([
  'view-detail',
  'toggle-favorite'
])

const handleDetail = () => {
  emit('view-detail', props.product.id)
}

const handleFavorite = () => {
  emit('toggle-favorite', props.product)
}
</script>

<style scoped>
.product-card {
  position: relative;
  background: #ffffff;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
  cursor: pointer;
}

/* Hover web */
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.12);
}

/* Press mobile */
.product-card:active {
  transform: scale(0.98);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.10);
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 30;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,.96);
  box-shadow: 0 10px 18px rgba(0,0,0,.10);
  font-size: 18px;
  transition: transform 0.18s ease;
}

.favorite-btn:active {
  transform: scale(0.92);
}

.image-wrapper {
  padding: 18px;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
}

.product-img {
  width: 100%;
  height: 170px;
  object-fit: contain;
}

.product-card ion-card-content {
  padding-top: 14px;
}

h3 {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  min-height: 42px;
  line-height: 1.4;
  margin: 0;
}

.price {
  font-size: 20px;
  font-weight: 900;
  color: #06b6d4;
  margin: 12px 0;
}

.detail-btn {
  --background: linear-gradient(135deg, #06b6d4, #22d3ee);
  --border-radius: 14px;
  font-weight: 700;
  height: 42px;
  margin-top: 8px;
}
</style>