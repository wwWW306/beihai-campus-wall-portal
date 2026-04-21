<template>
  <div class="detail-page">
    <div class="container">
      <div class="detail-nav">
        <button class="back-btn" @click="smartBack()"><Icons name="back" :size="20" /></button>
        <span class="nav-title">帖子详情</span>
      </div>

      <div class="detail-layout">
        <div class="detail-main">
          <div v-if="loading" class="loading-state">
            <div class="spinner-small"></div>
            <span>加载中...</span>
          </div>
          
          <template v-else-if="post">
            <article class="detail-card">
            <div class="detail-header">
              <router-link :to="`/user/${post.authorId}`" class="author-link">
                <img :src="post.authorAvatar" class="avatar" :alt="post.authorName" />
                <div class="author-meta">
                  <span class="author-name">{{ post.authorName }}</span>
                  <span class="post-time">{{ formatTime(post.createTime) }}</span>
                </div>
              </router-link>
              <button class="more-btn"><Icons name="dots" :size="18" /></button>
            </div>

            <div class="detail-content">
              <p class="detail-text">{{ post.content }}</p>
              <div v-if="post.images && post.images.length === 1" class="detail-img-single">
                <img :src="post.images[0]" alt="图片" @click="openImage(post.images[0])" />
              </div>
              <div v-if="post.partition" class="detail-partition"><span class="tag">{{ post.partition }}</span></div>
            </div>

            <div class="detail-actions">
              <button class="action-btn" :class="{ 'action-btn--liked': post.isLiked }" @click="toggleLike">
                <Icons :name="post.isLiked ? 'heart-solid' : 'heart'" :size="18" /><span>{{ post.likeCount }}</span>
              </button>
              <button class="action-btn"><Icons name="chat" :size="18" /><span>{{ comments.length }}</span></button>
              <button class="action-btn"><Icons name="share" :size="18" /></button>
              <button class="action-btn"><Icons name="bookmark" :size="18" /></button>
            </div>
          </article>

          <div class="comments-section">
            <div class="comments-header"><span class="comments-title">{{ comments.length }} 条评论</span></div>
            <div class="comment-input-area">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" class="avatar avatar-sm" />
              <div class="comment-input-wrapper">
                <textarea v-model="newComment" class="comment-input" placeholder="说点什么鼓励一下吧～ 😊" rows="1" @input="autoResize"></textarea>
                <button class="btn btn-primary btn-sm" :disabled="!newComment.trim()" @click="submitComment"><Icons name="send" :size="14" /></button>
              </div>
            </div>
            <div class="comment-list">
              <div v-for="c in comments" :key="c.id" class="comment-item">
                <router-link :to="`/user/${c.authorId}`"><img :src="c.authorAvatar" class="avatar avatar-sm" :alt="c.authorName" /></router-link>
                <div class="comment-body">
                  <div class="comment-header-row">
                    <router-link :to="`/user/${c.authorId}`" class="comment-author">{{ c.authorName }}</router-link>
                    <span class="comment-time">{{ formatTime(c.createTime) }}</span>
                  </div>
                  <p class="comment-text">{{ c.content }}</p>
                  <div class="comment-actions">
                    <button class="comment-action" :class="{ 'comment-action--active': c.isLiked }" @click="toggleCommentLike(c)">
                      <Icons :name="c.isLiked ? 'heart-solid' : 'heart'" :size="13" /><span>{{ c.likeCount }}</span>
                    </button>
                    <button class="comment-action">回复</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </template>
          <div v-else class="empty-state" style="padding-top: 60px;">
            <span style="font-size:40px">🕳️</span>
            <p>该帖子可能已被删除或不存在</p>
          </div>
        </div>

        <aside class="detail-sidebar" v-if="post">
          <div class="sidebar-card">
            <h3 class="sidebar-title"><Icons name="trending" :size="16" /> 相关推荐</h3>
            <div class="related-list">
              <a v-for="(r, idx) in relatedPosts" :key="idx" href="#" class="related-item" @click.prevent="$router.push(`/post/${r.id}`)">
                <span class="related-num">{{ idx + 1 }}</span><span class="related-text">{{ r.content.substring(0, 20) }}...</span>
              </a>
            </div>
          </div>
          <div class="sidebar-card">
            <h3 class="sidebar-title"><Icons name="user" :size="16" /> 发布者</h3>
            <div class="author-card-info">
              <img :src="post.authorAvatar" class="avatar avatar-lg" :alt="post.authorName" />
              <div class="author-name-text">{{ post.authorName }}</div>
              <div class="author-desc">活跃用户 · 128粉丝</div>
              <div class="author-btns">
                <button class="btn btn-primary btn-sm" style="flex:1">关注</button>
                <button class="btn btn-secondary btn-sm" style="flex:1">私信</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '../stores'
import { smartBack } from '../router'
import Icons from '../components/Icons.vue'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const loading = ref(true)
const post = ref(null)
const relatedPosts = ref([])

const comments = ref([
  { id: 1, content: '终于开了！我已经预约了明天的座位 🎉', authorName: '学习达人', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Study', authorId: 2, createTime: Date.now() - 600000, likeCount: 23, isLiked: false },
  { id: 2, content: '提醒一下，二楼靠窗的位置下午会有太阳直射，建议坐里面一点', authorName: '学长提醒', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Senior', authorId: 3, createTime: Date.now() - 300000, likeCount: 45, isLiked: true },
])
const newComment = ref('')

async function loadData() {
  loading.value = true
  const id = route.params.id
  post.value = await postsStore.getPostDetail(id)
  if (post.value) {
    relatedPosts.value = await postsStore.fetchRelatedPosts(id)
  }
  loading.value = false
}

onMounted(() => {
  loadData()
})

watch(() => route.params.id, () => {
  loadData()
})

function toggleLike() { 
  if(post.value) {
    postsStore.toggleLike(post.value.id)
    const updated = postsStore.getPostById(post.value.id)
    if(updated) {
      post.value.isLiked = updated.isLiked
      post.value.likeCount = updated.likeCount
    }
  }
}
function toggleCommentLike(c) { c.isLiked = !c.isLiked; c.likeCount += c.isLiked ? 1 : -1 }
function submitComment() {
  if (!newComment.value.trim() || !post.value) return
  comments.value.unshift({ id: Date.now(), content: newComment.value, authorName: '当前用户', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', authorId: 999, createTime: Date.now(), likeCount: 0, isLiked: false })
  newComment.value = ''
  post.value.commentCount++
}
function openImage(img) { window.open(img, '_blank') }
function autoResize(e) { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }
function formatTime(ts) {
  const d = new Date(ts), now = new Date(), diff = (now - d) / 1000
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff/60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff/3600)}小时前`
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.detail-page { min-height: 100vh; padding: 16px 0 40px; }
.detail-nav { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.back-btn { width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-surface); border: 1px solid var(--color-border); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text); transition: all var(--transition-fast); }
.back-btn:hover { background: var(--color-surface-alt); }
.nav-title { font-size: 16px; font-weight: 600; color: var(--color-text); }

.detail-layout { display: grid; grid-template-columns: 1fr 280px; gap: 24px; align-items: start; }

.detail-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 20px; margin-bottom: 16px; }
.detail-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.author-link { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.author-meta { display: flex; flex-direction: column; }
.author-name { font-size: 15px; font-weight: 600; color: var(--color-text); }
.post-time { font-size: 12px; color: var(--color-text-muted); }
.more-btn { width: 32px; height: 32px; border-radius: var(--radius-full); background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); }
.more-btn:hover { background: var(--color-surface-alt); }

.detail-text { font-size: 16px; line-height: 1.75; color: var(--color-text); margin-bottom: 12px; word-break: break-word; }
.detail-img-single img { width: 100%; max-height: 500px; object-fit: cover; border-radius: var(--radius-lg); cursor: zoom-in; margin-bottom: 12px; }
.detail-partition { margin-top: 4px; }

.detail-actions { display: flex; gap: 4px; padding-top: 14px; border-top: 1px solid var(--color-border-light); }
.action-btn { display: flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: var(--radius-full); font-size: 14px; font-weight: 500; color: var(--color-text-muted); background: transparent; border: none; cursor: pointer; transition: all var(--transition-fast); font-family: var(--font-sans); }
.action-btn:hover { background: var(--color-surface-alt); color: var(--color-text-secondary); }
.action-btn--liked { color: var(--color-primary); }

.comments-section { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 20px; }
.comments-header { margin-bottom: 14px; }
.comments-title { font-size: 15px; font-weight: 600; color: var(--color-text); }

.comment-input-area { display: flex; gap: 10px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--color-border-light); }
.comment-input-wrapper { flex: 1; display: flex; gap: 8px; align-items: flex-end; }
.comment-input { flex: 1; padding: 8px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: 14px; font-family: var(--font-sans); resize: none; outline: none; max-height: 120px; overflow-y: auto; line-height: 1.5; transition: border-color var(--transition-fast); color: var(--color-text); }
.comment-input:focus { border-color: var(--color-primary); }
.comment-input::placeholder { color: var(--color-text-muted); }

.comment-list { display: flex; flex-direction: column; gap: 16px; }
.comment-item { display: flex; gap: 10px; }
.comment-body { flex: 1; min-width: 0; }
.comment-header-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
.comment-author { font-size: 14px; font-weight: 600; color: var(--color-text); text-decoration: none; }
.comment-author:hover { color: var(--color-primary); }
.comment-time { font-size: 11px; color: var(--color-text-muted); }
.comment-text { font-size: 14px; line-height: 1.6; color: var(--color-text); }
.comment-actions { display: flex; gap: 12px; margin-top: 6px; }
.comment-action { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--color-text-muted); background: transparent; border: none; cursor: pointer; padding: 2px 0; transition: color var(--transition-fast); font-family: var(--font-sans); }
.comment-action:hover { color: var(--color-text); }
.comment-action--active { color: var(--color-primary); }

.detail-sidebar { position: sticky; top: 76px; display: flex; flex-direction: column; gap: 16px; }
.sidebar-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 16px; }
.sidebar-title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; color: var(--color-text); margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--color-border-light); }
.related-list { display: flex; flex-direction: column; gap: 2px; }
.related-item { display: flex; align-items: center; gap: 10px; padding: 6px 4px; text-decoration: none; border-radius: var(--radius-sm); transition: background var(--transition-fast); }
.related-item:hover { background: var(--color-surface-alt); }
.related-num { font-size: 13px; font-weight: 700; color: var(--color-text-muted); width: 16px; flex-shrink: 0; }
.related-text { font-size: 13px; color: var(--color-text); line-height: 1.4; }

.author-card-info { text-align: center; }
.author-card-info .avatar { margin: 0 auto 8px; display: block; }
.author-name-text { font-weight: 600; font-size: 15px; color: var(--color-text); }
.author-desc { font-size: 12px; color: var(--color-text-muted); margin-top: 4px; }
.author-btns { display: flex; gap: 8px; margin-top: 12px; }

.loading-state { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 60px 0; color: var(--color-text-muted); font-size: 14px; }
.spinner-small { width: 16px; height: 16px; border: 2px solid var(--color-border); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 768px) {
  .detail-layout { grid-template-columns: 1fr; }
  .detail-sidebar { display: none; }
}
</style>
