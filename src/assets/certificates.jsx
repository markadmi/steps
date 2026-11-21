import { useState } from 'react'

const sampleCertificates = {
  'STEPS-2026-DEMO-001': {
    name: 'طالب تجريبي',
    course: 'شهادة إتمام برنامج تعليمي تجريبي',
    issuedAt: '2026-11-19',
  },
}

export default function Certificates() {
  const [certificateNumber, setCertificateNumber] = useState('')
  const [result, setResult] = useState(null)
  const [searchedNumber, setSearchedNumber] = useState('')

  function verifyCertificate(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const number = String(formData.get('certificateNumber')).trim().toUpperCase()
    setSearchedNumber(number)
    setResult(sampleCertificates[number] || false)
  }

  return (
    <main className="certificates-page" dir="rtl">
      <header className="certificates-heading">
        <h1>التحقق من الشهادة</h1>
      </header>

      <section className="certificate-check-card">
        <form className="certificate-check-form" onSubmit={verifyCertificate}>
          <label className="certificate-number-field">
            <span>رقم الشهادة</span>
            <input
              name="certificateNumber"
              type="text"
              value={certificateNumber}
              onChange={(event) => setCertificateNumber(event.target.value)}
              placeholder="مثال: STEPS-2026-DEMO-001"
              autoComplete="off"
              required
            />
          </label>
          <button className="certificate-verify-button" type="submit">تحقق من الرقم</button>
        </form>

        <p className="certificate-demo-note">
          فحص تجريبي بسجل ثابت داخل الواجهة؛ لا يثبت أصالة الشهادات الحقيقية دون خادم موثوق.
        </p>

        {result !== null && (
          result ? (
            <section className="certificate-result is-found" aria-live="polite">
              <h2>الرقم موجود في سجل العرض التجريبي</h2>
              <dl>
                <div><dt>رقم الشهادة</dt><dd>{searchedNumber}</dd></div>
                <div><dt>الاسم</dt><dd>{result.name}</dd></div>
                <div><dt>البرنامج</dt><dd>{result.course}</dd></div>
                <div><dt>تاريخ الإصدار</dt><dd>{result.issuedAt}</dd></div>
              </dl>
            </section>
          ) : (
            <p className="certificate-result is-missing" role="status">
              لم يُعثر على هذا الرقم في سجل العرض التجريبي.
            </p>
          )
        )}
      </section>
    </main>
  )
}
