<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorites" href="/tabs/favorites">
          <ion-icon :icon="heartOutline" />
          <ion-label>Productos Favoritos</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs> 
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
import { homeOutline, heartOutline } from 'ionicons/icons';
</script>

<style scoped>
.custom-tab-bar {
  --background: #f5f5f5;
  --color: #000000;
  --color-selected: #06b6d4;
  border: none;
}

ion-tab-button {
  --color: #000000;
  --color-selected: #06b6d4;
}

ion-tab-button ion-icon {
  color: #000000;
}

ion-tab-button.tab-selected ion-icon {
  color: #06b6d4;
}

ion-tab-button ion-label {
  color: #000000;
}

ion-tab-button.tab-selected ion-label {
  color: #06b6d4;
}
</style>