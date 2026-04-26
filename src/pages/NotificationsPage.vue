<template>
  <div class="notif-page">
    <div class="container">
      <div class="notif-wrapper">
        <div class="notif-header">
          <button class="back-btn" @click="smartBack()"><Icons name="back" :size="20" /></button>
          <h1 class="notif-heading">消息通知</h1>
          <button v-if="hasUnread" class="btn btn-ghost btn-sm" @click="markAllRead">全部已读</button>
        </div>

        <div class="notif-section">
          <div class="section-label">系统通知</div>
          <div v-for="n in systemNotifs" :key="n.id" class="notif-item" :class="{ 'notif-item--unread': !n.read }" @click="n.read = true">
            <div class="notif-icon notif-icon--system"><Icons name="bell" :size="18" /></div>
            <div class="notif-body">
              <div class="notif-text">{{ n.text }}</div>
              <div class="notif-time">{{ n.time }}</div>
            </div>
            <div v-if="!n.read" class="unread-dot"></div>
          </div>
        </div>

        <div class="notif-section">
          <div class="section-label">互动</div>
          <div v-for="n in interactNotifs" :key="n.id" class="notif-item" :class="{ 'notif-item--unread': !n.read }" @click="n.read = true">
            <div class="notif-avatar-wrap">
              <img :src="n.avatar" class="avatar" :alt="n.from" />
              <div class="notif-type-badge" :class="`notif-type-${n.type}`"><Icons :name="typeIcon(n.type)" :size="10" /></div>
            </div>
            <div class="notif-body">
              <div class="notif-text"><strong>{{ n.from }}</strong> {{ typeText(n.type) }}</div>
              <div v-if="n.content" class="notif-content">{{ n.content }}</div>
              <div class="notif-time">{{ n.time }}</div>
            </div>
          </div>
        </div>

        <div v-if="!hasUnread && !systemNotifs.length && !interactNotifs.length" class="empty-state">
          <Icons name="bell" :size="40" />
          <p>安安静静的，去广场逛逛？</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { smartBack } from '../router'
import Icons from '../components/Icons.vue'

const systemNotifs = ref([
  { id: 1, text: '欢迎来到 Campus Wall！完成学生认证解锁更多玩法 🎉', time: '刚刚', read: false },
  { id: 2, text: '你的账号已通过认证，感谢你的耐心等待 ✅', time: '2小时前', read: false },
])
const interactNotifs = ref([
  { id: 3, from: '小明同学', type: 'like', content: '图书馆终于开了空调！', time: '5分钟前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', read: false },
  { id: 4, from: '美食侦探', type: 'comment', content: '食堂新出的红烧肉拌饭绝了！', time: '20分钟前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie', read: false },
  { id: 5, from: '表白墙菌', type: 'follow', content: '', time: '1小时前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Confess', read: true },
  { id: 6, from: '学习达人', type: 'like', content: '又到期末周了', time: '3小时前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Study', read: true },
])
const hasUnread = computed(() => [...systemNotifs.value, ...interactNotifs.value].some(n => !n.read))
function markAllRead() { systemNotifs.value.forEach(n => n.read = true); interactNotifs.value.forEach(n => n.read = true) }
function typeIcon(type) { return { like: 'heart', comment: 'chat', follow: 'user' }[type] || 'bell' }
function typeText(type) { return { like: '赞了你的帖子', comment: '评论了你的帖子', follow: '关注了你' }[type] || '' }
</script>

<style scoped>
.notif-page { min-height: 100vh; padding: 16px 0 40px; }
.notif-wrapper { max-width: 640px; margin: 0 auto; }
.notif-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.back-btn { width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-surface); border: 1px solid var(--color-border); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text); transition: all var(--transition-fast); flex-shrink: 0; }
.back-btn:hover { background: var(--color-surface-alt); }
.notif-heading { font-size: 22px; font-weight: 700; color: var(--color-text); flex: 1; }
.notif-section { margin-bottom: 24px; }
.section-label { font-size: 12px; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; padding-left: 4px; }
.notif-item { display: flex; align-items: flex-start; gap: 12px; padding: 14px 12px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); cursor: pointer; transition: all var(--transition-fast); margin-bottom: 6px; }
.notif-item:hover { box-shadow: var(--shadow-sm); }
.notif-item--unread { background: var(--color-primary-light); border-color: rgba(45,122,74,0.15); }
.notif-icon { width: 40px; height: 40px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.notif-icon--system { background: var(--color-primary-light); color: var(--color-primary); }
.notif-avatar-wrap { position: relative; flex-shrink: 0; }
.notif-type-badge { position: absolute; bottom: -2px; right: -2px; width: 18px; height: 18px; border-radius: var(--radius-full); border: 2px solid white; display: flex; align-items: center; justify-content: center; }
.notif-type-like { background: #ef4444; color: white; }
.notif-type-comment { background: #3b82f6; color: white; }
.notif-type-follow { background: var(--color-primary); color: white; }
.notif-body { flex: 1; min-width: 0; }
.notif-text { font-size: 14px; color: var(--color-text); line-height: 1.5; }
.notif-text strong { font-weight: 600; }
.notif-content { font-size: 13px; color: var(--color-text-muted); margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.notif-time { font-size: 12px; color: var(--color-text-muted); margin-top: 4px; }
.unread-dot { width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--color-primary); flex-shrink: 0; margin-top: 6px; }
</style>
