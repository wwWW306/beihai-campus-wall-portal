import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref(JSON.parse(localStorage.getItem('campus-wall-notifications') || '[]'))

  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

  function save() {
    localStorage.setItem('campus-wall-notifications', JSON.stringify(notifications.value))
  }

  function addNotification(type, message, relatedId = null) {
    const notification = {
      id: Date.now(),
      type,
      message,
      relatedId,
      read: false,
      createTime: Date.now()
    }
    notifications.value.unshift(notification)
    save()
  }

  function markAsRead(id) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
      save()
    }
  }

  function markAllAsRead() {
    notifications.value.forEach(n => n.read = true)
    save()
  }

  function clearAll() {
    notifications.value = []
    save()
  }

  function generateMockNotifications() {
    if (notifications.value.length === 0) {
      notifications.value = [
        { id: 1, type: 'like', message: '小明同学 点赞了你的帖子', relatedId: 1, read: false, createTime: Date.now() - 300000 },
        { id: 2, type: 'comment', message: '美食侦探 评论了你的帖子："太真实了"', relatedId: 2, read: false, createTime: Date.now() - 600000 },
        { id: 3, type: 'follow', message: '新用户 开始关注你', relatedId: null, read: true, createTime: Date.now() - 3600000 },
      ]
      save()
    }
  }

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    generateMockNotifications
  }
})
