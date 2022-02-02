import { useState } from 'react'
import { useRouter } from 'next/router'
import { setCookie } from '@/lib/cookie'
import { useLazyQuery } from '@apollo/client'
import DefaultLayout from '@/layouts/default'
import { LOGIN } from '@/lib/graphql/queries'
import { Alert, Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

const Login = () => {
  const router = useRouter()
  const [alert, setAlert] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [attemptLogin, { error }] = useLazyQuery(LOGIN, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data?.login) {
        setCookie('payload', data?.login)
        localStorage.setItem('payload', data?.login)
        router.push('/dashboard')
      }
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    attemptLogin({ variables: { email, password } })
    if (error) setAlert('Wrong email or password')
  }

  return (
    <DefaultLayout title="Sign in - SDAAMS">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            {alert && <Alert variant="warning">{alert}</Alert>}
            <Card className="shadow-sm my-3">
              <Card.Header className="bg-dark text-white">Sign in</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      required={true}
                      placeholder="Enter email"
                      value={email}
                      onChange={(el) => setEmail(el.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      required={true}
                      placeholder="Enter password"
                      value={password}
                      onChange={(el) => setPassword(el.target.value)}
                    />
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
