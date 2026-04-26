<template>
  <nav class="mobile-tabbar">
    <router-link to="/wall" class="tab-item" :class="{ 'tab-item--active': isActive('/wall') }">
      <Icons name="home" :size="24" />
    </router-link>

    <router-link to="/search" class="tab-item" :class="{ 'tab-item--active': isActive('/search') }">
      <Icons name="search" :size="24" />
    </router-link>

    <router-link to="/post/new" class="tab-item tab-item--create">
      <div class="tab-create-btn">
        <Icons name="plus" :size="24" />
      </div>
    </router-link>

    <router-link to="/notifications" class="tab-item" :class="{ 'tab-item--active': isActive('/notifications') }">
      <div class="icon-wrap">
        <Icons name="bell" :size="24" />
        <span v-if="notifCount > 0" class="tab-badge"></span>
      </div>
    </router-link>

    <router-link to="/profile" class="tab-item" :class="{ 'tab-item--active': isActive('/profile') }">
      <img :src="currentUser.avatar" class="tab-avatar" :alt="currentUser.name" />
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

function isActive(path) {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<style scoped>
.mobile-tabbar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 8px 0;
  padding-bottom: max(8px, env(safe-area-inset-bottom));
  justify-content: space-around;
  align-items: center;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--color-text-muted);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-tap-highlight-color: transparent;
}

.tab-item--active {
  color: var(--color-primary);
  transform: translateY(-2px);
}

.icon-wrap {
  position: relative;
}

.tab-badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  border: 2px solid var(--color-surface);
}

.tab-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.tab-item--active .tab-avatar {
  border-color: var(--color-primary);
}

.tab-create-btn {
  width: 48px;
  height: 48px;
  background: var(--color-primary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 16px rgba(255, 51, 51, 0.25);
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .mobile-tabbar {
    display: flex;
  }
}
</style>
