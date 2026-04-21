import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostsStore = defineStore('posts', () => {
  // 模拟真实后端的初始数据 (覆盖了 10 个分区)
  const initialData = [
    { id: 1, content: '图书馆终于开了空调，期末复习的同学们冲啊！📚 建议大家提前预约座位，避免高峰期排队~', authorName: '小明同学', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', authorId: 1, createTime: Date.now() - 1800000, likeCount: 342, commentCount: 56, isLiked: false, partitionId: 2, partition: '学习互助', images: [] },
    { id: 2, content: '食堂新出的红烧肉拌饭绝了！窗口在二楼第三个档口，💰 12元一份，分量超足。', authorName: '美食侦探', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie', authorId: 2, createTime: Date.now() - 7200000, likeCount: 567, commentCount: 89, isLiked: true, partitionId: 4, partition: '干饭时刻', images: ['https://picsum.photos/seed/food1/800/600'] },
    { id: 3, content: '求一台二手笔记本，预算2000以内，用于写代码和看网课。有出的同学麻烦私信我🙏', authorName: '码农预备役', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Code', authorId: 3, createTime: Date.now() - 14400000, likeCount: 23, commentCount: 8, isLiked: false, partitionId: 3, partition: '跳蚤市场', images: [] },
    { id: 4, content: '今天拍了学校旁边的日落，真的太美了 🌅', authorName: '摄影爱好者', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Photo', authorId: 4, createTime: Date.now() - 86400000, likeCount: 1205, commentCount: 234, isLiked: false, partitionId: 1, partition: '校园日常', images: ['https://picsum.photos/seed/sunset/800/500'] },
    { id: 5, content: '校园表白墙代发，帮你说出那些不好意思当面说的话。支持匿名，私信必回。', authorName: '表白墙菌', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Confess', authorId: 5, createTime: Date.now() - 43200000, likeCount: 89, commentCount: 45, isLiked: false, partitionId: 7, partition: '表白交友', images: [] },
    { id: 6, content: '明天去市区的高铁站，早上8点出发，有2个空座，有人要一起拼车吗？', authorName: '老司机', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Car', authorId: 6, createTime: Date.now() - 3600000, likeCount: 12, commentCount: 3, isLiked: false, partitionId: 9, partition: '拼车组队', images: [] },
    { id: 7, content: '在三教204捡到一张校园卡，名字是李华，同学看到麻烦联系我。', authorName: '热心市民', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Help', authorId: 7, createTime: Date.now() - 5400000, likeCount: 45, commentCount: 2, isLiked: false, partitionId: 8, partition: '失物招领', images: [] },
    { id: 8, content: '整理了一套很全的计算机考研408复习资料，包含真题和思维导图，需要的同学自取。', authorName: '学神', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=God', authorId: 8, createTime: Date.now() - 172800000, likeCount: 892, commentCount: 156, isLiked: false, partitionId: 10, partition: '资源共享', linkUrl: 'https://example.com/share/408', linkTitle: '计算机考研408复习资料包 (夸克网盘)', images: [] },
    { id: 9, content: '突然觉得好迷茫，快毕业了不知道该做什么，大家都是怎么做职业规划的？', authorName: '迷茫的大四', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lost', authorId: 9, createTime: Date.now() - 259200000, likeCount: 312, commentCount: 128, isLiked: false, partitionId: 5, partition: '树洞心声', images: [] },
    { id: 10, content: '字节跳动2027届暑期实习内推！前端后端都有，扫描下面二维码直达投递。', authorName: '打工人', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Work', authorId: 10, createTime: Date.now() - 900000, likeCount: 445, commentCount: 88, isLiked: false, partitionId: 6, partition: '求职上岸', images: ['https://picsum.photos/seed/qrcode/400/400'] }
  ]

  // 生成更多假数据用于分页测试
  for (let i = 11; i <= 30; i++) {
    initialData.push({
      id: i, content: `这是第 ${i} 条测试数据，用来验证无限滚动加载功能的。翻页体验要做好！`, authorName: `测试用户${i}`, authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Test${i}`, authorId: i % 5 + 1, createTime: Date.now() - i * 1000000, likeCount: i * 5, commentCount: i, isLiked: false, partitionId: (i % 10) + 1, partition: ['校园日常','学习互助','跳蚤市场','干饭时刻','树洞心声','求职上岸','表白交友','失物招领','拼车组队','资源共享'][i % 10], images: []
    })
  }

  // 状态源
  const posts = ref(JSON.parse(localStorage.getItem('campus-wall-posts') || 'null') || initialData)
  const bookmarks = ref(JSON.parse(localStorage.getItem('campus-wall-bookmarks') || '[]'))

  // 模拟网络延迟
  const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms))

  // 保存到本地
  function savePosts() { localStorage.setItem('campus-wall-posts', JSON.stringify(posts.value)) }
  function saveBookmarks() { localStorage.setItem('campus-wall-bookmarks', JSON.stringify(bookmarks.value)) }

  // 异步获取帖子列表 (支持分页)
  async function fetchPosts(page = 1, limit = 10, partitionId = null, sort = 'new') {
    await delay(600) // 模拟网络延迟
    let result = [...posts.value]
    if (partitionId) {
      result = result.filter(p => p.partitionId === parseInt(partitionId))
    }
    
    // 模拟排序逻辑
    if (sort === 'hot') {
      result.sort((a, b) => b.likeCount - a.likeCount)
    } else {
      // 默认最新
      result.sort((a, b) => b.createTime - a.createTime)
    }
    
    const start = (page - 1) * limit
    const end = start + limit
    const data = result.slice(start, end)
    
    return {
      data,
      hasMore: end < result.length,
      total: result.length
    }
  }

  // 获取特定用户的帖子
  async function fetchUserPosts(userId, page = 1, limit = 10) {
    await delay(500)
    const result = posts.value.filter(p => p.authorId === parseInt(userId)).sort((a, b) => b.createTime - a.createTime)
    const start = (page - 1) * limit
    return { data: result.slice(start, start + limit), hasMore: start + limit < result.length }
  }

  // 异步搜索
  async function searchPostsAsync(query) {
    await delay(400)
    if (!query) return []
    const q = query.toLowerCase()
    return posts.value.filter(p => p.content.toLowerCase().includes(q) || p.authorName.toLowerCase().includes(q) || p.partition.toLowerCase().includes(q))
  }

  // 获取详情
  async function getPostDetail(id) {
    await delay(300)
    return posts.value.find(p => p.id === parseInt(id))
  }

  // 交互动作 (点赞、收藏)
  function toggleLike(postId) {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.isLiked = !post.isLiked
      post.likeCount += post.isLiked ? 1 : -1
      savePosts()
    }
  }

  function toggleBookmark(postId) {
    const index = bookmarks.value.indexOf(postId)
    if (index > -1) bookmarks.value.splice(index, 1)
    else bookmarks.value.push(postId)
    saveBookmarks()
  }

  function isBookmarked(postId) { return bookmarks.value.includes(postId) }

  // 发布帖子
  async function addPost(postData) {
    await delay(800) // 模拟发布延迟
    
    const partitionMap = { 1: '校园日常', 2: '学习互助', 3: '跳蚤市场', 4: '干饭时刻', 5: '树洞心声', 6: '求职上岸', 7: '表白交友', 8: '失物招领', 9: '拼车组队', 10: '资源共享' }
    
    const newPost = {
      id: Date.now(),
      content: postData.content,
      authorName: '我 (当前用户)',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      authorId: 999, // 模拟当前登录用户ID
      createTime: Date.now(),
      likeCount: 0,
      commentCount: 0,
      isLiked: false,
      partitionId: postData.partitionId,
      partition: partitionMap[postData.partitionId] || '校园日常',
      images: postData.images || [],
      linkUrl: postData.linkUrl || '',
      linkTitle: postData.linkTitle || ''
    }
    
    posts.value.unshift(newPost)
    savePosts()
    return newPost
  }

  // 获取相关推荐
  async function fetchRelatedPosts(postId) {
    await delay(300)
    const current = posts.value.find(p => p.id === parseInt(postId))
    if (!current) return []
    return posts.value.filter(p => p.id !== current.id && p.partitionId === current.partitionId).slice(0, 5)
  }

  return {
    posts, bookmarks,
    fetchPosts, fetchUserPosts, searchPostsAsync, getPostDetail, fetchRelatedPosts,
    toggleLike, toggleBookmark, isBookmarked, addPost
  }
})
