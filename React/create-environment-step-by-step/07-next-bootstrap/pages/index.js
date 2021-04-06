import { Button, Container, Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Index() {
  return (
    <Jumbotron>
      <Container>
        <h1>Hello, world</h1>
        <p>This is a sample of Next.js, React Bootstrap.</p>
        <Button variant="primary">Primary</Button>{' '}
        <Button variant="secondary">Secondary</Button>{' '}
      </Container>
    </Jumbotron>
  );
}

export default Index;