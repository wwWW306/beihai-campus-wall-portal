# Campus Wall UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Campus Wall 登录后的核心页面重构为类似 Twitter/X 的高效极简三栏布局，并针对移动端进行沉浸式适配。

**Architecture:** 使用 CSS Grid 重新划分 `WallPage.vue`，实现自适应断点（1024px, 768px）。重构 `PostCard.vue` 为扁平化、无重阴影的左右结构。根据 `web-animation-design` 添加动效规范。

**Tech Stack:** Vue 3, Vite, Vanilla CSS

---

### Task 1: 重构 WallPage 全局三栏布局

**Files:**
- Modify: `src/pages/WallPage.vue`

- [ ] **Step 1: 调整全局 Grid 布局样式**
修改 `WallPage.vue` 底部的 `<style scoped>`，重写 `.wall-grid` 的逻辑：
```css
.wall-grid {
  display: grid;
  grid-template-columns: 250px minmax(auto, 600px) 300px;
  gap: 20px;
  justify-content: center;
  align-items: start;
}
@media (max-width: 1024px) {
  .wall-grid { grid-template-columns: 80px minmax(auto, 600px); }
  .sidebar-right { display: none; }
}
@media (max-width: 768px) {
  .wall-grid { grid-template-columns: 1fr; gap: 0; }
  .sidebar-left { display: none; }
  .feed { width: 100%; border: none; }
}
```

- [ ] **Step 2: 移除 Feed 流默认背景与边框**
在 `WallPage.vue` 中，确保 `.feed` 没有生硬的外边框，只保留底部或帖子之间的 1px 分割线：
```css
.feed {
  background: transparent;
  border-left: 1px solid var(--color-border-light);
  border-right: 1px solid var(--color-border-light);
  min-height: 100vh;
}
.post-list { gap: 0; } /* 消除间距，依赖边框分割 */
```

- [ ] **Step 3: 运行并验证布局效果**
确保本地服务 `npm run dev` 运行中，浏览器打开 `http://localhost:5173/wall` 确认布局已变成居中的主信息流。

- [ ] **Step 4: Commit**
```bash
git add src/pages/WallPage.vue
git commit -m "style: refactor WallPage to a 3-column centralized layout"
```

---

### Task 2: 重构 PostCard 左右排版与动效

**Files:**
- Modify: `src/components/PostCard.vue`

- [ ] **Step 1: 修改 PostCard HTML 结构为左右布局**
```vue
<template>
  <article class="post-card">
    <div class="post-avatar-container">
      <img :src="post.authorAvatar" class="avatar" :alt="post.authorName" />
    </div>
    <div class="post-content-container">
      <div class="post-header">
        <span class="author-name">{{ post.authorName }}</span>
        <span class="post-time">{{ formatTime(post.createTime) }}</span>
      </div>
      <p class="post-text">{{ post.content }}</p>
      <!-- Media grid here -->
      <div class="post-actions">
        <!-- Interaction buttons -->
      </div>
    </div>
  </article>
</template>
```

- [ ] **Step 2: 注入扁平化与 web-animation-design 动效 CSS**
```css
.post-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--color-surface-solid);
  border-bottom: 1px solid var(--color-border-light);
  border-radius: 0;
  box-shadow: none;
  transition: background-color 150ms ease;
}
.post-card:hover {
  background-color: var(--color-surface-alt);
  transform: none; /* 取消之前的整体上浮 */
}
.post-avatar-container {
  flex-shrink: 0;
}
.post-content-container {
  flex: 1;
  min-width: 0;
}
/* 图片悬浮放大效 (web-animation-design 规范) */
.post-image:hover {
  transform: scale(1.02);
  transition: transform 200ms cubic-bezier(0.165, 0.84, 0.44, 1); /* ease-out-quart */
}
```

- [ ] **Step 3: 运行并验证卡片**
在浏览器中查看 `http://localhost:5173/wall`，确保帖子从“上下结构”变为了紧凑的“左右结构”，鼠标悬停有底色变化，图片悬浮有轻微放大。

- [ ] **Step 4: Commit**
```bash
git add src/components/PostCard.vue
git commit -m "style: redesign PostCard to horizontal layout with ease-out animations"
```

---

### Task 3: 侧边栏“发布”大按钮与响应式导航清理

**Files:**
- Modify: `src/pages/WallPage.vue`

- [ ] **Step 1: 在 WallPage 左侧栏增加全局发布按钮**
将原来的 `.composer-card` 发起帖样式移除，替换为一个抢眼的全局按钮：
```vue
<aside class="sidebar-left">
  <div class="nav-card">
    <router-link to="/wall" class="side-nav-item side-nav-item--active">...</router-link>
    <!-- 其他导航项 -->
  </div>
  <button class="btn btn-primary btn-publish" @click="goCreate">发布</button>
</aside>
```
```css
.btn-publish {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 700;
  border-radius: var(--radius-full);
  margin-top: 16px;
  box-shadow: var(--shadow-sm);
}
@media (max-width: 1024px) {
  .btn-publish {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 50%;
    /* 将文字变为空，或者换成 + 号图标 */
  }
}
```

- [ ] **Step 2: 验证侧边栏**
确保缩放屏幕到平板尺寸（1024px以下）时，发布按钮会变成圆形的“+”号按钮（或者是缩小的按钮）。

- [ ] **Step 3: Commit**
```bash
git add src/pages/WallPage.vue
git commit -m "feat: add global publish button to left sidebar"
```
