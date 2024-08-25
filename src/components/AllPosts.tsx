import { GET_POSTS } from '../queries/Queries';
import { useQuery, useMutation } from '@apollo/client';
import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DELETE_POST } from '../queries/Mutations';
import CreatePostForm from './CreatePostForm';

interface PostUser {
  id: number;
  username: string;
}

interface PostData {
  id: string;
  title: string;
  body: string;
  user: PostUser;
}

const AllPosts = () => {
  const { data, error, loading } = useQuery(GET_POSTS);
  const [deletePost] = useMutation(DELETE_POST);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="danger">
        <h1>ERROR!</h1>
      </Alert>
    );
  }

  const handleClick = async (id: string) => {
    try {
      const { data } = await deletePost({ variables: { id } });
      if (data?.deletePost) {
        setDeleteSuccess(`Post with ID ${id} was successfully deleted.`);
      } else {
        setDeleteSuccess(`Failed to delete post with ID ${id}.`);
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <Container>
      <CreatePostForm />
      <h1>Posts</h1>
      {deleteSuccess && <Alert variant="success">{deleteSuccess}</Alert>}
      <Row>
        {data.posts.data.map(({ id, title, body, user }: PostData) => (
          <Col className="col-6 my-3" key={id}>
            <Card className="p-1 m-3 h-100">
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <strong>User:</strong> {user.username} <strong>ID:</strong> {user.id}
                </Card.Subtitle>
                <Card.Text>{body}</Card.Text>
                <Link to={`/posts/${id}`}>
                  <Button variant="primary">See Post</Button>
                </Link>
                <Link to={`/edit-post/${id}`}>
                  <Button variant="primary">Update Post</Button>
                </Link>
                <Button onClick={() => handleClick(id)} variant="danger">Delete Post</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllPosts;



