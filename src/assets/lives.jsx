import { useState } from 'react'

const padNumber = (number) => String(number).padStart(2, '0')

function dateAfterDays(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`
}

function getWeekday(dateValue) {
  if (!dateValue) return '—'
  const [year, month, day] = dateValue.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('ar-EG', { weekday: 'long' })
}

const initialStreams = [
  { id: 1, date: dateAfterDays(1), time: '18:00', location: 'قناة الأكاديمية', enabled: true },
  { id: 2, date: dateAfterDays(3), time: '19:00', location: 'يوتيوب', enabled: true },
  { id: 3, date: dateAfterDays(5), time: '17:00', location: 'فيسبوك', enabled: false },
]

export default function Lives() {
  const [streams, setStreams] = useState(initialStreams)
  const activeStreams = streams.filter((stream) => stream.enabled).length

  function updateStream(id, field, value) {
    setStreams((currentStreams) =>
      currentStreams.map((stream) => stream.id === id ? { ...stream, [field]: value } : stream)
    )
  }

  function addStream() {
    setStreams((currentStreams) => [
      ...currentStreams,
      {
        id: currentStreams.reduce((largestId, stream) => Math.max(largestId, stream.id), 0) + 1,
        date: dateAfterDays(currentStreams.length + 1),
        time: '',
        location: '',
        enabled: true,
      },
    ])
  }

  function removeStream(id) {
    setStreams((currentStreams) => currentStreams.filter((stream) => stream.id !== id))
  }

  return (
    <main className="lives-page" dir="rtl">
      <section className="lives-panel" aria-labelledby="lives-title">
        <div className="lives-heading">
          <div>
            <p className="lives-eyebrow">نظّم مواعيدك القادمة</p>
            <h1 id="lives-title">جدول البثوث</h1>
            <p className="lives-description">حدّد يوم وتاريخ ووقت ومكان كل بث. يتحدّث اسم اليوم تلقائيًا عند تغيير التاريخ.</p>
          </div>
          <div className="lives-summary" aria-live="polite">
            <span className="summary-number">{activeStreams}</span>
            <span>بثوث محددة</span>
          </div>
        </div>

        <div className="lives-table-wrap">
          <table className="lives-table">
            <thead>
              <tr>
                <th scope="col">تحديد</th>
                <th scope="col">اليوم</th>
                <th scope="col">التاريخ</th>
                <th scope="col">الوقت</th>
                <th scope="col">مكان البث</th>
                <th scope="col"><span className="visually-hidden">إجراء</span></th>
              </tr>
            </thead>
            <tbody>
              {streams.map((stream) => (
                <tr className={stream.enabled ? 'stream-row is-enabled' : 'stream-row'} key={stream.id}>
                  <td>
                    <label className="stream-toggle">
                      <input
                        type="checkbox"
                        checked={stream.enabled}
                        onChange={(event) => updateStream(stream.id, 'enabled', event.target.checked)}
                        aria-label={`تحديد بث يوم ${getWeekday(stream.date)}`}
                      />
                      <span>محدد</span>
                    </label>
                  </td>
                  <td className="weekday-cell">{getWeekday(stream.date)}</td>
                  <td>
                    <input
                      className="schedule-input"
                      type="date"
                      value={stream.date}
                      onChange={(event) => updateStream(stream.id, 'date', event.target.value)}
                      aria-label="تاريخ البث"
                    />
                  </td>
                  <td>
                    <input
                      className="schedule-input time-input"
                      type="time"
                      value={stream.time}
                      onChange={(event) => updateStream(stream.id, 'time', event.target.value)}
                      aria-label="وقت البث"
                    />
                  </td>
                  <td>
                    <input
                      className="schedule-input location-input"
                      type="text"
                      value={stream.location}
                      onChange={(event) => updateStream(stream.id, 'location', event.target.value)}
                      placeholder="مثال: يوتيوب أو قاعة الأكاديمية"
                      aria-label="مكان البث"
                    />
                  </td>
                  <td>
                    <button className="remove-stream" type="button" onClick={() => removeStream(stream.id)} aria-label="حذف موعد البث">
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
              {streams.length === 0 && (
                <tr>
                  <td className="empty-schedule" colSpan="6">لا توجد مواعيد بعد. أضف موعد البث القادم.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="lives-footer">
          <p>تُحدّث التغييرات في الجدول مباشرةً.</p>
          <button className="add-stream-button" type="button" onClick={addStream}>
            <span aria-hidden="true">+</span>
            إضافة موعد بث
          </button>
        </div>
      </section>
    </main>
  )
}
