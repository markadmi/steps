import { useState } from 'react'
import { Link, NavLink, Navigate, useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { GROUPS_STORAGE_KEY, loadGroups, stages } from './groups-store.js'

export default function Groups() {
  const { stage: stageKey } = useParams()
  const stage = stages[stageKey]
  const [storedData, setStoredData] = useState(loadGroups)
  const [formOpen, setFormOpen] = useState(false)
  const [message, setMessage] = useState('')
  const stageGroups = storedData.groups.filter((group) => group.stage === stageKey)

  if (!stage) return <Navigate to="/Groups/primary" replace />

  function createGroup(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const newGroup = {
      id: `${Date.now()}`,
      stage: stageKey,
      name: String(formData.get('name')).trim(),
      description: String(formData.get('description')).trim(),
    }
    const groups = [newGroup, ...storedData.groups]

    try {
      window.localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups))
    } catch {
      setMessage('تعذر حفظ المجموعة في هذا المتصفح.')
      return
    }

    setStoredData({ groups, error: '' })
    setMessage('')
    setFormOpen(false)
  }

  return (
    <main className="groups-page" dir="rtl">
      <header className="groups-heading">
        <div>
          <h1>مجموعات {stage.title}</h1>
          <p>{stageGroups.length} مجموعة</p>
        </div>
        <button
          className="group-create-button"
          type="button"
          onClick={() => {
            setMessage('')
            setFormOpen(!formOpen)
          }}
          disabled={Boolean(storedData.error)}
        >
          {formOpen ? 'إلغاء' : 'إنشاء مجموعة'}
        </button>
      </header>

      <nav className="group-stage-tabs" aria-label="المراحل الدراسية">
        {Object.entries(stages).map(([key, value]) => (
          <NavLink
            className={({ isActive }) => `group-stage-tab${isActive ? ' is-active' : ''}`}
            to={`/Groups/${key}`}
            key={key}
          >
            {value.title}
          </NavLink>
        ))}
      </nav>

      {storedData.error && <p className="group-error" role="alert">{storedData.error}</p>}

      {formOpen && (
        <form className="group-create-form" onSubmit={createGroup}>
          <label className="group-field">
            <span>اسم المجموعة</span>
            <input name="name" type="text" maxLength="80" placeholder="مثال: مجموعة الصف الأول" required />
          </label>
          <label className="group-field">
            <span>وصف المجموعة <span className="optional-label">(اختياري)</span></span>
            <textarea name="description" rows="3" maxLength="500" placeholder="تفاصيل مختصرة عن المجموعة" />
          </label>
          {message && <p className="group-error" role="alert">{message}</p>}
          <button className="group-create-button" type="submit">حفظ المجموعة</button>
        </form>
      )}

      {stageGroups.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="groups-grid">
          {stageGroups.map((group) => (
            <Col className="colv" key={group.id}>
              <Card
                as={Link}
                to={`/Groups/${stageKey}/${group.id}`}
                className="academy-group-card"
                style={{ width: '18rem' }}
              >
                <Card.Img variant="top" src={stage.image} alt={stage.title} />
                <Card.Body>
                  <Card.Title>{group.name}</Card.Title>
                  <Card.Text>{group.description || stage.title}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        !storedData.error && <p className="groups-empty">لا توجد مجموعات في {stage.title} بعد.</p>
      )}

      <p className="groups-storage-note">المجموعات محفوظة محليًا في هذا المتصفح.</p>
      <Link className="groups-home-link" to="/Home">العودة إلى الرئيسية</Link>
    </main>
  )
}
