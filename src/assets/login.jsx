import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './auth-context.js'

export default function Login() {
  const { signIn, error: sessionError } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [message, setMessage] = useState(sessionError)

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      signIn({ email: String(formData.get('email')).trim() })
      navigate(location.state?.from?.pathname || '/Home', { replace: true })
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'تعذر تسجيل الدخول.')
    }
  }

  return (
    <main className="login-page" dir="rtl">
      <section className="login-card">
        <form className="login" onSubmit={handleSubmit}>
          <header className="auth-heading">
            <p>أهلًا بعودتك</p>
            <h1>تسجيل الدخول</h1>
          </header>

          <label className="login-field">
            <span>البريد الإلكتروني</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>

          <label className="login-field">
            <span>كلمة المرور</span>
            <input name="password" type="password" autoComplete="current-password" required />
          </label>

          {message && <p className="auth-message" role="alert">{message}</p>}

          <button className="login-submit" type="submit">تسجيل الدخول</button>
          <p className="auth-switch">
            ليس لديك حساب؟ <Link to="/Register" state={location.state}>إنشاء حساب جديد</Link>
          </p>
          <p className="auth-demo-note">تسجيل تجريبي؛ التحقق الفعلي يتطلب خادمًا.</p>
        </form>
      </section>
    </main>
  )
}
