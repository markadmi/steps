import Cards from './cards.jsx'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="home-page" dir="rtl">
      <section className="home-levels">
        <header className="home-levels-heading">
          <h2>المراحل الدراسية</h2>
        </header>
        <Row xs={2} sm={2} md={3} lg={4} className="home-levels-grid">
          <Col className='colv'>
            <Cards
              ditals='الصف الابتدائي'
              img="/one.jpg"
              disc='معا مستر سيد'
              to="/Groups/primary"
              width="16rem"
              imageHeight="130px"
            />
          </Col>
          <Col className='colv'>
            <Cards
              ditals='الصف الاعدادي'
              img="/tow.jpg"
              disc='معا مستر سيد'
              to="/Groups/preparatory"
              width="16rem"
              imageHeight="130px"
            />
          </Col>
          <Col className='colv'>
            <Cards
              ditals='الصف الثانوي'
              img="/thriy.jpg"
              disc='معا مستر سيد'
              to="/Groups/secondary"
              width="16rem"
              imageHeight="130px"
            />
          </Col>
          <Col className='colv'>
            <Card as={Link} to="/Posts" className="publish-card" style={{ width: '16rem' }}>
              <div className="publish-card-art" aria-hidden="true">+</div>
              <Card.Body>
                <Card.Title>صفحة النشر</Card.Title>
                <Card.Text dir="rtl">إضافة منشور جديد</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className='colv'>
            <Card as={Link} to="/Tests" className="publish-card" style={{ width: '16rem' }}>
              <div className="publish-card-art tests-entry-art" aria-hidden="true">✓</div>
              <Card.Body>
                <Card.Title>الاختبارات الإلكترونية</Card.Title>
                <Card.Text dir="rtl">استعرض الاختبارات</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className='colv'>
            <Card as={Link} to="/Certificates" className="publish-card" style={{ width: '16rem' }}>
              <div className="publish-card-art certificate-entry-art" aria-hidden="true">#</div>
              <Card.Body>
                <Card.Title>التحقق من الشهادة</Card.Title>
                <Card.Text dir="rtl">تحقق برقم الشهادة</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </main>
  )
}
