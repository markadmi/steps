import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { loadGroups, stages } from './groups-store.js'

const resourceTypes = {
  online: {
    title: 'شرح Online',
    emptyMessage: 'لا توجد حصص Online مضافة لهذه المجموعة بعد.',
  },
  recorded: {
    title: 'الفيديوهات المسجلة',
    emptyMessage: 'لا توجد فيديوهات مسجلة مضافة لهذه المجموعة بعد.',
  },
}

export default function GroupDetails() {
  const { stage: stageKey, groupId, resource } = useParams()
  const [storedData] = useState(loadGroups)
  const stage = stages[stageKey]
  const group = storedData.groups.find(
    (storedGroup) => storedGroup.id === groupId && storedGroup.stage === stageKey
  )

  if (!stage) return <Navigate to="/Groups/primary" replace />
  if (resource && !resourceTypes[resource]) return <Navigate to={`/Groups/${stageKey}/${groupId}`} replace />

  if (storedData.error || !group) {
    return (
      <main className="group-detail-page" dir="rtl">
        <p className="group-error" role="alert">
          {storedData.error || 'المجموعة غير موجودة.'}
        </p>
        <Link className="groups-home-link" to={`/Groups/${stageKey}`}>العودة إلى مجموعات {stage.title}</Link>
      </main>
    )
  }

  if (resource) {
    const selectedResource = resourceTypes[resource]
    return (
      <main className="group-detail-page" dir="rtl">
        <Link className="groups-home-link" to={`/Groups/${stageKey}/${group.id}`}>العودة إلى المجموعة</Link>
        <p className="group-detail-stage">{stage.title} · {group.name}</p>
        <h1 className="group-detail-title">{selectedResource.title}</h1>
        <p className="group-content-empty">{selectedResource.emptyMessage}</p>
      </main>
    )
  }

  return (
    <main className="group-detail-page" dir="rtl">
      <Link className="groups-home-link" to={`/Groups/${stageKey}`}>العودة إلى مجموعات {stage.title}</Link>
      <header className="group-detail-heading">
        <p>{stage.title}</p>
        <h1>{group.name}</h1>
        {group.description && <span>{group.description}</span>}
      </header>

      <div className="group-resources">
        <Link className="group-resource-card" to={`/Groups/${stageKey}/${group.id}/online`}>
          <span className="group-resource-icon" aria-hidden="true">◉</span>
          <strong>شرح Online</strong>
        </Link>
        <Link className="group-resource-card" to={`/Groups/${stageKey}/${group.id}/recorded`}>
          <span className="group-resource-icon" aria-hidden="true">▶</span>
          <strong>الفيديوهات المسجلة</strong>
        </Link>
      </div>
    </main>
  )
}
