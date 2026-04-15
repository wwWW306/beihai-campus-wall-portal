<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <div class="admin-header">
        <h1 class="admin-title">帖子管理</h1>
        <div class="header-actions">
          <button class="btn btn-secondary" @click="exportData">
            <Icons name="link" :size="15" /> 导出数据
          </button>
        </div>
      </div>

      <!-- 搜索筛选 -->
      <div class="filter-bar">
        <div class="search-wrapper">
          <Icons name="search" :size="16" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--color-text-muted)" />
          <input v-model="search" class="input" style="padding-left:36px" placeholder="搜索帖子内容或用户名..." />
        </div>
        <select v-model="filterStatus" class="input" style="width:auto;min-width:120px">
          <option value="">全部状态</option>
          <option value="normal">正常</option>
          <option value="hidden">已隐藏</option>
          <option value="reported">被举报</option>
        </select>
        <select v-model="filterPartition" class="input" style="width:auto;min-width:120px">
          <option value="">全部分区</option>
          <option v-for="p in partitions" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>

      <!-- 表格 -->
      <div class="card table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>内容预览</th>
              <th>作者</th>
              <th>分区</th>
              <th>点赞</th>
              <th>评论</th>
              <th>发布时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in filteredPosts" :key="p.id" class="table-row">
              <td class="col-content">
                <p class="content-preview">{{ p.content }}</p>
                <span v-if="p.images" class="img-indicator">🖼️ {{ p.images }}图</span>
              </td>
              <td>
                <div class="user-cell">
                  <img :src="p.authorAvatar" class="avatar avatar-sm" :alt="p.authorName" />
                  <span>{{ p.authorName }}</span>
                </div>
              </td>
              <td><span class="tag tag-blue">{{ p.partition }}</span></td>
              <td>{{ p.likeCount }}</td>
              <td>{{ p.commentCount }}</td>
              <td class="td-time">{{ formatTime(p.createTime) }}</td>
              <td>
                <span class="status-badge" :class="`status-${p.status}`">{{ statusLabel(p.status) }}</span>
              </td>
              <td>
                <div class="action-btns">
                  <button v-if="p.status === 'normal'" class="btn btn-ghost btn-xs" @click="hidePost(p)">隐藏</button>
                  <button v-if="p.status === 'hidden'" class="btn btn-ghost btn-xs" @click="showPost(p)">恢复</button>
                  <button class="btn btn-ghost btn-xs" style="color:var(--color-danger)" @click="deletePost(p)">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 分页 -->
        <div class="pagination">
          <button class="btn btn-secondary btn-sm" :disabled="page === 1" @click="page--">上一页</button>
          <span class="page-info">第 {{ page }} / {{ totalPages }} 页</span>
          <button class="btn btn-secondary btn-sm" :disabled="page === totalPages" @click="page++">下一页</button>
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
const filterStatus = ref('')
const filterPartition = ref('')
const page = ref(1)
const totalPages = 5

const partitions = ['校园生活', '学习交流', '二手交易', '美食探店', '情感树洞', '实习校招']

const posts = ref([
  { id: 1, content: '图书馆终于开了空调，期末复习的同学们冲啊！📚', authorName: '小明同学', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', partition: '校园生活', likeCount: 342, commentCount: 56, images: 0, createTime: Date.now() - 1800000, status: 'normal' },
  { id: 2, content: '便宜出二手笔记本，联想ThinkPad，有意者私信', authorName: '二手贩子', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Seller', partition: '二手交易', likeCount: 12, commentCount: 8, images: 2, createTime: Date.now() - 3600000, status: 'hidden' },
  { id: 3, content: '食堂新出的红烧肉拌饭绝了！窗口在二楼第三个档口', authorName: '美食侦探', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie', partition: '美食探店', likeCount: 567, commentCount: 89, images: 3, createTime: Date.now() - 7200000, status: 'normal' },
  { id: 4, content: 'XXX是个大骗子！大家小心！', authorName: '匿名用户', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anon', partition: '情感树洞', likeCount: 3, commentCount: 0, images: 0, createTime: Date.now() - 10800000, status: 'reported' },
  { id: 5, content: '求一台二手笔记本，预算2000以内', authorName: '码农预备役', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Code', partition: '二手交易', likeCount: 23, commentCount: 8, images: 0, createTime: Date.now() - 14400000, status: 'normal' },
])

const filteredPosts = computed(() => posts.value)

function statusLabel(s) {
  return { normal: '正常', hidden: '已隐藏', reported: '被举报' }[s] || s
}
function formatTime(ts) {
  return new Date(ts).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
function hidePost(p) { p.status = 'hidden' }
function showPost(p) { p.status = 'normal' }
function deletePost(p) { posts.value = posts.value.filter(x => x.id !== p.id) }
function exportData() {}
</script>

<style scoped>
.admin-layout { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; background: var(--color-bg); }
.admin-main { padding: 24px 28px; }
.admin-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.admin-title { font-size: 22px; font-weight: 700; color: var(--color-text); }
.header-actions { display: flex; gap: 8px; }

.filter-bar { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
.search-wrapper { position: relative; flex: 1; min-width: 200px; }

.table-card { overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th {
  padding: 10px 12px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border-light);
}
.table-row td { padding: 12px; border-bottom: 1px solid var(--color-border-light); font-size: 13px; color: var(--color-text); vertical-align: middle; }
.table-row:last-child td { border-bottom: none; }
.table-row:hover { background: var(--color-bg); }
.col-content { max-width: 280px; }
.content-preview { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 260px; font-size: 13px; }
.img-indicator { font-size: 11px; color: var(--color-text-muted); }
.user-cell { display: flex; align-items: center; gap: 8px; }
.td-time { color: var(--color-text-muted); font-size: 12px; }
.status-badge { padding: 2px 8px; border-radius: var(--radius-full); font-size: 11px; font-weight: 500; }
.status-normal { background: #f0fdf4; color: #16a34a; }
.status-hidden { background: #fef3c7; color: #d97706; }
.status-reported { background: #fef2f2; color: #dc2626; }
.action-btns { display: flex; gap: 4px; }
.btn-xs { padding: 3px 8px; font-size: 12px; }

.pagination { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 14px; border-top: 1px solid var(--color-border-light); }
.page-info { font-size: 13px; color: var(--color-text-secondary); }

@media (max-width: 768px) {
  .admin-layout { grid-template-columns: 1fr; }
  .admin-sidebar { display: none; }
  .data-table { font-size: 12px; }
}
</style>
