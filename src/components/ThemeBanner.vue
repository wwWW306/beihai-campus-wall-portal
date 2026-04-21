<template>
  <div class="theme-banner">
    <div class="theme-card" :style="{ '--theme-color': currentTheme.color }">
      <div class="theme-badge">
        <Icons name="sparkle" :size="14" />
        <span>主题墙</span>
      </div>
      <h2 class="theme-title">{{ currentTheme.title }}</h2>
      <p class="theme-desc">{{ currentTheme.desc }}</p>
      <div class="theme-meta">
        <span class="theme-count">🔥 {{ currentTheme.count }} 人参与</span>
        <span class="theme-countdown">⏳ 还剩 {{ currentTheme.daysLeft }} 天</span>
      </div>
      <button class="theme-join-btn" @click="$router.push('/wall')">
        参与讨论
        <Icons name="chevron-right" :size="14" />
      </button>
    </div>
    <div class="theme-dots">
      <span v-for="(t, idx) in themes" :key="idx" class="dot" :class="{ 'dot--active': idx === activeIndex }" @click="activeIndex = idx"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Icons from './Icons.vue'

const activeIndex = ref(0)
let timer = null

const themes = [
  { title: '毕业季 · 最想对TA说的话 💌', desc: '四年时光匆匆，那些没说出口的话，在这里写下吧', color: '#1a1a1a', count: 1283, daysLeft: 12 },
  { title: '期末加油墙 💪', desc: '考试周快到了！互相鼓励，一起上岸', color: '#333333', count: 856, daysLeft: 5 },
  { title: '新学期Flag 🚩', desc: '新的学期，新的目标，立个flag让大家见证', color: '#000000', count: 2341, daysLeft: 20 },
]

const currentTheme = computed(() => themes[activeIndex.value])

onMounted(() => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % themes.length
  }, 6000)
})
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped>
.theme-banner { margin-bottom: 16px; }
.theme-card {
  background: linear-gradient(135deg, var(--theme-color), color-mix(in srgb, var(--theme-color) 60%, var(--color-bg)));
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  color: white;
  position: relative;
  overflow: hidden;
}
.theme-card::before {
  content: '';
  position: absolute;
  top: -30px;
  right: -30px;
  width: 120px;
  height: 120px;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
}
.theme-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  background: rgba(255,255,255,0.2);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
  backdrop-filter: blur(4px);
}
.theme-title { font-size: 18px; font-weight: 700; margin-bottom: 6px; line-height: 1.4; }
.theme-desc { font-size: 13px; opacity: 0.85; margin-bottom: 12px; line-height: 1.5; }
.theme-meta { display: flex; gap: 16px; font-size: 12px; opacity: 0.8; margin-bottom: 14px; }
.theme-join-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 16px;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: var(--radius-full);
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: var(--font-sans);
  backdrop-filter: blur(4px);
}
.theme-join-btn:hover { background: rgba(255,255,255,0.3); }
.theme-dots { display: flex; justify-content: center; gap: 6px; margin-top: 10px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-border); cursor: pointer; transition: all var(--transition-fast); }
.dot--active { background: var(--color-primary); width: 18px; border-radius: 3px; }
</style>
