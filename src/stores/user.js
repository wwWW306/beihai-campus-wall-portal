import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const token = ref(localStorage.getItem('campus-wall-token') || null)
  const userInfo = ref(JSON.parse(localStorage.getItem('campus-wall-user') || 'null'))

  // Getters
  const isLoggedIn = computed(() => !!token.value && !!userInfo.value)

  // Actions
  function login(username, password) {
    // Mock login - in real app, call API
    if (username && password) {
      const mockUser = {
        id: Date.now(),
        name: username,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        bio: '这个人很懒，什么都没写',
        school: '北海艺术设计学院',
        college: '',
        grade: '',
        major: '',
        followers: 0,
        following: 0,
        postsCount: 0
      }
      const mockToken = 'mock_token_' + Date.now()

      token.value = mockToken
      userInfo.value = mockUser
      localStorage.setItem('campus-wall-token', mockToken)
      localStorage.setItem('campus-wall-user', JSON.stringify(mockUser))
      return { success: true }
    }
    return { success: false, error: '用户名或密码错误' }
  }

  function register(username, password, school) {
    // Mock register
    if (username && password) {
      const mockUser = {
        id: Date.now(),
        name: username,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        bio: '这个人很懒，什么都没写',
        school: school || '北海艺术设计学院',
        college: '',
        grade: '',
        major: '',
        followers: 0,
        following: 0,
        postsCount: 0
      }
      const mockToken = 'mock_token_' + Date.now()
      
      token.value = mockToken
      userInfo.value = mockUser
      localStorage.setItem('campus-wall-token', mockToken)
      localStorage.setItem('campus-wall-user', JSON.stringify(mockUser))
      return { success: true }
    }
    return { success: false, error: '注册失败' }
  }

  function logout() {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('campus-wall-token')
    localStorage.removeItem('campus-wall-user')
  }

  function updateProfile(updates) {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...updates }
      localStorage.setItem('campus-wall-user', JSON.stringify(userInfo.value))
    }
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    register,
    logout,
    updateProfile
  }
})
