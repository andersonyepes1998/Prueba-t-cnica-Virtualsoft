<template>
  <div class="empty-wrapper">
    <div class="icon-container">
      <div class="circle-glow"></div>
      <ion-icon :icon="heartOutline" class="main-icon"></ion-icon>
    </div>

    <h2>{{ title }}</h2>
    <p>{{ subtitle }}</p>

    <ion-button
      v-if="buttonText"
      fill="solid"
      class="retry-btn"
      @click="$emit('action')"
    >
      {{ buttonText }}
      <ion-icon slot="end" :icon="arrowForward"></ion-icon>
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'
import { heartOutline, arrowForward } from 'ionicons/icons'

defineProps<{
  title: string
  subtitle: string
  buttonText?: string
}>()

defineEmits(['action'])
</script>

<style scoped>
.empty-wrapper {
  padding: 80px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
}

.main-icon {
  font-size: 84px;
  color: #111827;
  position: relative;
  z-index: 2;
}

.circle-glow {
  position: absolute;
  width: 110px;
  height: 110px;
  background: #f3f4f6;
  border-radius: 50%;
  z-index: 1;
}

h2 {
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  padding: 0 10px;
}

p {
  font-size: 15px;
  color: #6b7280;
  margin-top: 12px;
  margin-bottom: 32px;
  line-height: 1.6;
  max-width: 280px;
}

.retry-btn {
  --background: #111827;
  --background-activated: #374151;
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  height: 48px;
  transition: transform 0.2s ease;
  width: 100%;
  max-width: 220px;
}

.retry-btn:active {
  transform: scale(0.96);
}
</style>