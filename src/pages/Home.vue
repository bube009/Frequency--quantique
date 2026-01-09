<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1>Frequency Quantique</h1>
      <ion-button router-link="/scan">
        Démarrer le scan cardiaque
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue'
</script>
