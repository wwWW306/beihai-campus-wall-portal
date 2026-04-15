<template>
  <div v-if="visible" class="preview-overlay" @click="close">
    <div class="preview-content" @click.stop>
      <button class="close-btn" @click="close">&times;</button>
      <button v-if="images.length > 1" class="nav-btn prev" @click="prev">&lt;</button>
      <img :src="images[currentIndex]" alt="预览图片" class="preview-image">
      <button v-if="images.length > 1" class="nav-btn next" @click="next">&gt;</button>
      <div v-if="images.length > 1" class="indicator">{{ currentIndex + 1 }} / {{ images.length }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const currentIndex = ref(props.initialIndex)

watch(() => props.initialIndex, (val) => {
  currentIndex.value = val
})

watch(() => props.visible, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function close() {
  document.body.style.overflow = ''
  emit('close')
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}
</script>

<style scoped>
.preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.preview-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.preview-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 10px 15px;
  cursor: pointer;
}

.nav-btn.prev { left: -60px; }
.nav-btn.next { right: -60px; }

.indicator {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
}
</style>