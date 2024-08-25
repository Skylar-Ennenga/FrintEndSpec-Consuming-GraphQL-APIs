
import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST } from '../queries/Queries';





const SinglePost = () => {
    const{ id } = useParams();


    
    const { data, error, loading } = useQuery(GET_POST, {
        variables: { id },
      });
      


        if (loading) {
            return <Spinner animation="border" />;
          }
        
          if (error) {
            return (
              <Alert>
                <h1>ERROR! {error.message} </h1>
              </Alert>
            );
          }
          const { id: postId, title, body, user } = data.post;
          const { username, id: userId } = user;


        
          return (
            <Container>
              <h1>Post</h1>
              <Row>
                <Col className='col-6 my-3'>
                  <Card key={postId} className='p-1 m-3 h-100'>
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        <strong>User:</strong> {username} <strong>ID:</strong> {userId}
                      </Card.Subtitle>
                      <Card.Text>{body}</Card.Text>
                      <Link to={`/`}>
                        <Button variant="primary">Home</Button>
                      </Link>

                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
  )
}

export default SinglePost
