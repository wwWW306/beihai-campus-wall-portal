<template>
  <div v-if="!isUnmounted" class="intro-container" :class="`phase-${phase}`">
    
    <!-- Brutalist Solid Overlay -->
    <div class="solid-bg"></div>
    
    <!-- Sharp Clear Window (No border radius) -->
    <div class="clear-window"></div>

    <!-- The Logo -->
    <div class="intro-logo">
      <span class="logo-text symbol left-symbol">C</span>
      <Icons name="home" :size="48" class="logo-icon symbol center-symbol" />
      <span class="logo-text symbol right-symbol">W</span>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Icons from './Icons.vue'

const emit = defineEmits(['complete'])

const phase = ref(0)
const isUnmounted = ref(false)

onMounted(() => {
  document.body.style.overflow = 'hidden'

  setTimeout(() => { phase.value = 1 }, 200)
  setTimeout(() => { phase.value = 2 }, 1200)
  setTimeout(() => { phase.value = 3 }, 2400)
  setTimeout(() => { phase.value = 4 }, 3400)
  setTimeout(() => { 
    document.body.style.overflow = ''
    emit('complete')
    isUnmounted.value = true 
  }, 4200)
})
</script>

<style scoped>
.intro-container {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none; 
}

/* --- Brutalist Solid Background --- */
.solid-bg {
  position: absolute;
  inset: 0;
  background: #000; /* Pure black */
  transition: opacity 600ms ease;
}

/* --- Sharp Geometric Window --- */
.clear-window {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 0px;
  height: 0px;
  border-radius: 0; /* Brutalist sharp edges */
  
  background-image: url('/campus_bg_blue.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: grayscale(100%) contrast(1.15); /* Keep consistency with BW redesign */
  
  border: 0 solid #FF0000;
  opacity: 0;
  transition: 
    width 800ms cubic-bezier(0.87, 0, 0.13, 1), 
    height 800ms cubic-bezier(0.87, 0, 0.13, 1),
    border-width 800ms ease,
    opacity 400ms ease;
}

.phase-2 .clear-window {
  width: 320px;
  height: 480px;
  border-width: 8px; /* Thick red border */
  opacity: 1;
}

.phase-3 .clear-window,
.phase-4 .clear-window {
  width: 100vw;
  height: 100vh;
  border-width: 0px;
  opacity: 1;
}

.phase-4 .solid-bg,
.phase-4 .clear-window {
  opacity: 0;
}

/* --- Logo Animation (Gather to Spread) --- */
.intro-logo {
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100vw;
  height: 60px;
}

.symbol {
  position: absolute;
  top: 50%;
  color: #FF0000; /* Pure vivid red */
  text-shadow: none; /* No shadow in brutalism, keep it flat and hard */
  opacity: 0;
  transform-origin: center;
  transition: all 800ms cubic-bezier(0.87, 0, 0.13, 1);
}

.logo-text {
  font-size: 48px; /* Even bigger */
  font-weight: 900;
  letter-spacing: 4px;
  font-family: 'Outfit', 'Bebas Neue', 'Inter', system-ui, sans-serif;
  text-transform: uppercase;
}

/* Phase 0: Hidden */
.left-symbol { left: 50%; transform: translate(-50%, 40px) scale(0.8); }
.center-symbol { left: 50%; transform: translate(-50%, 40px) scale(0.8); }
.right-symbol { left: 50%; transform: translate(-50%, 40px) scale(0.8); }

/* Phase 1: Gathered tightly */
.phase-1 .left-symbol { left: 50%; transform: translate(-80px, -50%) scale(1); opacity: 1; }
.phase-1 .center-symbol { left: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; }
.phase-1 .right-symbol { left: 50%; transform: translate(80px, -50%) scale(1); opacity: 1; }

/* Phase 2: Spread to edges */
.phase-2 .left-symbol { left: 10vw; transform: translate(-50%, -50%) scale(1); opacity: 1; }
.phase-2 .center-symbol { left: 50vw; transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
.phase-2 .right-symbol { left: 90vw; transform: translate(-50%, -50%) scale(1); opacity: 1; }

/* Phase 3 & 4: Fade out */
.phase-3 .left-symbol, .phase-4 .left-symbol { left: 10vw; transform: translate(-50%, -80px) scale(0.9); opacity: 0; }
.phase-3 .center-symbol, .phase-4 .center-symbol { left: 50vw; transform: translate(-50%, -80px) scale(1.1); opacity: 0; }
.phase-3 .right-symbol, .phase-4 .right-symbol { left: 90vw; transform: translate(-50%, -80px) scale(0.9); opacity: 0; }
</style>
