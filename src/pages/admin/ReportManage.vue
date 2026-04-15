<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <div class="admin-header">
        <h1 class="admin-title">举报中心</h1>
        <div class="report-summary">
          <span class="summary-item warning">待处理 <strong>5</strong></span>
          <span class="summary-item danger">今日新增 <strong>12</strong></span>
        </div>
      </div>

      <!-- 筛选 -->
      <div class="filter-bar">
        <div class="filter-tabs">
          <button v-for="t in statusTabs" :key="t.key" class="filter-tab" :class="{ 'filter-tab--active': activeStatus === t.key }" @click="activeStatus = t.key">
            {{ t.label }}
            <span v-if="t.count" class="tab-count" :class="`count-${t.key}`">{{ t.count }}</span>
          </button>
        </div>
      </div>

      <!-- 举报列表 -->
      <div class="report-list">
        <div v-for="r in filteredReports" :key="r.id" class="report-card card">
          <div class="report-header">
            <div class="report-type">
              <span class="type-badge" :class="`type-${r.type}`">{{ typeLabel(r.type) }}</span>
              <span class="report-id">#{{ r.id }}</span>
            </div>
            <span class="report-time">{{ formatTime(r.createTime) }}</span>
          </div>

          <div class="report-content">
            <div class="reported-post">
              <div class="post-meta">
                <img :src="r.targetAuthorAvatar" class="avatar avatar-sm" :alt="r.targetAuthorName" />
                <span class="author-name">{{ r.targetAuthorName }}</span>
              </div>
              <p class="post-content">{{ r.targetContent }}</p>
            </div>

            <div class="report-reason">
              <div class="reason-header">
                <Icons name="flag" :size="14" />
                <span>举报原因：{{ r.reason }}</span>
              </div>
              <p class="report-desc">{{ r.description }}</p>
              <div class="reporter-info">
                举报人：{{ r.reporterName }} · {{ r.reporterCount }}人同样举报
              </div>
            </div>
          </div>

          <div class="report-actions">
            <button class="btn btn-danger btn-sm" @click="handleReport(r, 'delete')">
              <Icons name="trash" :size="14" /> 删除内容
            </button>
            <button class="btn btn-secondary btn-sm" @click="handleReport(r, 'warn')">
              <Icons name="exclamation" :size="14" /> 警告用户
            </button>
            <button class="btn btn-ghost btn-sm" @click="handleReport(r, 'dismiss')">
              <Icons name="check" :size="14" /> 忽略
            </button>
          </div>
        </div>

        <div v-if="filteredReports.length === 0" class="empty-state">
          <Icons name="check" :size="40" />
          <p>暂无待处理的举报</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icons from '../../components/Icons.vue'
import AdminSidebar from './AdminSidebar.vue'

const activeStatus = ref('pending')

const statusTabs = [
  { key: 'pending', label: '待处理', count: 5 },
  { key: 'resolved', label: '已处理', count: null },
  { key: 'dismissed', label: '已忽略', count: null },
]

const reports = ref([
  {
    id: 1001, type: 'spam', reason: '垃圾广告', description: '该用户在二手交易区发布大量重复广告内容，严重影响社区秩序。',
    targetAuthorName: '二手贩子', targetAuthorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Seller',
    targetContent: '便宜出二手笔记本，联想ThinkPad，有意者私信，大量现货，支持当面交易...',
    reporterName: '热心同学', reporterCount: 12, createTime: Date.now() - 1800000, status: 'pending'
  },
  {
    id: 1002, type: 'defamation', reason: '人身攻击', description: '该用户在评论区对他人进行辱骂和人身攻击。',
    targetAuthorName: '匿名用户', targetAuthorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anon',
    targetContent: 'XXX是个大骗子！大家小心！',
    reporterName: '受害者', reporterCount: 3, createTime: Date.now() - 3600000, status: 'pending'
  },
  {
    id: 1003, type: 'falseinfo', reason: '不实信息', description: '该帖子传播未经证实的谣言。',
    targetAuthorName: '路人甲', targetAuthorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rand',
    targetContent: '震惊！学校下周要封校了！',
    reporterName: '辅导员', reporterCount: 28, createTime: Date.now() - 7200000, status: 'pending'
  },
  {
    id: 1004, type: 'harassment', reason: '骚扰他人', description: '私信骚扰，已有多人举报。',
    targetAuthorName: '骚扰者', targetAuthorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bad',
    targetContent: '在情感树洞帖子下大量私信骚扰发帖人。',
    reporterName: '多名女生', reporterCount: 7, createTime: Date.now() - 10800000, status: 'pending'
  },
])

const filteredReports = computed(() =>
  reports.value.filter(r => activeStatus.value === 'all' || r.status === activeStatus.value)
)

function typeLabel(t) {
  return { spam: '垃圾广告', defamation: '人身攻击', falseinfo: '不实信息', harassment: '骚扰他人', other: '其他' }[t] || t
}

function formatTime(ts) {
  return new Date(ts).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function handleReport(r, action) {
  if (action === 'dismiss') r.status = 'dismissed'
  else {
    reports.value = reports.value.filter(x => x.id !== r.id)
  }
}
</script>

<style scoped>
.admin-layout { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; background: var(--color-bg); }
.admin-main { padding: 24px 28px; }
.admin-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.admin-title { font-size: 22px; font-weight: 700; color: var(--color-text); }
.report-summary { display: flex; gap: 16px; }
.summary-item { font-size: 13px; color: var(--color-text-secondary); }
.summary-item strong { font-size: 16px; font-weight: 700; color: var(--color-text); margin-left: 4px; }

.filter-bar { margin-bottom: 16px; }
.filter-tabs { display: flex; gap: 4px; background: var(--color-surface); border-radius: var(--radius-lg); box-shadow: var(--shadow-card); border: 1px solid var(--color-border-light); padding: 4px; display: inline-flex; }
.filter-tab { display: flex; align-items: center; gap: 6px; padding: 7px 16px; border-radius: var(--radius-md); font-size: 13px; font-weight: 500; color: var(--color-text-secondary); background: transparent; border: none; cursor: pointer; transition: all 120ms ease; }
.filter-tab:hover { color: var(--color-text); }
.filter-tab--active { background: var(--color-primary); color: white; }
.tab-count { font-size: 11px; font-weight: 700; padding: 1px 6px; border-radius: 9999px; }
.count-pending { background: rgba(255,255,255,0.25); color: white; }

.report-list { display: flex; flex-direction: column; gap: 12px; }
.report-card { padding: 16px; }
.report-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.report-type { display: flex; align-items: center; gap: 8px; }
.type-badge { padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 500; }
.type-spam { background: #fff7ed; color: #c2410c; }
.type-defamation { background: #fef2f2; color: #dc2626; }
.type-falseinfo { background: #fffbeb; color: #d97706; }
.type-harassment { background: #fdf4ff; color: #7e22ce; }
.report-id { font-size: 12px; color: var(--color-text-muted); }
.report-time { font-size: 12px; color: var(--color-text-muted); }

.report-content { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }
.reported-post { background: var(--color-bg); border-radius: var(--radius-md); padding: 12px; }
.post-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.author-name { font-size: 13px; font-weight: 600; color: var(--color-text); }
.post-content { font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; }
.report-reason { padding: 12px; background: #fef2f2; border-radius: var(--radius-md); border-left: 3px solid #dc2626; }
.reason-header { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #dc2626; margin-bottom: 4px; }
.report-desc { font-size: 13px; color: var(--color-text); line-height: 1.5; }
.reporter-info { font-size: 11px; color: var(--color-text-muted); margin-top: 6px; }

.report-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.btn-sm { padding: 6px 12px; font-size: 13px; }

@media (max-width: 768px) { .admin-layout { grid-template-columns: 1fr; } .admin-sidebar { display: none; } }
</style>
