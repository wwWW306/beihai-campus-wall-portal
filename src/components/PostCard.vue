<template>
  <article class="post-card" @click="goDetail">
    <header class="post-header">
      <router-link :to="`/user/${post.authorId}`" @click.stop class="author-link">
        <img :src="post.authorAvatar" :alt="post.authorName" class="avatar" />
      </router-link>
      <div class="author-info">
        <div class="author-row">
          <router-link :to="`/user/${post.authorId}`" class="author-name" @click.stop>{{ post.authorName }}</router-link>
          <span v-if="post.partition" class="tag" @click.stop>{{ post.partition }}</span>
        </div>
        <span class="post-time">{{ formatTime(post.createTime) }}</span>
      </div>
      <button class="more-btn" @click.stop><Icons name="dots" :size="18" /></button>
    </header>

    <div class="post-body">
      <p class="post-text">{{ post.content }}</p>

      <!-- 链接预览 -->
      <LinkPreview v-if="post.linkUrl" :url="post.linkUrl" :title="post.linkTitle" />

      <div v-if="post.images && post.images.length === 1" class="post-img-single" @click.stop="openImage(post.images[0])">
        <img :src="post.images[0]" alt="图片" loading="lazy" />
      </div>
      <div v-else-if="post.images && post.images.length > 1" class="post-img-grid" @click.stop>
        <div v-for="(img, idx) in post.images.slice(0, 4)" :key="idx" class="img-thumb" @click="openImage(img)">
          <img :src="img" :alt="`Image ${idx+1}`" loading="lazy" />
          <div v-if="idx === 3 && post.images.length > 4" class="img-more">+{{ post.images.length - 4 }}</div>
        </div>
      </div>
    </div>

    <footer class="post-actions">
      <button class="action-btn" :class="{ 'action-btn--liked': post.isLiked }" @click.stop="toggleLike">
        <Icons :name="post.isLiked ? 'heart-solid' : 'heart'" :size="18" />
        <span>{{ post.likeCount || '' }}</span>
      </button>
      <button class="action-btn" @click.stop="goDetail">
        <Icons name="chat" :size="18" /><span>{{ post.commentCount || '' }}</span>
      </button>
      <button class="action-btn" @click.stop="sharePost"><Icons name="share" :size="18" /></button>
      <button class="action-btn" @click.stop><Icons name="bookmark" :size="18" /></button>
    </footer>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { usePostsStore } from '../stores'
import Icons from './Icons.vue'
import LinkPreview from './LinkPreview.vue'

const props = defineProps({ post: { type: Object, required: true } })
const emit = defineEmits(['share', 'bookmark'])
const router = useRouter()
const postsStore = usePostsStore()

function goDetail() { router.push(`/post/${props.post.id}`) }
function toggleLike() { postsStore.toggleLike(props.post.id) }
function sharePost() { emit('share', props.post.id) }
function openImage(img) { window.open(img, '_blank') }
function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts), now = new Date(), diff = (now - d) / 1000
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.post-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 16px; cursor: pointer; transition: box-shadow var(--transition-fast); }
.post-card:hover { box-shadow: var(--shadow-md); }
.post-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; background: transparent; border: none; }
.author-link { flex-shrink: 0; }
.author-info { flex: 1; min-width: 0; }
.author-row { display: flex; align-items: center; gap: 8px; }
.author-name { font-size: 15px; font-weight: 600; color: var(--color-text); text-decoration: none; }
.author-name:hover { color: var(--color-primary); }
.post-time { font-size: 12px; color: var(--color-text-muted); margin-top: 2px; display: block; }
.more-btn { width: 32px; height: 32px; border-radius: var(--radius-full); background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); transition: all var(--transition-fast); flex-shrink: 0; }
.more-btn:hover { background: rgba(0, 0, 0, 0.04); color: var(--color-text); }
.post-body { margin-bottom: 12px; }
.post-text { font-size: 15px; line-height: 1.7; color: var(--color-text); word-break: break-word; font-family: var(--font-sans); text-transform: none; }
.post-img-single { margin-top: 12px; }
.post-img-single img { width: 100%; max-height: 400px; object-fit: cover; border-radius: var(--radius-md); cursor: zoom-in; }
.post-img-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; margin-top: 12px; border-radius: var(--radius-md); overflow: hidden; }
.img-thumb { position: relative; aspect-ratio: 1; overflow: hidden; }
.img-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-fast); cursor: zoom-in; }
.img-thumb:hover img { transform: scale(1.03); }
.img-more { position: absolute; inset: 0; background: rgba(0,0,0,0.5); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; }
.post-actions { display: flex; align-items: center; gap: 4px; padding-top: 8px; border-top: 1px solid var(--color-border-light); background: transparent; }
.action-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: var(--radius-full); font-size: 13px; font-weight: 500; color: var(--color-text-muted); background: transparent; border: none; cursor: pointer; transition: all var(--transition-fast); font-family: var(--font-sans); }
.action-btn:hover { background: rgba(0, 0, 0, 0.04); color: var(--color-text-secondary); }
.action-btn--liked { color: var(--color-primary); }
.action-btn--liked:hover { background: var(--color-danger-light); color: var(--color-danger); }

@media (max-width: 768px) {
  .post-card {
    border-left: none;
    border-right: none;
    border-radius: 0;
    padding: 12px;
  }
}
</style>
