<template>
  <div class="partition-page">
    <div class="container">
      <div class="page-header">
        <button class="back-btn" @click="smartBack()"><Icons name="back" :size="20" /></button>
        <div class="header-icon">{{ currentPartition.icon }}</div>
        <div>
          <h1 class="page-title">{{ currentPartition.name }}</h1>
          <p class="page-subtitle">{{ currentPartition.desc }} · {{ displayPosts.length }}{{ hasMore ? '+' : '' }} 帖子</p>
        </div>
      </div>

      <div class="partition-layout">
        <main class="partition-main">
          <div class="filter-bar">
            <div class="filter-tabs">
              <button v-for="f in filters" :key="f.key" class="filter-tab" :class="{ 'filter-tab--active': activeFilter === f.key }" @click="activeFilter = f.key">
                <Icons :name="f.icon" :size="14" /><span>{{ f.label }}</span>
              </button>
            </div>
            <router-link to="/post/new" class="btn btn-primary btn-sm"><Icons name="plus" :size="14" /> 发布</router-link>
          </div>
          <div class="post-list">
            <div v-if="loading" class="loading-state">
              <div class="spinner-small"></div>
              <span>加载中...</span>
            </div>
            
            <template v-else>
              <PostCard v-for="p in displayPosts" :key="p.id" :post="p" />
              <div v-if="displayPosts.length === 0" class="empty-state">
                <Icons name="edit" :size="40" />
                <p>这里还是空的，快来留下第一个脚印吧</p>
              </div>
              
              <div v-if="displayPosts.length > 0" class="load-more-state" ref="loadMoreTrigger">
                <div v-if="loadingMore" class="spinner-small"></div>
                <span v-if="loadingMore">正在加载更多...</span>
                <span v-else-if="!hasMore" class="no-more-text"><Icons name="check" :size="14" /> 到底啦</span>
              </div>
            </template>
          </div>
        </main>

        <aside class="partition-sidebar">
          <div class="sidebar-card">
            <h3 class="sidebar-title"><Icons name="partition" :size="16" /> 全部分区</h3>
            <div class="all-partitions">
              <a v-for="p in allPartitions" :key="p.id" href="#" class="partition-link" :class="{ 'partition-link--active': p.id === currentPartition.id }" @click.prevent="navigateToPartition(p.id)">
                <Icons :name="p.icon" :size="14" /><span>{{ p.name }}</span>
              </a>
            </div>
          </div>
          <div class="sidebar-card">
            <h3 class="sidebar-title"><Icons name="shield" :size="16" /> 分区规则</h3>
            <div class="rules-list">
              <div class="rule-item"><Icons name="check" :size="14" style="color:var(--color-primary);flex-shrink:0" /><span>友善发言，互相尊重</span></div>
              <div class="rule-item"><Icons name="check" :size="14" style="color:var(--color-primary);flex-shrink:0" /><span>分享真实校园生活</span></div>
              <div class="rule-item"><Icons name="check" :size="14" style="color:var(--color-primary);flex-shrink:0" /><span>禁止人身攻击和广告</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '../stores'
import { smartBack } from '../router'
import Icons from '../components/Icons.vue'
import PostCard from '../components/PostCard.vue'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const activeFilter = computed({
  get: () => route.query.sort || 'hot',
  set: (val) => router.push({ query: { ...route.query, sort: val } })
})
const loading = ref(true)
const loadingMore = ref(false)
const displayPosts = ref([])
const page = ref(1)
const hasMore = ref(true)
const limit = 8

const filters = [
  { key: 'hot', label: '热门', icon: 'fire' }, { key: 'new', label: '最新', icon: 'clock' }, { key: 'follow', label: '关注', icon: 'star' },
]

const allPartitions = [
  { id: 1, name: '校园日常', icon: 'image', desc: '日常碎片、随手拍、心情记录' },
  { id: 2, name: '学习互助', icon: 'book', desc: '选课心得、考研交流、组队学习' },
  { id: 3, name: '跳蚤市场', icon: 'tag', desc: '二手买卖、闲置转让' },
  { id: 4, name: '干饭时刻', icon: 'heart', desc: '食堂测评、外卖推荐、美食探店' },
  { id: 5, name: '树洞心声', icon: 'chat', desc: '匿名倾诉、情感交流' },
  { id: 6, name: '求职上岸', icon: 'fire', desc: '实习内推、校招信息、面经' },
  { id: 7, name: '表白交友', icon: 'heart', desc: '匿名表白、征友启事、社团纳新' },
  { id: 8, name: '失物招领', icon: 'search', desc: '丢失/捡到物品、寻人启事' },
  { id: 9, name: '拼车组队', icon: 'users', desc: '拼车、拼团、代取快递' },
  { id: 10, name: '资源共享', icon: 'link', desc: '学习资料、链接、图片资源分享' },
]

const currentPartition = computed(() => {
  const id = parseInt(route.params.id) || 1
  return allPartitions.find(p => p.id === id) || allPartitions[0]
})

// 成熟的路由跳转：如果在分区系统内切换，使用 replace 以保持简洁的历史栈
function navigateToPartition(id) {
  router.replace(`/partitions/${id}`)
}

async function loadInitial() {
  loading.value = true
  page.value = 1
  const result = await postsStore.fetchPosts(page.value, limit, currentPartition.value.id, activeFilter.value)
  displayPosts.value = result.data
  hasMore.value = result.hasMore
  loading.value = false
}

async function loadMore() {
  if (loadingMore.value || !hasMore.value) return
  loadingMore.value = true
  page.value++
  const result = await postsStore.fetchPosts(page.value, limit, currentPartition.value.id, activeFilter.value)
  displayPosts.value.push(...result.data)
  hasMore.value = result.hasMore
  loadingMore.value = false
}

function handleScroll() {
  const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 200
  if (bottomOfWindow) loadMore()
}

onMounted(() => {
  loadInitial()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => route.params.id, () => { loadInitial() })
watch(() => route.query.sort, () => { loadInitial() })
</script>

<style scoped>
.partition-page { min-height: 100vh; padding: 16px 0 40px; }
.page-header { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
.back-btn { width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-surface); border: 1px solid var(--color-border); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text); transition: all var(--transition-fast); flex-shrink: 0; }
.back-btn:hover { background: var(--color-surface-alt); }
.header-icon { font-size: 40px; }
.page-title { font-size: 22px; font-weight: 700; color: var(--color-text); }
.page-subtitle { font-size: 14px; color: var(--color-text-secondary); margin-top: 2px; }
.partition-layout { display: grid; grid-template-columns: 1fr 280px; gap: 24px; align-items: start; }
.filter-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.filter-tabs { display: flex; background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--color-border); padding: 4px; }
.filter-tab { padding: 6px 14px; border-radius: var(--radius-md); font-size: 13px; font-weight: 500; color: var(--color-text-secondary); background: transparent; border: none; cursor: pointer; transition: all var(--transition-fast); font-family: var(--font-sans); }
.filter-tab:hover { color: var(--color-text); }
.filter-tab--active { background: var(--color-primary); color: var(--color-bg); }
.post-list { display: flex; flex-direction: column; gap: 12px; }
.partition-sidebar { position: sticky; top: 76px; display: flex; flex-direction: column; gap: 16px; }
.sidebar-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 16px; }
.sidebar-title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; color: var(--color-text); margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--color-border-light); }
.all-partitions { display: flex; flex-direction: column; gap: 2px; }
.partition-link { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: var(--radius-md); font-size: 14px; color: var(--color-text-secondary); text-decoration: none; transition: all var(--transition-fast); }
.partition-link:hover { background: var(--color-surface-alt); color: var(--color-text); }
.partition-link--active { background: var(--color-primary-light); color: var(--color-primary); font-weight: 600; }
.rules-list { display: flex; flex-direction: column; gap: 10px; }
.rule-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--color-text-secondary); }
.loading-state { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 40px 0; color: var(--color-text-muted); font-size: 14px; }
.load-more-state { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 24px 0; font-size: 13px; color: var(--color-text-muted); }
.spinner-small { width: 16px; height: 16px; border: 2px solid var(--color-border); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 1s linear infinite; }
.no-more-text { font-weight: 500; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 768px) { .partition-layout { grid-template-columns: 1fr; } .partition-sidebar { display: none; } }
</style>
