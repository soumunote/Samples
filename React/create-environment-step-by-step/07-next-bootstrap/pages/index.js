import { Button, Container, Form, Jumbotron } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Index() {
  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Jumbotron>
            <Container>
              <h1>Hello, world</h1>
              <p>This is a sample of Next.js, React Bootstrap.</p>
              <Button variant="primary">Primary</Button>{' '}
              <Button variant="secondary">Secondary</Button>{' '}
            </Container>
          </Jumbotron>
          <Form>
            <Form.Group controlId="frmBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>        
      </Row>
    </Container>
  );
}

export default Index;