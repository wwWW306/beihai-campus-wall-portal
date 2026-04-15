import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
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
    path: '/post/new',
    component: () => import('../pages/PostCreate.vue')
  },
  {
    path: '/wall/message/:id',
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
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
