import { useMutation } from '@apollo/client';
import  { FormEvent, useState } from 'react'
import { CREATE_POST } from '../queries/Mutations';
import { Alert, Button, Col, Container, Row, Spinner, Form } from 'react-bootstrap';


const CreatePostForm = () => {
  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  

  // useMutation works similarly to useQuery except it also returns a function that we need to call in order to execute our mutation (createAlbum)
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    createPost({
      variables: {
        title: title,
        body: body,
      },
    });
  };

  return (
    <>
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center">Create Post</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                autoComplete="off"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>

          {data && (
            <Alert variant="success" className="mt-4">
              <h2>Post Created Successfully!</h2>
              <p><strong>Title:</strong> {data.createPost.title}</p>
              <p><strong>Body:</strong> {data.createPost.body}</p>
              <p><strong>ID:</strong> {data.createPost.id}</p>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>

    </>
  );
};

export default CreatePostForm
