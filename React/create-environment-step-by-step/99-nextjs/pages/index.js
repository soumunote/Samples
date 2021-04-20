import dynamic from 'next/dynamic';
import {
  Container,
  Form
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import { Button } from 'bootstrap';

const Stepper = dynamic(
  () => import('../components/stepper.js'),
  { ssr: false }
);
Stepper.Step = dynamic(
  () => import('../components/stepper.js').then(modules => modules.Step),
  { ssr: false }
);

export default function Index() {
  return (
    <Container>
      <Stepper id="stepper1">
        <div className="bs-stepper-header">
          <Stepper.Step step="1" target="#dneo" label="Connect to desknet's Neo" />
          <div className="line"></div>
          <Stepper.Step step="2" target="#google" label="Connect to Google" />
          <div className="line"></div>
          <Stepper.Step step="3" target="#complete" label="Comolete!" />
        </div>
        <div className="bs-stepper-content">
          <div id="dneo" className="content">
            <h1>Connect to desknet's Neo</h1>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username"/>
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password"/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Next
              </Button>
            </Form>
          </div>
          <div id="google" className="content">
            <h1>Connect to Google</h1>
          </div>
          <div id="complete" className="content">
            <h1>Comolete!</h1>
          </div>
        </div>
      </Stepper>
    </Container>
  );
}
