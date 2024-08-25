import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_POST } from "../queries/Mutations";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const EditPostForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST, {
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    updatePost({
      variables: {
        title: title,
        body: body,
      },
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center">Edit Post</h1>
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
              <h2>Post Updated Successfully!</h2>
              <p>
                <strong>Title:</strong> {data.updatePost.title}
              </p>
              <p>
                <strong>Body:</strong> {data.updatePost.body}
              </p>
              <p>
                <strong>ID:</strong> {data.updatePost.id}
              </p>
            </Alert>
          )}
          <Link to={`/`}>
            <Button variant="primary">Posts</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPostForm;
