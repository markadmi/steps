import { useState } from 'react'
import { PostsContext } from './posts-context.js'

const STORAGE_KEY = 'steps-academy-posts'

const examplePosts = [
  {
    id: 'example-primary',
    title: 'مراجعة الصف الابتدائي',
    image: '/one.jpg',
    description: 'تابعوا أحدث الدروس والمراجعات المخصصة لطلاب المرحلة الابتدائية.',
    postedAt: '2026-11-19',
  },
  {
    id: 'example-preparatory',
    title: 'محتوى الصف الإعدادي',
    image: '/tow.jpg',
    description: 'ملخصات وموضوعات دراسية جديدة تساعدك على متابعة المنهج.',
    postedAt: '2026-11-17',
  },
  {
    id: 'example-secondary',
    title: 'جديد الصف الثانوي',
    image: '/thriy.jpg',
    description: 'اكتشف آخر الإضافات والإعلانات التعليمية للمرحلة الثانوية.',
    postedAt: '2026-11-14',
  },
]

function isPost(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.title === 'string'
    && typeof value.description === 'string'
    && typeof value.postedAt === 'string'
    && (value.image === null || typeof value.image === 'string')
}

function loadSavedPosts() {
  try {
    const storedPosts = window.localStorage.getItem(STORAGE_KEY)
    if (!storedPosts) return { savedPosts: [], error: '' }

    const parsedPosts = JSON.parse(storedPosts)
    if (!Array.isArray(parsedPosts) || !parsedPosts.every(isPost)) {
      throw new Error('تنسيق المنشورات المحفوظة غير صالح.')
    }

    return { savedPosts: parsedPosts, error: '' }
  } catch {
    return {
      savedPosts: [],
      error: 'تعذر تحميل المنشورات المحفوظة من هذا المتصفح.',
    }
  }
}

export function PostsProvider({ children }) {
  const [store, setStore] = useState(loadSavedPosts)
  const posts = [...store.savedPosts, ...examplePosts]

  function addPost(post) {
    const savedPosts = [post, ...store.savedPosts]
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPosts))
    } catch {
      throw new Error('تعذر حفظ المنشور في هذا المتصفح. قد تكون مساحة التخزين ممتلئة.')
    }

    setStore({ savedPosts, error: '' })
  }

  return (
    <PostsContext.Provider value={{ posts, error: store.error, addPost }}>
      {children}
    </PostsContext.Provider>
  )
}
