<template>
  <div class="login-page" data-page="app">
    <div class="login-card card">
      <!-- Logo -->
      <div class="login-logo">
        <div class="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
            <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="logo-text">Campus Wall</span>
      </div>

      <h1 class="login-title">欢迎回来</h1>
      <p class="login-subtitle">登录以管理你的社区</p>

      <!-- 表单 -->
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label class="form-label">用户名</label>
          <input v-model="form.username" type="text" class="input" placeholder="输入用户名" required />
        </div>
        <div class="form-group">
          <label class="form-label">密码</label>
          <div class="password-wrapper">
            <input
              v-model="form.password"
              :type="showPwd ? 'text' : 'password'"
              class="input"
              placeholder="输入密码"
              required
            />
            <button type="button" class="pwd-toggle" @click="showPwd = !showPwd">
              <Icons :name="showPwd ? 'eye-off' : 'eye'" :size="16" />
            </button>
          </div>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="form.remember" />
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-link">忘记密码？</a>
        </div>

        <button type="submit" class="btn btn-primary login-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <div v-if="error" class="error-msg">
          <Icons name="exclamation" :size="14" />
          {{ error }}
        </div>
      </form>

      <div class="login-footer">
        <span>还没有账号？</span>
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Icons from '../../components/Icons.vue'

const router = useRouter()
const form = ref({ username: '', password: '', remember: false })
const showPwd = ref(false)
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  await new Promise(r => setTimeout(r, 1000))
  // 演示用，直接登录成功
  if (form.value.username && form.value.password) {
    router.push('/admin/dashboard')
  } else {
    error.value = '用户名或密码错误'
  }
  loading.value = false
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--color-bg);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 36px 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.login-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  justify-content: center;
}
.logo-icon {
  width: 36px;
  height: 36px;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-icon svg path {
  fill: var(--color-bg) !important;
  stroke: var(--color-bg) !important;
}
.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  font-family: 'Bebas Neue', sans-serif;
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 4px;
}
.login-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: 28px;
}

.login-form { display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 13px; font-weight: 500; color: var(--color-text); }
.password-wrapper { position: relative; }
.pwd-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  display: flex;
  padding: 4px;
}
.pwd-toggle:hover { color: var(--color-text); }

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-text-secondary);
  cursor: pointer;
}
.forgot-link {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-decoration: none;
}
.forgot-link:hover { text-decoration: underline; color: var(--color-text); }

.login-btn { width: 100%; padding: 11px; font-size: 15px; margin-top: 4px; }

.error-msg {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  background: var(--color-danger-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--color-text);
}

.login-footer {
  text-align: center;
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-top: 20px;
}
.login-footer a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}
.login-footer a:hover { text-decoration: underline; }
</style>
