<template>
  <div class="calendar-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <Icons name="arrow-left" :size="24" />
      </button>
      <div class="header-titles">
        <h1>2025-2026 学年校历</h1>
        <p class="subtitle">北海艺术设计学院官方日程安排</p>
      </div>
    </div>

    <main class="calendar-content">
      <div class="semester-section">
        <h2 class="semester-title">秋季学期 <span>Autumn Semester</span></h2>
        <div class="timeline">
          <div v-for="(month, idx) in autumnSemester" :key="idx" class="timeline-month">
            <div class="month-marker">
              <span class="month-num">{{ month.month }}</span>
              <span class="month-en">{{ month.monthEn }}</span>
            </div>
            <div class="events-list">
              <div v-for="(event, eIdx) in month.events" :key="eIdx" class="event-card" :class="{ 'highlight': isHighlight(event.desc) }">
                <div class="event-date">{{ event.date }}</div>
                <div class="event-desc">{{ event.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="semester-section spring-section">
        <h2 class="semester-title">春季学期 <span>Spring Semester</span></h2>
        <div class="timeline">
          <div v-for="(month, idx) in springSemester" :key="idx" class="timeline-month">
            <div class="month-marker">
              <span class="month-num">{{ month.month }}</span>
              <span class="month-en">{{ month.monthEn }}</span>
            </div>
            <div class="events-list">
              <div v-for="(event, eIdx) in month.events" :key="eIdx" class="event-card" :class="{ 'highlight': isHighlight(event.desc) }">
                <div class="event-date">{{ event.date }}</div>
                <div class="event-desc">{{ event.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { smartBack } from '../router'
import Icons from '../components/Icons.vue'

const router = useRouter()

function goBack() {
  smartBack('/wall')
}

function isHighlight(desc) {
  const highlights = ['放假', '国庆', '中秋', '春节', '元旦', '端午', '劳动节', '三月三', '元宵', '运动会']
  return highlights.some(h => desc.includes(h))
}

const autumnSemester = [
  { month: '8月', monthEn: 'August', events: [{ date: '8月30日-31日', desc: '大二、大三学生报到' }] },
  { month: '9月', monthEn: 'September', events: [{ date: '9月1日', desc: '大二、大三开始上课' }, { date: '9月6日-7日', desc: '大一新生报到' }, { date: '9月8日', desc: '大一新生开始上课' }, { date: '9月20日-21日', desc: '全国计算机等级考试、公共课补考' }] },
  { month: '10月', monthEn: 'October', events: [{ date: '10月1日', desc: '国庆节' }, { date: '10月8日', desc: '中秋节' }, { date: '第7-11周', desc: '涠洲岛综合实践教学' }] },
  { month: '11月', monthEn: 'November', events: [{ date: '第9周', desc: '拟期中教学检查' }, { date: '11月15日-16日', desc: '普通话水平测试' }, { date: '11月22日-23日', desc: 'NACG 考试' }, { date: '11月24日-12月7日', desc: '2025级新生军训' }] },
  { month: '12月', monthEn: 'December', events: [{ date: '12月13日', desc: '大学英语四、六级考试' }, { date: '12月19日-20日', desc: '校运动会' }] },
  { month: '1月', monthEn: 'January', events: [{ date: '1月1日', desc: '元旦' }, { date: '1月28日-29日', desc: '期末考试' }, { date: '1月30日', desc: '放假' }] }
]

const springSemester = [
  { month: '2月', monthEn: 'February', events: [{ date: '2月16日', desc: '除夕' }, { date: '2月17日', desc: '春节' }, { date: '2月28日-3月1日', desc: '学生分批报到' }] },
  { month: '3月', monthEn: 'March', events: [{ date: '3月2日', desc: '开始上课' }, { date: '3月3日', desc: '元宵节、拟期初教学检查' }, { date: '3月28日-29日', desc: '全国计算机等级考试' }] },
  { month: '4月', monthEn: 'April', events: [{ date: '4月10日', desc: '沙滩运动会（最终时间视情况调整）' }, { date: '4月19日', desc: '广西三月三' }, { date: '4月25日-26日', desc: 'NACG 考试、期中教学检查' }] },
  { month: '5月', monthEn: 'May', events: [{ date: '5月1日', desc: '劳动节' }, { date: '5月16日-17日', desc: '普通话水平测试' }] },
  { month: '6月', monthEn: 'June', events: [{ date: '6月6日', desc: '大三放假' }, { date: '6月10日-11日', desc: '期末考试' }, { date: '6月12日', desc: '放假' }, { date: '6月13日', desc: '大学英语四、六级考试' }, { date: '6月19日', desc: '端午节' }] }
]
</script>

<style scoped>
.calendar-page {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
  padding-top: 72px; /* Top nav height */
  padding-bottom: 80px;
}

.page-header {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.back-btn {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  background: var(--color-text);
  color: var(--color-bg);
  transform: scale(1.05);
}

.header-titles h1 {
  font-size: 32px;
  font-weight: 900;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0;
}

.calendar-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.semester-title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 40px;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--color-text);
}

.semester-title span {
  font-size: 14px;
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 35px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
  z-index: 0;
}

.timeline-month {
  display: flex;
  gap: 40px;
  position: relative;
  z-index: 1;
}

.month-marker {
  width: 72px;
  height: 72px;
  background: var(--color-bg);
  border: 2px solid var(--color-text);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 4px 4px 0 var(--color-text);
}

.month-num {
  font-size: 20px;
  font-weight: 900;
  line-height: 1.2;
}

.month-en {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.events-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 10px;
}

.event-card {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  padding: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}

.event-card.highlight {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
}

.event-card.highlight .event-date {
  color: var(--color-primary);
}

.event-card.highlight .event-desc {
  font-weight: 800;
}

.event-date {
  font-size: 14px;
  font-weight: 800;
  color: var(--color-text-secondary);
}

.event-desc {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .timeline::before { left: 24px; }
  .timeline-month { gap: 20px; }
  .month-marker { width: 50px; height: 50px; border-radius: 12px; box-shadow: 2px 2px 0 var(--color-text); }
  .month-num { font-size: 16px; }
  .month-en { display: none; }
  .events-list { padding-top: 0; }
  .page-header { padding: 24px 16px; }
  .header-titles h1 { font-size: 24px; }
  .calendar-content { padding: 0 16px; }
}
</style>
