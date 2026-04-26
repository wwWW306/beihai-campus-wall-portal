<template>
  <header class="navbar">
    <div class="navbar-inner container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <svg class="brand-logo-svg" viewBox="0 0 100 100">
          <path class="logo-path" d="M20,15 A10,10 0 1,1 20,35 A8,8 0 1,0 20,15" />
          <path class="logo-path stroke" d="M15,80 A35,35 0 0,1 85,80" />
          <path class="logo-path stroke" d="M25,80 A25,25 0 0,1 75,80" />
          <path class="logo-path stroke" d="M35,80 A15,15 0 0,1 65,80" />
          <rect class="logo-path stroke" x="42" y="70" width="16" height="10" rx="1" />
          <path class="logo-path stroke" d="M42,70 L50,76 L58,70" />
        </svg>
        <span class="logo-text">CAMPUS WALL</span>
      </router-link>

      <!-- 搜索框 (更现代) -->
      <div class="nav-search desktop-only" @click="goSearch">
        <Icons name="search" :size="16" />
        <input type="text" placeholder="搜索同学、话题或内容..." readonly />
        <span class="search-key">/</span>
      </div>

      <!-- 右侧操作区 -->
      <div class="navbar-actions">
        <!-- 主题切换 -->
        <button class="action-btn theme-toggle" @click="themeStore?.toggleTheme" :title="themeStore?.theme === 'light' ? '暗色模式' : '亮色模式'">
          <Icons :name="themeStore?.theme === 'dark' ? 'sun' : 'moon'" :size="20" />
        </button>

        <template v-if="userStore?.isLoggedIn">
          <!-- 通知 -->
          <router-link to="/notifications" class="action-btn" title="通知">
            <Icons name="bell" :size="20" />
            <span v-if="notificationsStore?.unreadCount > 0" class="badge"></span>
          </router-link>

          <!-- 用户头像 -->
          <router-link to="/profile" class="user-avatar-link">
            <img :src="userStore?.userInfo?.avatar" :alt="userStore?.userInfo?.name" />
          </router-link>
        </template>

        <template v-else>
          <router-link to="/login" class="nav-link-btn">登录</router-link>
          <router-link to="/register" class="btn-cta">加入社区</router-link>
        </template>

        <!-- 移动端菜单按钮 -->
        <button class="action-btn mobile-menu-btn" @click="mobileOpen = !mobileOpen">
          <Icons :name="mobileOpen ? 'plus' : 'menu'" :size="22" :style="{ transform: mobileOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }" />
        </button>
      </div>
    </div>

    <!-- 移动端抽屉式菜单 -->
    <transition name="drawer">
      <div v-if="mobileOpen" class="mobile-drawer">
        <div class="drawer-content">
          <router-link to="/wall" class="drawer-item" @click="mobileOpen = false">发现广场</router-link>
          <router-link to="/partitions" class="drawer-item" @click="mobileOpen = false">兴趣分区</router-link>
          <router-link to="/search" class="drawer-item" @click="mobileOpen = false">内容搜索</router-link>
          <router-link to="/calendar" class="drawer-item" @click="mobileOpen = false">校园校历</router-link>
          <div class="drawer-divider"></div>
          <template v-if="userStore.isLoggedIn">
            <router-link to="/profile" class="drawer-item" @click="mobileOpen = false">个人主页</router-link>
            <button class="drawer-item logout-item" @click="handleLogout">退出登录</button>
          </template>
          <template v-else>
            <router-link to="/login" class="drawer-item active" @click="mobileOpen = false">立即登录</router-link>
          </template>
        </div>
      </div>
    </transition>
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
  z-index: 1000;
  height: 72px;
  background: var(--color-navbar-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
}

.navbar-inner {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: transform 0.3s;
}
.logo:hover { transform: translateY(-1px); }

.brand-logo-svg {
  width: 32px;
  height: 32px;
  color: var(--color-primary);
}
.logo-path { fill: currentColor; }
.logo-path.stroke { fill: none; stroke: currentColor; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }

.logo-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  font-weight: 500;
  color: var(--color-text);
  letter-spacing: 0.05em;
  margin-top: 2px;
}

/* Search */
.nav-search {
  flex: 1;
  max-width: 480px;
  height: 44px;
  background: var(--color-surface-alt);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid transparent;
}
.nav-search:hover {
  background: #fff;
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(255, 51, 51, 0.05);
}
.nav-search input {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 14px;
  color: var(--color-text);
  pointer-events: none;
}
.search-key {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  padding: 2px 8px;
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
  color: var(--color-text-muted);
}

/* Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  text-decoration: none;
}
.action-btn:hover {
  background: var(--color-surface-alt);
  color: var(--color-primary);
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  border: 2px solid var(--color-bg);
}

.user-avatar-link {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}
.user-avatar-link:hover { border-color: var(--color-primary); }
.user-avatar-link img { width: 100%; height: 100%; object-fit: cover; }

.nav-link-btn {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  padding: 0 12px;
}

.btn-cta {
  background: var(--color-primary);
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  transition: transform 0.3s, box-shadow 0.3s;
}
.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 51, 51, 0.2);
}

/* Mobile Drawer */
.mobile-menu-btn { display: none; }
.mobile-drawer {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-bg);
  z-index: 1001;
  padding: 20px;
}

.drawer-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.drawer-item {
  padding: 16px 24px;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  border-radius: 16px;
  transition: background 0.2s;
}
.drawer-item:hover { background: var(--color-surface-alt); }
.drawer-item.active { background: var(--color-primary); color: #fff; }
.drawer-divider { height: 1px; background: var(--color-border); margin: 12px 0; }
.logout-item { color: var(--color-primary); border: none; background: transparent; text-align: left; cursor: pointer; font-family: inherit; }

/* Transitions */
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.3s, transform 0.3s; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-10px); }

@media (max-width: 992px) {
  .nav-search { max-width: 300px; }
}

@media (max-width: 768px) {
  .navbar { display: none; }
  .desktop-only { display: none; }
  .mobile-menu-btn { display: flex; }
  .navbar-actions .action-btn:not(.mobile-menu-btn):not(.theme-toggle) { display: none; }
  .nav-link-btn, .btn-cta { display: none; }
}
</style>
