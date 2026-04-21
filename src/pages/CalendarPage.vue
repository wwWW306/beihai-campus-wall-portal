<template>
  <div class="calendar-page">
    <div class="container">
      <div class="calendar-header">
        <button class="back-btn" @click="smartBack()"><Icons name="back" :size="20" /></button>
        <h1 class="page-heading">📅 校历</h1>
      </div>

      <!-- 倒计时卡片 -->
      <div class="countdown-cards">
        <div v-for="c in countdowns" :key="c.label" class="countdown-card" :style="{ '--cd-color': c.color }">
          <div class="cd-emoji">{{ c.emoji }}</div>
          <div class="cd-info">
            <span class="cd-label">{{ c.label }}</span>
            <span class="cd-hint">{{ c.hint }}</span>
          </div>
          <div class="cd-days">
            <span class="cd-num">{{ c.days }}</span>
            <span class="cd-unit">天</span>
          </div>
        </div>
      </div>

      <!-- 月历 -->
      <div class="month-nav">
        <button class="month-btn" @click="prevMonth"><Icons name="chevron-left" :size="18" /></button>
        <h2 class="month-title">{{ currentYear }}年{{ currentMonth }}月</h2>
        <button class="month-btn" @click="nextMonth"><Icons name="chevron-right" :size="18" /></button>
      </div>

      <div class="calendar-grid">
        <div class="weekday-header">
          <span v-for="d in weekdays" :key="d">{{ d }}</span>
        </div>
        <div class="days-grid">
          <div v-for="(day, idx) in calendarDays" :key="idx"
            class="day-cell"
            :class="{
              'day-cell--other': day.otherMonth,
              'day-cell--today': day.isToday,
              'day-cell--event': day.event
            }"
            @click="day.event && (selectedEvent = day.event)"
          >
            <span class="day-num">{{ day.date }}</span>
            <span v-if="day.event" class="day-dot" :style="{ background: day.event.color }"></span>
          </div>
        </div>
      </div>

      <!-- 事件列表 -->
      <div class="events-section">
        <h3 class="events-title">📌 本月大事记</h3>
        <div v-if="monthEvents.length === 0" class="empty-hint">这个月很安静，好好享受吧 🌿</div>
        <div v-for="e in monthEvents" :key="e.date" class="event-item" :style="{ '--ev-color': e.color }">
          <div class="event-dot"></div>
          <div class="event-info">
            <span class="event-name">{{ e.name }}</span>
            <span class="event-date">{{ e.dateLabel }}</span>
          </div>
          <span class="event-tag">{{ e.tag }}</span>
        </div>
      </div>

      <!-- 选中事件弹窗 -->
      <div v-if="selectedEvent" class="event-modal-overlay" @click="selectedEvent = null">
        <div class="event-modal" @click.stop>
          <div class="modal-emoji">{{ selectedEvent.emoji || '📌' }}</div>
          <h3>{{ selectedEvent.name }}</h3>
          <p class="modal-date">{{ selectedEvent.dateLabel }}</p>
          <p class="modal-hint">{{ selectedEvent.hint }}</p>
          <button class="btn btn-primary btn-sm" @click="selectedEvent = null">知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { smartBack } from '../router'
import Icons from '../components/Icons.vue'

const now = new Date()
const currentYear = ref(now.getFullYear())
const currentMonth = ref(now.getMonth() + 1)
const selectedEvent = ref(null)
const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const allEvents = [
  { month: 2, date: 17, name: '春季学期开学', tag: '开学', color: '#2d7a4a', emoji: '🎒', hint: '新学期新气象，冲冲冲！', dateLabel: '2月17日' },
  { month: 3, date: 8, name: '妇女节', tag: '节日', color: '#ec4899', emoji: '🌷', hint: '祝所有女同学节日快乐！', dateLabel: '3月8日' },
  { month: 4, date: 14, name: '期中考试周', tag: '考试', color: '#ef4444', emoji: '📝', hint: '加油！你已经很棒了 💪', dateLabel: '4月14日-18日' },
  { month: 5, date: 1, name: '五一假期', tag: '放假', color: '#22c55e', emoji: '🎉', hint: '五天假期！好好休息～', dateLabel: '5月1日-5日' },
  { month: 5, date: 4, name: '青年节', tag: '节日', color: '#3b82f6', emoji: '🌟', hint: '年轻就是资本，尽情绽放吧！', dateLabel: '5月4日' },
  { month: 6, date: 16, name: '期末考试周', tag: '考试', color: '#ef4444', emoji: '🔥', hint: '最后冲刺！熬过去就是暑假！', dateLabel: '6月16日-27日' },
  { month: 6, date: 28, name: '毕业典礼', tag: '活动', color: '#8b5cf6', emoji: '🎓', hint: '前程似锦，不负韶华', dateLabel: '6月28日' },
  { month: 7, date: 5, name: '暑假开始', tag: '放假', color: '#22c55e', emoji: '🏖️', hint: '漫长的假期来啦！享受吧～', dateLabel: '7月5日' },
  { month: 9, date: 1, name: '秋季学期开学', tag: '开学', color: '#2d7a4a', emoji: '🍂', hint: '又回到熟悉的校园了', dateLabel: '9月1日' },
  { month: 10, date: 1, name: '国庆假期', tag: '放假', color: '#22c55e', emoji: '🇨🇳', hint: '七天长假！', dateLabel: '10月1日-7日' },
  { month: 12, date: 15, name: '期末考试周', tag: '考试', color: '#ef4444', emoji: '📚', hint: '又到了检验自己的时候了', dateLabel: '12月15日-26日' },
  { month: 1, date: 10, name: '寒假开始', tag: '放假', color: '#22c55e', emoji: '❄️', hint: '回家过年咯！', dateLabel: '1月10日' },
]

const countdowns = computed(() => {
  const today = new Date()
  return allEvents
    .map(e => {
      let eventDate = new Date(today.getFullYear(), e.month - 1, e.date)
      if (eventDate < today) eventDate = new Date(today.getFullYear() + 1, e.month - 1, e.date)
      const days = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))
      return { ...e, days, label: e.name, color: e.color }
    })
    .filter(e => e.days > 0 && e.days <= 90)
    .sort((a, b) => a.days - b.days)
    .slice(0, 3)
})

const monthEvents = computed(() => allEvents.filter(e => e.month === currentMonth.value))

const calendarDays = computed(() => {
  const y = currentYear.value, m = currentMonth.value - 1
  const firstDay = new Date(y, m, 1).getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const daysInPrev = new Date(y, m, 0).getDate()
  const today = new Date()
  const days = []

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ date: daysInPrev - i, otherMonth: true })
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const event = allEvents.find(e => e.month === currentMonth.value && e.date === i)
    const isToday = today.getFullYear() === y && today.getMonth() === m && today.getDate() === i
    days.push({ date: i, isToday, event })
  }
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: i, otherMonth: true })
  }
  return days
})

function prevMonth() {
  if (currentMonth.value === 1) { currentMonth.value = 12; currentYear.value-- }
  else currentMonth.value--
}
function nextMonth() {
  if (currentMonth.value === 12) { currentMonth.value = 1; currentYear.value++ }
  else currentMonth.value++
}
</script>

<style scoped>
.calendar-page { min-height: 100vh; padding: 16px 0 40px; }
.calendar-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.back-btn { width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-surface); border: 1px solid var(--color-border); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text); transition: all var(--transition-fast); }
.back-btn:hover { background: var(--color-surface-alt); }
.page-heading { font-size: 22px; font-weight: 700; color: var(--color-text); }

/* 倒计时卡片 */
.countdown-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 24px; }
.countdown-card { display: flex; align-items: center; gap: 12px; padding: 16px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); border-left: 4px solid var(--cd-color); }
.cd-emoji { font-size: 28px; }
.cd-info { flex: 1; min-width: 0; }
.cd-label { display: block; font-size: 14px; font-weight: 600; color: var(--color-text); }
.cd-hint { display: block; font-size: 12px; color: var(--color-text-muted); margin-top: 2px; }
.cd-days { text-align: center; }
.cd-num { display: block; font-size: 28px; font-weight: 800; color: var(--cd-color); line-height: 1; }
.cd-unit { font-size: 12px; color: var(--color-text-muted); }

/* 月历 */
.month-nav { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 16px; }
.month-title { font-size: 18px; font-weight: 700; color: var(--color-text); min-width: 140px; text-align: center; }
.month-btn { width: 32px; height: 32px; border-radius: var(--radius-full); background: var(--color-surface); border: 1px solid var(--color-border); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text); transition: all var(--transition-fast); }
.month-btn:hover { background: var(--color-surface-alt); }

.calendar-grid { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 24px; }
.weekday-header { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; padding: 10px 0; font-size: 13px; font-weight: 600; color: var(--color-text-muted); border-bottom: 1px solid var(--color-border-light); }
.days-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.day-cell { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 4px; min-height: 48px; cursor: default; transition: background var(--transition-fast); }
.day-cell:hover { background: var(--color-surface-alt); }
.day-cell--other .day-num { color: var(--color-text-muted); opacity: 0.4; }
.day-cell--today .day-num { background: var(--color-primary); color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.day-cell--event { cursor: pointer; }
.day-num { font-size: 14px; font-weight: 500; color: var(--color-text); }
.day-dot { width: 5px; height: 5px; border-radius: 50%; margin-top: 3px; }

/* 事件列表 */
.events-section { max-width: 640px; }
.events-title { font-size: 16px; font-weight: 700; color: var(--color-text); margin-bottom: 12px; }
.empty-hint { padding: 20px; text-align: center; color: var(--color-text-muted); font-size: 14px; }
.event-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); margin-bottom: 8px; }
.event-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--ev-color); flex-shrink: 0; }
.event-info { flex: 1; }
.event-name { display: block; font-size: 14px; font-weight: 600; color: var(--color-text); }
.event-date { display: block; font-size: 12px; color: var(--color-text-muted); margin-top: 2px; }
.event-tag { padding: 3px 8px; border-radius: var(--radius-full); font-size: 11px; font-weight: 600; background: var(--color-surface-alt); color: var(--color-text-secondary); border: 1px solid var(--color-border); }

/* 弹窗 */
.event-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 200; }
.event-modal { background: var(--color-surface); border-radius: var(--radius-xl); padding: 32px; text-align: center; max-width: 320px; width: 90%; }
.modal-emoji { font-size: 48px; margin-bottom: 12px; }
.event-modal h3 { font-size: 18px; font-weight: 700; color: var(--color-text); margin-bottom: 6px; }
.modal-date { font-size: 13px; color: var(--color-text-muted); margin-bottom: 8px; }
.modal-hint { font-size: 14px; color: var(--color-text-secondary); margin-bottom: 16px; line-height: 1.5; }

@media (max-width: 768px) { .countdown-cards { grid-template-columns: 1fr; } }
</style>
