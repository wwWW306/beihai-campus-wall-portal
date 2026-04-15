<template>
  <div class="home">

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-badge">
              <span class="badge-dot"></span>
              校园专属 · 真实社区
            </div>
            <h1 class="hero-title">
              你的校园<br/>
              <span class="highlight">声音</span>值得被看见
            </h1>
            <p class="hero-desc">
              Campus Wall 是专属于大学生的社交广场。在这里分享生活点滴、交流学习心得、发现校园趣事——真实的人，真实的声音。
            </p>
            <div class="hero-actions">
              <router-link to="/register" class="btn btn-primary btn-lg">
                立即加入
                <Icons name="chevron-right" :size="18" />
              </router-link>
              <router-link to="/wall" class="btn btn-secondary btn-lg">
                随便逛逛
              </router-link>
            </div>
            <div class="hero-stats">
              <div class="stat">
                <span class="stat-num">12,847</span>
                <span class="stat-label">活跃用户</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-num">58,392</span>
                <span class="stat-label">精选帖子</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-num">128</span>
                <span class="stat-label">覆盖高校</span>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="phone-mockup">
              <div class="phone-screen">
                <div class="mockup-header">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" class="mockup-avatar" />
                  <div class="mockup-name">小明同学</div>
                </div>
                <div class="mockup-content">
                  图书馆终于开了空调，期末复习的同学们冲啊！📚 建议大家提前预约座位~
                </div>
                <div class="mockup-actions">
                  <span class="mockup-action"><Icons name="heart" :size="14" /> 342</span>
                  <span class="mockup-action"><Icons name="chat" :size="14" /> 56</span>
                </div>
                <div class="mockup-divider"></div>
                <div class="mockup-header">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie" class="mockup-avatar" />
                  <div class="mockup-name">美食侦探</div>
                </div>
                <div class="mockup-content">
                  食堂新出的红烧肉拌饭绝了！窗口在二楼第三个档口，💰 12元一份
                </div>
                <div class="mockup-images">
                  <img src="https://picsum.photos/seed/food1/120/120" class="mockup-img" />
                  <img src="https://picsum.photos/seed/food2/120/120" class="mockup-img" />
                  <img src="https://picsum.photos/seed/food3/120/120" class="mockup-img" />
                </div>
                <div class="mockup-actions">
                  <span class="mockup-action"><Icons name="heart-solid" :size="14" /> 567</span>
                  <span class="mockup-action"><Icons name="chat" :size="14" /> 89</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">为什么选择 Campus Wall</h2>
          <p class="section-subtitle">专为大学生打造的校园社交平台</p>
        </div>
        <div class="features-grid">
          <div v-for="f in features" :key="f.icon" class="feature-card card">
            <div class="feature-icon" :style="{ background: f.color + '15', color: f.color }">
              <Icons :name="f.icon" :size="24" />
            </div>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Partitions Preview -->
    <section class="partitions-preview">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">发现感兴趣的圈子</h2>
          <p class="section-subtitle">按话题分组，找到志同道合的同学</p>
        </div>
        <div class="partitions-grid">
          <router-link
            v-for="p in previewPartitions"
            :key="p.id"
            :to="`/partitions/${p.id}`"
            class="partition-card-preview"
            :style="{ '--p-color': p.color }"
          >
            <div class="p-icon">{{ p.icon }}</div>
            <div class="p-info">
              <span class="p-name">{{ p.name }}</span>
              <span class="p-desc">{{ p.desc }}</span>
            </div>
            <div class="p-count">{{ p.count }}帖</div>
          </router-link>
        </div>
        <div style="text-align:center;margin-top:24px">
          <router-link to="/partitions" class="btn btn-secondary">查看全部分区</router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="container">
        <div class="cta-inner card">
          <h2 class="cta-title">准备好加入了吗？</h2>
          <p class="cta-desc">和全国128所高校的同学一起，分享你的校园故事</p>
          <router-link to="/register" class="btn btn-primary btn-lg">
            立即注册 · 完全免费
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import Icons from '../components/Icons.vue'

const features = [
  {
    icon: 'shield',
    title: '真实学生认证',
    desc: '仅限在校大学生注册，真实身份认证，告别匿名论坛的乌烟瘴气',
    color: '#3b82f6'
  },
  {
    icon: 'fire',
    title: '校园热门话题',
    desc: '实时热搜帮你发现校园新鲜事，期末复习、实习校招、美食探店一网打尽',
    color: '#f97316'
  },
  {
    icon: 'partition',
    title: '精准话题分区',
    desc: '校园生活、学习交流、二手交易、美食探店、情感树洞……找到属于你的圈子',
    color: '#10b981'
  },
  {
    icon: 'eye',
    title: '尊重你的隐私',
    desc: '不开屏广告，不滥用推荐算法，你的个人信息仅用于构建真实社区',
    color: '#8b5cf6'
  },
]

const previewPartitions = [
  { id: 1, name: '校园生活', icon: '🏫', desc: '日常点滴、校园新闻、活动预告', count: 2341, color: '#f97316' },
  { id: 2, name: '学习交流', icon: '📚', desc: '课程讨论、考研考公、留学申请', count: 1892, color: '#3b82f6' },
  { id: 3, name: '二手交易', icon: '💰', desc: '毕业出清、数码装备、生活用品', count: 876, color: '#10b981' },
  { id: 4, name: '美食探店', icon: '🍜', desc: '食堂窗口、校外餐厅、宝藏小店', count: 654, color: '#ef4444' },
  { id: 5, name: '情感树洞', icon: '💬', desc: '匿名倾诉、心情记录、找搭子', count: 1203, color: '#8b5cf6' },
  { id: 6, name: '实习校招', icon: '💼', desc: '实习信息、内推机会、求职经验', count: 743, color: '#06b6d4' },
]
</script>

<style scoped>
/* Hero */
.hero {
  position: relative;
  padding: 60px 0 80px;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #fff7ed 0%, #eff6ff 50%, #f5f3ff 100%);
  z-index: 0;
}
.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 60px;
  align-items: center;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: white;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  box-shadow: var(--shadow-sm);
  margin-bottom: 20px;
}
.badge-dot {
  width: 7px;
  height: 7px;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  animation: pulse 2s ease infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.85); }
}
.hero-title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-text);
  margin-bottom: 20px;
}
.highlight { color: var(--color-primary); }
.hero-desc {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 28px;
  max-width: 480px;
}
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}
.btn-lg { padding: 12px 24px; font-size: 15px; }
.hero-stats {
  display: flex;
  align-items: center;
  gap: 20px;
}
.stat { display: flex; flex-direction: column; }
.stat-num { font-size: 22px; font-weight: 800; color: var(--color-text); }
.stat-label { font-size: 12px; color: var(--color-text-muted); }
.stat-divider { width: 1px; height: 30px; background: var(--color-border); }

/* Phone Mockup */
.hero-visual { display: flex; justify-content: center; }
.phone-mockup {
  width: 280px;
  background: #1f2937;
  border-radius: 36px;
  padding: 12px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.2);
}
.phone-screen {
  background: var(--color-bg);
  border-radius: 28px;
  padding: 20px 16px;
  min-height: 420px;
}
.mockup-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.mockup-avatar { width: 32px; height: 32px; border-radius: var(--radius-full); }
.mockup-name { font-size: 13px; font-weight: 600; color: var(--color-text); }
.mockup-content { font-size: 13px; line-height: 1.55; color: var(--color-text); margin-bottom: 10px; }
.mockup-actions { display: flex; gap: 14px; margin-top: 8px; }
.mockup-action { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--color-text-secondary); }
.mockup-divider { height: 1px; background: var(--color-border-light); margin: 14px 0; }
.mockup-images { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 8px; }
.mockup-img { width: 100%; aspect-ratio: 1; object-fit: cover; }

/* Features */
.features { padding: 80px 0; background: white; }
.section-header { text-align: center; margin-bottom: 48px; }
.section-title { font-size: 32px; font-weight: 700; color: var(--color-text); margin-bottom: 8px; }
.section-subtitle { font-size: 15px; color: var(--color-text-secondary); }
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.feature-card { padding: 24px 20px; transition: transform var(--transition-base), box-shadow var(--transition-base); }
.feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}
.feature-title { font-size: 16px; font-weight: 600; color: var(--color-text); margin-bottom: 6px; }
.feature-desc { font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; }

/* Partitions */
.partitions-preview { padding: 80px 0; }
.partitions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.partition-card-preview {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border-light);
  text-decoration: none;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}
.partition-card-preview::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--p-color);
}
.partition-card-preview:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--p-color);
}
.p-icon { font-size: 28px; flex-shrink: 0; }
.p-info { flex: 1; min-width: 0; }
.p-name { display: block; font-size: 14px; font-weight: 600; color: var(--color-text); }
.p-desc { display: block; font-size: 12px; color: var(--color-text-muted); margin-top: 2px; }
.p-count { font-size: 12px; color: var(--color-text-muted); white-space: nowrap; }

/* CTA */
.cta { padding: 40px 0 80px; }
.cta-inner { padding: 48px; text-align: center; background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border: none; }
.cta-title { font-size: 28px; font-weight: 700; color: var(--color-text); margin-bottom: 8px; }
.cta-desc { font-size: 15px; color: var(--color-text-secondary); margin-bottom: 24px; }

/* 响应式 */
@media (max-width: 1024px) {
  .hero-content { grid-template-columns: 1fr; gap: 40px; }
  .hero-visual { display: none; }
  .hero-title { font-size: 40px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .partitions-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .hero { padding: 40px 0 60px; }
  .hero-title { font-size: 32px; }
  .features-grid { grid-template-columns: 1fr; }
  .partitions-grid { grid-template-columns: 1fr; }
  .cta-inner { padding: 32px 20px; }
}
</style>
