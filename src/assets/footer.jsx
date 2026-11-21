
export default function Footer() {
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(currentDate)

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="site-footer-credit">الحقوق محفوظة لدى المطور/ محمد عبد المهيمن</span>
        <div className="site-footer-details">
          <span>01012631782</span>
          <span>
            <time dateTime={currentDate.toISOString().slice(0, 10)}>{formattedDate}</time>
          </span>
        </div>
      </div>
    </footer>
  )
}
