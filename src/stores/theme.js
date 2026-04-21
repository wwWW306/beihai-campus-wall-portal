import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('campus-wall-theme') || 'light')

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('campus-wall-theme', theme.value)
  }

  function setTheme(val) {
    theme.value = val
    localStorage.setItem('campus-wall-theme', val)
  }

  return { theme, toggleTheme, setTheme }
})
