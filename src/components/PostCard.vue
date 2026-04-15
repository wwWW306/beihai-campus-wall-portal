<template>
  <article class="post-card" @click="goDetail">
    <!-- 顶部：作者信息 + 分区标签 -->
    <div class="post-header">
      <router-link :to="`/user/${post.authorId}`" class="author-info" @click.stop>
        <img :src="post.authorAvatar" :alt="post.authorName" class="avatar avatar-sm" />
        <div class="author-text">
          <span class="author-name">{{ post.authorName }}</span>
          <span class="post-time">{{ formatTime(post.createTime) }}</span>
        </div>
      </router-link>
      <div class="post-meta">
        <span v-if="post.partition" class="tag tag-blue" @click.stop>{{ post.partition }}</span>
        <button class="icon-btn-sm" @click.stop>
          <Icons name="dots" :size="16" />
        </button>
      </div>
    </div>

    <!-- 内容 -->
    <div class="post-content">
      <p class="post-text">{{ post.content }}</p>

      <!-- 单图 -->
      <div v-if="post.images && post.images.length === 1" class="post-image-single" @click.stop="openImage(post.images[0])">
        <img :src="post.images[0]" alt="图片" loading="lazy" />
      </div>

      <!-- 多图 -->
      <div v-else-if="post.images && post.images.length > 1" class="post-images" @click.stop>
        <div
          v-for="(img, idx) in post.images.slice(0, 9)"
          :key="idx"
          class="post-image-thumb"
          @click="openImage(img)"
        >
          <img :src="img" :alt="`图片${idx+1}`" loading="lazy" />
          <div v-if="idx === 8 && post.images.length > 9" class="image-more">+{{ post.images.length - 9 }}</div>
        </div>
      </div>
    </div>

    <!-- 底部：互动栏 -->
    <div class="post-actions">
      <button class="action-btn" :class="{ 'action-btn--active': post.isLiked }" @click.stop="toggleLike">
        <Icons :name="post.isLiked ? 'heart-solid' : 'heart'" :size="17" />
        <span>{{ post.likeCount || '' }}</span>
      </button>
      <button class="action-btn" @click.stop="goDetail">
        <Icons name="chat" :size="17" />
        <span>{{ post.commentCount || '' }}</span>
      </button>
      <button class="action-btn" @click.stop="sharePost">
        <Icons name="share" :size="17" />
      </button>
      <button class="action-btn" @click.stop="bookmarkPost">
        <Icons name="bookmark" :size="17" />
      </button>
    </div>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Icons from './Icons.vue'

const props = defineProps({
  post: { type: Object, required: true }
})
const emit = defineEmits(['like', 'comment', 'share', 'bookmark'])
const router = useRouter()

function goDetail() { router.push(`/post/${props.post.id}`) }
function toggleLike() { emit('like', props.post.id) }
function sharePost() { emit('share', props.post.id) }
function bookmarkPost() { emit('bookmark', props.post.id) }
function openImage(img) { window.open(img, '_blank') }
function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  const now = new Date()
  const diff = (now - d) / 1000
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff/60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff/3600)}小时前`
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.post-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border-light);
  padding: 16px;
  cursor: pointer;
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}
.post-card:hover {
  box-shadow: var(--shadow-md);
}

/* 头部 */
.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.author-info {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.author-text { display: flex; flex-direction: column; }
.author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
}
.post-time {
  font-size: 12px;
  color: var(--color-text-muted);
}
.post-meta { display: flex; align-items: center; gap: 8px; }

/* 内容 */
.post-content { margin-bottom: 12px; }
.post-text {
  font-size: 15px;
  line-height: 1.65;
  color: var(--color-text);
  margin-bottom: 10px;
  word-break: break-word;
}

/* 图片 */
.post-image-single img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: var(--radius-md);
  cursor: zoom-in;
}
.post-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  border-radius: var(--radius-md);
  overflow: hidden;
}
.post-image-thumb {
  position: relative;
  aspect-ratio: 1;
  cursor: zoom-in;
}
.post-image-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-fast);
}
.post-image-thumb:hover img { transform: scale(1.03); }
.image-more {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
}

/* 操作栏 */
.post-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-top: 10px;
  border-top: 1px solid var(--color-border-light);
}
.action-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.action-btn:hover {
  background: var(--color-bg);
  color: var(--color-text);
}
.action-btn--active {
  color: var(--color-primary);
}
.action-btn--active:hover {
  background: var(--color-primary-light);
}
.icon-btn-sm {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}
.icon-btn-sm:hover {
  background: var(--color-bg);
  color: var(--color-text);
}
</style>
