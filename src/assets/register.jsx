import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './auth-context.js'

const MAX_AVATAR_SIZE = 1024 * 1024

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('تعذرت قراءة صورة الحساب.'))
      }
    })
    reader.addEventListener('error', () => reject(new Error('تعذرت قراءة صورة الحساب.')))
    reader.readAsDataURL(file)
  })
}

export default function Register() {
  const { signIn, error: sessionError } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [message, setMessage] = useState(sessionError)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function handleImageChange(event) {
    const image = event.target.files?.[0]
    if (!image) return

    if (!image.type.startsWith('image/')) {
      setMessage('الرجاء اختيار ملف صورة صالح.')
      event.target.value = ''
      return
    }

    if (image.size > MAX_AVATAR_SIZE) {
      setMessage('حجم الصورة يتجاوز 1 ميجابايت. اختر صورة أصغر.')
      event.target.value = ''
      return
    }

    setMessage('')
    setSelectedImage(image)
    setPreviewUrl(URL.createObjectURL(image))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)
    if (formData.get('password') !== formData.get('confirmPassword')) {
      setMessage('كلمتا المرور غير متطابقتين.')
      return
    }

    try {
      const avatar = selectedImage ? await readImageAsDataUrl(selectedImage) : null
      signIn({
        name: String(formData.get('name')).trim(),
        email: String(formData.get('email')).trim(),
        avatar,
      })
      navigate(location.state?.from?.pathname || '/Home', { replace: true })
      form.reset()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'تعذر إنشاء الحساب.')
    }
  }

  return (
    <main className="register-page" dir="rtl">
      <section className="register-card" aria-labelledby="register-title">
        <header className="register-heading">
          <h1 id="register-title">إنشاء حساب جديد</h1>
        </header>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="avatar-picker">
            {previewUrl ? (
              <img className="avatar-preview" src={previewUrl} alt="معاينة صورة الحساب" />
            ) : (
              <div className="avatar-placeholder" aria-hidden="true">صورة</div>
            )}
            <div className="avatar-actions">
              <span className="form-label">صورة الحساب <span className="optional-label">(اختياري)</span></span>
              <input
                className="account-file-input visually-hidden"
                id="account-avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label className="avatar-upload" htmlFor="account-avatar">اختيار صورة (حتى 1 ميجابايت)</label>
            </div>
          </div>

          <label className="register-field">
            <span className="form-label">الاسم الكامل</span>
            <input name="name" type="text" autoComplete="name" placeholder="اكتب اسمك الكامل" required />
          </label>

          <label className="register-field">
            <span className="form-label">البريد الإلكتروني</span>
            <input name="email" type="email" autoComplete="email" placeholder="name@example.com" required />
          </label>

          <label className="register-field">
            <span className="form-label">كلمة المرور</span>
            <input name="password" type="password" autoComplete="new-password" minLength="8" placeholder="٨ أحرف على الأقل" required />
          </label>

          <label className="register-field">
            <span className="form-label">تأكيد كلمة المرور</span>
            <input name="confirmPassword" type="password" autoComplete="new-password" minLength="8" placeholder="أعد كتابة كلمة المرور" required />
          </label>

          {message && (
            <p className="register-message is-error" role="alert">
              {message}
            </p>
          )}

          <button className="register-submit" type="submit">إنشاء الحساب</button>
          <p className="auth-switch">
            لديك حساب بالفعل؟ <Link to="/Login" state={location.state}>تسجيل الدخول</Link>
          </p>
          <p className="auth-demo-note">تسجيل تجريبي؛ التحقق الفعلي يتطلب خادمًا.</p>
        </form>
      </section>
    </main>
  )
}
