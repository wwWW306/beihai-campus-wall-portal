<template>
  <header class="navbar">
    <div class="navbar-inner container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <img src="/images/ff171788-d30a-4ea3-aa3d-1dedd7ea54e8.png" alt="Campus Wall Logo" class="nav-logo-img" />
        <span class="logo-text">Campus Wall</span>
      </router-link>

      <!-- 桌面搜索框 -->
      <div class="nav-search desktop-only" @click="goSearch">
        <Icons name="search" :size="16" />
        <span class="search-placeholder">搜索用户、话题或内容...</span>
      </div>

      <!-- 桌面端导航 -->
      <nav class="nav-links desktop-only">
        <router-link to="/wall" class="nav-item" active-class="nav-item--active">
          <Icons name="fire" :size="18" />
          <span>广场</span>
        </router-link>
        <router-link to="/partitions" class="nav-item" active-class="nav-item--active">
          <Icons name="partition" :size="18" />
          <span>分区</span>
        </router-link>
        <router-link to="/calendar" class="nav-item" active-class="nav-item--active">
          <Icons name="calendar" :size="18" />
          <span>校历</span>
        </router-link>
      </nav>

      <!-- 右侧操作区 -->
      <div class="navbar-actions">
        <template v-if="userStore?.isLoggedIn">
          <router-link to="/post/new" class="btn btn-primary btn-sm post-btn">
            <Icons name="plus" :size="16" />
            <span>发帖</span>
          </router-link>
          <button class="icon-btn" @click="themeStore?.toggleTheme" :title="themeStore?.theme === 'light' ? '切换暗色' : '切换亮色'">
            <Icons :name="themeStore?.theme === 'dark' ? 'sun' : 'moon'" :size="20" />
          </button>
          <router-link to="/notifications" class="icon-btn" title="通知">
            <Icons name="bell" :size="20" />
            <span v-if="notificationsStore?.unreadCount > 0" class="badge">
              {{ notificationsStore?.unreadCount > 99 ? '99+' : notificationsStore?.unreadCount }}
            </span>
          </router-link>
          <router-link to="/profile" class="avatar-btn">
            <img :src="userStore?.userInfo?.avatar" :alt="userStore?.userInfo?.name" class="nav-avatar" />
          </router-link>
        </template>
        <template v-else>
          <button class="icon-btn" @click="themeStore?.toggleTheme" style="margin-right: 8px;">
            <Icons :name="themeStore?.theme === 'dark' ? 'sun' : 'moon'" :size="20" />
          </button>
          <router-link to="/login" class="btn btn-secondary btn-sm">登录</router-link>
          <router-link to="/register" class="btn btn-primary btn-sm">注册</router-link>
        </template>
        <button class="icon-btn mobile-menu-btn" @click="mobileOpen = !mobileOpen">
          <Icons name="menu" :size="20" />
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div v-if="mobileOpen" class="mobile-menu">
      <router-link to="/wall" class="mobile-nav-item" @click="mobileOpen = false">
        <Icons name="fire" :size="18" /> 广场
      </router-link>
      <router-link to="/partitions" class="mobile-nav-item" @click="mobileOpen = false">
        <Icons name="partition" :size="18" /> 分区
      </router-link>
      <router-link to="/search" class="mobile-nav-item" @click="mobileOpen = false">
        <Icons name="search" :size="18" /> 搜索
      </router-link>
      <template v-if="userStore.isLoggedIn">
        <router-link to="/post/new" class="mobile-nav-item" @click="mobileOpen = false">
          <Icons name="edit" :size="18" /> 发布帖子
        </router-link>
        <router-link to="/profile" class="mobile-nav-item" @click="mobileOpen = false">
          <Icons name="user" :size="18" /> 个人主页
        </router-link>
        <button class="mobile-nav-item" @click="handleLogout">退出登录</button>
      </template>
      <template v-else>
        <router-link to="/login" class="mobile-nav-item" @click="mobileOpen = false">登录</router-link>
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNotificationsStore, useThemeStore } from '../stores'
import Icons from './Icons.vue'

const router = useRouter()
const userStore = ref(null)
const notificationsStore = ref(null)
const themeStore = ref(null)
const mobileOpen = ref(false)

onMounted(() => {
  userStore.value = useUserStore()
  notificationsStore.value = useNotificationsStore()
  themeStore.value = useThemeStore()
  notificationsStore.value.generateMockNotifications()
})

function goSearch() { router.push('/search') }

function handleLogout() {
  userStore.logout()
  mobileOpen.value = false
  router.push('/')
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition-base), border-color var(--transition-base);
}

.navbar-inner {
  display: flex;
  align-items: center;
  height: 56px;
  gap: 16px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.nav-logo-img {
  height: 28px;
  width: auto;
  object-fit: contain;
  transition: filter var(--transition-base);
}
[data-theme="dark"] .nav-logo-img {
  filter: brightness(0) invert(1);
}
.logo:hover .nav-logo-img { transform: scale(1.05); }
.logo-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: var(--color-text);
  letter-spacing: 0.02em;
  line-height: 1;
  margin-top: 2px;
}

/* Search */
.nav-search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 200px;
  max-width: 320px;
  flex: 1;
  color: var(--color-text-muted);
}
.nav-search:hover {
  border-color: var(--color-primary);
  background: var(--color-surface);
}
.search-placeholder { font-size: 14px; }

/* Nav Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
}
.nav-item:hover {
  background: var(--color-surface-alt);
  color: var(--color-text);
}
.nav-item--active {
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-weight: 600;
}

/* Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}
.post-btn span { display: inline; }
.icon-btn {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  text-decoration: none;
}
.icon-btn:hover {
  background: var(--color-surface-alt);
  color: var(--color-text);
}
.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  background: var(--color-primary);
  color: var(--color-surface);
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid var(--color-surface);
}
.avatar-btn { display: flex; text-decoration: none; }
.nav-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 2px solid var(--color-border-light);
  transition: border-color var(--transition-fast);
}
.avatar-btn:hover .nav-avatar { border-color: var(--color-primary); }

/* Mobile */
.mobile-menu-btn { display: none; }
.desktop-only { display: flex; }

.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 8px 16px 12px;
  border-top: 1px solid var(--color-border-light);
  background: var(--color-surface);
}
.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  transition: background var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-family: var(--font-sans);
}
.mobile-nav-item:hover { background: var(--color-surface-alt); }

@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-menu-btn { display: flex; }
  .mobile-menu { display: flex; }
  .logo-text { display: none; }
  .post-btn span { display: none; }
}
</style>
