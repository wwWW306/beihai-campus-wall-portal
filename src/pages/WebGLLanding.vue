<template>
  <div class="editorial-landing" :class="`theme-${themeStore.theme}`" ref="landingRef">

    <!-- 全局纯色扫场遮罩 -->
    <div class="transition-overlay" :class="[transitionDirection, transitionColor]"></div>

    <!-- 悬浮顶部导航条 -->
    <header class="masthead">
      <div class="masthead-section left">
        <div class="logo-wrapper">
          <svg class="brand-logo-svg" viewBox="0 0 100 100">
            <!-- Crescent Moon -->
            <path class="logo-path" d="M20,15 A10,10 0 1,1 20,35 A8,8 0 1,0 20,15" />
            <!-- Concentric Arcs -->
            <path class="logo-path stroke" d="M15,80 A35,35 0 0,1 85,80" />
            <path class="logo-path stroke" d="M25,80 A25,25 0 0,1 75,80" />
            <path class="logo-path stroke" d="M35,80 A15,15 0 0,1 65,80" />
            <!-- Envelope -->
            <rect class="logo-path stroke" x="42" y="70" width="16" height="10" rx="1" />
            <path class="logo-path stroke" d="M42,70 L50,76 L58,70" />
          </svg>
          <span class="logo-text">CAMPUS WALL</span>
        </div>
        <button class="nav-btn" @click="openMenu('explore')">Explore</button>
        <button class="nav-btn" @click="openMenu('messages')">Messages</button>
      </div>
      
      <div class="masthead-center">
        <!-- Center left empty for cleaner layout -->
      </div>
      
      <div class="masthead-section right">
        <button class="nav-btn theme-toggle" @click="themeStore.toggleTheme()">
          {{ themeStore.theme === 'light' ? 'DARK' : 'LIGHT' }}
        </button>
        <button v-if="isLoggedIn" class="nav-btn user-btn" @click="openMenu('profile')">
          My Zone
        </button>
        <button v-else class="nav-btn login-btn" @click="openMenu('login')">
          Login
        </button>
      </div>
    </header>

    <!-- 交互式中心弹窗菜单 -->
    <transition name="elegant-modal">
      <div class="elegant-modal-wrapper" v-if="activeMenu" @click.self="activeMenu = null">
        <div class="elegant-modal">
          <button class="close-btn" @click="activeMenu = null">CLOSE ✕</button>
          
          <div v-if="activeMenu === 'explore'" class="modal-content">
            <h2 class="modal-title">Explore</h2>
            <ul class="modal-menu-list">
              <li><router-link to="/wall">View Feed</router-link></li>
              <li><a href="#">Trending Gossips</a></li>
              <li><a href="#">Confession Wall</a></li>
              <li><a href="#">Marketplace</a></li>
            </ul>
          </div>
          
          <div v-if="activeMenu === 'messages'" class="modal-content">
            <h2 class="modal-title">Inbox</h2>
            <div class="empty-state">No new messages</div>
            <p class="modal-desc">Your messages will appear here once you join the network.</p>
          </div>
          
          <div v-if="activeMenu === 'profile'" class="modal-content profile-content">
            <h2 class="modal-title">My Zone</h2>
            <div class="profile-info">
              <!-- 弹窗里暂时使用默认或者 CSS 头像 -->
              <div class="css-avatar"></div>
              <div class="info-text">
                <h3>STUDENT_X</h3>
                <p>ID: 2026</p>
                <p>Campus Wall</p>
              </div>
            </div>
            <button class="btn-elegant light mt-4 w-full" @click="handleLogout">Logout</button>
          </div>
          
          <div v-if="activeMenu === 'login'" class="modal-content login-content">
            <h2 class="modal-title">Authenticate</h2>
            <p class="modal-desc">You are currently browsing as a guest. Join the network to leave your mark.</p>
            <router-link to="/register" class="btn-elegant light mt-4 w-full">Join Now</router-link>
            <button class="btn-elegant outline mt-2 w-full" @click="handleMockLogin">Fast Login (Dev)</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 翻页页面容器 -->
    <div class="pages-wrapper">
      
      <!-- 第 1 页：主视觉与杂志排版区 -->
      <section class="page-section" :class="{ 'active-page': currentPage === 0 }" id="page-0">
        
        <!-- 巨型标题叠加区 -->
        <div class="hero-screen">
          <div class="hero-text-overlap">
            <div class="title-line anim-text-1"><h1 class="massive-title">CAMPUS</h1></div>
            <div class="title-line anim-text-2" style="margin-left: 20vw; margin-top: -60px;"><h1 class="massive-title red-text">WALL.</h1></div>
          </div>
          
          <!-- 随便逛逛按钮加回第一屏 -->
          <div class="hero-actions anim-fade-up">
            <router-link to="/wall" class="btn-elegant outline hero-btn">Explore Feed <span style="font-size: 12px; margin-left: 8px;">&rarr;</span></router-link>
          </div>
          
          <!-- 压字图片排版 (带裁切展开动画) -->
          <div class="hero-image-overlay anim-clip-reveal">
            <img src="/images/jimeng-2026-04-16-2937.png" class="img-editorial" alt="Hero Image" />
            <div class="overlay-caption">01 &mdash; UNFILTERED VOICES</div>
          </div>

          <div class="scroll-down-hint anim-fade-in">
            <div class="line"></div>
            <span>SCROLL</span>
          </div>
        </div>

        <!-- 高级杂志跨页排版 -->
        <div class="editorial-spread">
          <div class="spread-left">
            <div class="spread-text-box anim-fade-right">
              <h3 class="spread-subtitle">THE NOISE.</h3>
              <p class="spread-desc">
                No algorithms dictating your truth. We exist purely on the raw, unfiltered echoes of the student body. Step into the void.
              </p>
              <div class="btn-group mt-4">
                <router-link to="/register" class="btn-elegant light">Join Network</router-link>
              </div>
            </div>
          </div>
          
          <div class="spread-right">
            <!-- 错位重叠的两张图 (左右滑入动画) -->
            <div class="overlap-img-1 anim-slide-right">
              <img src="/images/1618475509_9853_thumb.jpg" class="img-editorial" />
            </div>
            <div class="overlap-img-2 anim-slide-left">
              <img src="/images/a_9_1.jpg" class="img-editorial" />
            </div>
          </div>
        </div>
      </section>

      <!-- 第 2 页：拼贴画廊与特性区 -->
      <section class="page-section" :class="{ 'active-page': currentPage === 1 }" id="page-1">
        <div class="collage-layout">
          <div class="collage-text">
            <h2 class="section-title anim-scale-up">WHY <span class="red-text">US.</span></h2>
            <div class="features-list">
              <div class="feature-item anim-fade-up" v-for="(f, i) in features" :key="i" :style="{ 'transition-delay': `${i * 0.2}s` }">
                <div class="feat-num">0{{ i + 1 }}</div>
                <div class="feat-content">
                  <h3>{{ f.title }}</h3>
                  <p>{{ f.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="collage-gallery">
            <div class="gallery-card card-top anim-rotate-in-1">
              <img src="/images/28228E0780BB6369769DD347D79_B8047C45_B055.jpg" class="img-editorial" />
              <div class="gallery-tag">SECRET CONFESSIONS</div>
            </div>
            <div class="gallery-card card-bottom anim-rotate-in-2">
              <img src="/images/jimeng-2026-04-16-2937.png" class="img-editorial" />
              <div class="gallery-tag red-tag">LIVE FEED</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第 3 页：Footer CTA -->
      <section class="page-section" :class="{ 'active-page': currentPage === 2 }" id="page-2" style="overflow: hidden;">
        <footer class="elegant-footer">
          <div class="footer-bg-text anim-zoom-in">CAMPUS WALL</div>
          <div class="footer-content">
            <h2 class="footer-cta-text anim-fade-up">Enter the System.</h2>
            <div class="anim-fade-up" style="animation-delay: 0.2s;">
              <router-link to="/register" class="btn-giant-elegant">Initialize</router-link>
            </div>
            <div class="footer-links anim-fade-in">
              <span>&copy; 2026 Campus Wall</span>
              <a href="#">About</a>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </footer>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
const isLoggedIn = ref(false)
const currentPage = ref(0)
const maxPages = 3

// 翻页扫场动画控制
const transitionDirection = ref('')
const transitionColor = ref('bg-black')
const landingRef = ref(null)
const activeMenu = ref(null)
let isAnimating = false

const features = [
  { title: 'Verified Identity', desc: 'EDU email authentication ensuring a pure, bot-free environment for real peers.' },
  { title: 'Real-time Feed', desc: 'Instant drops of campus events, daily gossips, and late-night aesthetic thoughts.' },
  { title: 'Structured Zones', desc: 'Dedicated sectors meticulously designed for marketplace, study groups, and confessions.' },
]

function openMenu(menuName) {
  activeMenu.value = menuName
}

function handleLogout() {
  isLoggedIn.value = false
  activeMenu.value = null
}

function handleMockLogin() {
  isLoggedIn.value = true
  activeMenu.value = null
}

function handleWheel(e) {
  if (isAnimating || activeMenu.value) { 
    if(e.cancelable) e.preventDefault()
    return
  }

  const activeSection = document.getElementById(`page-${currentPage.value}`)
  if (!activeSection) return

  const { scrollTop, scrollHeight, clientHeight } = activeSection
  const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 5 
  const atTop = scrollTop <= 5

  if (e.deltaY > 0) {
    if (atBottom) {
      if (currentPage.value < maxPages - 1) {
        if(e.cancelable) e.preventDefault()
        changePage(currentPage.value + 1, 'down')
      }
    }
  } else if (e.deltaY < 0) {
    if (atTop) {
      if (currentPage.value > 0) {
        if(e.cancelable) e.preventDefault()
        changePage(currentPage.value - 1, 'up')
      }
    }
  }
}

function changePage(nextPage, scrollDirection) {
  isAnimating = true
  
  transitionColor.value = Math.random() > 0.5 ? 'bg-red' : 'bg-black'
  transitionDirection.value = scrollDirection === 'down' ? 'sweep-up' : 'sweep-down'
  
  setTimeout(() => {
    currentPage.value = nextPage
    
    nextTick(() => {
      const newSection = document.getElementById(`page-${nextPage}`)
      if (newSection) {
        newSection.scrollTop = 0 
      }
    })
  }, 500)

  setTimeout(() => {
    transitionDirection.value = ''
    isAnimating = false
  }, 1200)
}

function handleKeydown(e) {
  if (activeMenu.value) return 

  const activeSection = document.getElementById(`page-${currentPage.value}`)
  if (!activeSection) return

  const { scrollTop, scrollHeight, clientHeight } = activeSection
  const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 5
  const atTop = scrollTop <= 5

  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    if (atBottom && currentPage.value < maxPages - 1) {
      e.preventDefault()
      changePage(currentPage.value + 1, 'down')
    }
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    if (atTop && currentPage.value > 0) {
      e.preventDefault()
      changePage(currentPage.value - 1, 'up')
    }
  }
}

onMounted(() => {
  if (landingRef.value) {
    landingRef.value.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeydown, { passive: false })
  }
})

onUnmounted(() => {
  if (landingRef.value) {
    landingRef.value.removeEventListener('wheel', handleWheel)
  }
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Bebas+Neue&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.editorial-landing {
  position: fixed; inset: 0;
  --bg-color: #0D0D0D;
  --text-color: #F5F2EB;
  --accent-color: #FF3333;
  --border-color: rgba(255, 255, 255, 0.1);
  --btn-bg: #F5F2EB;
  --btn-text: #0D0D0D;

  background-color: var(--bg-color); 
  color: var(--text-color); 
  font-family: 'Inter', sans-serif;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  z-index: 10;
  transition: background-color 0.5s ease, color 0.5s ease;
}

/* 白天模式覆盖 */
:deep([data-theme="light"]) .editorial-landing,
.editorial-landing.theme-light {
  --bg-color: #F5F2EB; /* 恢复原来的米白色 */
  --text-color: #0D0D0D;
  --accent-color: #FF3333;
  --border-color: rgba(0, 0, 0, 0.1);
  --btn-bg: #0D0D0D;
  --btn-text: #F5F2EB;
}

/* 如果 App.vue 已经设置了 data-theme，我们可以直接通过 store 状态控制 */
.theme-light {
  --bg-color: #F5F2EB;
  --text-color: #0D0D0D;
  --border-color: rgba(0, 0, 0, 0.1);
  --btn-bg: #0D0D0D;
  --btn-text: #F5F2EB;
}

.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 24px; }
.w-full { width: 100%; justify-content: center; }
.bg-red { background-color: var(--accent-color); }
.bg-black { background-color: #000; }

/* 强制 Logo 变成纯白色 */
.img-inverted { filter: brightness(0) invert(1); } 

.brand-logo-svg {
  width: 32px; height: 32px;
  margin-right: 12px;
  color: var(--text-color);
  transition: color 0.5s;
}

.logo-path {
  fill: currentColor;
}

.logo-path.stroke {
  fill: none;
  stroke: currentColor;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.logo-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 0.05em;
  color: var(--text-color);
  transition: color 0.5s;
}

.css-logo-shape-2 {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px;
  width: 32px; height: 20px;
}
.css-logo-shape-2 .dot { width: 8px; height: 8px; background: rgba(245,242,235,0.5); }
.css-logo-shape-2 .red-dot { background: #FF3333; }

.css-avatar {
  width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #FF3333, #0D0D0D);
  border: 2px solid #F5F2EB;
}

/* 图片处理 */
.img-editorial {
  width: 100%; height: 100%; object-fit: cover; display: block;
  filter: grayscale(100%) contrast(1.2) brightness(var(--img-brightness, 0.8));
  transition: filter 0.8s ease, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.theme-light .img-editorial {
  --img-brightness: 1.0;
  filter: grayscale(100%) contrast(1.1);
}
.img-editorial:hover {
  filter: grayscale(100%) contrast(1.3) brightness(0.9);
  transform: scale(1.05);
}

/* ── 多样化入场动画 (通过 .active-page 触发) ── */
.active-page .anim-text-1 { animation: slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.active-page .anim-text-2 { animation: slideInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; }
.active-page .anim-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
.active-page .anim-clip-reveal { animation: clipRevealUp 1.2s cubic-bezier(0.85, 0, 0.15, 1) 0.2s both; }
.active-page .anim-fade-in { animation: fadeIn 1s ease 0.6s both; }

/* 杂志区动画 */
.active-page .anim-fade-right { animation: fadeRight 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
.active-page .anim-slide-right { animation: slideRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
.active-page .anim-slide-left { animation: slideLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both; }

/* Page 2 动画 */
.active-page .anim-scale-up { animation: scaleUp 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
.active-page .anim-rotate-in-1 { animation: rotateIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
.active-page .anim-rotate-in-2 { animation: rotateInOpposite 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }

/* Page 3 动画 */
.active-page .anim-zoom-in { animation: zoomIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

/* 定义关键帧 */
@keyframes slideInLeft { 0% { transform: translateX(-100px); opacity: 0; filter: blur(10px); } 100% { transform: translateX(0); opacity: 1; filter: blur(0); } }
@keyframes slideInRight { 0% { transform: translateX(100px); opacity: 0; filter: blur(10px); } 100% { transform: translateX(0); opacity: 1; filter: blur(0); } }
@keyframes fadeUp { 0% { transform: translateY(40px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
@keyframes clipRevealUp { 0% { clip-path: inset(100% 0 0 0); } 100% { clip-path: inset(0 0 0 0); } }
@keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes fadeRight { 0% { transform: translateX(-40px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
@keyframes slideRight { 0% { transform: translateX(-80px); clip-path: inset(0 100% 0 0); } 100% { transform: translateX(0); clip-path: inset(0 0 0 0); } }
@keyframes slideLeft { 0% { transform: translateX(80px); clip-path: inset(0 0 0 100%); } 100% { transform: translateX(0); clip-path: inset(0 0 0 0); } }
@keyframes scaleUp { 0% { transform: scale(0.9) translateY(40px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
@keyframes rotateIn { 0% { transform: translateY(60px) rotate(-5deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }
@keyframes rotateInOpposite { 0% { transform: translateY(60px) rotate(5deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }
@keyframes zoomIn { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }

/* ── 扫场翻页 ── */
.transition-overlay {
  position: fixed; left: 0; top: 0;
  width: 100vw; height: 100vh; z-index: 9999;
  pointer-events: none; transform: translateY(100%); opacity: 0;
}
.sweep-up { opacity: 1; animation: sweepUpAnim 1.2s cubic-bezier(0.85, 0, 0.15, 1) forwards; }
@keyframes sweepUpAnim { 0% { transform: translateY(100%); } 50% { transform: translateY(0%); } 100% { transform: translateY(-100%);} }
.sweep-down { opacity: 1; animation: sweepDownAnim 1.2s cubic-bezier(0.85, 0, 0.15, 1) forwards; }
@keyframes sweepDownAnim { 0% { transform: translateY(-100%); } 50% { transform: translateY(0%); } 100% { transform: translateY(100%); } }

/* ── 导航条 ── */
.masthead {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--border-color);
  height: 80px; flex-shrink: 0; z-index: 100; 
  background: var(--bg-color); opacity: 0.95; backdrop-filter: blur(16px);
  position: relative;
  transition: background-color 0.5s, border-color 0.5s;
}
.masthead-section { display: flex; align-items: center; height: 100%; }
.logo-wrapper { height: 80px; width: auto; min-width: 120px; max-width: 200px; display: flex; justify-content: flex-start; align-items: center; padding: 0 20px; overflow: hidden; }
.masthead-logo { max-width: 100%; max-height: 50px; object-fit: contain; filter: grayscale(100%) invert(var(--logo-invert, 0)); transition: filter 0.5s; }
.theme-dark .masthead-logo { --logo-invert: 1; filter: grayscale(100%) invert(1) brightness(1.5); }
.left .logo-wrapper { border-right: 1px solid var(--border-color); }
.right .right-logo { border-left: 1px solid var(--border-color); }

.nav-btn {
  background: transparent; border: none; border-right: 1px solid var(--border-color);
  height: 100%; padding: 0 32px; font-family: 'Space Mono', monospace;
  font-size: 13px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.05em;
  cursor: pointer; transition: background 0.4s, color 0.4s;
  color: var(--text-color);
}
.nav-btn:hover { background: rgba(128,128,128,0.1); color: var(--accent-color); }
.masthead-section.right .nav-btn { border-right: none; border-left: 1px solid var(--border-color); }
.masthead-center { flex: 1; display: flex; justify-content: center; align-items: center; }
.center-brand-logo { height: 40px; width: auto; object-fit: contain; opacity: 0.8; transition: opacity 0.3s, transform 0.4s; }
.center-brand-logo:hover { opacity: 1; transform: scale(1.05); }
@media (min-width: 1024px) { .masthead-center { display: flex; } }

/* ── 容器 ── */
.pages-wrapper { position: relative; flex: 1; overflow: hidden; }
.page-section { position: absolute; inset: 0; opacity: 0; pointer-events: none; overflow-y: auto; overflow-x: hidden; background: var(--bg-color); }
.page-section.active-page { opacity: 1; pointer-events: auto; }

/* ── 第一屏 ── */
.hero-screen { height: calc(100vh - 80px); display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 0 10vw; position: relative; }
.hero-text-overlap { position: relative; z-index: 2; }
.massive-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(80px, 16vw, 240px); font-weight: 500; line-height: 0.85; margin: 0; letter-spacing: -0.05em; color: var(--text-color); text-shadow: 0 10px 40px rgba(0,0,0,0.1); transition: color 0.5s; }
.theme-dark .massive-title { text-shadow: 0 10px 40px rgba(0,0,0,0.8); }

.red-text { color: var(--accent-color) !important; }

.hero-actions {
  position: relative; z-index: 3; margin-top: 40px; margin-left: 5vw;
}
.hero-btn {
  padding: 16px 40px !important; font-size: 16px !important; border-color: rgba(255,255,255,0.3) !important;
}

.hero-image-overlay { position: absolute; right: 10vw; top: 15vh; width: 40vw; height: 65vh; z-index: 1; overflow: hidden; border-radius: 2px; }
.overlay-caption { position: absolute; bottom: 20px; right: -40px; transform: rotate(-90deg) translateY(100%); transform-origin: bottom right; font-family: 'Space Mono', monospace; font-size: 12px; color: #FFF; letter-spacing: 0.1em; mix-blend-mode: difference; }

.scroll-down-hint { position: absolute; bottom: 40px; left: 10vw; z-index: 3; display: flex; align-items: center; gap: 16px; font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: 0.1em; color: rgba(245,242,235,0.6); }
.scroll-down-hint .line { width: 1px; height: 60px; background: rgba(245,242,235,0.3); position: relative; overflow: hidden; }
.scroll-down-hint .line::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #FF3333; animation: slideDownLine 2s ease-in-out infinite; }
@keyframes slideDownLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }

/* ── 杂志跨页排版 ── */
.editorial-spread { padding: 15vh 5vw 25vh; max-width: 1600px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.spread-left { width: 35%; padding-left: 5vw; z-index: 2; }
.spread-subtitle { font-family: 'Bebas Neue', sans-serif; font-size: 80px; letter-spacing: -0.02em; line-height: 1; margin-bottom: 24px; color: #FF3333; }
.spread-desc { font-size: 18px; font-weight: 300; line-height: 1.6; color: #CCC; margin-bottom: 40px; }

.spread-right { width: 55%; position: relative; height: 80vh; }
.overlap-img-1 { position: absolute; left: 0; top: 10%; width: 60%; height: 60%; border: 10px solid #0D0D0D; z-index: 1; overflow: hidden; }
.overlap-img-2 { position: absolute; right: 0; bottom: 10%; width: 50%; height: 50%; border: 10px solid #0D0D0D; z-index: 2; overflow: hidden; }

/* ── Page 2: 拼贴画廊 ── */
.collage-layout { padding: 15vh 10vw 25vh; max-width: 1600px; margin: 0 auto; display: flex; gap: 8vw; }
.collage-text { width: 45%; }
.section-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(80px, 10vw, 150px); font-weight: 500; letter-spacing: -0.02em; line-height: 0.9; margin-bottom: 10vh; }
.features-list { display: flex; flex-direction: column; gap: 6vh; }
.feature-item { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; }
.feat-num { font-family: 'Space Mono', monospace; font-size: 14px; color: #FF3333; margin-bottom: 8px;}
.feat-content h3 { font-size: 24px; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 12px; }
.feat-content p { font-size: 15px; line-height: 1.6; color: #999; font-weight: 300; }

.collage-gallery { width: 55%; position: relative; display: flex; flex-direction: column; gap: 5vh; }
.gallery-card { position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
.card-top { width: 80%; align-self: flex-start; height: 400px; margin-left: 10%; }
.card-bottom { width: 70%; align-self: flex-end; height: 350px; margin-top: -10vh; z-index: 2; border: 4px solid #0D0D0D; }
.gallery-tag { position: absolute; bottom: 20px; left: 20px; background: #F5F2EB; color: #0D0D0D; padding: 8px 16px; font-family: 'Space Mono', monospace; font-size: 12px; font-weight: bold; }
.red-tag { background: #FF3333; color: #FFF; }

/* ── Page 3: Footer ── */
.elegant-footer { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; }
.footer-bg-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: 'Bebas Neue', sans-serif; font-size: 30vw; color: rgba(255,255,255,0.02); white-space: nowrap; pointer-events: none; }
.footer-content { position: relative; z-index: 2; text-align: center; }
.footer-cta-text { font-family: 'Inter', sans-serif; font-size: clamp(32px, 4vw, 64px); font-weight: 300; letter-spacing: -0.02em; margin-bottom: 40px; }
.btn-giant-elegant { display: inline-block; font-family: 'Space Mono', monospace; font-size: 20px; font-weight: bold; letter-spacing: 0.1em; color: #0D0D0D; background: #F5F2EB; text-decoration: none; padding: 20px 48px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.btn-giant-elegant:hover { background: #FF3333; color: #FFF; transform: scale(1.05); }
.footer-links { margin-top: 100px; display: flex; gap: 40px; justify-content: center; color: rgba(245,242,235,0.4); font-size: 12px; font-family: 'Space Mono', monospace; }
.footer-links a { color: rgba(245,242,235,0.6); text-decoration: none; transition: color 0.3s; }
.footer-links a:hover { color: #FFF; }

/* ── 弹窗样式 ── */
.elegant-modal-wrapper { position: fixed; inset: 0; z-index: 99999; background: rgba(13, 13, 13, 0.95); backdrop-filter: blur(12px); display: flex; justify-content: center; align-items: center; }
.elegant-modal { width: 90vw; max-width: 500px; padding: 40px; position: relative; }
.elegant-modal-enter-active .elegant-modal { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.elegant-modal-leave-active .elegant-modal { animation: fadeSlideDown 0.4s ease-in forwards; }
@keyframes fadeSlideDown { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(20px); opacity: 0; } }
.close-btn { position: absolute; top: -20px; right: 0; background: transparent; color: #F5F2EB; border: none; padding: 10px; font-family: 'Space Mono', monospace; font-size: 14px; cursor: pointer; transition: opacity 0.3s; }
.close-btn:hover { opacity: 0.5; color: #FF3333; }
.modal-title { font-family: 'Inter', sans-serif; font-size: 48px; font-weight: 300; letter-spacing: -0.04em; margin-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; color: #F5F2EB; }
.modal-menu-list { list-style: none; }
.modal-menu-list li { border-bottom: 1px solid rgba(255,255,255,0.05); }
.modal-menu-list li a { display: block; font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 300; letter-spacing: -0.02em; color: #F5F2EB; text-decoration: none; padding: 24px 0; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s; }
.modal-menu-list li a:hover { transform: translateX(12px); color: #FF3333; }
.btn-elegant { display: inline-flex; align-items: center; padding: 16px 36px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500; letter-spacing: 0.02em; text-decoration: none; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 2px; }
.btn-elegant.light { background: var(--btn-bg); color: var(--btn-text); border: 1px solid var(--btn-bg); }
.btn-elegant.light:hover { opacity: 0.9; transform: translateY(-3px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
.btn-elegant.outline { background: transparent; color: var(--text-color); border: 1px solid var(--border-color); }
.btn-elegant.outline:hover { border-color: var(--text-color); background: rgba(128,128,128,0.05); }
.empty-state { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 32px; color: #666; letter-spacing: -0.02em; }
.modal-desc { font-size: 14px; color: #999; line-height: 1.6; margin-top: 16px; }
.profile-info { display: flex; gap: 24px; align-items: center; margin-bottom: 32px; color: #F5F2EB; }
.info-text h3 { font-size: 20px; font-weight: 500; letter-spacing: -0.02em; margin-bottom: 4px; }
.info-text p { font-size: 13px; color: #999; font-family: 'Space Mono', monospace; }
</style>
