<template>
  <div class="search-page">
    <!-- 搜索栏 -->
    <div class="search-header">
      <div class="search-bar">
        <Icons name="search" :size="18" class="search-icon" />
        <input
          v-model="query"
          class="search-input"
          placeholder="搜索用户、话题或内容..."
          @keyup.enter="doSearch"
          ref="searchInputRef"
        />
        <button v-if="query" class="search-clear" @click="query = ''">
          <Icons name="close" :size="16" />
        </button>
      </div>
      <button class="btn btn-ghost" @click="$router.back()">取消</button>
    </div>

    <!-- 搜索结果 -->
    <div v-if="hasSearched" class="search-results">
      <!-- 用户结果 -->
      <div v-if="userResults.length" class="result-section">
        <div class="result-header">用户</div>
        <div v-for="u in userResults" :key="u.id" class="user-result-item" @click="$router.push(`/user/${u.id}`)">
          <img :src="u.avatar" class="avatar" :alt="u.name" />
          <div class="user-result-info">
            <span class="user-result-name">{{ u.name }}</span>
            <span class="user-result-bio">{{ u.bio }}</span>
          </div>
          <button class="btn btn-secondary btn-xs">关注</button>
        </div>
      </div>

      <!-- 帖子结果 -->
      <div v-if="postResults.length" class="result-section">
        <div class="result-header">帖子</div>
        <PostCard v-for="p in postResults" :key="p.id" :post="p" />
      </div>

      <div v-if="!userResults.length && !postResults.length" class="empty-state">
        <Icons name="search" :size="40" />
        <p>没有找到相关结果</p>
      </div>
    </div>

    <!-- 热搜 -->
    <div v-else class="hot-search">
      <div class="hot-header">
        <Icons name="trending" :size="16" />
        <span>热搜榜</span>
      </div>
      <div class="hot-list">
        <a
          v-for="(item, idx) in hotSearch"
          :key="idx"
          href="#"
          class="hot-item"
          @click.prevent="query = item.title; doSearch()"
        >
          <span class="hot-rank" :class="{ 'hot-rank--top': idx < 3 }">{{ idx + 1 }}</span>
          <div class="hot-content">
            <span class="hot-title">{{ item.title }}</span>
            <span class="hot-desc">{{ item.desc }}</span>
          </div>
          <span class="hot-count">{{ item.count }}</span>
        </a>
      </div>

      <!-- 搜索历史 -->
      <div v-if="history.length" class="history-section">
        <div class="history-header">
          <span>搜索历史</span>
          <button class="btn btn-ghost btn-xs" @click="history = []">清除</button>
        </div>
        <div class="history-tags">
          <button
            v-for="h in history"
            :key="h"
            class="history-tag"
            @click="query = h; doSearch()"
          >{{ h }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icons from '../components/Icons.vue'
import PostCard from '../components/PostCard.vue'

const query = ref('')
const hasSearched = ref(false)
const searchInputRef = ref(null)
const history = ref(['期末复习', '图书馆', '食堂'])

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

function doSearch() {
  if (!query.value.trim()) return
  hasSearched.value = true
  if (!history.value.includes(query.value)) {
    history.value.unshift(query.value)
  }
  userResults.value = query.value.includes('同学') ? [
    { id: 1, name: '小明同学', bio: '计算机专业大三学生', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }
  ] : []
  postResults.value = [
    {
      id: 1, content: `关于「${query.value}」的相关讨论...`, authorName: '热心同学',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Help',
      authorId: 2, createTime: Date.now() - 1800000, likeCount: 123, commentCount: 45,
      isLiked: false, partition: '校园生活', images: []
    }
  ]
}
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  background: var(--color-bg);
}

.search-header {
  position: sticky;
  top: 56px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: white;
  border-bottom: 1px solid var(--color-border-light);
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--color-bg);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  transition: border-color var(--transition-fast);
}

.search-bar:focus-within {
  border-color: var(--color-primary);
}

.search-icon { color: var(--color-text-muted); flex-shrink: 0; }

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--color-text);
  outline: none;
  font-family: inherit;
}

.search-input::placeholder { color: var(--color-text-muted); }

.search-clear {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  display: flex;
  padding: 2px;
}

/* 热搜 */
.hot-search { padding: 16px 12px; }
.hot-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
}
.hot-list { display: flex; flex-direction: column; gap: 2px; }
.hot-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 8px;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background var(--transition-fast);
}
.hot-item:hover { background: var(--color-surface); }
.hot-rank {
  width: 18px;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-muted);
  text-align: center;
  flex-shrink: 0;
}
.hot-rank--top { color: var(--color-primary); }
.hot-content { flex: 1; min-width: 0; }
.hot-title { display: block; font-size: 14px; font-weight: 500; color: var(--color-text); }
.hot-desc { display: block; font-size: 11px; color: var(--color-text-muted); }
.hot-count { font-size: 11px; color: var(--color-text-muted); }

/* 搜索历史 */
.history-section { margin-top: 20px; }
.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}
.btn-xs { padding: 3px 8px; font-size: 12px; }
.history-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.history-tag {
  padding: 5px 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 13px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.history-tag:hover { border-color: var(--color-primary); color: var(--color-primary); }

/* 结果 */
.search-results { padding: 12px; }
.result-section { margin-bottom: 16px; }
.result-header {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
  padding-left: 4px;
}
.user-result-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  margin-bottom: 6px;
  cursor: pointer;
}
.user-result-info { flex: 1; min-width: 0; }
.user-result-name { display: block; font-size: 14px; font-weight: 600; color: var(--color-text); }
.user-result-bio { display: block; font-size: 12px; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

@media (max-width: 768px) {
  .search-header { padding: 10px 12px; }
}
</style>
