<template>
  <div class="profile-page" data-page="app">
    <div class="container">
      <!-- 返回按钮 -->
      <div class="profile-back">
        <button class="back-btn" @click="smartBack()"><Icons name="back" :size="20" /></button>
        <span class="back-title">{{ isOwn ? '我的主页' : '个人主页' }}</span>
      </div>

      <div class="profile-card">
        <div class="profile-cover" :style="getCoverStyle()"></div>
        <div class="profile-info">
          <div class="profile-avatar-wrap"><img :src="user.avatar" class="profile-avatar" :alt="user.name" /></div>
          <div class="profile-meta">
            <div class="profile-name-row">
              <h1 class="profile-name">{{ user.name }}</h1>
              <span v-if="user.isVerified" class="verified-badge"><Icons name="check" :size="12" /></span>
            </div>
            <p class="profile-bio">{{ user.bio }}</p>
            <!-- 资料显示 -->
            <div class="profile-details" v-if="user.college || user.grade || user.major">
              <span v-if="user.college" class="detail-tag"><Icons name="tag" :size="12" /> {{ user.college }}</span>
              <span v-if="user.grade" class="detail-tag"><Icons name="calendar" :size="12" /> {{ user.grade }}</span>
              <span v-if="user.major" class="detail-tag"><Icons name="book" :size="12" /> {{ user.major }}</span>
            </div>
            <div class="profile-stats">
              <span class="stat"><strong>{{ user.followingCount }}</strong> 关注</span>
              <span class="stat"><strong>{{ user.followerCount }}</strong> 粉丝</span>
              <span class="stat"><strong>{{ user.postCount }}</strong> 帖子</span>
            </div>
          </div>
          <div class="profile-actions">
            <button v-if="isOwn" class="btn btn-secondary" @click="showEditModal = true">编辑资料</button>
            <template v-else>
              <button class="btn btn-primary" @click="toggleFollow">{{ isFollowing ? '已关注' : '关注' }}</button>
              <button class="btn btn-secondary">私信</button>
            </template>
          </div>
        </div>
        <div class="profile-tabs">
          <button v-for="t in tabs" :key="t.key" class="profile-tab" :class="{ 'profile-tab--active': activeTab === t.key }" @click="activeTab = t.key">{{ t.label }}</button>
        </div>
      </div>

      <div class="profile-content">
        <div v-if="loading" class="loading-state">
          <div class="spinner-small"></div>
          <span>加载中...</span>
        </div>
        <template v-else>
          <div v-if="activeTab === 'posts'" class="post-list">
            <PostCard v-for="p in displayPosts" :key="p.id" :post="p" />
            <div v-if="displayPosts.length === 0" class="empty-state"><Icons name="edit" :size="40" /><p>还没开始写？万事开头难，试试吧</p></div>
          </div>
          <div v-else-if="activeTab === 'likes'" class="post-list">
            <PostCard v-for="p in likedPosts" :key="p.id" :post="p" />
            <div v-if="likedPosts.length === 0" class="empty-state"><Icons name="heart" :size="40" /><p>还没有点赞过帖子哦</p></div>
          </div>
          <div v-else class="empty-state"><Icons name="image" :size="40" /><p>暂无内容，敬请期待</p></div>
        </template>
      </div>
    </div>

    <!-- 编辑资料弹窗 -->
    <div v-if="showEditModal" class="modal-overlay" @click.self="showEditModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>编辑资料</h3>
          <button class="modal-close" @click="showEditModal = false"><Icons name="close" :size="20" /></button>
        </div>
        <div class="modal-body">
          <!-- 头像上传 -->
          <div class="form-group avatar-upload-group">
            <label>头像</label>
            <div class="avatar-upload-row">
              <div class="avatar-preview">
                <img v-if="editForm.avatarPreview" :src="editForm.avatarPreview" alt="头像预览" />
                <Icons v-else name="user" :size="32" />
              </div>
              <div class="avatar-upload-btn-wrap">
                <button class="btn btn-secondary btn-sm" @click="triggerAvatarUpload">更换头像</button>
                <input type="file" ref="avatarInput" accept="image/*" style="display:none" @change="handleAvatarChange" />
                <p class="upload-hint">支持 JPG、PNG，建议 200x200</p>
              </div>
            </div>
          </div>

          <!-- 昵称修改 -->
          <div class="form-group">
            <label>昵称</label>
            <input type="text" v-model="editForm.name" placeholder="请输入昵称" maxlength="20" />
          </div>

          <!-- 封面图上传 -->
          <div class="form-group cover-upload-group">
            <label>封面图片</label>
            <div class="cover-upload-row">
              <div class="cover-preview" :style="editForm.coverPreview ? { backgroundImage: `url(${editForm.coverPreview})` } : {}">
                <Icons v-if="!editForm.coverPreview" name="image" :size="24" />
              </div>
              <div class="cover-upload-btn-wrap">
                <button class="btn btn-secondary btn-sm" @click="triggerCoverUpload">更换封面</button>
                <input type="file" ref="coverInput" accept="image/*" style="display:none" @change="handleCoverChange" />
                <p class="upload-hint">建议尺寸 800x200</p>
              </div>
            </div>
          </div>

          <!-- 学院 -->
          <div class="form-group">
            <label>学院（可选）</label>
            <select v-model="editForm.college">
              <option value="">请选择学院</option>
              <option v-for="c in colleges" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>

          <!-- 年级 -->
          <div class="form-group">
            <label>年级（可选）</label>
            <select v-model="editForm.grade">
              <option value="">请选择年级</option>
              <option v-for="g in grades" :key="g" :value="g">{{ g }}</option>
            </select>
          </div>

          <!-- 专业 -->
          <div class="form-group">
            <label>专业</label>
            <input type="text" v-model="editForm.major" placeholder="请输入专业" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showEditModal = false">取消</button>
          <button class="btn btn-primary" @click="saveProfile">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore, useUserStore } from '../stores'
import { smartBack } from '../router'
import Icons from '../components/Icons.vue'
import PostCard from '../components/PostCard.vue'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const userStore = useUserStore()

const isOwn = ref(!route.params.id)
const isFollowing = ref(false)
const showEditModal = ref(false)
const avatarInput = ref(null)
const coverInput = ref(null)

const colleges = [
  '设计艺术学院',
  '服装学院',
  '美术学院',
  '建筑与环境艺术学院',
  'AI艺术学院',
  '影视动画学院',
  '传媒艺术学院',
  '教育学院',
  '文学院',
  '书法学院',
  '舞蹈学院',
  '哲学学院'
]

const grades = ['大一', '大二', '大三', '大四']

const editForm = ref({
  name: '',
  avatar: '',
  avatarPreview: '',
  coverFrom: '#2d7a4a',
  coverTo: '#10b981',
  coverPreview: '',
  college: '',
  grade: '',
  major: ''
})

function triggerAvatarUpload() { avatarInput.value?.click() }
function triggerCoverUpload() { coverInput.value?.click() }

function getCoverStyle() {
  if (user.value.coverPreview) {
    return { backgroundImage: `url(${user.value.coverPreview})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  return { background: `linear-gradient(135deg, ${user.value.coverFrom} 0%, ${user.value.coverTo} 100%)` }
}

function handleAvatarChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      editForm.value.avatarPreview = e.target.result
      editForm.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function handleCoverChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      editForm.value.coverPreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const user = ref({
  id: route.params.id ? parseInt(route.params.id) : 999,
  name: isOwn.value ? '我 (当前用户)' : '小明同学',
  avatar: isOwn.value ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser' : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  bio: '计算机专业大三学生，喜欢摄影和编程 🚀 | 记录校园生活，分享技术心得',
  isVerified: true, followingCount: 128, followerCount: 342, postCount: 56,
  coverFrom: '#2d7a4a', coverTo: '#10b981',
  college: '',
  grade: '',
  major: ''
})

const tabs = [
  { key: 'posts', label: '帖子' }, { key: 'likes', label: '赞过的' },
  { key: 'media', label: '相册' }, { key: 'about', label: '关于' },
]

const activeTab = computed({
  get: () => route.query.tab || 'posts',
  set: (val) => router.push({ query: { ...route.query, tab: val } })
})
const loading = ref(true)
const displayPosts = ref([])
const likedPosts = ref([])

function loadUserData() {
  if (isOwn.value && userStore.userInfo) {
    user.value = {
      ...user.value,
      ...userStore.userInfo,
      followingCount: userStore.userInfo.following || 0,
      followerCount: userStore.userInfo.followers || 0,
      postCount: userStore.userInfo.postsCount || 0
    }
    editForm.value = {
      name: userStore.userInfo.name || '',
      avatar: userStore.userInfo.avatar || '',
      avatarPreview: userStore.userInfo.avatar || '',
      coverFrom: userStore.userInfo.coverFrom || '#2d7a4a',
      coverTo: userStore.userInfo.coverTo || '#10b981',
      coverPreview: userStore.userInfo.coverPreview || '',
      college: userStore.userInfo.college || '',
      grade: userStore.userInfo.grade || '',
      major: userStore.userInfo.major || ''
    }
  }
}

async function loadData() {
  loading.value = true
  const uid = isOwn.value ? 999 : user.value.id

  if (activeTab.value === 'posts') {
    const result = await postsStore.fetchUserPosts(uid, 1, 20)
    displayPosts.value = result.data
  } else if (activeTab.value === 'likes') {
    const result = await postsStore.fetchPosts(1, 100)
    likedPosts.value = result.data.filter(p => p.isLiked)
  }
  loading.value = false
}

function saveProfile() {
  userStore.updateProfile({
    name: editForm.value.name,
    avatar: editForm.value.avatar,
    coverFrom: editForm.value.coverFrom,
    coverTo: editForm.value.coverTo,
    college: editForm.value.college,
    grade: editForm.value.grade,
    major: editForm.value.major
  })
  user.value.name = editForm.value.name
  user.value.avatar = editForm.value.avatar
  user.value.coverFrom = editForm.value.coverFrom
  user.value.coverTo = editForm.value.coverTo
  user.value.college = editForm.value.college
  user.value.grade = editForm.value.grade
  user.value.major = editForm.value.major
  showEditModal.value = false
}

onMounted(() => {
  loadUserData()
  loadData()
})

watch(() => route.params.id, () => {
  isOwn.value = !route.params.id
  user.value.id = route.params.id ? parseInt(route.params.id) : 999
  loadData()
})

watch(() => route.query.tab, loadData)
watch(() => userStore.userInfo, loadUserData, { deep: true })

function toggleFollow() { isFollowing.value = !isFollowing.value }
</script>

<style scoped>
.profile-page { min-height: 100vh; padding: 16px 0 40px; }
.profile-back { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.back-btn { width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-surface); border: 1px solid var(--color-border); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text); transition: all var(--transition-fast); }
.back-btn:hover { background: var(--color-surface-alt); }
.back-title { font-size: 16px; font-weight: 600; color: var(--color-text); }
.profile-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 16px; max-width: 720px; margin-left: auto; margin-right: auto; }
.profile-cover { height: 160px; }
.profile-info { display: flex; align-items: flex-end; gap: 16px; padding: 0 20px; margin-top: -36px; position: relative; flex-wrap: wrap; }
.profile-avatar { width: 80px; height: 80px; border-radius: var(--radius-full); border: 4px solid var(--color-surface); object-fit: cover; background: var(--color-bg); }
.profile-meta { flex: 1; padding-bottom: 12px; min-width: 0; }
.profile-name-row { display: flex; align-items: center; gap: 6px; }
.profile-name { font-size: 20px; font-weight: 700; color: var(--color-text); }
.verified-badge { width: 20px; height: 20px; background: var(--color-primary); border-radius: var(--radius-full); color: var(--color-bg); display: flex; align-items: center; justify-content: center; }
.profile-bio { font-size: 14px; color: var(--color-text-secondary); margin: 4px 0; line-height: 1.5; }
.profile-details { display: flex; flex-wrap: wrap; gap: 8px; margin: 6px 0; }
.detail-tag { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--color-text-secondary); background: var(--color-surface-alt); padding: 2px 8px; border-radius: var(--radius-full); }
.profile-stats { display: flex; gap: 16px; margin-top: 6px; }
.stat { font-size: 13px; color: var(--color-text-secondary); }
.stat strong { font-weight: 600; color: var(--color-text); }
.profile-actions { display: flex; gap: 8px; padding-bottom: 12px; }
.profile-tabs { display: flex; border-top: 1px solid var(--color-border-light); }
.profile-tab { flex: 1; padding: 12px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary); background: transparent; border: none; border-bottom: 2px solid transparent; cursor: pointer; transition: all var(--transition-fast); font-family: var(--font-sans); }
.profile-tab:hover { color: var(--color-text); }
.profile-tab--active { color: var(--color-primary); border-bottom: 2px solid var(--color-primary); }
.profile-content { max-width: 720px; margin: 0 auto; }
.post-list { display: flex; flex-direction: column; gap: 12px; }
.loading-state { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 40px 0; color: var(--color-text-muted); font-size: 14px; }
.spinner-small { width: 16px; height: 16px; border: 2px solid var(--color-border); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* 弹窗样式 */
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: var(--color-surface); border-radius: var(--radius-lg); width: 90%; max-width: 420px; max-height: 90vh; overflow-y: auto; }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--color-border); }
.modal-header h3 { font-size: 16px; font-weight: 600; color: var(--color-text); margin: 0; }
.modal-close { width: 32px; height: 32px; border-radius: var(--radius-full); background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text-secondary); transition: all var(--transition-fast); }
.modal-close:hover { background: var(--color-surface-alt); color: var(--color-text); }
.modal-body { padding: 20px; }
.modal-footer { display: flex; justify-content: flex-end; gap: 8px; padding: 16px 20px; border-top: 1px solid var(--color-border); }

/* 表单样式 */
.form-group { margin-bottom: 16px; }
.form-group:last-child { margin-bottom: 0; }
.form-group label { display: block; font-size: 14px; font-weight: 500; color: var(--color-text); margin-bottom: 6px; }
.form-group input,
.form-group select { width: 100%; padding: 10px 12px; font-size: 14px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg); color: var(--color-text); transition: border-color var(--transition-fast); box-sizing: border-box; font-family: var(--font-sans); }
.form-group input:focus,
.form-group select:focus { outline: none; border-color: var(--color-primary); }
.form-group select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; }

/* 按钮样式 */
.btn { padding: 8px 16px; font-size: 14px; font-weight: 500; border-radius: var(--radius-full); cursor: pointer; transition: all var(--transition-fast); border: none; font-family: var(--font-sans); }
.btn-primary { background: var(--color-primary); color: var(--color-bg); }
.btn-primary:hover { opacity: 0.9; }
.btn-secondary { background: var(--color-surface-alt); color: var(--color-text); border: 1px solid var(--color-border); }
.btn-secondary:hover { background: var(--color-border); }
.btn-sm { padding: 6px 12px; font-size: 13px; }

/* 头像上传样式 */
.avatar-upload-group { }
.avatar-upload-row { display: flex; align-items: center; gap: 16px; }
.avatar-preview { width: 64px; height: 64px; border-radius: var(--radius-full); background: var(--color-surface-alt); border: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; color: var(--color-text-muted); }
.avatar-preview img { width: 100%; height: 100%; object-fit: cover; }
.avatar-upload-btn-wrap { display: flex; flex-direction: column; gap: 4px; }
.upload-hint { font-size: 12px; color: var(--color-text-muted); margin: 0; }

/* 封面图上传样式 */
.cover-upload-group { }
.cover-upload-row { display: flex; align-items: center; gap: 16px; }
.cover-preview { width: 120px; height: 40px; border-radius: var(--radius-md); background: var(--color-surface-alt); border: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; color: var(--color-text-muted); background-size: cover; background-position: center; }
.cover-upload-btn-wrap { display: flex; flex-direction: column; gap: 4px; }

/* 空状态图标 */
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; color: var(--color-text-muted); padding: 40px 0; }
.empty-state p { margin: 0; font-size: 14px; }
</style>
