<template>
  <div id="app" :data-theme="themeStore?.theme || 'light'" :data-page="pageMode">
    <Toast ref="toastRef" />
    <AppNavBar v-if="showChrome" />
    <router-view v-slot="{ Component }">
      <keep-alive include="WallPage,PartitionPage,SearchPage">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <MobileTabBar v-if="showChrome" />
    <BackToTop v-if="showChrome" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Toast from './components/Toast.vue'
import BackToTop from './components/BackToTop.vue'
import MobileTabBar from './components/MobileTabBar.vue'
import AppNavBar from './components/AppNavBar.vue'

import { useThemeStore } from './stores'

const toastRef = ref(null)
const themeStore = ref(null) // 初始化为空
const route = useRoute()

// Landing page and home page keep brutalist/custom styles; everything else uses clean mode
const landingPaths = ['/', '/home']
const showChrome = computed(() => !landingPaths.includes(route.path))
const pageMode = computed(() => landingPaths.includes(route.path) ? 'landing' : 'app')

onMounted(() => {
  themeStore.value = useThemeStore()
})
</script>

<style>
/* 移动端底部导航栏占位 */
@media (max-width: 768px) {
  #app[data-page="app"] {
    padding-bottom: 72px;
  }
}
</style>
