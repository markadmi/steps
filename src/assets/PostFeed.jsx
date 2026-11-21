import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Cards from './cards.jsx'
import { usePosts } from './posts-context.js'

export default function PostFeed() {
  const { posts, error } = usePosts()

  return (
    <section className="post-feed" aria-label="المنشورات">
      {error && <p className="post-feed-error" role="alert">{error}</p>}

      <Row xs={1} md={2} lg={3} className="posts-grid">
        {posts.map((post) => (
          <Col className="colv" key={post.id}>
            <Cards
              ditals={post.title}
              img={post.image}
              disc={post.description}
              postedAt={post.postedAt}
            />
          </Col>
        ))}
      </Row>
    </section>
  )
}
