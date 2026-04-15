<template>
  <div class="detail-page">
    <div class="container">
      <!-- 返回导航 -->
      <div class="detail-nav">
        <button class="icon-btn-back" @click="$router.back()">
          <Icons name="back" :size="20" />
        </button>
        <span class="nav-title">帖子详情</span>
      </div>

      <div class="detail-layout">
        <!-- 主内容 -->
        <div class="detail-main">
          <!-- 帖子卡片 -->
          <article class="detail-card card">
            <!-- 作者区 -->
            <div class="detail-header">
              <router-link :to="`/user/${post.authorId}`" class="author-link">
                <img :src="post.authorAvatar" class="avatar" :alt="post.authorName" />
                <div class="author-meta">
                  <span class="author-name">{{ post.authorName }}</span>
                  <span class="post-time">{{ formatTime(post.createTime) }}</span>
                </div>
              </router-link>
              <button class="icon-btn-sm">
                <Icons name="dots" :size="18" />
              </button>
            </div>

            <!-- 内容 -->
            <div class="detail-content">
              <p class="detail-text">{{ post.content }}</p>

              <!-- 单图 -->
              <div v-if="post.images && post.images.length === 1" class="detail-img-single">
                <img :src="post.images[0]" alt="图片" @click="openImage(post.images[0])" />
              </div>
              <!-- 多图 -->
              <div v-else-if="post.images && post.images.length > 1" class="detail-img-grid">
                <img
                  v-for="(img, idx) in post.images"
                  :key="idx"
                  :src="img"
                  alt=""
                  @click="openImage(img)"
                />
              </div>

              <!-- 分区标签 -->
              <div v-if="post.partition" class="detail-partition">
                <span class="tag tag-blue">{{ post.partition }}</span>
              </div>
            </div>

            <!-- 互动栏 -->
            <div class="detail-actions">
              <button class="action-btn" :class="{ 'action-btn--active': post.isLiked }" @click="toggleLike">
                <Icons :name="post.isLiked ? 'heart-solid' : 'heart'" :size="18" />
                <span>{{ post.likeCount }}</span>
              </button>
              <button class="action-btn">
                <Icons name="chat" :size="18" />
                <span>{{ comments.length }}</span>
              </button>
              <button class="action-btn">
                <Icons name="share" :size="18" />
              </button>
              <button class="action-btn">
                <Icons name="bookmark" :size="18" />
              </button>
            </div>
          </article>

          <!-- 评论区 -->
          <div class="comments-section card">
            <div class="comments-header">
              <span class="comments-title">{{ comments.length }} 条评论</span>
            </div>

            <!-- 评论输入 -->
            <div class="comment-input-area">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" class="avatar avatar-sm" />
              <div class="comment-input-wrapper">
                <textarea
                  v-model="newComment"
                  class="comment-input"
                  placeholder="写下你的评论..."
                  rows="1"
                  @input="autoResize"
                ></textarea>
                <button class="btn btn-primary btn-sm" :disabled="!newComment.trim()" @click="submitComment">
                  <Icons name="send" :size="14" />
                </button>
              </div>
            </div>

            <!-- 评论列表 -->
            <div class="comment-list">
              <div v-for="c in comments" :key="c.id" class="comment-item">
                <router-link :to="`/user/${c.authorId}`">
                  <img :src="c.authorAvatar" class="avatar avatar-sm" :alt="c.authorName" />
                </router-link>
                <div class="comment-body">
                  <div class="comment-header">
                    <router-link :to="`/user/${c.authorId}`" class="comment-author">{{ c.authorName }}</router-link>
                    <span class="comment-time">{{ formatTime(c.createTime) }}</span>
                  </div>
                  <p class="comment-text">{{ c.content }}</p>
                  <div class="comment-actions">
                    <button class="comment-action" :class="{ 'comment-action--active': c.isLiked }" @click="toggleCommentLike(c)">
                      <Icons :name="c.isLiked ? 'heart-solid' : 'heart'" :size="13" />
                      <span>{{ c.likeCount }}</span>
                    </button>
                    <button class="comment-action">回复</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 侧栏 -->
        <aside class="detail-sidebar">
          <!-- 相关推荐 -->
          <div class="card">
            <div class="card-header">
              <Icons name="trending" :size="16" />
              <span class="card-title">相关推荐</span>
            </div>
            <div class="related-list">
              <a v-for="(r, idx) in relatedPosts" :key="idx" href="#" class="related-item">
                <span class="related-num">{{ idx + 1 }}</span>
                <span class="related-text">{{ r }}</span>
              </a>
            </div>
          </div>

          <!-- 作者信息 -->
          <div class="card">
            <div class="card-header">
              <Icons name="user" :size="16" />
              <span class="card-title">发布者</span>
            </div>
            <div class="author-card">
              <img :src="post.authorAvatar" class="avatar avatar-lg" :alt="post.authorName" style="margin:0 auto 8px" />
              <div class="author-name" style="text-align:center;font-weight:600">{{ post.authorName }}</div>
              <div class="author-desc" style="text-align:center;font-size:12px;color:var(--color-text-muted);margin-top:4px">活跃用户 · 128粉丝</div>
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
import { ref } from 'vue'
import Icons from '../components/Icons.vue'

const post = ref({
  id: 1,
  content: '图书馆终于开了空调，期末复习的同学们冲啊！📚 建议大家提前预约座位，避免高峰期排队~ 环境很好，学习效率直接拉满！',
  authorName: '小明同学',
  authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  authorId: 1,
  createTime: Date.now() - 1800000,
  likeCount: 342,
  isLiked: false,
  partition: '校园生活',
  images: []
})

const comments = ref([
  {
    id: 1,
    content: '终于开了！我已经预约了明天的座位 🎉',
    authorName: '学习达人',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Study',
    authorId: 2,
    createTime: Date.now() - 600000,
    likeCount: 23,
    isLiked: false,
  },
  {
    id: 2,
    content: '提醒一下，二楼靠窗的位置下午会有太阳直射，建议带个帽子或者坐里面一点',
    authorName: '学长提醒',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Senior',
    authorId: 3,
    createTime: Date.now() - 300000,
    likeCount: 45,
    isLiked: true,
  }
])

const relatedPosts = [
  '图书馆座位预约系统上线啦',
  '期末复习好物推荐',
  '校园打印店合集',
  '自习室避坑指南',
]

const newComment = ref('')

function toggleLike() {
  post.value.isLiked = !post.value.isLiked
  post.value.likeCount += post.value.isLiked ? 1 : -1
}

function toggleCommentLike(c) {
  c.isLiked = !c.isLiked
  c.likeCount += c.isLiked ? 1 : -1
}

function submitComment() {
  if (!newComment.value.trim()) return
  comments.value.unshift({
    id: Date.now(),
    content: newComment.value,
    authorName: '当前用户',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    authorId: 99,
    createTime: Date.now(),
    likeCount: 0,
    isLiked: false,
  })
  newComment.value = ''
}

function openImage(img) { window.open(img, '_blank') }

function autoResize(e) {
  e.target.style.height = 'auto'
  e.target.style.height = e.target.scrollHeight + 'px'
}

function formatTime(ts) {
  const d = new Date(ts)
  const now = new Date()
  const diff = (now - d) / 1000
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff/60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff/3600)}小时前`
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.detail-page { padding: 16px 0 40px; }
.detail-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.icon-btn-back {
  width: 34px; height: 34px;
  border-radius: var(--radius-full);
  background: var(--color-bg);
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text);
  transition: all var(--transition-fast);
}
.icon-btn-back:hover { background: var(--color-border-light); }
.nav-title { font-size: 16px; font-weight: 600; color: var(--color-text); }

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 20px;
  align-items: start;
}

/* 帖子卡片 */
.detail-card { padding: 16px; margin-bottom: 12px; }
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.author-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.author-meta { display: flex; flex-direction: column; }
.author-name { font-size: 15px; font-weight: 600; color: var(--color-text); }
.post-time { font-size: 12px; color: var(--color-text-muted); }
.icon-btn-sm {
  width: 32px; height: 32px;
  border-radius: var(--radius-full);
  background: transparent; border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}
.icon-btn-sm:hover { background: var(--color-bg); color: var(--color-text); }

.detail-text {
  font-size: 16px;
  line-height: 1.75;
  color: var(--color-text);
  margin-bottom: 14px;
  word-break: break-word;
}
.detail-img-single img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  cursor: zoom-in;
  margin-bottom: 12px;
}
.detail-img-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 12px;
}
.detail-img-grid img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  cursor: zoom-in;
  transition: transform var(--transition-fast);
}
.detail-img-grid img:hover { transform: scale(1.03); }
.detail-partition { margin-top: 4px; }

.detail-actions {
  display: flex;
  gap: 4px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border-light);
}
.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.action-btn:hover { background: var(--color-bg); color: var(--color-text); }
.action-btn--active { color: var(--color-primary); }
.action-btn--active:hover { background: var(--color-primary-light); }

/* 评论区 */
.comments-section { padding: 16px; }
.comments-header { margin-bottom: 14px; }
.comments-title { font-size: 15px; font-weight: 600; color: var(--color-text); }

.comment-input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border-light);
}
.comment-input-wrapper { flex: 1; display: flex; gap: 8px; align-items: flex-end; }
.comment-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-family: inherit;
  resize: none;
  outline: none;
  max-height: 120px;
  overflow-y: auto;
  line-height: 1.5;
  transition: border-color var(--transition-fast);
}
.comment-input:focus { border-color: var(--color-primary); }
.comment-input::placeholder { color: var(--color-text-muted); }

.comment-list { display: flex; flex-direction: column; gap: 16px; }
.comment-item { display: flex; gap: 10px; }
.comment-body { flex: 1; min-width: 0; }
.comment-header { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
.comment-author { font-size: 14px; font-weight: 600; color: var(--color-text); text-decoration: none; }
.comment-time { font-size: 11px; color: var(--color-text-muted); }
.comment-text { font-size: 14px; line-height: 1.6; color: var(--color-text); }
.comment-actions { display: flex; gap: 12px; margin-top: 6px; }
.comment-action {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 0;
  transition: color var(--transition-fast);
}
.comment-action:hover { color: var(--color-text); }
.comment-action--active { color: var(--color-primary); }

/* 侧栏 */
.detail-sidebar { position: sticky; top: 76px; display: flex; flex-direction: column; gap: 12px; }
.card-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; padding: 14px 14px 0; }
.card-title { font-size: 14px; font-weight: 600; color: var(--color-text); }
.related-list { padding: 0 14px 14px; display: flex; flex-direction: column; gap: 2px; }
.related-item { display: flex; align-items: center; gap: 10px; padding: 6px 4px; text-decoration: none; border-radius: var(--radius-sm); transition: background var(--transition-fast); }
.related-item:hover { background: var(--color-bg); }
.related-num { font-size: 13px; font-weight: 700; color: var(--color-text-muted); width: 16px; flex-shrink: 0; }
.related-text { font-size: 13px; color: var(--color-text); line-height: 1.4; }

.author-card { padding: 0 14px 14px; }
.author-btns { display: flex; gap: 8px; margin-top: 12px; }

@media (max-width: 768px) {
  .detail-layout { grid-template-columns: 1fr; }
  .detail-sidebar { display: none; }
}
</style>
