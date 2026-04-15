<template>
  <div class="wall-layout">
    <div class="container">
      <div class="wall-grid">

        <!-- 左侧边栏 -->
        <aside class="sidebar-left">
          <!-- 发起帖 -->
          <div v-if="isLoggedIn" class="composer-card card">
            <div class="composer-inner" @click="goCreate">
              <img :src="currentUser.avatar" class="avatar" :alt="currentUser.name" />
              <span class="composer-placeholder">分享你在校园的所见所闻...</span>
            </div>
            <div class="composer-actions">
              <button class="composer-action">
                <Icons name="image" :size="17" />
                <span>图片</span>
              </button>
              <button class="composer-action">
                <Icons name="partition" :size="17" />
                <span>分区</span>
              </button>
              <button class="btn btn-primary btn-xs" @click="goCreate">发布</button>
            </div>
          </div>

          <!-- 功能导航 -->
          <div class="nav-card card">
            <router-link to="/" class="side-nav-item side-nav-item--active">
              <Icons name="fire" :size="18" />
              <span>热门</span>
            </router-link>
            <a href="#" class="side-nav-item">
              <Icons name="clock" :size="18" />
              <span>最新</span>
            </a>
            <a href="#" class="side-nav-item">
              <Icons name="star" :size="18" />
              <span>关注</span>
            </a>
          </div>

          <!-- 分区列表 -->
          <div class="partition-card card">
            <div class="card-header">
              <span class="card-title">热门分区</span>
              <router-link to="/partitions" class="card-more">查看全部</router-link>
            </div>
            <div class="partition-list">
              <router-link
                v-for="p in partitions"
                :key="p.id"
                :to="`/partitions/${p.id}`"
                class="partition-item"
              >
                <span class="partition-icon" :style="{ background: p.color + '15', color: p.color }">
                  {{ p.icon }}
                </span>
                <div class="partition-info">
                  <span class="partition-name">{{ p.name }}</span>
                  <span class="partition-count">{{ p.count }} 帖</span>
                </div>
              </router-link>
            </div>
          </div>
        </aside>

        <!-- 中间 Feed -->
        <main class="feed">
          <!-- Feed 头部 -->
          <div class="feed-header">
            <div class="feed-tabs">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                class="feed-tab"
                :class="{ 'feed-tab--active': activeTab === tab.key }"
                @click="activeTab = tab.key"
              >{{ tab.label }}</button>
            </div>
          </div>

          <!-- 加载骨架屏 -->
          <div v-if="loading" class="post-list">
            <div v-for="i in 3" :key="i" class="skeleton-card card">
              <div class="skeleton-header">
                <div class="skeleton avatar-skel"></div>
                <div class="skeleton-text"></div>
              </div>
              <div class="skeleton-body">
                <div class="skeleton skeleton-line"></div>
                <div class="skeleton skeleton-line short"></div>
              </div>
            </div>
          </div>

          <!-- 帖子列表 -->
          <div v-else class="post-list">
            <PostCard
              v-for="post in displayedPosts"
              :key="post.id"
              :post="post"
              @like="toggleLike"
            />
            <div v-if="displayedPosts.length === 0" class="empty-state">
              <Icons name="edit" :size="40" />
              <p>还没有帖子，快来发表第一篇吧！</p>
              <router-link to="/create" class="btn btn-primary" style="margin-top:12px">发布帖子</router-link>
            </div>
          </div>

          <!-- 加载更多 -->
          <div v-if="hasMore && !loading" class="load-more">
            <button class="btn btn-secondary" @click="loadMore">加载更多</button>
          </div>
        </main>

        <!-- 右侧边栏 -->
        <aside class="sidebar-right">
          <!-- 热搜 -->
          <div class="hot-card card">
            <div class="card-header">
              <Icons name="trending" :size="18" />
              <span class="card-title">实时热搜</span>
            </div>
            <div class="hot-list">
              <a
                v-for="(item, idx) in hotSearch"
                :key="idx"
                href="#"
                class="hot-item"
              >
                <span class="hot-rank" :class="{ 'hot-rank--top': idx < 3 }">{{ idx + 1 }}</span>
                <div class="hot-info">
                  <span class="hot-title">{{ item.title }}</span>
                  <span class="hot-count">{{ item.count }}</span>
                </div>
              </a>
            </div>
          </div>

          <!-- 推荐用户 -->
          <div class="card">
            <div class="card-header">
              <Icons name="users" :size="18" />
              <span class="card-title">推荐关注</span>
            </div>
            <div class="user-list">
              <div v-for="u in recommendedUsers" :key="u.id" class="user-item">
                <router-link :to="`/user/${u.id}`" class="user-item-info">
                  <img :src="u.avatar" class="avatar avatar-sm" :alt="u.name" />
                  <div>
                    <div class="user-name">{{ u.name }}</div>
                    <div class="user-bio">{{ u.bio }}</div>
                  </div>
                </router-link>
                <button class="btn btn-secondary btn-xs">关注</button>
              </div>
            </div>
          </div>

          <!-- 页脚 -->
          <div class="sidebar-footer">
            <div class="footer-links">
              <a href="#">关于</a>
              <a href="#">隐私</a>
              <a href="#">用户公约</a>
            </div>
            <p class="footer-copy">© 2026 Campus Wall</p>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Icons from '../components/Icons.vue'
import PostCard from '../components/PostCard.vue'

const router = useRouter()
const loading = ref(false)
const activeTab = ref('hot')
const page = ref(1)
const isLoggedIn = ref(true)
const currentUser = ref({ name: '当前用户', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' })

const tabs = [
  { key: 'hot', label: '🔥 热门' },
  { key: 'new', label: '🕐 最新' },
  { key: 'follow', label: '⭐ 关注' },
]

const partitions = ref([
  { id: 1, name: '校园生活', icon: '🏫', count: 2341, color: '#f97316' },
  { id: 2, name: '学习交流', icon: '📚', count: 1892, color: '#3b82f6' },
  { id: 3, name: '二手交易', icon: '💰', count: 876, color: '#10b981' },
  { id: 4, name: '美食探店', icon: '🍜', count: 654, color: '#ef4444' },
  { id: 5, name: '情感树洞', icon: '💬', count: 1203, color: '#8b5cf6' },
])

const hotSearch = ref([
  { title: '#大学生期末复习#', count: '52.3万' },
  { title: '图书馆新规惹争议', count: '28.7万' },
  { title: '食堂新出网红菜', count: '15.2万' },
  { title: '暑期实习求内推', count: '9.8万' },
  { title: '校园演唱会抢票', count: '6.4万' },
  { title: '考研还是就业', count: '4.1万' },
])

const recommendedUsers = ref([
  { id: 1, name: '校园君', bio: '校园资讯第一发布平台', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=School' },
  { id: 2, name: '表白墙', bio: '帮你说出心里话', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Love' },
  { id: 3, name: '二手菌', bio: '专注校园二手交易', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Used' },
])

const displayedPosts = ref([])
const hasMore = ref(true)

async function fetchPosts() {
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  displayedPosts.value = [
    {
      id: 1,
      content: '图书馆终于开了空调，期末复习的同学们冲啊！📚 建议大家提前预约座位，避免高峰期排队~',
      authorName: '小明同学',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      authorId: 1,
      createTime: Date.now() - 1800000,
      likeCount: 342,
      commentCount: 56,
      isLiked: false,
      partition: '校园生活',
      images: []
    },
    {
      id: 2,
      content: '食堂新出的红烧肉拌饭绝了！窗口在二楼第三个档口，💰 12元一份，分量超足。',
      authorName: '美食侦探',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie',
      authorId: 2,
      createTime: Date.now() - 7200000,
      likeCount: 567,
      commentCount: 89,
      isLiked: true,
      partition: '美食探店',
      images: [
        'https://picsum.photos/seed/food1/800/600',
        'https://picsum.photos/seed/food2/800/600',
        'https://picsum.photos/seed/food3/800/600',
      ]
    },
    {
      id: 3,
      content: '求一台二手笔记本，预算2000以内，用于写代码和看网课。有出的同学麻烦私信我🙏',
      authorName: '码农预备役',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Code',
      authorId: 3,
      createTime: Date.now() - 14400000,
      likeCount: 23,
      commentCount: 8,
      isLiked: false,
      partition: '二手交易',
      images: []
    },
    {
      id: 4,
      content: '又到期末周了，感觉自己一周学完了一学期的课 😅 有没有大佬分享一下高效复习方法？',
      authorName: '焦虑大三狗',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Stressed',
      authorId: 4,
      createTime: Date.now() - 28800000,
      likeCount: 1205,
      commentCount: 234,
      isLiked: false,
      partition: '学习交流',
      images: []
    },
    {
      id: 5,
      content: '校园表白墙代发，帮你说出那些不好意思当面说的话。支持匿名，私信必回。',
      authorName: '表白墙菌',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Confess',
      authorId: 5,
      createTime: Date.now() - 43200000,
      likeCount: 89,
      commentCount: 45,
      isLiked: false,
      partition: '情感树洞',
      images: []
    },
  ]
  loading.value = false
}

function toggleLike(id) {
  const post = displayedPosts.value.find(p => p.id === id)
  if (post) {
    post.isLiked = !post.isLiked
    post.likeCount += post.isLiked ? 1 : -1
  }
}

function loadMore() {
  // 实际项目这里加载更多
  hasMore.value = false
}

function goCreate() { router.push('/create') }

fetchPosts()
</script>

<style scoped>
.wall-layout {
  min-height: calc(100vh - 56px);
  padding: 20px 0 40px;
}

.wall-grid {
  display: grid;
  grid-template-columns: 260px 1fr 280px;
  gap: 20px;
  align-items: start;
}

/* 左侧栏 */
.sidebar-left {
  position: sticky;
  top: 76px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.composer-card { padding: 14px; }
.composer-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--color-bg);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.composer-inner:hover { background: var(--color-border-light); }
.composer-placeholder {
  font-size: 14px;
  color: var(--color-text-muted);
}
.composer-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--color-border-light);
}
.composer-action {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.composer-action:hover { background: var(--color-bg); color: var(--color-primary); }
.btn-xs { padding: 4px 10px; font-size: 12px; }

.nav-card { padding: 8px; }
.side-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
}
.side-nav-item:hover { background: var(--color-bg); color: var(--color-text); }
.side-nav-item--active { background: var(--color-primary-light); color: var(--color-primary); }

.partition-card { padding: 14px; }
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.card-title { font-size: 14px; font-weight: 600; color: var(--color-text); }
.card-more { font-size: 12px; color: var(--color-accent); margin-left: auto; text-decoration: none; }
.card-more:hover { text-decoration: underline; }

.partition-list { display: flex; flex-direction: column; gap: 2px; }
.partition-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 8px;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background var(--transition-fast);
}
.partition-item:hover { background: var(--color-bg); }
.partition-icon {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}
.partition-info { display: flex; flex-direction: column; }
.partition-name { font-size: 13px; font-weight: 500; color: var(--color-text); }
.partition-count { font-size: 11px; color: var(--color-text-muted); }

/* 中间 Feed */
.feed-header { margin-bottom: 16px; }
.feed-tabs {
  display: flex;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border-light);
  padding: 4px;
  gap: 4px;
}
.feed-tab {
  flex: 1;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.feed-tab:hover { color: var(--color-text); }
.feed-tab--active {
  background: var(--color-primary);
  color: white;
}

.post-list { display: flex; flex-direction: column; gap: 12px; }

/* 骨架屏 */
.skeleton-card { padding: 16px; }
.skeleton-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.avatar-skel { width: 36px; height: 36px; border-radius: var(--radius-full); }
.skeleton-text { flex: 1; height: 14px; border-radius: var(--radius-sm); }
.skeleton-body { display: flex; flex-direction: column; gap: 8px; }
.skeleton-line { height: 14px; border-radius: var(--radius-sm); }
.skeleton-line.short { width: 65%; }

.load-more { text-align: center; padding: 20px; }

/* 右侧栏 */
.sidebar-right {
  position: sticky;
  top: 76px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hot-card { padding: 14px; }
.hot-list { display: flex; flex-direction: column; gap: 2px; }
.hot-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 7px 4px;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background var(--transition-fast);
}
.hot-item:hover { background: var(--color-bg); }
.hot-rank {
  width: 18px;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-muted);
  text-align: center;
  flex-shrink: 0;
}
.hot-rank--top { color: var(--color-primary); }
.hot-info { display: flex; flex-direction: column; min-width: 0; }
.hot-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hot-count { font-size: 11px; color: var(--color-text-muted); }

.user-list { display: flex; flex-direction: column; gap: 2px; }
.user-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 4px;
}
.user-item-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  text-decoration: none;
}
.user-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}
.user-bio {
  font-size: 11px;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-footer {
  padding: 8px 4px;
}
.footer-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.footer-links a {
  font-size: 12px;
  color: var(--color-text-muted);
  text-decoration: none;
}
.footer-links a:hover { color: var(--color-text-secondary); }
.footer-copy {
  font-size: 11px;
  color: var(--color-text-muted);
}

/* 响应式 - 平板 */
@media (max-width: 1024px) {
  .wall-grid { grid-template-columns: 220px 1fr; }
  .sidebar-right { display: none; }
}

/* 响应式 - 手机 */
@media (max-width: 768px) {
  .wall-layout {
    padding: 0;
    min-height: 100vh;
  }

  /* 全屏简洁 Feed */
  .wall-grid {
    grid-template-columns: 1fr;
  }
  .sidebar-left { display: none; }
  .sidebar-right { display: none; }

  /* 手机端 Feed 样式 */
  .feed {
    padding: 0;
  }

  .feed-header {
    position: sticky;
    top: 56px;
    z-index: 50;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(8px);
    padding: 8px 0;
    margin-bottom: 0;
    border-bottom: 1px solid var(--color-border-light);
  }

  .feed-tabs {
    border-radius: 0;
    box-shadow: none;
    border: none;
    background: transparent;
    padding: 0 12px;
  }

  .feed-tab {
    font-size: 13px;
    padding: 6px 12px;
  }

  /* 全屏帖子卡片 */
  .post-list {
    gap: 0;
    padding: 0;
  }

  /* 骨架屏 */
  .skeleton-card {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  /* 加载更多 */
  .load-more {
    padding: 16px 12px;
  }
}

/* 手机端帖子卡片无阴影全宽 */
@media (max-width: 768px) {
  :deep(.post-card) {
    border-radius: 0;
    border-left: none;
    border-right: none;
    box-shadow: none;
    border-bottom: 1px solid var(--color-border-light);
    padding: 14px 16px;
  }

  :deep(.post-card:hover) {
    box-shadow: none;
    transform: none;
    background: var(--color-surface);
  }
}
</style>
