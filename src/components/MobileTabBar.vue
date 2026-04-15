<template>
  <!-- 移动端底部导航栏 -->
  <nav class="mobile-tabbar">
    <router-link to="/wall" class="tab-item" :class="{ 'tab-item--active': route.path === '/wall' || route.path === '/' }">
      <div class="tab-icon">
        <Icons name="home" :size="22" />
      </div>
      <span class="tab-label">首页</span>
    </router-link>

    <router-link to="/search" class="tab-item" :class="{ 'tab-item--active': route.path === '/search' }">
      <div class="tab-icon">
        <Icons name="search" :size="22" />
      </div>
      <span class="tab-label">搜索</span>
    </router-link>

    <router-link to="/create" class="tab-item tab-item--create">
      <div class="tab-create-btn">
        <Icons name="plus" :size="26" />
      </div>
      <span class="tab-label">发布</span>
    </router-link>

    <router-link to="/notifications" class="tab-item" :class="{ 'tab-item--active': route.path === '/notifications' }">
      <div class="tab-icon">
        <Icons name="bell" :size="22" />
        <span v-if="notifCount > 0" class="tab-badge">{{ notifCount > 9 ? '9+' : notifCount }}</span>
      </div>
      <span class="tab-label">消息</span>
    </router-link>

    <router-link to="/profile" class="tab-item" :class="{ 'tab-item--active': route.path === '/profile' }">
      <div class="tab-icon">
        <img :src="currentUser.avatar" class="tab-avatar" :alt="currentUser.name" />
      </div>
      <span class="tab-label">我的</span>
    </router-link>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Icons from './Icons.vue'

const route = useRoute()
const notifCount = ref(3)
const currentUser = ref({
  name: '当前用户',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
})
</script>

<style scoped>
.mobile-tabbar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--color-border-light);
  padding: 6px 0;
  padding-bottom: max(6px, env(safe-area-inset-bottom));
  /* iOS 适配：底部安全区 */
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 1;
  text-decoration: none;
  padding: 4px 0;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
  position: relative;
}

.tab-item--active {
  color: var(--color-primary);
}

.tab-icon {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid transparent;
  transition: border-color var(--transition-fast);
}

.tab-item--active .tab-avatar {
  border-color: var(--color-primary);
}

.tab-badge {
  position: absolute;
  top: -2px;
  right: -4px;
  min-width: 15px;
  height: 15px;
  background: var(--color-primary);
  color: white;
  border-radius: 9999px;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  border: 1.5px solid white;
}

.tab-label {
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
}

/* 发布按钮特殊样式 */
.tab-item--create {
  color: var(--color-primary);
}

.tab-create-btn {
  width: 44px;
  height: 44px;
  background: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
  transform: translateY(-6px);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.tab-item--create:active .tab-create-btn {
  transform: translateY(-4px) scale(0.96);
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.tab-item--create .tab-label {
  margin-top: 2px;
}

@media (max-width: 768px) {
  .mobile-tabbar {
    display: flex;
  }
}
</style>
