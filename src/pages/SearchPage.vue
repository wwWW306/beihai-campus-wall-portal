<template>
  <div class="search-page" data-page="app">
    <div class="container">
      <div class="search-header">
        <button class="back-btn" @click="handleBack"><Icons name="back" :size="20" /></button>
        <div class="search-bar" :class="{ 'search-bar--focus': isFocused }">
          <Icons name="search" :size="18" class="search-icon" />
          <input v-model="query" class="search-input" placeholder="想找什么？输入试试看" @keyup.enter="doSearch" @focus="isFocused = true" @blur="isFocused = false" />
          <button v-if="query" class="search-clear" @click="query = ''; hasSearched = false"><Icons name="close" :size="16" /></button>
        </div>
      </div>

      <div v-if="hasSearched" class="search-results">
        <div v-if="loading" class="loading-state">
          <div class="spinner-small"></div>
          <span>搜索中... 🔍</span>
        </div>
        <template v-else>
        <div v-if="userResults.length" class="result-section">
          <div class="section-label">用户</div>
          <div v-for="u in userResults" :key="u.id" class="user-result" @click="$router.push(`/user/${u.id}`)">
            <img :src="u.avatar" class="avatar" :alt="u.name" />
            <div class="user-result-info">
              <span class="user-result-name">{{ u.name }}</span>
              <span class="user-result-bio">{{ u.bio }}</span>
            </div>
            <button class="btn btn-secondary btn-sm">关注</button>
          </div>
        </div>
        <div v-if="postResults.length" class="result-section">
          <div class="section-label">帖子</div>
          <PostCard v-for="p in postResults" :key="p.id" :post="p" />
        </div>
        <div v-if="!userResults.length && !postResults.length" class="empty-state">
          <Icons name="search" :size="40" />
          <p>啊哦，没找到呢～换个关键词试试？</p>
        </div>
        </template>
      </div>

      <div v-else class="search-default">
        <div class="default-section">
          <div class="section-header"><Icons name="trending" :size="18" /><span>热搜榜</span></div>
          <div class="hot-list">
            <a v-for="(item, idx) in hotSearch" :key="idx" href="#" class="hot-item" @click.prevent="query = item.title; doSearch()">
              <span class="hot-rank" :class="{ 'hot-rank--top': idx < 3 }">{{ idx + 1 }}</span>
              <div class="hot-content">
                <span class="hot-title">{{ item.title }}</span>
                <span class="hot-desc">{{ item.desc }}</span>
              </div>
              <span class="hot-count">{{ item.count }}</span>
            </a>
          </div>
        </div>
        <div v-if="history.length" class="default-section">
          <div class="section-header"><Icons name="clock" :size="18" /><span>搜索历史</span><button class="btn btn-ghost btn-sm clear-btn" @click="history = []">清除</button></div>
          <div class="history-tags">
            <button v-for="h in history" :key="h" class="history-tag" @click="query = h; doSearch()">{{ h }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePostsStore } from '../stores'
import { smartBack } from '../router'
import Icons from '../components/Icons.vue'
import PostCard from '../components/PostCard.vue'

const router = useRouter()
const route = useRoute()

const query = ref(route.query.q || '')
const hasSearched = ref(!!route.query.q)
const isFocused = ref(false)
const history = ref(['期末复习', '四六级', '食堂', '兼职', '考研'])
const loading = ref(false)
const postsStore = usePostsStore()

const hotSearch = [
  { title: '#大学生期末复习#', desc: '讨论期末高效复习方法', count: '52.3万' },
  { title: '图书馆新规惹争议', desc: '校园论坛热议话题', count: '28.7万' },
  { title: '食堂新出网红菜', desc: '校园美食探店', count: '15.2万' },
  { title: '暑期实习求内推', desc: '求职招聘', count: '9.8万' },
  { title: '校园演唱会抢票', desc: '活动预告', count: '6.4万' },
  { title: '考研还是就业', desc: '职业规划讨论', count: '4.1万' },
]
const userResults = ref([])
const postResults = ref([])

async function doSearch() {
  if (!query.value.trim()) return
  router.push({ query: { q: query.value } })
  hasSearched.value = true
  loading.value = true
  
  if (!history.value.includes(query.value)) history.value.unshift(query.value)
  
  userResults.value = query.value.includes('同学') ? [
    { id: 1, name: '小明同学', bio: '计算机专业大三学生', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }
  ] : []
  
  postResults.value = await postsStore.searchPostsAsync(query.value)
  loading.value = false
}

// 监听路由参数变化（如点击回退或历史记录）
watch(() => route.query.q, (newQ) => {
  if (newQ) {
    query.value = newQ
    doSearch()
  } else {
    query.value = ''
    hasSearched.value = false
    postResults.value = []
  }
})

onMounted(() => {
  if (route.query.q) doSearch()
})

function handleBack() {
  smartBack()
}
</script>

<style scoped>
.search-page { min-height: 100vh; padding-top: 16px; padding-bottom: 40px; }
.search-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; max-width: 640px; margin-left: auto; margin-right: auto; }
.back-btn { width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-surface); border: 1px solid var(--color-border); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text); transition: all var(--transition-fast); flex-shrink: 0; }
.back-btn:hover { background: var(--color-surface-alt); }
.search-bar { flex: 1; display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: var(--color-surface); border-radius: var(--radius-full); border: 1px solid var(--color-border); transition: all var(--transition-fast); }
.search-bar--focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-light); }
.search-icon { color: var(--color-text-muted); flex-shrink: 0; }
.search-input { flex: 1; border: none; background: transparent; font-size: 15px; color: var(--color-text); outline: none; font-family: var(--font-sans); }
.search-input::placeholder { color: var(--color-text-muted); }
.search-clear { background: transparent; border: none; cursor: pointer; color: var(--color-text-muted); display: flex; padding: 2px; }
.search-default { max-width: 640px; margin: 0 auto; }
.default-section { margin-bottom: 28px; }
.section-header { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 600; color: var(--color-text); margin-bottom: 14px; }
.clear-btn { margin-left: auto; }
.hot-list { display: flex; flex-direction: column; }
.hot-item { display: flex; align-items: center; gap: 14px; padding: 10px 8px; border-radius: var(--radius-md); text-decoration: none; transition: background var(--transition-fast); }
.hot-item:hover { background: var(--color-surface); }
.hot-rank { width: 20px; font-size: 15px; font-weight: 700; color: var(--color-text-muted); text-align: center; flex-shrink: 0; }
.hot-rank--top { color: var(--color-primary); }
.hot-content { flex: 1; min-width: 0; }
.hot-title { display: block; font-size: 14px; font-weight: 500; color: var(--color-text); }
.hot-desc { display: block; font-size: 12px; color: var(--color-text-muted); margin-top: 2px; }
.hot-count { font-size: 12px; color: var(--color-text-muted); flex-shrink: 0; }
.history-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.history-tag { padding: 6px 14px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-full); font-size: 13px; color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast); font-family: var(--font-sans); }
.history-tag:hover { border-color: var(--color-primary); color: var(--color-primary); }
.search-results { max-width: 640px; margin: 0 auto; }
.result-section { margin-bottom: 20px; }
.section-label { font-size: 13px; font-weight: 600; color: var(--color-text-muted); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em; }
.user-result { display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); margin-bottom: 8px; cursor: pointer; transition: box-shadow var(--transition-fast); }
.user-result:hover { box-shadow: var(--shadow-sm); }
.user-result-info { flex: 1; min-width: 0; }
.user-result-name { display: block; font-size: 15px; font-weight: 600; color: var(--color-text); }
.user-result-bio { display: block; font-size: 13px; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.loading-state { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 40px 0; color: var(--color-text-muted); font-size: 14px; }
.spinner-small { width: 16px; height: 16px; border: 2px solid var(--color-border); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
