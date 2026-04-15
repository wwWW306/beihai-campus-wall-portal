<template>
  <div class="create-page">
    <div class="container">
      <div class="create-card card">
        <!-- 头部 -->
        <div class="create-header">
          <button class="icon-btn-back" @click="$router.back()">
            <Icons name="close" :size="20" />
          </button>
          <h1 class="create-title">发布帖子</h1>
          <button class="btn btn-primary" :disabled="!canPost || posting" @click="submit">
            {{ posting ? '发布中...' : '发布' }}
          </button>
        </div>

        <!-- 分区选择 -->
        <div class="partition-picker">
          <button
            v-for="p in partitions"
            :key="p.id"
            class="partition-btn"
            :class="{ 'partition-btn--active': selectedPartition === p.id }"
            @click="selectedPartition = p.id"
          >
            <span>{{ p.icon }}</span>
            <span>{{ p.name }}</span>
          </button>
        </div>

        <!-- 内容输入 -->
        <div class="content-area">
          <textarea
            v-model="content"
            class="content-input"
            placeholder="分享你在校园的所见所闻..."
            maxlength="2000"
            ref="textareaRef"
          ></textarea>
          <div class="char-count" :class="{ 'char-count--warn': content.length > 1800 }">
            {{ content.length }} / 2000
          </div>
        </div>

        <!-- 图片上传 -->
        <div class="image-upload">
          <div v-for="(img, idx) in images" :key="idx" class="uploaded-img">
            <img :src="img" alt="" />
            <button class="img-remove" @click="removeImg(idx)">
              <Icons name="close" :size="12" />
            </button>
          </div>
          <button v-if="images.length < 9" class="upload-btn" @click="triggerUpload">
            <Icons name="image" :size="22" />
            <span>添加图片</span>
            <span class="upload-hint">{{ images.length }}/9</span>
          </button>
          <input ref="fileInput" type="file" accept="image/*" multiple style="display:none" @change="handleFileChange" />
        </div>

        <!-- 提示 -->
        <div class="create-tips">
          <Icons name="exclamation" :size="15" />
          <span>请勿发布广告、谣言或违规内容。违规内容将被删除并可能被封禁账号。</span>
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
const textareaRef = ref(null)

const partitions = [
  { id: 1, name: '校园生活', icon: '🏫' },
  { id: 2, name: '学习交流', icon: '📚' },
  { id: 3, name: '二手交易', icon: '💰' },
  { id: 4, name: '美食探店', icon: '🍜' },
  { id: 5, name: '情感树洞', icon: '💬' },
  { id: 6, name: '实习校招', icon: '💼' },
]

const canPost = computed(() => content.value.trim().length > 0)

async function submit() {
  if (!canPost.value) return
  posting.value = true
  await new Promise(r => setTimeout(r, 1000))
  posting.value = false
  router.push('/wall')
}

function triggerUpload() { fileInput.value.click() }

function handleFileChange(e) {
  const files = Array.from(e.target.files)
  files.forEach(file => {
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
.create-page { padding: 20px 0 40px; min-height: calc(100vh - 56px); }
.create-card { max-width: 680px; margin: 0 auto; padding: 0; overflow: hidden; }

.create-header {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-border-light);
}
.icon-btn-back {
  width: 34px; height: 34px;
  border-radius: var(--radius-full);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}
.icon-btn-back:hover { background: var(--color-bg); color: var(--color-text); }
.create-title {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 10px;
}

.partition-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-border-light);
}
.partition-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.partition-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.partition-btn--active {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.content-area { position: relative; }
.content-input {
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: none;
  font-size: 16px;
  font-family: inherit;
  color: var(--color-text);
  resize: none;
  outline: none;
  line-height: 1.7;
  background: transparent;
}
.content-input::placeholder { color: var(--color-text-muted); }
.char-count {
  position: absolute;
  bottom: 10px;
  right: 14px;
  font-size: 12px;
  color: var(--color-text-muted);
}
.char-count--warn { color: var(--color-warning); }

.image-upload {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 16px 16px;
}
.uploaded-img {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
}
.uploaded-img img { width: 100%; height: 100%; object-fit: cover; }
.img-remove {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background: rgba(0,0,0,0.6);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.upload-btn {
  width: 80px;
  height: 80px;
  border: 1.5px dashed var(--color-border);
  border-radius: var(--radius-md);
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--color-text-muted);
  font-size: 11px;
  transition: all var(--transition-fast);
}
.upload-btn:hover { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-light); }
.upload-hint { font-size: 10px; }

.create-tips {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
  background: var(--color-bg);
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.5;
}
</style>
