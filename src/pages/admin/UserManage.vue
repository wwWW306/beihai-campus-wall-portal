<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <div class="admin-header">
        <h1 class="admin-title">用户管理</h1>
      </div>

      <div class="filter-bar">
        <div class="search-wrapper">
          <Icons name="search" :size="16" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--color-text-muted)" />
          <input v-model="search" class="input" style="padding-left:36px" placeholder="搜索用户名或ID..." />
        </div>
        <select v-model="filterRole" class="input" style="width:auto;min-width:120px">
          <option value="">全部角色</option>
          <option value="student">学生</option>
          <option value="verified">已认证</option>
          <option value="admin">管理员</option>
        </select>
      </div>

      <div class="card table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>用户</th>
              <th>学校</th>
              <th>角色</th>
              <th>粉丝</th>
              <th>发帖数</th>
              <th>注册时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filteredUsers" :key="u.id" class="table-row">
              <td>
                <div class="user-cell">
                  <img :src="u.avatar" class="avatar avatar-sm" :alt="u.name" />
                  <div>
                    <div class="user-name-cell">{{ u.name }}</div>
                    <div class="user-id">ID: {{ u.id }}</div>
                  </div>
                </div>
              </td>
              <td>{{ u.school }}</td>
              <td>
                <span class="role-badge" :class="`role-${u.role}`">{{ roleLabel(u.role) }}</span>
              </td>
              <td>{{ u.followerCount }}</td>
              <td>{{ u.postCount }}</td>
              <td class="td-time">{{ u.regTime }}</td>
              <td>
                <span class="status-dot" :class="u.status === 'active' ? 'dot-green' : 'dot-red'"></span>
                {{ u.status === 'active' ? '正常' : '禁用' }}
              </td>
              <td>
                <div class="action-btns">
                  <button class="btn btn-ghost btn-xs">查看</button>
                  <button v-if="u.status === 'active'" class="btn btn-ghost btn-xs" style="color:var(--color-danger)" @click="u.status = 'banned'">禁用</button>
                  <button v-else class="btn btn-ghost btn-xs" style="color:var(--color-success)" @click="u.status = 'active'">解禁</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button class="btn btn-secondary btn-sm" disabled>上一页</button>
          <span class="page-info">第 1 / 5 页</span>
          <button class="btn btn-secondary btn-sm">下一页</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icons from '../../components/Icons.vue'
import AdminSidebar from './AdminSidebar.vue'

const search = ref('')
const filterRole = ref('')

const users = ref([
  { id: 1001, name: '小明同学', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', school: '清华大学', role: 'verified', followerCount: 342, postCount: 56, regTime: '2026-01-15', status: 'active' },
  { id: 1002, name: '二手贩子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Seller', school: '北京大学', role: 'student', followerCount: 12, postCount: 89, regTime: '2026-02-20', status: 'banned' },
  { id: 1003, name: '美食侦探', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie', school: '复旦大学', role: 'verified', followerCount: 1205, postCount: 234, regTime: '2025-11-05', status: 'active' },
  { id: 1004, name: '表白墙菌', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Confess', school: '浙江大学', role: 'verified', followerCount: 2341, postCount: 567, regTime: '2025-09-01', status: 'active' },
  { id: 1005, name: '匿名用户', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anon', school: '未知', role: 'student', followerCount: 3, postCount: 1, regTime: '2026-04-10', status: 'active' },
])

const filteredUsers = computed(() => users.value)

function roleLabel(r) {
  return { student: '学生', verified: '已认证', admin: '管理员' }[r] || r
}
</script>

<style scoped>
.admin-layout { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; background: var(--color-bg); }
.admin-main { padding: 24px 28px; }
.admin-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.admin-title { font-size: 22px; font-weight: 700; color: var(--color-text); }
.filter-bar { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
.search-wrapper { position: relative; flex: 1; min-width: 200px; }
.table-card { overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: var(--color-text-muted); background: var(--color-bg); border-bottom: 1px solid var(--color-border-light); }
.table-row td { padding: 12px; border-bottom: 1px solid var(--color-border-light); font-size: 13px; color: var(--color-text); vertical-align: middle; }
.table-row:last-child td { border-bottom: none; }
.table-row:hover { background: var(--color-bg); }
.user-cell { display: flex; align-items: center; gap: 10px; }
.user-name-cell { font-weight: 600; font-size: 13px; }
.user-id { font-size: 11px; color: var(--color-text-muted); }
.role-badge { padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 500; }
.role-student { background: var(--color-bg); color: var(--color-text-secondary); border: 1px solid var(--color-border); }
.role-verified { background: var(--color-accent-light); color: var(--color-accent); }
.role-admin { background: #fef3c7; color: #d97706; }
.td-time { color: var(--color-text-muted); font-size: 12px; }
.status-dot { display: inline-block; width: 7px; height: 7px; border-radius: 9999px; margin-right: 5px; }
.dot-green { background: var(--color-success); }
.dot-red { background: var(--color-danger); }
.action-btns { display: flex; gap: 4px; }
.btn-xs { padding: 3px 8px; font-size: 12px; }
.pagination { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 14px; border-top: 1px solid var(--color-border-light); }
.page-info { font-size: 13px; color: var(--color-text-secondary); }
@media (max-width: 768px) { .admin-layout { grid-template-columns: 1fr; } .admin-sidebar { display: none; } }
</style>
