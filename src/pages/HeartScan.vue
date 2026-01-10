<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2>Scan cardiaque</h2>

      <!-- Vidéo caméra -->
      <video
        ref="video"
        autoplay
        playsinline
        muted
        style="width: 100%; max-width: 320px; border-radius: 12px;"
      ></video>

      <!-- Canvas caché pour analyse PPG -->
      <canvas
        ref="canvas"
        width="200"
        height="150"
        style="display: none;"
      ></canvas>

      <!-- Données -->
      <div style="margin-top: 16px;">
        <p><strong>BPM :</strong> {{ bpm }}</p>
        <p><strong>Cohérence :</strong> {{ coherence }}</p>
        <p><strong>Fréquence :</strong> {{ currentFrequency }} Hz</p>
      </div>

      <!-- Actions -->
      <ion-button expand="block" @click="startScan">
        Démarrer le scan
      </ion-button>

      <ion-button expand="block" color="danger" @click="stopScan">
        Arrêter
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonContent, IonButton } from '@ionic/vue'

import { extractPPGFromFrame } from '../engine/ppgProcessor'
import { detectPeak, calculateBPMFromPeaks } from '../engine/bpmCalculator'
import { calculateHRV } from '../engine/hrvAnalyzer'
import { coherenceScore } from '../engine/coherenceEngine'
import { mapFrequency } from '../engine/frequencyMapper'
import { play, stop } from '../audio/oscillator'

const video = ref<HTMLVideoElement>()
const canvas = ref<HTMLCanvasElement>()

const bpm = ref(0)
const coherence = ref(0)
const currentFrequency = ref(0)

let ctx: CanvasRenderingContext2D | null = null
let animationId = 0
let peaks: number[] = []
let baseline = 0

async function startScan() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }
  })

  if (video.value) {
    video.value.srcObject = stream
    await video.value.play()
  }

  ctx = canvas.value?.getContext('2d') || null
  peaks = []
  baseline = 0

  loop()
}

function loop() {
  if (!video.value || !ctx || !canvas.value) return

  ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height)
  const frame = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height)

  const ppg = extractPPGFromFrame(frame)
  baseline = baseline * 0.95 + ppg * 0.05

  const now = performance.now()
  const peak = detectPeak(ppg, baseline + 5, now)

  if (peak) {
    peaks.push(peak)
    if (peaks.length > 8) peaks.shift()

    bpm.value = calculateBPMFromPeaks(peaks)

    if (peaks.length >= 3) {
      const intervals: number[] = []
      for (let i = 1; i < peaks.length; i++) {
        intervals.push(peaks[i] - peaks[i - 1])
      }

      const hrv = calculateHRV(intervals)
      coherence.value = coherenceScore(hrv)
      currentFrequency.value = mapFrequency(coherence.value)

      play(currentFrequency.value)
    }
  }

  animationId = requestAnimationFrame(loop)
}

function stopScan() {
  cancelAnimationFrame(animationId)
  stop()

  if (video.value?.srcObject) {
    const tracks = (video.value.srcObject as MediaStream).getTracks()
    tracks.forEach(t => t.stop())
  }
}
</script>
