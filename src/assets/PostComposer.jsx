import { useEffect, useState } from 'react'
import { usePosts } from './posts-context.js'

const MAX_IMAGE_SIZE = 1024 * 1024

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('تعذرت قراءة الصورة المحددة.'))
      }
    })
    reader.addEventListener('error', () => {
      reject(new Error('تعذرت قراءة الصورة المحددة.'))
    })
    reader.readAsDataURL(file)
  })
}

export default function PostComposer() {
  const { addPost } = usePosts()
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
  }, [imagePreview])

  function handleImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessageType('error')
      setMessage('اختر ملف صورة صالحًا.')
      event.target.value = ''
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setMessageType('error')
      setMessage('حجم الصورة يتجاوز 1 ميجابايت. اختر صورة أصغر.')
      event.target.value = ''
      return
    }

    setMessage('')
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsPublishing(true)
    setMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    let image = null

    try {
      if (imageFile) image = await readImageAsDataUrl(imageFile)

      addPost({
        id: String(Date.now()),
        title: String(formData.get('title')).trim(),
        description: String(formData.get('description')).trim(),
        image,
        postedAt: new Date().toISOString().slice(0, 10),
      })

      form.reset()
      setImageFile(null)
      setImagePreview('')
      setMessageType('success')
      setMessage('تم نشر المنشور وحفظه على هذا المتصفح.')
    } catch (error) {
      setMessageType('error')
      setMessage(error instanceof Error ? error.message : 'تعذر نشر المنشور.')
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <section className="post-composer" aria-labelledby="post-composer-title">
      <div className="post-composer-heading">
        <h2 id="post-composer-title">إنشاء منشور</h2>
      </div>

      <form className="post-composer-form" onSubmit={handleSubmit}>
        <label className="post-field">
          <span>عنوان المنشور</span>
          <input name="title" type="text" maxLength="100" placeholder="اكتب عنوانًا واضحًا" required />
        </label>

        <label className="post-field">
          <span>محتوى المنشور</span>
          <textarea name="description" rows="4" maxLength="2000" placeholder="اكتب تفاصيل المنشور هنا..." required />
        </label>

        <div className="post-image-row">
          <div className="post-image-preview">
            {imagePreview
              ? <img src={imagePreview} alt="معاينة صورة المنشور" />
              : <span aria-hidden="true">صورة</span>}
          </div>
          <div className="post-image-control">
            <label htmlFor="post-image">صورة المنشور <span>(اختياري، حتى 1 ميجابايت)</span></label>
            <input id="post-image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        <p className="post-storage-note">الحفظ محلي على هذا المتصفح فقط.</p>

        {message && (
          <p className={`post-form-message is-${messageType}`} role={messageType === 'error' ? 'alert' : 'status'}>
            {message}
          </p>
        )}

        <button className="post-publish-button" type="submit" disabled={isPublishing}>
          {isPublishing ? 'جارٍ النشر...' : 'نشر المنشور'}
        </button>
      </form>
    </section>
  )
}
