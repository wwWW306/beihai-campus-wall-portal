<template>
  <div class="notif-page">
    <!-- 头部 -->
    <div class="notif-header">
      <h1 class="notif-title">消息通知</h1>
    </div>

    <!-- 通知列表 -->
    <div class="notif-list">
      <!-- 系统通知 -->
      <div class="notif-section">
        <div class="notif-section-title">系统通知</div>
        <div
          v-for="n in systemNotifs"
          :key="n.id"
          class="notif-item notif-item--system"
          :class="{ 'notif-item--unread': !n.read }"
          @click="n.read = true"
        >
          <div class="notif-icon notif-icon--system">
            <Icons name="bell" :size="18" />
          </div>
          <div class="notif-body">
            <div class="notif-text">{{ n.text }}</div>
            <div class="notif-time">{{ n.time }}</div>
          </div>
          <div v-if="!n.read" class="unread-dot"></div>
        </div>
      </div>

      <!-- 互动通知 -->
      <div class="notif-section">
        <div class="notif-section-title">互动</div>
        <div
          v-for="n in interactNotifs"
          :key="n.id"
          class="notif-item"
          :class="{ 'notif-item--unread': !n.read }"
          @click="n.read = true"
        >
          <div class="notif-avatar-wrap">
            <img :src="n.avatar" class="notif-avatar" :alt="n.from" />
            <div class="notif-type-icon" :class="`notif-type-${n.type}`">
              <Icons :name="typeIcon(n.type)" :size="10" />
            </div>
          </div>
          <div class="notif-body">
            <div class="notif-text">
              <strong>{{ n.from }}</strong> {{ typeText(n.type) }}
            </div>
            <div class="notif-content">{{ n.content }}</div>
            <div class="notif-time">{{ n.time }}</div>
          </div>
          <img v-if="n.preview" :src="n.preview" class="notif-preview" alt="" />
        </div>
      </div>

      <div v-if="![...systemNotifs, ...interactNotifs].some(n => !n.read)" class="empty-state">
        <Icons name="bell" :size="40" />
        <p>暂无新消息</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icons from '../components/Icons.vue'

const systemNotifs = ref([
  { id: 1, text: '欢迎使用 Campus Wall！完成学生认证可获得更多功能', time: '刚刚', read: false },
  { id: 2, text: '你的账号已通过认证，感谢你的耐心等待', time: '2小时前', read: false },
])

const interactNotifs = ref([
  { id: 3, from: '小明同学', type: 'like', content: '图书馆终于开了空调，期末复习的同学们冲啊！', time: '5分钟前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', read: false },
  { id: 4, from: '美食侦探', type: 'comment', content: '食堂新出的红烧肉拌饭绝了！窗口在二楼...', time: '20分钟前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie', read: false },
  { id: 5, from: '表白墙菌', type: 'follow', content: '', time: '1小时前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Confess', read: true },
  { id: 6, from: '学习达人', type: 'like', content: '又到期末周了，感觉自己一周学完了一学期的课', time: '3小时前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Study', read: true },
])

function typeIcon(type) {
  return { like: 'heart', comment: 'chat', follow: 'user' }[type] || 'bell'
}
function typeText(type) {
  return { like: '赞了你的帖子', comment: '评论了你的帖子', follow: '关注了你' }[type] || ''
}
</script>

<style scoped>
.notif-page { min-height: 100vh; background: var(--color-bg); }

.notif-header {
  position: sticky;
  top: 56px;
  z-index: 50;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-border-light);
}
.notif-title { font-size: 18px; font-weight: 700; color: var(--color-text); }

.notif-list { padding: 0; }
.notif-section { margin-bottom: 8px; }
.notif-section-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 16px 6px;
}

.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background: var(--color-surface);
  cursor: pointer;
  transition: background var(--transition-fast);
  position: relative;
}
.notif-item:hover { background: var(--color-bg); }
.notif-item--unread { background: #fff7ed; }
.notif-item--unread:hover { background: #fff3e0; }

.notif-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.notif-icon--system {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.notif-avatar-wrap { position: relative; flex-shrink: 0; }
.notif-avatar { width: 36px; height: 36px; border-radius: var(--radius-full); object-fit: cover; }
.notif-type-icon {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.notif-type-like { background: var(--color-primary); color: white; }
.notif-type-comment { background: var(--color-accent); color: white; }
.notif-type-follow { background: var(--color-success); color: white; }

.notif-body { flex: 1; min-width: 0; }
.notif-text { font-size: 14px; color: var(--color-text); line-height: 1.5; }
.notif-text strong { font-weight: 600; }
.notif-content {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.notif-time { font-size: 11px; color: var(--color-text-muted); margin-top: 4px; }

.notif-preview {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  flex-shrink: 0;
  margin-top: 4px;
}
</style>
