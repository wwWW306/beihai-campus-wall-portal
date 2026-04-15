<template>
  <header class="navbar">
    <div class="navbar-inner container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <div class="logo-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
            <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="logo-text">Campus Wall</span>
      </router-link>

      <!-- 桌面端导航 -->
      <nav class="nav-links desktop-nav">
        <router-link to="/" class="nav-item" active-class="nav-item--active">
          <Icons name="home" :size="18" />
          <span>首页</span>
        </router-link>
        <router-link to="/partitions" class="nav-item" active-class="nav-item--active">
          <Icons name="partition" :size="18" />
          <span>分区</span>
        </router-link>
        <router-link to="/search" class="nav-item" active-class="nav-item--active">
          <Icons name="search" :size="18" />
          <span>搜索</span>
        </router-link>
      </nav>

      <!-- 右侧操作区 -->
      <div class="navbar-actions">
        <template v-if="isLoggedIn">
          <router-link to="/create" class="btn btn-primary btn-sm">
            <Icons name="edit" :size="15" />
            <span>发布</span>
          </router-link>
          <button class="icon-btn" title="通知">
            <Icons name="bell" :size="20" />
            <span class="badge">3</span>
          </button>
          <router-link to="/profile" class="avatar-btn">
            <img :src="currentUser.avatar" :alt="currentUser.name" class="avatar avatar-sm" />
          </router-link>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-secondary btn-sm">登录</router-link>
          <router-link to="/register" class="btn btn-primary btn-sm">注册</router-link>
        </template>

        <!-- 移动端汉堡 -->
        <button class="icon-btn mobile-menu-btn" @click="mobileOpen = !mobileOpen">
          <Icons name="menu" :size="20" />
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div v-if="mobileOpen" class="mobile-menu">
      <router-link to="/" class="mobile-nav-item" @click="mobileOpen = false">
        <Icons name="home" :size="18" /> 首页
      </router-link>
      <router-link to="/partitions" class="mobile-nav-item" @click="mobileOpen = false">
        <Icons name="partition" :size="18" /> 分区
      </router-link>
      <router-link to="/search" class="mobile-nav-item" @click="mobileOpen = false">
        <Icons name="search" :size="18" /> 搜索
      </router-link>
      <router-link to="/create" class="mobile-nav-item" @click="mobileOpen = false">
        <Icons name="edit" :size="18" /> 发布帖子
      </router-link>
      <template v-if="isLoggedIn">
        <router-link to="/profile" class="mobile-nav-item" @click="mobileOpen = false">
          <Icons name="user" :size="18" /> 个人主页
        </router-link>
      </template>
      <template v-else>
        <router-link to="/login" class="mobile-nav-item" @click="mobileOpen = false">登录</router-link>
        <router-link to="/register" class="mobile-nav-item" @click="mobileOpen = false">注册</router-link>
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Icons from './Icons.vue'

const mobileOpen = ref(false)
const isLoggedIn = ref(true)
const currentUser = ref({
  name: '当前用户',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
})
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border-light);
}

.navbar-inner {
  display: flex;
  align-items: center;
  height: 56px;
  gap: 24px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-icon {
  width: 34px;
  height: 34px;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-text {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
}

/* 桌面端导航 */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
}
.nav-item:hover {
  background: var(--color-bg);
  color: var(--color-text);
}
.nav-item--active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

/* 右侧操作 */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}
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
}
.icon-btn:hover {
  background: var(--color-bg);
  color: var(--color-text);
}
.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
.avatar-btn { display: flex; }
.btn-sm { padding: 6px 14px; font-size: 13px; }

/* 移动端 */
.mobile-menu-btn { display: none; }
.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 8px 12px 12px;
  border-top: 1px solid var(--color-border-light);
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
}
.mobile-nav-item:hover { background: var(--color-bg); }

@media (max-width: 768px) {
  .desktop-nav { display: none; }
  .mobile-menu-btn { display: flex; }
  .mobile-menu { display: flex; }
  .logo-text { display: none; }
}
</style>
