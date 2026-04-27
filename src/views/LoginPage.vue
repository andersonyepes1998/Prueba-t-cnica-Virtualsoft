<template>
  <ion-page>
    <ion-content :fullscreen="true" class="login-content">
      <div class="login-wrapper">
        <div class="brand-section">
          <div class="brand-circle">
            <img :src="logo" alt="VirtualSoft Logo" class="logo-img" />
          </div>

          <h1 class="text-one">VirtualSoft</h1>
          <p class="text-two">Ingresa para descubrir productos increíbles</p>
        </div>

        <div class="login-card">
          <h2>Iniciar sesión</h2>
          <span class="subtitle">Accede a tu cuenta</span>

          <ion-item class="custom-input" lines="none">
            <ion-icon slot="start" :icon="mailOutline" />
            <ion-input
              v-model="email"
              type="email"
              placeholder="Correo electrónico"
            />
          </ion-item>

          <ion-item class="custom-input" lines="none">
            <ion-icon slot="start" :icon="lockClosedOutline" />

            <ion-input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Contraseña"
              class="text-password"
            />

            <ion-button
              fill="clear"
              slot="end"
              @click="showPassword = !showPassword"
            >
              <ion-icon
                :icon="showPassword ? eyeOffOutline : eyeOutline"
              />
            </ion-button>
          </ion-item>

          <div class="forgot-row">
            <ion-text>¿Olvidaste tu contraseña?</ion-text>
          </div>

          <ion-button
            expand="block"
            class="login-btn"
            @click="handleLogin"
            :disabled="isLoading"
          >
            <ion-spinner
              v-if="isLoading"
              name="crescent"
              slot="start"
            />

            {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
          </ion-button>

          <div class="demo-box">
            <small>Email: admin@test.com</small>
            <small>Password: 123456</small>
          </div>
        </div>

        <div class="footer-text">
          <span>Diseñado para una experiencia móvil moderna</span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  toastController
} from '@ionic/vue'

import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline
} from 'ionicons/icons'

import logo from '../assets/Virtual.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)


const handleLogin = async () => {
  if (!email.value || !password.value) {
    const toast = await toastController.create({
      message: 'Completa todos los campos',
      duration: 2000,
      position: 'top',
      color: 'danger'
    })

    await toast.present()
    return
  }

  isLoading.value = true

  await new Promise((resolve) => setTimeout(resolve, 3000))

  isLoading.value = false

  const toast = await toastController.create({
    message: 'Login exitoso',
    duration: 1500,
    position: 'top',
    color: 'success'
  })

  await toast.present()
  email.value = ''
  password.value = ''
  router.push('/tabs/home');
}

</script>

<style scoped>
.login-content {
  --background: #fff;
}

.login-wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px;
  padding-top: 80px;
}

.brand-section {
  text-align: center;
  margin-bottom: 28px;
}
.brand-circle {
  width: 150px;
  height: 150px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.107);
}

.logo-img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.brand-section h1 {
  color: rgb(0, 0, 0);
  font-size: 28px;
  font-weight: 800;
  margin: 0;
}

.brand-section p {
  color: #000000;
  margin-top: 8px;
  font-size: 14px;
}

.login-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
}

.login-card h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  text-align: center;
}

.subtitle {
  display: block;
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: 4px;
  text-align: center;
}

.custom-input {
  --background: #f8fafc;
  --border-radius: 14px;
  margin-bottom: 14px;
  border: 1px solid #e5e7eb;
  color: #475569;
}

.custom-input ion-icon {
  color: #1bebeb;
}


.forgot-row {
  text-align: right;
  margin-bottom: 18px;
}

.forgot-row ion-text {
  color: #1bebeb;
  font-size: 13px;
  font-weight: 600;
}

.login-btn {
  --background: #1bebeb;
  --border-radius: 14px;
  height: 50px;
  font-weight: 700;
  margin-top: 8px;
}

.demo-box {
  margin-top: 18px;
  padding: 14px;
  background: #f8fafc;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #475569;
}

.footer-text {
  margin-top: 30px;
  text-align: center;
  color: #000000;
  font-size: 12px;
}
</style>