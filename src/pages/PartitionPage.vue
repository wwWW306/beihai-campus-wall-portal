<template>
  <div class="partition-page">
    <div class="container">
      <div class="page-header">
        <div class="header-icon">{{ currentPartition.icon }}</div>
        <div>
          <h1 class="page-title">{{ currentPartition.name }}</h1>
          <p class="page-subtitle">{{ currentPartition.desc }} · {{ posts.length }} 帖子</p>
        </div>
      </div>

      <div class="partition-layout">
        <main class="partition-main">
          <!-- 筛选栏 -->
          <div class="filter-bar">
            <div class="filter-tabs">
              <button
                v-for="f in filters"
                :key="f.key"
                class="filter-tab"
                :class="{ 'filter-tab--active': activeFilter === f.key }"
                @click="activeFilter = f.key"
              >{{ f.label }}</button>
            </div>
            <router-link to="/create" class="btn btn-primary btn-sm">
              <Icons name="plus" :size="14" /> 发布
            </router-link>
          </div>

          <!-- 帖子 -->
          <div class="post-list">
            <PostCard v-for="p in posts" :key="p.id" :post="p" />
          </div>
        </main>

        <!-- 侧栏 -->
        <aside class="partition-sidebar">
          <div class="card">
            <div class="card-header">
              <Icons name="fire" :size="16" />
              <span class="card-title">分区规则</span>
            </div>
            <div class="rules-list">
              <div class="rule-item">
                <Icons name="check" :size="14" style="color:var(--color-success);flex-shrink:0" />
                <span>分享真实校园生活</span>
              </div>
              <div class="rule-item">
                <Icons name="check" :size="14" style="color:var(--color-success);flex-shrink:0" />
                <span>友好交流，互相尊重</span>
              </div>
              <div class="rule-item">
                <Icons name="check" :size="14" style="color:var(--color-success);flex-shrink:0" />
                <span>禁止人身攻击和广告</span>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <Icons name="users" :size="16" />
              <span class="card-title">活跃用户</span>
            </div>
            <div class="active-users">
              <div v-for="u in activeUsers" :key="u.id" class="user-item">
                <img :src="u.avatar" class="avatar avatar-sm" :alt="u.name" />
                <div class="user-name">{{ u.name }}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icons from '../components/Icons.vue'
import PostCard from '../components/PostCard.vue'

const currentPartition = ref({
  id: 1,
  name: '校园生活',
  icon: '🏫',
  desc: '日常点滴、校园新闻、活动预告'
})

const activeFilter = ref('hot')
const filters = [
  { key: 'hot', label: '🔥 热门' },
  { key: 'new', label: '🕐 最新' },
  { key: 'follow', label: '⭐ 关注' },
]

const posts = ref([
  {
    id: 1, content: '图书馆终于开了空调，期末复习的同学们冲啊！📚', authorName: '小明同学',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', authorId: 1,
    createTime: Date.now() - 1800000, likeCount: 342, commentCount: 56, isLiked: false, partition: '校园生活', images: []
  },
  {
    id: 2, content: '学校新增了共享雨伞设备，再也不用担心下雨天了！🌂', authorName: '校园君',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=School', authorId: 2,
    createTime: Date.now() - 7200000, likeCount: 189, commentCount: 34, isLiked: false, partition: '校园生活', images: []
  },
])

const activeUsers = [
  { id: 1, name: '小明同学', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: 2, name: '校园君', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=School' },
  { id: 3, name: '学习达人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Study' },
  { id: 4, name: '美食侦探', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie' },
  { id: 5, name: '表白墙菌', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Confess' },
]
</script>

<style scoped>
.partition-page { padding: 20px 0 40px; }
.page-header { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
.header-icon { font-size: 48px; }

.partition-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 20px;
  align-items: start;
}

.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.filter-tabs {
  display: flex;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border-light);
  padding: 4px;
}
.filter-tab {
  padding: 6px 14px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.filter-tab:hover { color: var(--color-text); }
.filter-tab--active { background: var(--color-primary); color: white; }

.post-list { display: flex; flex-direction: column; gap: 12px; }

.partition-sidebar { position: sticky; top: 76px; display: flex; flex-direction: column; gap: 12px; }
.card-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; padding: 14px 14px 0; }
.card-title { font-size: 14px; font-weight: 600; color: var(--color-text); }
.rules-list { padding: 0 14px 14px; display: flex; flex-direction: column; gap: 8px; }
.rule-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--color-text-secondary); }
.active-users { padding: 0 14px 14px; display: flex; flex-wrap: wrap; gap: 8px; }
.user-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.user-name { font-size: 11px; color: var(--color-text-secondary); }

@media (max-width: 768px) {
  .partition-layout { grid-template-columns: 1fr; }
  .partition-sidebar { display: none; }
}
</style>
