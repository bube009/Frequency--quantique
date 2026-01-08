<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2>Scan cardiaque</h2>
      <video ref="video" autoplay playsinline></video>
      <p>BPM : {{ bpm }}</p>
      <ion-button @click="startScan">Démarrer</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { extractPPG } from '../engine/ppgProcessor';

const bpm = ref(0);
const video = ref<HTMLVideoElement>();

async function startScan() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }
  });
  if (video.value) video.value.srcObject = stream;
}
</script>
