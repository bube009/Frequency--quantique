<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-searchbar
        v-model="search"
        placeholder="Rechercher une fréquence"
      />

      <ion-list>
        <ion-item
          v-for="freq in filteredFrequencies"
          :key="freq.id"
          :router-link="`/frequency/${freq.id}`"
        >
          <ion-label>
            <h2>{{ freq.name }}</h2>
            <p>{{ freq.category }} — {{ freq.frequencyHz }} Hz</p>
          </ion-label>
        </ion-item>
      </ion-list>
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
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';
import { ref, computed } from 'vue';
import data from '../data/frequencies.json';

interface FreqItem {
  id: string;
  name: string;
  category: string;
  frequencyHz: number;
  durationSec: number;
}

const search = ref('');
const frequencies = ref<FreqItem[]>(data as FreqItem[]);

const filteredFrequencies = computed(() => {
  if (!search.value) return frequencies.value;
  const s = search.value.toLowerCase();
  return frequencies.value.filter(
    f =>
      f.name.toLowerCase().includes(s) ||
      f.category.toLowerCase().includes(s)
  );
});
</script>
