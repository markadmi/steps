import PostComposer from './PostComposer.jsx'
import PostFeed from './PostFeed.jsx'

export default function Posts() {
  return (
    <main className="posts-page" dir="rtl">
      <header className="posts-heading">
        <h1>منشورات الأكاديمية</h1>
      </header>
      <PostComposer />
      <PostFeed />
    </main>
  )
}
