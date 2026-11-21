import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const exams = [
  {
    title: 'اختبار الرياضيات',
    grade: 'الصف الابتدائي',
    image: '/one.jpg',
  },
  {
    title: 'اختبار العلوم',
    grade: 'الصف الإعدادي',
    image: '/tow.jpg',
  },
  {
    title: 'اختبار المراجعة',
    grade: 'الصف الثانوي',
    image: '/thriy.jpg',
  },
]

export default function Tests() {
  return (
    <main className="tests-page" dir="rtl">
      <header className="tests-heading">
        <h1>الاختبارات الإلكترونية</h1>
      </header>

      <Row xs={1} md={2} lg={3} className="tests-grid">
        {exams.map((exam) => (
          <Col className="colv" key={exam.title}>
            <Card className="exam-card" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={exam.image} alt={exam.grade} />
              <Card.Body>
                <Card.Title>{exam.title}</Card.Title>
                <Card.Text>{exam.grade}</Card.Text>
                <span className="exam-status">قريبًا</span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </main>
  )
}
