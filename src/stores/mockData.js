// 模拟数据
export const posts = [
  {
    id: 1,
    title: '寻找昨晚丢失的校园卡',
    content: '昨晚在图书馆三楼不小心丢失了一张校园卡，卡上名字是"李明"，如果有同学捡到可以联系我，非常感谢！必有重谢！',
    images: ['https://picsum.photos/400/300?random=1'],
    tag: 'lost',
    tagName: '失物招领',
    author: '小明同学',
    authorId: 1,
    avatar: '李',
    likes: 23,
    liked: false,
    comments: 5,
    createdAt: '2026-04-15 10:30',
    commentList: [
      { id: 1, author: '热心同学', content: '我好像看到了，在三楼靠窗的位置', createdAt: '10:35' },
      { id: 2, author: '小明同学', content: '真的吗？太感谢了！', createdAt: '10:40' }
    ]
  },
  {
    id: 2,
    title: '表白大四学姐王雪',
    content: '我是大一新生，在图书馆第一次看到学姐就被吸引了。学姐每次来都坐在靠窗的位置，认真的样子真的很美。希望学姐能看到，也希望给大家一点勇气，喜欢就要说出来！',
    images: [],
    tag: 'love',
    tagName: '表白墙',
    author: '匿名',
    authorId: 0,
    avatar: '匿',
    likes: 156,
    liked: false,
    comments: 38,
    createdAt: '2026-04-15 09:00',
    commentList: []
  },
  {
    id: 3,
    title: '出MacBook Pro 2023款',
    content: '换了新电脑，这台闲置了。M2 Pro芯片，16+512G，无划痕无磕碰，电池健康度96%。配件齐全，原装充电器+拓展坞一起出。价格可聊，诚心的来。',
    images: ['https://picsum.photos/400/300?random=2', 'https://picsum.photos/400/300?random=3'],
    tag: 'secondhand',
    tagName: '二手交易',
    author: '数码达人',
    authorId: 3,
    avatar: '数',
    likes: 34,
    liked: false,
    comments: 15,
    createdAt: '2026-04-14 18:00',
    commentList: []
  },
  {
    id: 4,
    title: '吐槽食堂二楼麻辣烫',
    content: '今天中午在二楼麻辣烫窗口，打饭阿姨全程黑脸，问她多加点菜直接当没听见。隔壁窗口的阿姨人就很好。希望食堂能改进一下。',
    images: [],
    tag: 'chat',
    tagName: '吐槽',
    author: '匿名',
    authorId: 0,
    avatar: '匿',
    likes: 89,
    liked: false,
    comments: 42,
    createdAt: '2026-04-14 14:20',
    commentList: [
      { id: 1, author: '同感', content: '确实，有时候态度不好', createdAt: '14:25' }
    ]
  },
  {
    id: 5,
    title: '寻找一起考研上岸的伙伴',
    content: '本人计算机专业，准备考某985的研究生，想找几个一起复习的同学建个群互相监督鼓励。有意向的同学可以留言或者私信我。',
    images: [],
    tag: 'study',
    tagName: '学习交流',
    author: '考研人',
    authorId: 4,
    avatar: '考',
    likes: 45,
    liked: false,
    comments: 18,
    createdAt: '2026-04-13 20:00',
    commentList: []
  },
  {
    id: 6,
    title: '学生会晚会志愿者招募',
    content: '本周六学生会举办迎新晚会，需要招募20名志愿者，主要负责场地布置、引导观众等工作。有意愿的同学可以报名，会提供志愿证明和小礼品哦！',
    images: ['https://picsum.photos/400/300?random=4'],
    tag: 'activity',
    tagName: '活动',
    author: '学生会',
    authorId: 5,
    avatar: 'S',
    likes: 67,
    liked: false,
    comments: 25,
    createdAt: '2026-04-13 16:00',
    commentList: []
  },
  {
    id: 7,
    title: '出iphone14 pro 256g',
    content: '换了新手机，这台闲置了。紫色国行，电池健康度98%，无划痕无磕碰，配件齐全。价格可以聊，诚心要的来。',
    images: ['https://picsum.photos/400/300?random=5', 'https://picsum.photos/400/300?random=6'],
    tag: 'secondhand',
    tagName: '二手交易',
    author: '数码达人',
    authorId: 6,
    avatar: '数',
    likes: 12,
    liked: false,
    comments: 8,
    createdAt: '2026-04-12 15:30',
    commentList: []
  },
  {
    id: 8,
    title: '树洞：深夜emo',
    content: '最近压力好大，考试、论文、实习全都挤在一起。有时候真的很想家，想放弃一切。不知道有没有人和我一样...算了，发完就当发泄了。',
    images: [],
    tag: 'chat',
    tagName: '吐槽',
    author: '匿名',
    authorId: 0,
    avatar: '匿',
    likes: 234,
    liked: false,
    comments: 56,
    createdAt: '2026-04-12 01:30',
    commentList: []
  }
]

export const tags = [
  { key: 'all', name: '全部', icon: '🌐' },
  { key: 'love', name: '表白墙', icon: '💖' },
  { key: 'secondhand', name: '二手', icon: '🔖' },
  { key: 'lost', name: '失物招领', icon: '🔍' },
  { key: 'chat', name: '吐槽', icon: '💬' },
  { key: 'study', name: '学习', icon: '📚' },
  { key: 'activity', name: '活动', icon: '🎉' }
]

export function getPostById(id) {
  return posts.find(p => p.id === parseInt(id))
}

export function getPostsByTag(tag) {
  if (tag === 'all') return posts
  return posts.filter(p => p.tag === tag)
}

export function searchPosts(keyword) {
  return posts.filter(p =>
    p.title.includes(keyword) ||
    p.content.includes(keyword) ||
    p.author.includes(keyword)
  )
}

export function toggleLike(postId) {
  const post = posts.find(p => p.id === postId)
  if (post) {
    if (post.liked) {
      post.likes--
    } else {
      post.likes++
    }
    post.liked = !post.liked
  }
  return post
}

export function addComment(postId, content) {
  const post = posts.find(p => p.id === postId)
  if (post) {
    const newComment = {
      id: post.commentList.length + 1,
      author: '我',
      content,
      createdAt: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    post.commentList.push(newComment)
    post.comments++
    return newComment
  }
  return null
}

export function getFavorites() {
  const ids = JSON.parse(localStorage.getItem('favorites') || '[]')
  return ids.map(id => posts.find(p => p.id === id)).filter(Boolean)
}

export function addFavorite(postId) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  if (!favorites.includes(postId)) {
    favorites.push(postId)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
  return true
}

export function removeFavorite(postId) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  favorites = favorites.filter(id => id !== postId)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  return true
}

export function isFavorite(postId) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  return favorites.includes(postId)
}

export function toggleFavorite(postId) {
  if (isFavorite(postId)) {
    removeFavorite(postId)
    return false
  } else {
    addFavorite(postId)
    return true
  }
}

export function addPost(postData) {
  const newPost = {
    id: posts.length + 1,
    ...postData,
    likes: 0,
    liked: false,
    comments: 0,
    createdAt: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-'),
    commentList: []
  }
  posts.unshift(newPost)
  return newPost
}
