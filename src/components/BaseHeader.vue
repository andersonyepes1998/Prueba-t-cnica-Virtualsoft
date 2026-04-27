<template>
  <ion-header :translucent="true">
    <ion-toolbar class="custom-toolbar">
      <ion-title>{{ title }}</ion-title>
      
      <ion-buttons slot="end">
        <ion-button @click="showLogoutConfirm" fill="clear" color="dark">
          <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, alertController } from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

defineProps<{
  title: string;
}>();

const router = useRouter();

const showLogoutConfirm = async () => {
  const alert = await alertController.create({
    header: 'Cerrar sesión',
    message: '¿Estás seguro de que deseas cerrar sesión?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {}
      },
      {
        text: 'Cerrar sesión',
        role: 'confirm',
        handler: () => {
          handleLogout();
        }
      }
    ]
  });

  await alert.present();
};

const handleLogout = () => {
  router.push('/login');
};
</script>

<style scoped>
.custom-toolbar {
  --background: #ffffff;
  --color: #000000;
}

ion-title {
  color: #000000;
}

ion-icon {
  color: #000000;
}
</style>