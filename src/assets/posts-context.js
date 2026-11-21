import { createContext, useContext } from 'react'

export const PostsContext = createContext(null)

export function usePosts() {
  const context = useContext(PostsContext)
  if (!context) throw new Error('يجب استخدام المنشورات داخل PostsProvider.')
  return context
}
