<template>
  <a v-if="url" :href="url" target="_blank" rel="noopener" class="link-preview" @click.stop>
    <div class="link-icon">
      <Icons name="link-external" :size="18" />
    </div>
    <div class="link-info">
      <span class="link-title">{{ title || extractDomain(url) }}</span>
      <span class="link-url">{{ url }}</span>
    </div>
    <Icons name="chevron-right" :size="16" class="link-arrow" />
  </a>
</template>

<script setup>
import Icons from './Icons.vue'

defineProps({
  url: { type: String, default: '' },
  title: { type: String, default: '' }
})

function extractDomain(url) {
  try { return new URL(url).hostname } catch { return url }
}
</script>

<style scoped>
.link-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
  margin-top: 10px;
}
.link-preview:hover { border-color: var(--color-primary); background: var(--color-primary-light); }
.link-icon {
  width: 36px; height: 36px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.link-info { flex: 1; min-width: 0; }
.link-title { display: block; font-size: 14px; font-weight: 600; color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.link-url { display: block; font-size: 12px; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }
.link-arrow { color: var(--color-text-muted); flex-shrink: 0; }
</style>
