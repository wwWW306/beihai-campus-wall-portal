<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <div class="admin-header">
        <h1 class="admin-title">数据概览</h1>
        <span class="admin-subtitle">实时统计 · {{ currentTime }}</span>
      </div>

      <!-- 统计卡片 -->
      <div class="stats-grid">
        <div v-for="s in stats" :key="s.label" class="stat-card card">
          <div class="stat-icon" :style="{ background: s.color + '15', color: s.color }">
            <Icons :name="s.icon" :size="20" />
          </div>
          <div class="stat-info">
            <div class="stat-num">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
          <div class="stat-trend" :class="s.trend > 0 ? 'up' : 'down'">
            {{ s.trend > 0 ? '+' : '' }}{{ s.trend }}%
          </div>
        </div>
      </div>

      <!-- 图表区 -->
      <div class="charts-grid">
        <div class="card chart-card">
          <div class="chart-header">
            <span class="chart-title">帖子发布趋势</span>
            <div class="chart-tabs">
              <button v-for="t in ['7天','30天']" :key="t" class="chart-tab" :class="{ 'chart-tab--active': t === '7天' }">{{ t }}</button>
            </div>
          </div>
          <div class="chart-placeholder">
            <div class="bar-chart">
              <div v-for="(h, idx) in barData" :key="idx" class="bar-item">
                <div class="bar" :style="{ height: h + '%' }"></div>
                <span class="bar-label">{{ barLabels[idx] }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card chart-card">
          <div class="chart-header">
            <span class="chart-title">活跃分区 TOP5</span>
          </div>
          <div class="partition-rank">
            <div v-for="(p, idx) in partitionRank" :key="p.name" class="rank-item">
              <span class="rank-num" :class="{ 'rank-num--top': idx < 3 }">{{ idx + 1 }}</span>
              <span class="rank-name">{{ p.name }}</span>
              <div class="rank-bar">
                <div class="rank-fill" :style="{ width: p.pct + '%', background: p.color }"></div>
              </div>
              <span class="rank-count">{{ p.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 最近操作 -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">最近操作日志</span>
        </div>
        <div class="log-list">
          <div v-for="log in logs" :key="log.id" class="log-item">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-action" :class="`log-action--${log.type}`">{{ log.action }}</span>
            <span class="log-detail">{{ log.detail }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icons from '../../components/Icons.vue'
import AdminSidebar from './AdminSidebar.vue'

const currentTime = new Date().toLocaleString('zh-CN', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })

const stats = ref([
  { label: '总用户数', value: '12,847', icon: 'users', color: '#3b82f6', trend: 12.5 },
  { label: '今日发帖', value: '342', icon: 'edit', color: '#f97316', trend: 8.2 },
  { label: '待审核举报', value: '5', icon: 'flag', color: '#ef4444', trend: -20 },
  { label: '活跃帖子', value: '58,392', icon: 'fire', color: '#10b981', trend: 5.1 },
])

const barData = [45, 62, 38, 75, 55, 68, 42]
const barLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const partitionRank = [
  { name: '校园生活', count: 2341, pct: 100, color: '#f97316' },
  { name: '学习交流', count: 1892, pct: 80, color: '#3b82f6' },
  { name: '情感树洞', count: 1203, pct: 51, color: '#8b5cf6' },
  { name: '二手交易', count: 876, pct: 37, color: '#10b981' },
  { name: '美食探店', count: 654, pct: 28, color: '#ef4444' },
]

const logs = ref([
  { id: 1, time: '14:32', type: 'delete', action: '删除帖子', detail: '用户「匿名」发布违规内容，已被删除' },
  { id: 2, time: '14:18', type: 'warn', action: '警告用户', detail: '用户「二手贩子」因频繁广告被警告' },
  { id: 3, time: '13:55', type: 'verify', action: '认证通过', detail: '用户「表白墙菌」学生认证已通过' },
  { id: 4, time: '12:40', type: 'delete', action: '删除帖子', detail: '用户「路飞」发布不实信息，已被删除' },
  { id: 5, time: '11:22', type: 'verify', action: '认证通过', detail: '用户「校园君」官方认证已通过' },
])
</script>

<style scoped>
.admin-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;
  background: var(--color-bg);
}

/* 主内容 */
.admin-main { padding: 24px 28px; }
.admin-header { margin-bottom: 24px; }
.admin-title { font-size: 22px; font-weight: 700; color: var(--color-text); }
.admin-subtitle { font-size: 13px; color: var(--color-text-muted); margin-top: 2px; }

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
}
.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-info { flex: 1; }
.stat-num { font-size: 24px; font-weight: 800; color: var(--color-text); line-height: 1; }
.stat-label { font-size: 12px; color: var(--color-text-muted); margin-top: 2px; }
.stat-trend { font-size: 12px; font-weight: 600; padding: 2px 7px; border-radius: var(--radius-full); }
.stat-trend.up { background: #dcfce7; color: #16a34a; }
.stat-trend.down { background: #fef2f2; color: #dc2626; }

/* 图表 */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}
.chart-card { padding: 16px; }
.chart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.chart-title { font-size: 14px; font-weight: 600; color: var(--color-text); }
.chart-tabs { display: flex; gap: 4px; }
.chart-tab {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
}
.chart-tab--active { background: var(--color-bg); color: var(--color-text); font-weight: 500; }
.chart-placeholder { height: 180px; }
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 100%;
  padding-top: 20px;
}
.bar-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; }
.bar {
  width: 100%;
  background: linear-gradient(to top, var(--color-primary), #fdba74);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  min-height: 8px;
  transition: height var(--transition-slow);
}
.bar-label { font-size: 11px; color: var(--color-text-muted); }

/* 分区排行 */
.partition-rank { display: flex; flex-direction: column; gap: 10px; }
.rank-item { display: flex; align-items: center; gap: 10px; }
.rank-num { width: 18px; font-size: 13px; font-weight: 700; color: var(--color-text-muted); text-align: center; }
.rank-num--top { color: var(--color-primary); }
.rank-name { width: 70px; font-size: 13px; font-weight: 500; color: var(--color-text); flex-shrink: 0; }
.rank-bar { flex: 1; height: 8px; background: var(--color-bg); border-radius: var(--radius-full); overflow: hidden; }
.rank-fill { height: 100%; border-radius: var(--radius-full); transition: width var(--transition-slow); }
.rank-count { width: 40px; font-size: 12px; color: var(--color-text-muted); text-align: right; }

/* 日志 */
.card-header { padding: 14px 16px 0; margin-bottom: 0; border-bottom: none; }
.card-title { font-size: 14px; font-weight: 600; color: var(--color-text); }
.log-list { padding: 8px 16px 16px; }
.log-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border-light);
  font-size: 13px;
}
.log-item:last-child { border-bottom: none; }
.log-time { font-size: 12px; color: var(--color-text-muted); width: 45px; flex-shrink: 0; }
.log-action {
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}
.log-action--delete { background: #fef2f2; color: #dc2626; }
.log-action--warn { background: #fffbeb; color: #d97706; }
.log-action--verify { background: #f0fdf4; color: #16a34a; }
.log-detail { color: var(--color-text-secondary); }

@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .charts-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .admin-layout { grid-template-columns: 1fr; }
  .admin-sidebar { display: none; }
}
</style>
