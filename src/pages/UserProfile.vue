<template>
  <div class="profile-page">
    <div class="container">

      <!-- 个人资料卡 -->
      <div class="profile-card card">
        <div class="profile-cover" :style="{ background: `linear-gradient(135deg, ${user.coverFrom} 0%, ${user.coverTo} 100%)` }">
          <button v-if="isOwn" class="edit-cover-btn">
            <Icons name="edit" :size="14" /> 编辑封面
          </button>
        </div>
        <div class="profile-info">
          <div class="profile-avatar-wrap">
            <img :src="user.avatar" class="profile-avatar" :alt="user.name" />
            <button v-if="isOwn" class="edit-avatar-btn">
              <Icons name="edit" :size="12" />
            </button>
          </div>
          <div class="profile-meta">
            <div class="profile-name-row">
              <h1 class="profile-name">{{ user.name }}</h1>
              <span v-if="user.isVerified" class="verified-badge" title="已认证">
                <Icons name="check" :size="12" />
              </span>
            </div>
            <p class="profile-bio">{{ user.bio }}</p>
            <div class="profile-stats-row">
              <span class="profile-stat">
                <strong>{{ user.followingCount }}</strong> 关注
              </span>
              <span class="profile-stat">
                <strong>{{ user.followerCount }}</strong> 粉丝
              </span>
              <span class="profile-stat">
                <strong>{{ user.postCount }}</strong> 帖子
              </span>
            </div>
          </div>
          <div class="profile-actions">
            <button v-if="isOwn" class="btn btn-secondary">编辑资料</button>
            <template v-else>
              <button class="btn btn-primary" @click="toggleFollow">
                {{ isFollowing ? '已关注' : '关注' }}
              </button>
              <button class="btn btn-secondary">私信</button>
            </template>
          </div>
        </div>

        <!-- 标签页 -->
        <div class="profile-tabs">
          <button
            v-for="t in tabs"
            :key="t.key"
            class="profile-tab"
            :class="{ 'profile-tab--active': activeTab === t.key }"
            @click="activeTab = t.key"
          >{{ t.label }}</button>
        </div>
      </div>

      <!-- 帖子列表 -->
      <div class="profile-content">
        <div v-if="activeTab === 'posts'" class="post-list">
          <PostCard v-for="p in posts" :key="p.id" :post="p" />
          <div v-if="posts.length === 0" class="empty-state">
            <Icons name="edit" :size="40" />
            <p>还没有发布任何帖子</p>
          </div>
        </div>
        <div v-else-if="activeTab === 'likes'" class="post-list">
          <PostCard v-for="p in likedPosts" :key="p.id" :post="p" />
          <div v-if="likedPosts.length === 0" class="empty-state">
            <Icons name="heart" :size="40" />
            <p>还没有点赞任何帖子</p>
          </div>
        </div>
        <div v-else class="empty-state" style="padding-top:40px">
          <Icons name="settings" :size="40" />
          <p>暂无内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icons from '../components/Icons.vue'
import PostCard from '../components/PostCard.vue'

const isOwn = ref(false)
const isFollowing = ref(false)
const activeTab = ref('posts')

const user = ref({
  name: '小明同学',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  bio: '计算机专业大三学生，喜欢摄影和编程 🚀 | 记录校园生活，分享技术心得',
  isVerified: true,
  followingCount: 128,
  followerCount: 342,
  postCount: 56,
  coverFrom: '#f97316',
  coverTo: '#ec4899',
})

const tabs = [
  { key: 'posts', label: '帖子' },
  { key: 'likes', label: '赞过的' },
  { key: 'media', label: '相册' },
  { key: 'about', label: '关于' },
]

const posts = ref([
  {
    id: 1, content: '图书馆终于开了空调，期末复习的同学们冲啊！📚', authorName: '小明同学',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', authorId: 1,
    createTime: Date.now() - 1800000, likeCount: 342, commentCount: 56, isLiked: false, partition: '校园生活', images: []
  },
  {
    id: 2, content: '今天拍了学校旁边的日落，真的太美了 🌅', authorName: '小明同学',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', authorId: 1,
    createTime: Date.now() - 86400000, likeCount: 567, commentCount: 23, isLiked: true, partition: '校园生活',
    images: ['https://picsum.photos/seed/sunset/800/500']
  },
])

const likedPosts = ref([
  {
    id: 3, content: '食堂新出的红烧肉拌饭绝了！窗口在二楼第三个档口', authorName: '美食侦探',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie', authorId: 2,
    createTime: Date.now() - 7200000, likeCount: 567, commentCount: 89, isLiked: true, partition: '美食探店',
    images: []
  }
])

function toggleFollow() { isFollowing.value = !isFollowing.value }
</script>

<style scoped>
.profile-page { padding: 20px 0 40px; }
.profile-card { overflow: hidden; margin-bottom: 16px; }

.profile-cover {
  height: 160px;
  position: relative;
}
.edit-cover-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
}

.profile-info {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  padding: 0 20px;
  margin-top: -40px;
  position: relative;
}
.profile-avatar-wrap { position: relative; flex-shrink: 0; }
.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  border: 4px solid white;
  object-fit: cover;
  background: var(--color-bg);
}
.edit-avatar-btn {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 22px;
  height: 22px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: white;
  border: 2px solid white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-meta { flex: 1; padding-bottom: 8px; }
.profile-name-row { display: flex; align-items: center; gap: 6px; }
.profile-name { font-size: 20px; font-weight: 700; color: var(--color-text); }
.verified-badge {
  width: 18px;
  height: 18px;
  background: var(--color-accent);
  border-radius: var(--radius-full);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-bio {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 4px 0;
  line-height: 1.5;
}
.profile-stats-row {
  display: flex;
  gap: 16px;
  margin-top: 6px;
}
.profile-stat { font-size: 13px; color: var(--color-text-secondary); }
.profile-stat strong { font-weight: 600; color: var(--color-text); }
.profile-actions {
  display: flex;
  gap: 8px;
  padding-bottom: 12px;
}

.profile-tabs {
  display: flex;
  border-top: 1px solid var(--color-border-light);
  margin-top: 12px;
}
.profile-tab {
  flex: 1;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.profile-tab:hover { color: var(--color-text); }
.profile-tab--active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.profile-content { }
.post-list { display: flex; flex-direction: column; gap: 12px; }
</style>
