import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from './auth-context.js'

const links = [
  { label: 'الرئيسية', href: '/Home' },
  { label: 'المنشورات', href: '/Posts' },
  { label: 'المجموعات', href: '/Groups/primary' },
  { label: 'الاختبارات الإلكترونية', href: '/Tests' },
  { label: 'التحقق من الشهادة', href: '/Certificates' },
  { label: 'من نحن', href: '/About' },
  { label: 'تواصل معنا', href: '/contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signOut } = useAuth()

  useEffect(() => {
    if (!menuOpen) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="header-brand" href="/" aria-label="اكاديمية steps، الرئيسية">
          <span className="header-brand-mark" aria-hidden="true" />
          <span>اكادمية steps</span>
        </a>

        <button
          className="header-menu-button"
          type="button"
          aria-label={menuOpen ? 'إغلاق القائمة الجانبية' : 'فتح القائمة الجانبية'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <button
        className={`sidebar-backdrop${menuOpen ? ' is-visible' : ''}`}
        type="button"
        aria-label="إغلاق القائمة الجانبية"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`site-sidebar${menuOpen ? ' is-open' : ''}`}
        id="site-navigation"
        aria-label="القائمة الجانبية"
        aria-hidden={!menuOpen}
      >
        <div className="sidebar-heading">
          <div>
            <p className="sidebar-eyebrow">اكاديمية steps</p>
            <h2>أقسام الأكاديمية</h2>
          </div>
          <button
            className="sidebar-close"
            type="button"
            aria-label="إغلاق القائمة الجانبية"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="أقسام الموقع">
          {links.map((link, index) => (
              <NavLink
                className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}
                to={link.href}
                key={link.href}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
              >
                <span className="sidebar-link-index">{String(index + 1).padStart(2, '0')}</span>
                {link.label}
              </NavLink>
          ))}
          <button
            className="sidebar-link sidebar-logout"
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => {
              signOut()
              setMenuOpen(false)
            }}
          >
            تسجيل الخروج
          </button>
        </nav>
      </aside>
    </header>
  )
}
