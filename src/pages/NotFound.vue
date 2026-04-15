<template>
  <div class="layout">
    <nav class="navbar">
      <div class="navbar-content">
        <router-link to="/" class="logo">校园墙</router-link>
      </div>
    </nav>
    <main class="main-container">
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h2 style="margin-bottom: 0.5rem;">404</h2>
        <p>页面不存在</p>
        <router-link to="/">
          <button class="btn-primary" style="margin-top: 1rem;">返回首页</button>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
</script>
