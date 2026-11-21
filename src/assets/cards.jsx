import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

export default function Cards(props) {
    const formattedDate = props.postedAt
        ? new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date(`${props.postedAt}T12:00:00`))
        : null

    return (
     <Card
      as={props.to ? Link : 'div'}
      to={props.to}
      className={props.to ? 'grade-card-link' : undefined}
      style={{ width: props.width || '18rem' }}
     >
      {props.img && <Card.Img variant="top" src={props.img} alt={props.ditals} style={{ height: props.imageHeight || '150px' }} />}
      <Card.Body>
        <Card.Title>{props.ditals}</Card.Title>
        <Card.Text dir='rtl'>
          {props.disc}
        </Card.Text>
        {formattedDate && (
          <Card.Text className="card-date">
            <time dateTime={props.postedAt}>{formattedDate}</time>
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  )
}
