import { createRouter, createWebHistory } from '@ionic/vue-router'
import Home from '../pages/Home.vue'
import HeartScan from '../pages/HeartScan.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/scan', component: HeartScan }
  ]
})
