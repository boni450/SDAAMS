import DefaultLayout from '@/layouts/default'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

const Login = () => {
  return (
    <DefaultLayout title="Sign in - SDAAMS">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-sm my-3">
              <Card.Header className="bg-dark text-white">Sign in</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Login
