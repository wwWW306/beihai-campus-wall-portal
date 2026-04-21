<template>
  <div class="home">

    <!-- Hero Section -->
    <section class="hero">
      <!-- 粒子背景 -->
      <div class="particles" ref="particlesRef">
        <canvas ref="canvasRef"></canvas>
      </div>

      <!-- 植物背景层 -->
      <div class="hero-plant-bg">
        <div class="plant-leaf plant-leaf-1">
          <svg viewBox="0 0 280 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 400 Q80 300 120 200 Q150 120 140 40 Q130 -20 140 0 Q160 20 180 100 Q200 200 240 300 Q270 380 260 400Z" fill="rgba(30,140,80,0.22)"/>
            <path d="M20 400 Q80 300 120 200 Q150 120 140 40" stroke="rgba(30,140,80,0.3)" stroke-width="1.5" fill="none"/>
            <path d="M140 0 Q180 80 160 160" stroke="rgba(30,140,80,0.25)" stroke-width="1.5" fill="none"/>
            <path d="M80 280 Q40 220 50 160" stroke="rgba(30,140,80,0.2)" stroke-width="1.5" fill="none"/>
            <path d="M180 260 Q220 200 200 140" stroke="rgba(30,140,80,0.2)" stroke-width="1.5" fill="none"/>
          </svg>
        </div>
        <div class="plant-leaf plant-leaf-2">
          <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 320 Q60 240 100 160 Q130 90 120 20 Q110 -30 120 0 Q145 30 160 100 Q180 180 170 240 Q160 300 150 320Z" fill="rgba(50,160,100,0.18)"/>
            <path d="M10 320 Q60 240 100 160 Q130 90 120 20" stroke="rgba(50,160,100,0.25)" stroke-width="1.5" fill="none"/>
          </svg>
        </div>
        <div class="plant-leaf plant-leaf-3">
          <svg viewBox="0 0 180 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 300 Q60 230 50 150 Q40 70 60 10 Q80 -30 90 0 Q110 30 130 100 Q150 180 140 250 Q130 300 120 300Z" fill="rgba(20,120,70,0.2)"/>
            <path d="M60 180 Q30 130 40 80" stroke="rgba(20,120,70,0.25)" stroke-width="1.5" fill="none"/>
            <path d="M120 200 Q150 150 140 100" stroke="rgba(20,120,70,0.25)" stroke-width="1.5" fill="none"/>
          </svg>
        </div>
        <div class="plant-leaf plant-leaf-4">
          <svg viewBox="0 0 240 360" xmlns="http://www.w3.org/2000/svg">
            <path d="M240 360 Q180 280 140 200 Q110 120 130 30 Q150 -30 160 0 Q175 30 200 110 Q230 200 220 280 Q210 340 200 360Z" fill="rgba(30,130,80,0.2)"/>
            <path d="M240 360 Q180 280 140 200 Q110 120 130 30" stroke="rgba(30,130,80,0.28)" stroke-width="1.5" fill="none"/>
            <path d="M130 30 Q170 100 155 180" stroke="rgba(30,130,80,0.22)" stroke-width="1.5" fill="none"/>
            <path d="M160 250 Q130 190 145 130" stroke="rgba(30,130,80,0.2)" stroke-width="1.5" fill="none"/>
          </svg>
        </div>
        <div class="plant-leaf plant-leaf-5">
          <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 200 Q40 150 30 90 Q20 40 40 5 Q60 -20 70 0 Q90 20 110 70 Q130 130 120 170 Q110 200 100 200Z" fill="rgba(40,150,90,0.18)"/>
          </svg>
        </div>
        <div class="deco-flower deco-flower-1">
          <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="6" fill="rgba(200,80,100,0.55)"/>
            <ellipse cx="25" cy="10" rx="6" ry="10" fill="rgba(200,80,100,0.3)"/>
            <ellipse cx="25" cy="40" rx="6" ry="10" fill="rgba(200,80,100,0.3)"/>
            <ellipse cx="10" cy="25" rx="10" ry="6" fill="rgba(200,80,100,0.3)"/>
            <ellipse cx="40" cy="25" rx="10" ry="6" fill="rgba(200,80,100,0.3)"/>
          </svg>
        </div>
        <div class="deco-flower deco-flower-2">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="5" fill="rgba(180,100,60,0.5)"/>
            <ellipse cx="20" cy="8" rx="5" ry="8" fill="rgba(180,100,60,0.28)"/>
            <ellipse cx="20" cy="32" rx="5" ry="8" fill="rgba(180,100,60,0.28)"/>
            <ellipse cx="8" cy="20" rx="8" ry="5" fill="rgba(180,100,60,0.28)"/>
            <ellipse cx="32" cy="20" rx="8" ry="5" fill="rgba(180,100,60,0.28)"/>
          </svg>
        </div>
        <div class="float-leaf float-leaf-1"></div>
        <div class="float-leaf float-leaf-2"></div>
        <div class="float-leaf float-leaf-3"></div>
        <div class="float-leaf float-leaf-4"></div>
        <div class="float-leaf float-leaf-5"></div>
      </div>

      <!-- 主内容卡片 -->
      <div class="container">
        <div class="hero-card" ref="heroCardRef">
          <!-- 左侧 -->
          <div class="hero-left">
            <div class="hero-badge" :class="{ visible: loaded }">
              <span class="badge-dot"></span>
              校园专属 · 真实社区
            </div>
            <h1 class="hero-title">
              <span class="title-line" :class="{ visible: loaded }">你的校园</span>
              <span class="title-line title-line-2" :class="{ visible: loaded }">
                <span class="highlight">声音</span>值得被看见
              </span>
            </h1>
            <p class="hero-desc" :class="{ visible: loaded }">
              Campus Wall 是专属于大学生的社交广场。在这里分享生活点滴、交流学习心得、发现校园趣事——真实的人，真实的声音。
            </p>
            <div class="hero-actions" :class="{ visible: loaded }">
              <router-link to="/register" class="btn btn-primary btn-lg magnetic-btn">
                立即加入
                <Icons name="chevron-right" :size="18" />
              </router-link>
              <router-link to="/wall" class="btn btn-secondary btn-lg">随便逛逛</router-link>
            </div>
            <div class="hero-stats" :class="{ visible: loaded }">
              <span class="stat-item">
                <span class="stat-num" ref="stat1Ref">0</span> 活跃用户
              </span>
              <span class="stat-sep">|</span>
              <span class="stat-item">
                <span class="stat-num" ref="stat2Ref">0</span> 精选帖子
              </span>
              <span class="stat-sep">|</span>
              <span class="stat-item">
                <span class="stat-num" ref="stat3Ref">0</span> 覆盖高校
              </span>
            </div>
          </div>

          <!-- 右侧 Logo -->
          <div class="hero-right">
            <div class="logo-card logo-card-top" :class="{ visible: loaded }">
              <img src="/logos/compus-wall.png" alt="Compus Wall" class="logo-img" />
              <div class="logo-meta">
                <span class="logo-name">Compus Wall</span>
                <span class="logo-divider">·</span>
                <span class="logo-sub">平台品牌</span>
              </div>
            </div>
            <div class="logo-card logo-card-bottom" :class="{ visible: loaded }">
              <img src="/logos/beihai-college.png" alt="北海艺术设计学院" class="logo-img" />
              <div class="logo-meta">
                <span class="logo-name">北海艺术设计学院</span>
                <span class="logo-divider">·</span>
                <span class="logo-sub">合作高校</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features" ref="featuresRef">
      <div class="container">
        <div class="section-header" :class="{ visible: featuresVisible }">
          <h2 class="section-title">为什么选择 Campus Wall</h2>
          <p class="section-subtitle">专为大学生打造的校园社交平台</p>
        </div>
        <div class="features-grid">
          <div
            v-for="(f, idx) in features"
            :key="idx"
            class="feature-card"
            :class="{ visible: featuresVisible }"
            :style="{ '--p-color': f.color, '--delay': idx * 0.1 + 's' }"
          >
            <div class="feature-num">{{ String(idx + 1).padStart(2, '0') }}</div>
            <div class="feature-icon-wrap">
              <Icons :name="f.icon" :size="20" />
            </div>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
            <div class="feature-shimmer"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partitions Preview -->
    <section class="partitions-preview" ref="partitionsRef">
      <div class="partitions-bg-animation">
        <div class="bg-orb bg-orb-1"></div>
        <div class="bg-orb bg-orb-2"></div>
      </div>
      <div class="container">
        <div class="partitions-header" :class="{ visible: partitionsVisible }">
          <div class="partitions-title-group">
            <h2 class="partitions-title">发现感兴趣的圈子</h2>
            <p class="partitions-subtitle">按话题分组，找到志同道合的同学</p>
          </div>
          <router-link to="/partitions" class="partitions-more">
            查看全部
            <Icons name="chevron-right" :size="16" />
          </router-link>
        </div>
        <div class="partitions-grid">
          <router-link
            v-for="(p, idx) in previewPartitions"
            :key="p.id"
            :to="`/partitions/${p.id}`"
            class="partition-card"
            :class="{ visible: partitionsVisible }"
            :style="{ '--p-color': p.color, '--delay': idx * 0.08 + 's' }"
          >
            <div class="partition-dot"></div>
            <span class="partition-name">{{ p.name }}</span>
            <span class="partition-count">{{ p.count }} 帖子</span>
            <div class="partition-glow"></div>
          </router-link>
        </div>
        <div class="partitions-cta" :class="{ visible: partitionsVisible }">
          <router-link to="/partitions" class="btn btn-secondary">查看全部分区</router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta" ref="ctaRef">
      <div class="cta-bg-pattern"></div>
      <div class="container">
        <div class="cta-inner" :class="{ visible: ctaVisible }">
          <h2 class="cta-title">
            <span class="cta-char" v-for="(c, i) in '准备好加入了吗？'" :key="i" :style="{ '--i': i }">{{ c }}</span>
          </h2>
          <p class="cta-desc">和全国128所高校的同学一起，分享你的校园故事</p>
          <router-link to="/register" class="btn btn-primary btn-lg cta-btn">
            <span class="btn-text">立即注册 · 完全免费</span>
            <span class="btn-glow"></span>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Icons from '../components/Icons.vue'

// Refs
const particlesRef = ref(null)
const canvasRef = ref(null)
const heroCardRef = ref(null)
const featuresRef = ref(null)
const partitionsRef = ref(null)
const ctaRef = ref(null)
const stat1Ref = ref(null)
const stat2Ref = ref(null)
const stat3Ref = ref(null)

// Visibility states
const loaded = ref(false)
const featuresVisible = ref(false)
const partitionsVisible = ref(false)
const ctaVisible = ref(false)

// Stats animation
function animateNumber(el, target, suffix = '') {
  const duration = 2000
  const start = 0
  const startTime = performance.now()
  const update = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 4)
    const current = Math.round(start + (target - start) * eased)
    el.textContent = current.toLocaleString() + suffix
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

// Scroll reveal
function handleScroll() {
  const scrollY = window.scrollY
  
  if (featuresRef.value) {
    const rect = featuresRef.value.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.8) {
      featuresVisible.value = true
    }
  }
  
  if (partitionsRef.value) {
    const rect = partitionsRef.value.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.8) {
      partitionsVisible.value = true
    }
  }
  
  if (ctaRef.value) {
    const rect = ctaRef.value.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.8) {
      ctaVisible.value = true
    }
  }
}

// Particle canvas
let particles = []
let animationId = null

function initParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  
  function resize() {
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    ctx.scale(dpr, dpr)
  }
  resize()
  window.addEventListener('resize', resize)
  
  // Create particles
  particles = []
  const particleCount = Math.floor(window.innerWidth / 15)
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2
    })
  }
  
  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    
    particles.forEach((p, i) => {
      p.x += p.vx
      p.y += p.vy
      p.pulse += 0.02
      
      if (p.x < 0) p.x = window.innerWidth
      if (p.x > window.innerWidth) p.x = 0
      if (p.y < 0) p.y = window.innerHeight
      if (p.y > window.innerHeight) p.y = 0
      
      const pulseAlpha = p.alpha + Math.sin(p.pulse) * 0.15
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(45, 122, 74, ${pulseAlpha})`
      ctx.fill()
      
      // Draw connections
      particles.slice(i + 1).forEach(p2 => {
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(45, 122, 74, ${0.1 * (1 - dist / 120)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })
    })
    
    animationId = requestAnimationFrame(animate)
  }
  
  animate()
}

onMounted(() => {
  // Initial load animation
  setTimeout(() => {
    loaded.value = true
    // Animate stats numbers
    setTimeout(() => {
      if (stat1Ref.value) animateNumber(stat1Ref.value, 12847)
      if (stat2Ref.value) animateNumber(stat2Ref.value, 58392)
      if (stat3Ref.value) animateNumber(stat3Ref.value, 128)
    }, 600)
  }, 100)
  
  // Scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  
  // Initialize particles
  initParticles()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (animationId) cancelAnimationFrame(animationId)
})

const features = [
  { icon: 'shield', title: '真实学生认证', desc: '仅限在校大学生注册，告别匿名论坛的乌烟瘴气', color: '#1c3557' },
  { icon: 'trending', title: '校园热门话题', desc: '实时热搜帮你发现校园新鲜事，期末实习美食一网打尽', color: '#c8976a' },
  { icon: 'partition', title: '精准话题分区', desc: '校园生活、学习交流、二手交易……找到属于你的圈子', color: '#10b981' },
  { icon: 'eye-off', title: '尊重你的隐私', desc: '不开屏广告，不滥用推荐算法，个人信息仅用于构建真实社区', color: '#8b5cf6' },
]

const previewPartitions = [
  { id: 1, name: '校园生活', count: 2341, color: '#1c3557' },
  { id: 2, name: '学习交流', count: 1892, color: '#3b82f6' },
  { id: 3, name: '二手交易', count: 876, color: '#10b981' },
  { id: 4, name: '美食探店', count: 654, color: '#c8976a' },
  { id: 5, name: '情感树洞', count: 1203, color: '#8b5cf6' },
  { id: 6, name: '实习校招', count: 743, color: '#06b6d4' },
]
</script>

<style scoped>
/* ─── Hero ─────────────────────────────────────── */
.hero {
  position: relative;
  padding: 60px 0 80px;
  overflow: hidden;
}

/* 粒子画布 */
.particles {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.particles canvas {
  position: absolute;
  inset: 0;
}

/* 植物背景 */
.hero-plant-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  background: linear-gradient(155deg, #faf5ee 0%, #f5ede0 40%, #f8f0e8 70%, #faf5f0 100%);
}
.plant-leaf {
  position: absolute;
  pointer-events: none;
  animation: sway 7s ease-in-out infinite;
}
.plant-leaf-1 { width: 260px; height: 360px; bottom: -30px; left: -40px; animation-duration: 8s; }
.plant-leaf-2 { width: 180px; height: 280px; bottom: 20px; left: 120px; animation-duration: 9s; animation-delay: 1s; }
.plant-leaf-3 { width: 150px; height: 240px; bottom: 60px; left: 240px; animation-duration: 10s; animation-delay: 2s; }
.plant-leaf-4 { width: 220px; height: 320px; bottom: -20px; right: -30px; animation-duration: 8s; animation-delay: 0.5s; }
.plant-leaf-5 { width: 130px; height: 170px; top: 40px; right: 80px; animation-duration: 11s; animation-delay: 3s; }

@keyframes sway {
  0%, 100% { transform: rotate(-1.5deg) translateX(0); }
  50% { transform: rotate(2deg) translateX(6px); }
}

.deco-flower {
  position: absolute;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
}
.deco-flower-1 { width: 50px; height: 50px; top: 18%; left: 6%; animation-delay: 0s; }
.deco-flower-2 { width: 40px; height: 40px; bottom: 22%; left: 15%; animation-delay: 2s; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(6deg); }
}

.float-leaf {
  position: absolute;
  border-radius: 50% 0 50% 0;
  pointer-events: none;
  animation: floatLeaf 7s ease-in-out infinite;
}
.float-leaf-1 { width: 18px; height: 26px; background: rgba(40,150,90,0.12); top: 30%; left: 22%; animation-delay: 1s; transform: rotate(30deg); }
.float-leaf-2 { width: 14px; height: 20px; background: rgba(50,140,80,0.1); top: 65%; left: 35%; animation-delay: 3s; transform: rotate(-20deg); }
.float-leaf-3 { width: 16px; height: 24px; background: rgba(30,130,75,0.1); top: 45%; right: 18%; animation-delay: 2s; transform: rotate(45deg); }
.float-leaf-4 { width: 20px; height: 28px; background: rgba(35,145,85,0.08); top: 55%; left: 8%; animation-delay: 4s; transform: rotate(-35deg); }
.float-leaf-5 { width: 12px; height: 18px; background: rgba(45,150,90,0.1); top: 75%; right: 25%; animation-delay: 2.5s; transform: rotate(60deg); }

@keyframes floatLeaf {
  0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); opacity: 0.7; }
  50% { transform: translateY(-12px) rotate(calc(var(--r, 0deg) + 10deg)); opacity: 1; }
}

/* 主内容卡片 */
.hero-card {
  position: relative;
  z-index: 2;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 40px rgba(0,0,0,0.06), 0 1px 8px rgba(0,0,0,0.04);
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 0;
  overflow: hidden;
  transform: translateY(30px);
  opacity: 0;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
}
.hero-card.visible {
  transform: translateY(0);
  opacity: 1;
}

.hero-left {
  padding: 48px 44px;
}

.hero-right {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: #f0f7f2;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #2d7a4a;
  border: 1px solid rgba(45,122,74,0.15);
  margin-bottom: 18px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.hero-badge.visible {
  opacity: 1;
  transform: translateY(0);
}
.badge-dot {
  width: 7px;
  height: 7px;
  background: #2d7a4a;
  border-radius: 50%;
  animation: pulse 2s ease infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* Title animation */
.hero-title {
  display: flex;
  flex-direction: column;
  font-size: 46px;
  font-weight: 800;
  line-height: 1.18;
  color: #1a1a1a;
  margin-bottom: 16px;
  letter-spacing: -0.025em;
  overflow: hidden;
}

.title-line {
  display: block;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.title-line.visible {
  opacity: 1;
  transform: translateY(0);
}
.title-line:nth-child(1) { transition-delay: 0.1s; }
.title-line-2 { transition-delay: 0.25s; }

.highlight { color: #2d7a4a; }

/* Desc */
.hero-desc {
  font-size: 15px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
}
.hero-desc.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s;
}
.hero-actions.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Magnetic button */
.magnetic-btn {
  position: relative;
  overflow: hidden;
}
.magnetic-btn::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.magnetic-btn:hover::before {
  opacity: 1;
  transform: scale(1.5);
}

.btn-lg { padding: 11px 22px; font-size: 14px; }

/* Stats */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 0;
  font-size: 13px;
  color: #888;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s;
}
.hero-stats.visible {
  opacity: 1;
  transform: translateY(0);
}
.stat-item { color: #888; }
.stat-num { font-weight: 700; color: #2d7a4a; }
.stat-sep { margin: 0 10px; color: #ccc; }

/* Logo cards */
.logo-card {
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  opacity: 0;
  transform: translateX(30px);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, 
              box-shadow 0.3s ease, 
              opacity 0.8s ease 0.5s;
}
.logo-card.visible {
  opacity: 1;
  transform: translateX(0);
}
.logo-card:hover {
  transform: translateX(0) translateY(-4px) !important;
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}
.logo-card-top { transition-delay: 0.5s; }
.logo-card-bottom { transition-delay: 0.65s; }
.logo-card-top { background: linear-gradient(145deg, #0d1f3c, #162d52); }
.logo-card-bottom { background: linear-gradient(145deg, #2a1010, #3d1818); }
.logo-img { width: 72%; height: auto; object-fit: contain; }
.logo-meta {
  position: absolute;
  bottom: 10px;
  left: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.logo-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.9); }
.logo-divider { color: rgba(255,255,255,0.4); font-size: 12px; }
.logo-sub { font-size: 11px; color: rgba(255,255,255,0.5); }

/* ─── Features ─────────────────────────────────── */
.features { 
  padding: 80px 0; 
  background: white;
  position: relative;
  overflow: hidden;
}

.section-header { 
  text-align: center; 
  margin-bottom: 52px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: 30px;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 10px;
  letter-spacing: -0.025em;
}
.section-subtitle { font-size: 15px; color: var(--color-text-secondary); }

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--color-border-light);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.feature-card {
  background: white;
  padding: 36px 28px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px);
  transition: 
    background var(--transition-base),
    opacity 0.6s ease var(--delay),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) var(--delay);
}
.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}
.feature-card:hover { background: #fafaf9; }

/* Shimmer effect */
.feature-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.4) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}
.feature-card:hover .feature-shimmer {
  opacity: 1;
  animation: shimmer 0.8s ease;
}
@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.feature-num {
  font-size: 40px;
  font-weight: 800;
  color: var(--color-border);
  line-height: 1;
  margin-bottom: 18px;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  transition: color var(--transition-base);
}
.feature-card:hover .feature-num { color: var(--p-color, var(--color-accent)); }

.feature-icon-wrap {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  color: var(--p-color, var(--color-text-secondary));
  transition: color var(--transition-base);
}
.feature-card:hover .feature-icon-wrap { color: var(--p-color, var(--color-accent)); }

.feature-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.feature-desc { font-size: 13px; color: var(--color-text-muted); line-height: 1.65; }

/* ─── Partitions ───────────────────────────────── */
.partitions-preview { 
  padding: 80px 0; 
  background: var(--color-bg);
  position: relative;
  overflow: hidden;
}

/* Background orbs */
.partitions-bg-animation {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: orbFloat 8s ease-in-out infinite;
}
.bg-orb-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(45,122,74,0.3), rgba(16,185,129,0.2));
  top: -100px;
  right: -100px;
}
.bg-orb-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2));
  bottom: -50px;
  left: -50px;
  animation-delay: 3s;
}
@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.partitions-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  position: relative;
  z-index: 1;
}
.partitions-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.partitions-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.025em;
  margin-bottom: 6px;
}
.partitions-subtitle { font-size: 14px; color: var(--color-text-muted); }
.partitions-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-fast), transform 0.3s ease;
}
.partitions-more:hover { 
  border-color: var(--color-primary); 
  transform: translateX(4px);
}

.partitions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--color-border-light);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.partition-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 22px 24px;
  background: white;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: 
    background var(--transition-base),
    border-bottom-color var(--transition-base),
    opacity 0.5s ease var(--delay),
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) var(--delay);
}
.partition-card.visible {
  opacity: 1;
  transform: translateY(0);
}
.partition-card:hover {
  background: #fafaf9;
  border-bottom-color: var(--p-color);
}

.partition-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), var(--p-color) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.partition-card:hover .partition-glow {
  opacity: 0.05;
}

.partition-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--p-color);
  transition: transform var(--transition-base);
}
.partition-card:hover .partition-dot { 
  transform: scale(1.8);
  box-shadow: 0 0 12px var(--p-color);
}
.partition-name { font-size: 15px; font-weight: 600; color: var(--color-text); letter-spacing: -0.005em; }
.partition-count { font-size: 12px; color: var(--color-text-muted); }

.partitions-cta { 
  text-align: center; 
  margin-top: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
  position: relative;
  z-index: 1;
}
.partitions-cta.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── CTA ─────────────────────────────────────── */
.cta { 
  padding: 40px 0 80px;
  position: relative;
  overflow: hidden;
}

.cta-bg-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(45,122,74,0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(139,92,246,0.05) 0%, transparent 50%);
  pointer-events: none;
}

.cta-inner {
  padding: 60px;
  text-align: center;
  background: linear-gradient(135deg, #f2f0ec 0%, #eef2f7 100%);
  border-radius: var(--radius-xl);
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.cta-inner.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.cta-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 8px;
  letter-spacing: -0.025em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2px;
}

.cta-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  transition-delay: calc(var(--i) * 0.03s);
}
.cta-inner.visible .cta-char {
  opacity: 1;
  transform: translateY(0);
}

.cta-desc { font-size: 15px; color: var(--color-text-secondary); margin-bottom: 24px; }

/* CTA button with glow */
.cta-btn {
  position: relative;
  overflow: hidden;
}
.btn-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #2d7a4a, #10b981, #2d7a4a);
  border-radius: inherit;
  z-index: -1;
  opacity: 0;
  filter: blur(10px);
  transition: opacity 0.3s ease;
}
.cta-btn:hover .btn-glow {
  opacity: 0.6;
  animation: glowPulse 1.5s ease-in-out infinite;
}
@keyframes glowPulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

/* ─── 响应式 ──────────────────────────────────── */
@media (max-width: 1024px) {
  .hero-card { grid-template-columns: 1fr; gap: 40px; }
  .hero-right { display: none; }
  .hero-title { font-size: 40px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .partitions-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .hero { padding: 40px 0 60px; }
  .hero-title { font-size: 32px; }
  .hero-left { padding: 36px 28px; }
  .features { padding: 60px 0; }
  .features-grid { grid-template-columns: 1fr; }
  .feature-card { padding: 28px 24px; }
  .feature-num { font-size: 36px; }
  .partitions-preview { padding: 60px 0; }
  .partitions-grid { grid-template-columns: repeat(2, 1fr); }
  .partitions-header { flex-direction: column; align-items: flex-start; gap: 8px; }
  .cta-inner { padding: 40px 24px; }
  .cta-title { font-size: 22px; }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .particles { display: none; }
}
</style>
