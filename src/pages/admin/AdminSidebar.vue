<template>
  <aside class="admin-sidebar">
    <div class="sidebar-logo">
      <div class="logo-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
          <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <span>Campus Wall</span>
    </div>
    <nav class="sidebar-nav">
      <router-link to="/admin/dashboard" class="admin-nav-item">
        <Icons name="chart" :size="17" />
        <span>数据概览</span>
      </router-link>
      <router-link to="/admin/wall" class="admin-nav-item admin-nav-item--active">
        <Icons name="edit" :size="17" />
        <span>帖子管理</span>
      </router-link>
      <router-link to="/admin/users" class="admin-nav-item">
        <Icons name="users" :size="17" />
        <span>用户管理</span>
      </router-link>
      <router-link to="/admin/reports" class="admin-nav-item">
        <Icons name="flag" :size="17" />
        <span>举报中心</span>
        <span class="nav-badge">5</span>
      </router-link>
    </nav>
    <div class="sidebar-bottom">
      <router-link to="/" class="admin-nav-item">
        <Icons name="home" :size="17" />
        <span>返回首页</span>
      </router-link>
      <button class="admin-nav-item admin-nav-item--danger">
        <Icons name="logout" :size="17" />
        <span>退出登录</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import Icons from '../../components/Icons.vue'
</script>

<style scoped>
.admin-sidebar {
  background: #1f2937;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  position: sticky;
  top: 0;
  height: 100vh;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px 20px;
  font-size: 15px;
  font-weight: 700;
}
.logo-icon {
  width: 32px;
  height: 32px;
  background: var(--color-primary);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.admin-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: all 120ms ease;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
}
.admin-nav-item:hover { background: rgba(255,255,255,0.08); color: white; }
.admin-nav-item--active { background: rgba(249,115,22,0.2); color: var(--color-primary); }
.admin-nav-item--danger { color: rgba(255,255,255,0.4); }
.admin-nav-item--danger:hover { background: rgba(239,68,68,0.15); color: #ef4444; }
.nav-badge {
  margin-left: auto;
  min-width: 18px;
  height: 18px;
  background: #ef4444;
  color: white;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}
.sidebar-bottom {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 12px;
}
</style>
