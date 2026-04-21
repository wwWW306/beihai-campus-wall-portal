import { createPinia } from 'pinia'

export const pinia = createPinia()

export { useUserStore } from './user'
export { usePostsStore } from './posts'
export { useNotificationsStore } from './notifications'
export { useThemeStore } from './theme'
