<template>
  <div class="create-page">
    <div class="container">
      <div class="create-card">
        <div class="create-header">
          <button class="close-btn" @click="handleClose"><Icons name="close" :size="20" /></button>
          <h1 class="create-title">发布帖子</h1>
          <button class="btn btn-primary btn-sm" :disabled="!canPost || posting" @click="submit">
            {{ posting ? '发布中...' : '发布' }}
          </button>
        </div>

        <div class="partition-picker">
          <button v-for="p in partitions" :key="p.id" class="partition-btn" :class="{ 'partition-btn--active': selectedPartition === p.id }" @click="selectedPartition = p.id">
            <span>{{ p.icon }}</span><span>{{ p.name }}</span>
          </button>
        </div>

        <div class="content-area">
          <textarea v-model="content" class="content-input" placeholder="今天发生了什么有趣的事？说来听听～ 😊" maxlength="2000"></textarea>
          <div class="char-count" :class="{ 'char-count--warn': content.length > 1800 }">{{ content.length }} / 2000</div>
        </div>

        <!-- 链接输入（资源共享） -->
        <div v-if="showLinkInput" class="link-input-area">
          <div class="link-input-header">
            <Icons name="link" :size="16" />
            <span>添加链接</span>
            <button class="link-close" @click="showLinkInput = false; linkUrl = ''; linkTitle = ''"><Icons name="close" :size="14" /></button>
          </div>
          <input v-model="linkUrl" class="input link-field" placeholder="粘贴链接地址，如 https://..." />
          <input v-model="linkTitle" class="input link-field" placeholder="链接标题（选填）" />
        </div>

        <div class="image-upload">
          <div v-for="(img, idx) in images" :key="idx" class="uploaded-img">
            <img :src="img" alt="" />
            <button class="img-remove" @click="removeImg(idx)"><Icons name="close" :size="12" /></button>
          </div>
          <button v-if="images.length < 9" class="upload-btn" @click="triggerUpload">
            <Icons name="image" :size="22" /><span>添加图片</span><span class="upload-hint">{{ images.length }}/9</span>
          </button>
          <input ref="fileInput" type="file" accept="image/*" multiple style="display:none" @change="handleFileChange" />
        </div>

        <!-- 底部工具栏 -->
        <div class="create-toolbar">
          <button class="tool-btn" @click="triggerUpload" title="添加图片"><Icons name="image" :size="18" /></button>
          <button class="tool-btn" @click="showLinkInput = !showLinkInput" title="添加链接" :class="{ 'tool-btn--active': showLinkInput }"><Icons name="link" :size="18" /></button>
        </div>

        <div class="create-tips">
          <Icons name="sparkle" :size="15" />
          <span>友善发言，让校园更温暖 请勿发布广告、谣言或违规内容</span>
        </div>
      </div>

      <!-- 返回确认弹窗 -->
      <div v-if="showConfirm" class="confirm-overlay" @click="showConfirm = false">
        <div class="confirm-modal" @click.stop>
          <p class="confirm-text">内容还没发布，确定要离开吗？</p>
          <div class="confirm-actions">
            <button class="btn btn-secondary btn-sm" @click="showConfirm = false">继续编辑</button>
            <button class="btn btn-primary btn-sm" @click="forceClose">确定离开</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Icons from '../components/Icons.vue'

const router = useRouter()
const content = ref('')
const selectedPartition = ref(1)
const images = ref([])
const posting = ref(false)
const fileInput = ref(null)
const showLinkInput = ref(false)
const linkUrl = ref('')
const linkTitle = ref('')
const showConfirm = ref(false)

const partitions = [
  { id: 1, name: '校园日常', icon: '🌈' }, { id: 2, name: '学习互助', icon: '📖' },
  { id: 3, name: '跳蚤市场', icon: '🛒' }, { id: 4, name: '干饭时刻', icon: '🍜' },
  { id: 5, name: '树洞心声', icon: '🌙' }, { id: 6, name: '求职上岸', icon: '🎯' },
  { id: 7, name: '表白交友', icon: '💕' }, { id: 8, name: '失物招领', icon: '🔍' },
  { id: 9, name: '拼车组队', icon: '🚗' }, { id: 10, name: '资源共享', icon: '📂' },
]

const hasContent = computed(() => content.value.trim() || images.value.length > 0 || linkUrl.value.trim())
const canPost = computed(() => content.value.trim().length > 0)

function handleClose() {
  if (hasContent.value) { showConfirm.value = true } else { smartBack() }
}
function forceClose() { showConfirm.value = false; smartBack() }

import { usePostsStore } from '../stores'
import { smartBack } from '../router'
const postsStore = usePostsStore()

async function submit() {
  if (!canPost.value || posting.value) return
  posting.value = true
  
  await postsStore.addPost({
    content: content.value,
    partitionId: selectedPartition.value,
    images: images.value,
    linkUrl: linkUrl.value,
    linkTitle: linkTitle.value
  })
  
  posting.value = false
  router.push('/wall')
}
function triggerUpload() { fileInput.value.click() }
function handleFileChange(e) {
  Array.from(e.target.files).forEach(file => {
    if (images.value.length >= 9) return
    const reader = new FileReader()
    reader.onload = (r) => { images.value.push(r.target.result) }
    reader.readAsDataURL(file)
  })
  e.target.value = ''
}
function removeImg(idx) { images.value.splice(idx, 1) }
</script>

<style scoped>
.create-page { min-height: 100vh; padding: 20px 0 40px; }
.create-card { max-width: 640px; margin: 0 auto; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; }
.create-header { display: flex; align-items: center; padding: 14px 16px; border-bottom: 1px solid var(--color-border-light); }
.close-btn { width: 34px; height: 34px; border-radius: var(--radius-full); background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text-secondary); transition: all var(--transition-fast); }
.close-btn:hover { background: var(--color-surface-alt); color: var(--color-text); }
.create-title { flex: 1; text-align: center; font-size: 16px; font-weight: 600; color: var(--color-text); margin: 0 10px; }

.partition-picker { display: flex; flex-wrap: wrap; gap: 8px; padding: 14px 16px; border-bottom: 1px solid var(--color-border-light); }
.partition-btn { display: flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: var(--radius-full); font-size: 13px; font-weight: 500; color: var(--color-text-secondary); background: var(--color-surface-alt); border: 1px solid var(--color-border); cursor: pointer; transition: all var(--transition-fast); font-family: var(--font-sans); }
.partition-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.partition-btn--active { background: var(--color-primary-light); border-color: var(--color-primary); color: var(--color-primary); }

.content-area { position: relative; }
.content-input { width: 100%; min-height: 200px; padding: 16px; border: none; font-size: 16px; font-family: var(--font-sans); color: var(--color-text); resize: none; outline: none; line-height: 1.7; background: transparent; }
.content-input::placeholder { color: var(--color-text-muted); }
.char-count { position: absolute; bottom: 10px; right: 14px; font-size: 12px; color: var(--color-text-muted); }
.char-count--warn { color: var(--color-warning); }

/* 链接输入 */
.link-input-area { padding: 12px 16px; border-top: 1px solid var(--color-border-light); background: var(--color-surface-alt); }
.link-input-header { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--color-primary); margin-bottom: 8px; }
.link-close { margin-left: auto; background: transparent; border: none; cursor: pointer; color: var(--color-text-muted); display: flex; padding: 2px; }
.link-field { margin-bottom: 6px; font-size: 13px; padding: 8px 12px; }

.image-upload { display: flex; flex-wrap: wrap; gap: 10px; padding: 0 16px 12px; }
.uploaded-img { position: relative; width: 80px; height: 80px; border-radius: var(--radius-md); overflow: hidden; }
.uploaded-img img { width: 100%; height: 100%; object-fit: cover; }
.img-remove { position: absolute; top: 3px; right: 3px; width: 20px; height: 20px; border-radius: var(--radius-full); background: rgba(0,0,0,0.6); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; }
.upload-btn { width: 80px; height: 80px; border: 1.5px dashed var(--color-border); border-radius: var(--radius-md); background: transparent; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: var(--color-text-muted); font-size: 11px; font-family: var(--font-sans); transition: all var(--transition-fast); }
.upload-btn:hover { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-light); }
.upload-hint { font-size: 10px; }

.create-toolbar { display: flex; gap: 4px; padding: 8px 16px; border-top: 1px solid var(--color-border-light); }
.tool-btn { width: 36px; height: 36px; border-radius: var(--radius-full); background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); transition: all var(--transition-fast); }
.tool-btn:hover { background: var(--color-surface-alt); color: var(--color-text); }
.tool-btn--active { color: var(--color-primary); background: var(--color-primary-light); }

.create-tips { display: flex; align-items: flex-start; gap: 8px; padding: 12px 16px; background: var(--color-surface-alt); font-size: 12px; color: var(--color-text-muted); line-height: 1.5; }

/* 确认弹窗 */
.confirm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 200; }
.confirm-modal { background: var(--color-surface); border-radius: var(--radius-xl); padding: 28px; text-align: center; max-width: 300px; width: 90%; }
.confirm-text { font-size: 15px; color: var(--color-text); margin-bottom: 20px; line-height: 1.5; }
.confirm-actions { display: flex; gap: 10px; justify-content: center; }
</style>
