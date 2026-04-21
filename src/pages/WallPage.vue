<template>
  <div class="wall-page">
    <!-- 顶部导航栏 -->
    <header class="wall-topbar">
      <router-link to="/wall" class="topbar-logo">
        <Icons name="fire" :size="22" />
        <span>Campus Wall</span>
      </router-link>

      <!-- 热门最新关注 Tab -->
      <div class="topbar-tabs">
        <button v-for="tab in tabs" :key="tab.key" class="topbar-tab" :class="{ 'topbar-tab--active': activeTab === tab.key }" @click="setTab(tab.key)">
          <Icons :name="tab.icon" :size="16" />
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <div class="topbar-right">
        <div class="search-box">
          <Icons name="search" :size="16" />
          <input type="text" placeholder="搜索校园内容..." class="search-input" />
        </div>
        <router-link to="/login" class="topbar-btn">登录</router-link>
        <router-link to="/register" class="topbar-btn topbar-btn-primary">注册</router-link>
      </div>
    </header>

    <!-- 分区导航 -->
    <div class="partition-bar">
      <router-link to="/partitions" class="partition-item">
        <Icons name="partition" :size="14" />
        <span>全部分区</span>
      </router-link>
      <router-link v-for="p in partitions" :key="p.id" :to="`/partitions/${p.id}`" class="partition-item">
        <Icons :name="p.icon" :size="14" />
        <span>{{ p.name }}</span>
      </router-link>
    </div>

    <div class="wall-layout">
      <!-- 左侧导航栏 -->
      <aside class="wall-sidebar-left" :style="{ width: leftWidth + 'px' }">
        <nav class="sidebar-nav">
          <router-link to="/wall" class="sidebar-link">
            <Icons name="home" :size="20" /><span>首页</span>
          </router-link>
          <router-link to="/partitions" class="sidebar-link">
            <Icons name="partition" :size="20" /><span>分区</span>
          </router-link>
          <router-link to="/search" class="sidebar-link">
            <Icons name="search" :size="20" /><span>搜索</span>
          </router-link>
          <router-link to="/notifications" class="sidebar-link">
            <Icons name="bell" :size="20" /><span>通知</span>
          </router-link>
          <router-link to="/messages" class="sidebar-link">
            <Icons name="chat" :size="20" /><span>私信</span>
          </router-link>
          <router-link to="/bookmarks" class="sidebar-link">
            <Icons name="bookmark" :size="20" /><span>书签</span>
          </router-link>
          <router-link to="/profile" class="sidebar-link">
            <Icons name="user" :size="20" /><span>个人主页</span>
          </router-link>
        </nav>

        <button class="sidebar-post-btn" @click="goCreate">
          <Icons name="edit" :size="18" /><span>发帖子</span>
        </button>
      </aside>

      <!-- 拖拽调整左侧宽度 -->
      <div class="resize-handle" @mousedown="startResize('left', $event)"></div>

      <!-- 中间内容区 -->
      <main class="wall-main">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>
        <div v-else class="feed-list">
          <PostCard v-for="post in displayPosts" :key="post.id" :post="post" />
          <div v-if="displayPosts.length === 0" class="empty-state">
            <Icons name="edit" :size="40" />
            <p>这里还是空的，快来留下第一个脚印吧</p>
          </div>
        </div>
      </main>

      <!-- 拖拽调整右侧宽度 -->
      <div class="resize-handle" @mousedown="startResize('right', $event)"></div>

      <!-- 右侧边栏 -->
      <aside class="wall-sidebar-right" :style="{ width: rightWidth + 'px' }">
        <ThemeBanner />
        <div class="sidebar-card">
          <h3 class="sidebar-title"><Icons name="partition" :size="16" /> 分区</h3>
          <div class="partition-grid">
            <router-link v-for="p in partitions" :key="p.id" :to="`/partitions/${p.id}`" class="p-grid-item">
              <Icons :name="p.icon" :size="16" /><span>{{ p.name }}</span>
            </router-link>
          </div>
        </div>
        <div class="sidebar-card">
          <h3 class="sidebar-title"><Icons name="trending" :size="16" /> 热搜榜</h3>
          <div class="hot-list">
            <a v-for="(item, idx) in hotSearch" :key="idx" href="#" class="hot-item">
              <span class="hot-rank" :class="{ 'hot-rank--top': idx < 3 }">{{ idx + 1 }}</span>
              <span class="hot-title">{{ item.title }}</span>
            </a>
          </div>
        </div>
        <div class="sidebar-card">
          <h3 class="sidebar-title"><Icons name="users" :size="16" /> 推荐关注</h3>
          <div class="recommend-list">
            <div v-for="u in recommendedUsers" :key="u.id" class="recommend-item">
              <img :src="u.avatar" class="avatar-sm" :alt="u.name" />
              <div class="recommend-info">
                <span class="recommend-name">{{ u.name }}</span>
                <span class="recommend-desc">{{ u.desc }}</span>
              </div>
              <button class="btn btn-sm btn-secondary">关注</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '../stores'
import Icons from '../components/Icons.vue'
import PostCard from '../components/PostCard.vue'
import ThemeBanner from '../components/ThemeBanner.vue'

const router = useRouter()
const postsStore = usePostsStore()
const loading = ref(true)
const activeTab = ref('hot')
const displayPosts = ref([])

const leftWidth = ref(240)
const rightWidth = ref(300)
let resizing = null
let startX = 0
let startLeftWidth = 0
let startRightWidth = 0

const tabs = [
  { key: 'hot', label: '热门', icon: 'fire' },
  { key: 'new', label: '最新', icon: 'clock' },
  { key: 'follow', label: '关注', icon: 'star' },
]

const partitions = [
  { id: 1, name: '校园日常', icon: 'image' },
  { id: 2, name: '学习互助', icon: 'book' },
  { id: 3, name: '跳蚤市场', icon: 'tag' },
  { id: 4, name: '干饭时刻', icon: 'heart' },
  { id: 5, name: '树洞心声', icon: 'chat' },
  { id: 6, name: '求职上岸', icon: 'fire' },
  { id: 7, name: '表白交友', icon: 'heart' },
  { id: 8, name: '失物招领', icon: 'search' },
  { id: 9, name: '拼车组队', icon: 'users' },
  { id: 10, name: '资源共享', icon: 'link' },
]

const hotSearch = [
  { title: '#大学生期末复习#' },
  { title: '图书馆新规惹争议' },
  { title: '食堂新出网红菜' },
  { title: '暑期实习求内推' },
  { title: '校园演唱会抢票' },
  { title: '考研还是就业' },
]

const recommendedUsers = [
  { id: 1, name: '校园新闻社', desc: '最新校园资讯', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=News' },
  { id: 2, name: '表白墙菌', desc: '传递爱与温暖', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Confess' },
  { id: 3, name: '二手市场', desc: '便宜好货等你来', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Market' },
]

function setTab(key) {
  activeTab.value = key
  loadInitial()
}

function startResize(side, e) {
  resizing = side
  startX = e.clientX
  startLeftWidth = leftWidth.value
  startRightWidth = rightWidth.value
  document.addEventListener('mousemove', doResize)
  document.addEventListener('mouseup', stopResize)
}

function doResize(e) {
  if (!resizing) return
  const diff = e.clientX - startX
  if (resizing === 'left') {
    leftWidth.value = Math.max(180, Math.min(350, startLeftWidth + diff))
  } else {
    rightWidth.value = Math.max(220, Math.min(420, startRightWidth - diff))
  }
}

function stopResize() {
  resizing = null
  document.removeEventListener('mousemove', doResize)
  document.removeEventListener('mouseup', stopResize)
}

async function loadInitial() {
  loading.value = true
  try {
    const result = await postsStore.fetchPosts(1, 8, null, activeTab.value)
    displayPosts.value = result.data || []
  } catch (err) {
    console.error('加载失败', err)
    displayPosts.value = []
  }
  loading.value = false
}

function goCreate() {
  router.push('/post/new')
}

onMounted(() => {
  loadInitial()
})
</script>

<style scoped>
.wall-page { min-height: 100vh; display: flex; flex-direction: column; }

/* 顶部导航栏 */
.wall-topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}
.topbar-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--color-text); font-size: 18px; font-weight: 700; white-space: nowrap; }
.topbar-tabs { display: flex; gap: 4px; flex: 1; justify-content: center; }
.topbar-tab { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; color: var(--color-text-secondary); background: transparent; border: none; cursor: pointer; transition: all var(--transition-fast); font-family: var(--font-sans); }
.topbar-tab:hover { background: var(--color-surface-alt); }
.topbar-tab--active { background: var(--color-primary); color: var(--color-bg); }
.topbar-right { display: flex; align-items: center; gap: 10px; white-space: nowrap; }
.search-box { display: flex; align-items: center; gap: 8px; background: var(--color-surface-alt); border: 1px solid var(--color-border); border-radius: 20px; padding: 8px 14px; }
.search-input { background: transparent; border: none; outline: none; font-size: 14px; color: var(--color-text); font-family: var(--font-sans); width: 160px; }
.topbar-btn { padding: 8px 14px; border-radius: 16px; font-size: 13px; font-weight: 600; text-decoration: none; color: var(--color-text); background: var(--color-surface-alt); border: 1px solid var(--color-border); }
.topbar-btn:hover { background: var(--color-surface); }
.topbar-btn-primary { background: var(--color-primary); color: var(--color-bg); border-color: var(--color-primary); }

/* 分区导航 */
.partition-bar { display: flex; gap: 4px; padding: 8px 20px; overflow-x: auto; background: var(--color-surface); border-bottom: 1px solid var(--color-border); }
.partition-bar::-webkit-scrollbar { display: none; }
.partition-item { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 14px; font-size: 13px; font-weight: 500; color: var(--color-text-secondary); text-decoration: none; white-space: nowrap; transition: all var(--transition-fast); }
.partition-item:hover { background: var(--color-surface-alt); color: var(--color-text); }
.partition-item.router-link-active { background: var(--color-primary-light); color: var(--color-primary); }

/* 三栏布局 */
.wall-layout { display: flex; flex: 1; overflow: hidden; }

/* 左侧导航栏 */
.wall-sidebar-left { width: 240px; flex-shrink: 0; display: flex; flex-direction: column; padding: 12px; border-right: 1px solid var(--color-border); overflow-y: auto; gap: 4px; }
.sidebar-nav { display: flex; flex-direction: column; gap: 2px; }
.sidebar-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 24px; font-size: 14px; font-weight: 500; color: var(--color-text); text-decoration: none; transition: all var(--transition-fast); }
.sidebar-link:hover { background: var(--color-surface-alt); }
.sidebar-link.router-link-active { background: var(--color-primary-light); color: var(--color-primary); font-weight: 600; }
.sidebar-post-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 11px; background: var(--color-primary); color: var(--color-bg); border: none; border-radius: 24px; font-size: 14px; font-weight: 600; font-family: var(--font-sans); cursor: pointer; margin-top: auto; }

/* 拖拽调整宽度 */
.resize-handle { width: 5px; cursor: col-resize; background: transparent; flex-shrink: 0; transition: background 0.2s; }
.resize-handle:hover { background: var(--color-primary); opacity: 0.5; }

/* 中间内容区 */
.wall-main { flex: 1; min-width: 0; overflow-y: auto; padding: 0 16px; }
.loading-state { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 60px 0; color: var(--color-text-muted); }
.spinner { width: 28px; height: 28px; border: 3px solid var(--color-border); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.feed-list { display: flex; flex-direction: column; gap: 12px; padding: 16px 0; }
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; color: var(--color-text-muted); padding: 60px 0; }

/* 右侧边栏 */
.wall-sidebar-right { width: 300px; flex-shrink: 0; display: flex; flex-direction: column; gap: 12px; padding: 12px; overflow-y: auto; border-left: 1px solid var(--color-border); }
.sidebar-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 14px; }
.sidebar-title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; color: var(--color-text); margin-bottom: 12px; }
.partition-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }
.p-grid-item { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: var(--color-surface-alt); border-radius: 10px; text-decoration: none; font-size: 13px; color: var(--color-text); transition: all var(--transition-fast); }
.p-grid-item:hover { background: var(--color-primary-light); color: var(--color-primary); }
.hot-list { display: flex; flex-direction: column; }
.hot-item { display: flex; align-items: center; gap: 10px; padding: 8px 6px; border-radius: 6px; text-decoration: none; transition: background var(--transition-fast); }
.hot-item:hover { background: var(--color-surface-alt); }
.hot-rank { width: 20px; font-size: 13px; font-weight: 700; color: var(--color-text-muted); text-align: center; }
.hot-rank--top { color: var(--color-primary); }
.hot-title { font-size: 13px; font-weight: 500; color: var(--color-text); }
.recommend-list { display: flex; flex-direction: column; gap: 10px; }
.recommend-item { display: flex; align-items: center; gap: 10px; }
.recommend-info { flex: 1; min-width: 0; }
.recommend-name { display: block; font-size: 13px; font-weight: 600; color: var(--color-text); }
.recommend-desc { display: block; font-size: 11px; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* 按钮 */
.btn { padding: 5px 10px; font-size: 12px; font-weight: 600; border-radius: 14px; cursor: pointer; transition: all var(--transition-fast); border: none; font-family: var(--font-sans); }
.btn-secondary { background: var(--color-text); color: var(--color-bg); }

/* 头像 */
.avatar-sm { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; }

/* 响应式 */
@media (max-width: 1100px) { .wall-sidebar-left { width: 200px !important; } .wall-sidebar-right { width: 260px !important; } }
@media (max-width: 900px) { .wall-sidebar-left { width: 64px !important; } .sidebar-nav span, .sidebar-post-btn span { display: none; } .sidebar-link { justify-content: center; padding: 12px; } .sidebar-post-btn { padding: 12px; } .wall-sidebar-right { width: 240px !important; } .search-box .search-input { display: none; } }
@media (max-width: 768px) { .wall-sidebar-left, .wall-sidebar-right, .resize-handle { display: none; } .wall-main { min-height: calc(100vh - 120px); } .topbar-tabs { display: none; } }
</style>
