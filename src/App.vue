<template>
  <div id="app" :data-theme="theme">
    <Toast ref="toastRef" />
    <router-view />
    <MobileTabBar />
    <BackToTop />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Toast from './components/Toast.vue'
import BackToTop from './components/BackToTop.vue'
import MobileTabBar from './components/MobileTabBar.vue'

const toastRef = ref(null)
const theme = ref('light')

onMounted(() => {
  const saved = localStorage.getItem('campus-wall-theme')
  if (saved) {
    theme.value = saved
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  }
})
</script>

<style>
/* 移动端底部导航栏占位 */
@media (max-width: 768px) {
  #app {
    padding-bottom: 72px;
  }
}
</style>
