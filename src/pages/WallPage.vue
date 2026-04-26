<template>
  <div class="wall-page">
    <AppNavBar />
    <div class="wall-container">
      
      <!-- 左侧主导航 (完全独立列) -->
      <aside class="sidebar-left column-scroll">
        <div class="column-content">
          <nav class="nav-menu">
            <router-link to="/wall" class="nav-item">
              <Icons name="home" :size="24" />
              <span>发现广场</span>
            </router-link>
            <router-link to="/notifications" class="nav-item">
              <Icons name="bell" :size="24" />
              <span>实时消息</span>
            </router-link>
            <router-link to="/search" class="nav-item">
              <Icons name="search" :size="24" />
              <span>探索发现</span>
            </router-link>
            <router-link to="/partitions" class="nav-item">
              <Icons name="partition" :size="24" />
              <span>兴趣分区</span>
            </router-link>
            <router-link to="/profile" class="nav-item">
              <Icons name="user" :size="24" />
              <span>个人中心</span>
            </router-link>
          </nav>

          <button class="post-trigger-btn" @click="goCreate">
            <Icons name="edit" :size="20" />
            <span>发布动态</span>
          </button>
        </div>
      </aside>

      <!-- 中间主信息流 (完全独立列) -->
      <main class="feed-container column-scroll">
        <div class="column-content">
          <div class="feed-header">
            <div class="tab-group">
              <button 
                v-for="tab in tabs" 
                :key="tab.key" 
                class="tab-btn" 
                :class="{ 'tab-btn--active': activeTab === tab.key, 'mobile-only-tab': tab.mobileOnly }" 
                @click="setTab(tab.key)"
              >
                {{ tab.label }}
                <span class="tab-indicator" v-if="activeTab === tab.key"></span>
              </button>
            </div>
          </div>

          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>正在获取最新动态...</p>
          </div>
          <div v-else class="feed-content">
            <PostCard v-for="post in displayPosts" :key="post.id" :post="post" />
            
            <div v-if="displayPosts.length === 0" class="empty-state">
              <div class="empty-icon-wrap">
                <Icons name="edit" :size="48" />
              </div>
              <h3>寂静无声</h3>
              <p>这里还没有任何动态，来开启第一个话题吧</p>
              <button class="btn-primary mt-4" @click="goCreate">立即发布</button>
            </div>
          </div>
        </div>
      </main>

      <!-- 右侧边栏 (完全独立列) -->
      <aside class="sidebar-right column-scroll">
        <div class="column-content sidebar-right-padding">
          <!-- 校历 Widget -->
          <div class="widget-card calendar-widget">
            <div class="calendar-header">
              <div class="date-display">
                <span class="month">4月</span>
                <span class="day">25</span>
              </div>
              <div class="week-info">
                <h3>25-26学年 (春季)</h3>
                <span class="week-badge">第 8 周</span>
              </div>
            </div>
            <div class="calendar-events">
              <div class="event-item active">
                <span class="event-dot red"></span>
                <div class="event-text">
                  <span class="event-title">今日：NACG 考试</span>
                  <span class="event-desc">拟期中教学检查周</span>
                </div>
              </div>
              <div class="event-item">
                <span class="event-dot"></span>
                <div class="event-text">
                  <span class="event-title">5月1日：劳动节放假</span>
                  <span class="event-desc">第 9 周</span>
                </div>
              </div>
              <div class="event-item">
                <span class="event-dot"></span>
                <div class="event-text">
                  <span class="event-title">5月16日-17日：普通话水平测试</span>
                  <span class="event-desc">第 11 周</span>
                </div>
              </div>
              <div class="event-item">
                <span class="event-dot"></span>
                <div class="event-text">
                  <span class="event-title">6月10日-11日：期末考试</span>
                  <span class="event-desc">第 15 周</span>
                </div>
              </div>
            </div>
            <button class="calendar-btn" @click="router.push('/calendar')">查看完整校历</button>
          </div>

          <!-- 主题墙 -->
          <div class="theme-wall-card">
            <div class="theme-badge">热门活动</div>
            <h3>校园春日主题墙</h3>
            <p>记录属于你的春天瞬间，赢取限定周边</p>
            <button class="theme-join-btn">立即参与</button>
          </div>

          <!-- 热度榜 -->
          <div class="widget-card">
            <div class="widget-header">
              <h3>校园热搜</h3>
              <Icons name="trending" :size="18" color="var(--color-primary)" />
            </div>
            <div class="trending-list">
              <a v-for="(item, idx) in hotSearch" :key="idx" href="#" class="trending-item">
                <span class="rank" :class="{ 'top-three': idx < 3 }">{{ idx + 1 }}</span>
                <span class="title">{{ item.title }}</span>
                <span class="hot-tag" v-if="idx < 2">HOT</span>
              </a>
            </div>
          </div>

          <!-- 推荐关注 -->
          <div class="widget-card">
            <div class="widget-header">
              <h3>活跃同学</h3>
            </div>
            <div class="user-list">
              <div v-for="u in recommendedUsers" :key="u.id" class="user-item">
                <img :src="u.avatar" class="user-avatar" :alt="u.name" />
                <div class="user-info">
                  <span class="name">{{ u.name }}</span>
                  <span class="bio">{{ u.desc }}</span>
                </div>
                <button class="follow-btn">关注</button>
              </div>
            </div>
          </div>

          <footer class="side-footer">
            <p>&copy; 2026 Campus Wall<br>专为北海艺术设计学院打造</p>
            <div class="official-links">
              <a href="https://www.sszss.com/?site_id=2" target="_blank" title="北海艺术设计学院官方网站">学校官网</a>
            </div>
            <div class="links mt-2">
              <a href="#">关于</a> · <a href="#">准则</a> · <a href="#">隐私</a>
            </div>
          </footer>
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

const router = useRouter()
const postsStore = usePostsStore()
const loading = ref(true)
const activeTab = ref('hot')
const displayPosts = ref([])

const tabs = [
  { key: 'hot', label: '热门', icon: 'fire' },
  { key: 'new', label: '最新', icon: 'clock' },
  { key: 'follow', label: '关注', icon: 'star' },
  { key: 'partitions', label: '分区', mobileOnly: true },
  { key: 'theme', label: '主题墙', mobileOnly: true }
]

const hotSearch = [
  { title: '# 大学生期末复习现状' },
  { title: '图书馆惊现神秘学霸' },
  { title: '食堂二楼网红麻辣烫' },
  { title: '暑期实习内推集合点' },
  { title: '考公还是考研的终极辩论' },
]

const recommendedUsers = [
  { id: 1, name: '北海艺术设计学院', desc: '官方互动号', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=News' },
  { id: 2, name: '校园摄影大赏', desc: '记录最美瞬间', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Confess' },
  { id: 3, name: '跳蚤市场君', desc: '好物交易不踩雷', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Market' },
]

function setTab(key) {
  if (key === 'partitions') {
    router.push('/partitions')
    return
  }
  if (key === 'theme') {
    router.push('/partitions/theme-wall')
    return
  }
  activeTab.value = key
  loadInitial()
}

async function loadInitial() {
  loading.value = true
  try {
    const result = await postsStore.fetchPosts(1, 10, null, activeTab.value)
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
/* 关键：整页高度锁定，不允许全局滚动 */
.wall-page {
  height: 100vh;
  overflow: hidden;
  background: var(--color-bg);
  color: var(--color-text);
  padding-top: 72px; /* 顶栏高度 */
}

.wall-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  gap: 0;
  padding: 0 24px;
}

/* 独立列滚动基础类 */
.column-scroll {
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none; /* 隐藏 Firefox 滚动条 */
}

.column-scroll::-webkit-scrollbar {
  display: none; /* 隐藏 Chrome 滚动条 */
}

.column-content {
  padding: 24px 0;
  display: flex;
  flex-direction: column;
}

/* ── 左侧 ── */
.sidebar-left {
  width: 240px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border-light);
  padding-right: 24px;
}

.nav-menu { display: flex; flex-direction: column; gap: 8px; }
.nav-item { display: flex; align-items: center; gap: 16px; padding: 12px 20px; border-radius: 30px; font-size: 17px; color: var(--color-text); text-decoration: none; transition: all 0.2s; }
.nav-item:hover { background: rgba(0, 0, 0, 0.05); }
.nav-item.router-link-active { color: var(--color-primary); background: var(--color-primary-light); font-weight: 700; }
.post-trigger-btn { margin-top: 24px; display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 16px; background: var(--color-primary); color: #fff; border: none; border-radius: 30px; font-size: 16px; font-weight: 700; cursor: pointer; }

/* ── 中间 ── */
.feed-container {
  flex: 1;
  min-width: 0;
  max-width: 680px;
  padding: 0 32px;
}

.feed-header {
  background: var(--color-bg);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 0 20px 0;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
}

.tab-group { display: flex; gap: 32px; overflow-x: auto; scrollbar-width: none; }
.tab-group::-webkit-scrollbar { display: none; }
.tab-btn { flex-shrink: 0; white-space: nowrap; background: transparent; border: none; font-size: 16px; font-weight: 700; color: var(--color-text-muted); cursor: pointer; position: relative; padding-bottom: 8px; }
.tab-btn--active { color: var(--color-primary); }
.tab-indicator { position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background: var(--color-primary); border-radius: 2px; }
.mobile-only-tab { display: none; }

.feed-content { display: flex; flex-direction: column; gap: 24px; padding-bottom: 80px; }

/* ── 右侧 ── */
.sidebar-right {
  width: 320px;
  flex-shrink: 0;
  border-left: 1px solid var(--color-border-light);
  padding-left: 24px;
}

.sidebar-right-padding {
  padding-bottom: 100px;
  gap: 24px;
}

/* 样式一致性 */
.theme-wall-card { border-radius: 24px; background: var(--color-bg); color: var(--color-text); padding: 32px 24px; box-shadow: var(--shadow-md); border: 1px solid var(--color-border); }
.theme-badge { display: inline-block; padding: 4px 12px; background: var(--color-surface-alt); color: var(--color-text-muted); border-radius: 20px; font-size: 11px; font-weight: 800; margin-bottom: 12px; border: 1px solid var(--color-border); }
.theme-wall-card h3 { font-size: 22px; font-weight: 900; margin-bottom: 10px; line-height: 1.1; color: var(--color-text); }
.theme-wall-card p { font-size: 14px; opacity: 0.8; margin-bottom: 24px; line-height: 1.5; color: var(--color-text-secondary); }
.theme-join-btn { background: var(--color-text); color: var(--color-bg); border: none; padding: 12px 24px; border-radius: 14px; font-size: 14px; font-weight: 800; cursor: pointer; }

.widget-card { background: var(--color-bg); border-radius: 24px; padding: 24px; border: 1px solid var(--color-border); }
.widget-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.widget-header h3 { font-size: 18px; font-weight: 800; }
.trending-list { display: flex; flex-direction: column; gap: 16px; }
.trending-item { display: flex; align-items: flex-start; gap: 14px; text-decoration: none; color: var(--color-text); transition: opacity 0.2s; }
.rank { font-size: 15px; font-weight: 800; color: var(--color-text-muted); width: 20px; }
.rank.top-three { color: var(--color-primary); }
.title { font-size: 15px; font-weight: 600; flex: 1; line-height: 1.4; }
.hot-tag { font-size: 10px; background: var(--color-surface-alt); color: var(--color-primary); padding: 2px 6px; border-radius: 4px; font-weight: 800; }

/* ── 校历 Widget ── */
.calendar-widget { margin-bottom: 24px; padding: 20px; }
.calendar-header { display: flex; gap: 16px; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px dashed var(--color-border); }
.date-display { display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-primary); color: #fff; width: 56px; height: 64px; border-radius: 14px; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2); }
.date-display .month { font-size: 12px; font-weight: 700; opacity: 0.9; line-height: 1; }
.date-display .day { font-size: 24px; font-weight: 900; line-height: 1; margin-top: 4px; }
.week-info { display: flex; flex-direction: column; gap: 6px; }
.week-info h3 { font-size: 15px; font-weight: 800; margin: 0; color: var(--color-text); }
.week-badge { display: inline-block; background: var(--color-surface-alt); color: var(--color-text-secondary); font-size: 12px; font-weight: 700; padding: 4px 8px; border-radius: 6px; width: max-content; }
.calendar-events { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
.event-item { display: flex; align-items: flex-start; gap: 12px; }
.event-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-border); margin-top: 6px; flex-shrink: 0; }
.event-dot.red { background: var(--color-primary); box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1); }
.event-text { display: flex; flex-direction: column; gap: 4px; }
.event-title { font-size: 14px; font-weight: 700; color: var(--color-text); }
.event-item.active .event-title { color: var(--color-primary); }
.event-desc { font-size: 12px; color: var(--color-text-muted); }
.calendar-btn { width: 100%; background: var(--color-surface-alt); color: var(--color-text); border: 1px solid var(--color-border); padding: 12px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.calendar-btn:hover { background: var(--color-text); color: var(--color-bg); border-color: var(--color-text); }

.user-list { display: flex; flex-direction: column; gap: 20px; }
.user-item { display: flex; align-items: center; gap: 14px; }
.user-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 1px solid var(--color-border); }
.user-info { flex: 1; min-width: 0; }
.name { display: block; font-size: 15px; font-weight: 700; }
.bio { display: block; font-size: 12px; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.follow-btn { background: var(--color-text); color: var(--color-bg); border: none; padding: 8px 18px; border-radius: 20px; font-size: 13px; font-weight: 700; cursor: pointer; }
.side-footer { padding: 0 12px; font-size: 12px; color: var(--color-text-muted); opacity: 0.7; }
.side-footer p { margin-bottom: 8px; line-height: 1.5; }
.side-footer .official-links { display: flex; gap: 8px; margin-bottom: 8px; font-weight: 600; }
.side-footer .official-links a { color: var(--color-text); text-decoration: underline; text-decoration-color: var(--color-primary); text-decoration-thickness: 2px; }
.side-footer .links.mt-2 { margin-top: 8px; }
.side-footer a { color: inherit; text-decoration: none; transition: opacity 0.2s; }
.side-footer a:hover { opacity: 0.7; }

/* 响应式优化 */
@media (max-width: 1200px) {
  .wall-container { padding: 0 16px; }
  .sidebar-right { width: 300px; }
}

@media (max-width: 1024px) {
  .sidebar-right { display: none; } /* 平板端隐藏右侧，保证中栏和左栏空间 */
  .feed-container { border-right: none; }
}

@media (max-width: 768px) {
  .wall-page { padding-top: calc(env(safe-area-inset-top, 0px) + 16px); }
  .sidebar-left { display: none; }
  .wall-container { padding: 0; }
  .feed-container { width: 100%; border: none; padding: 0; }
  .feed-header { padding: 0 12px 16px 12px; margin-bottom: 8px; }
  .tab-group { gap: 20px; }
  .mobile-only-tab { display: inline-block; }
  .column-content { padding: 0; }
  
  /* 移动端减小卡片间距 */
  .feed-container .column-content { gap: 8px; }
}

@media (max-width: 480px) {
  .column-content { padding: 0; }
}
</style>
