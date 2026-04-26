import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const routes = [
  {
    path: '/',
    component: () => import('../pages/WebGLLanding.vue')
  },
  {
    path: '/home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/wall',
    component: () => import('../pages/WallPage.vue')
  },
  {
    path: '/search',
    component: () => import('../pages/SearchPage.vue')
  },
  {
    path: '/notifications',
    component: () => import('../pages/NotificationsPage.vue')
  },
  {
    path: '/partitions',
    component: () => import('../pages/PartitionPage.vue')
  },
  {
    path: '/partitions/:id',
    component: () => import('../pages/PartitionPage.vue')
  },
  {
    path: '/calendar',
    component: () => import('../pages/CalendarPage.vue')
  },
  {
    path: '/post/new',
    component: () => import('../pages/PostCreate.vue')
  },
  {
    path: '/wall/message/:id',
    alias: '/post/:id',
    component: () => import('../pages/MessageDetail.vue')
  },
  {
    path: '/user/:id',
    component: () => import('../pages/UserProfile.vue')
  },
  {
    path: '/profile',
    component: () => import('../pages/UserProfile.vue')
  },
  {
    path: '/login',
    component: () => import('../pages/admin/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('../pages/admin/LoginPage.vue')
  },
  {
    path: '/admin',
    component: () => import('../pages/admin/DashboardPage.vue')
  },
  {
    path: '/admin/wall',
    component: () => import('../pages/admin/WallManage.vue')
  },
  {
    path: '/admin/users',
    component: () => import('../pages/admin/UserManage.vue')
  },
  {
    path: '/admin/reports',
    component: () => import('../pages/admin/ReportManage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  
  // 设置标题
  const title = to.meta.title || 'Campus Wall'
  document.title = title
  
  next()
})

router.afterEach(() => {
  NProgress.done()
})

// 智能返回机制
export function smartBack(fallback = '/wall') {
  // 现代框架成熟的做法：检查是否有真正的历史回退路径
  // vue-router 4.x 的 history.state.back 是一个成熟的判断标准
  if (window.history.state && window.history.state.back) {
    router.back()
  } else {
    router.push(fallback)
  }
}

export default router
