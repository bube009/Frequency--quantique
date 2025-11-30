<template>
  <ion-page v-if="freq">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>{{ freq.name }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>{{ freq.name }}</h2>
      <p>Catégorie : {{ freq.category }}</p>
      <p>Fréquence : <strong>{{ freq.frequencyHz }} Hz</strong></p>
      <p>Durée recommandée : {{ freq.durationSec }} secondes</p>

      <frequency-player
        :frequency-hz="freq.frequencyHz"
        :duration-sec="freq.durationSec"
      />
    </ion-content>
  </ion-page>

  <ion-page v-else>
    <ion-header>
      <ion-toolbar>
        <ion-title>Fréquence introuvable</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Cette fréquence n'existe pas dans la base locale.</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton
} from '@ionic/vue';
import { useRoute } from 'vue-router';
import data from '../data/frequencies.json';
import FrequencyPlayer from '../components/FrequencyPlayer.vue';

interface FreqItem {
  id: string;
  name: string;
  category: string;
  frequencyHz: number;
  durationSec: number;
}

const route = useRoute();
const id = route.params.id as string;

const all = data as FreqItem[];
const freq = all.find(f => f.id === id) || null;
</script>
