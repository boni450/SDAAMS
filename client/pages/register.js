import { useRouter } from 'next/router'
import { Context } from '@/lib/context'
import { useMutation } from '@apollo/client'
import { useState, useContext } from 'react'
import DefaultLayout from '@/layouts/default'
import { REGISTER } from '@/lib/graphql/mutations'
import { Alert, Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

const Register = () => {
  const router = useRouter()
  const { dispatch } = useContext(Context)
  const [alert, setAlert] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [attemptRegistration, { data, loading, error }] = useMutation(
    REGISTER,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data?.register) {
          localStorage.setItem('payload', data.register)
          dispatch({ type: 'LOGIN', payload: data.register })
          router.push('/dashboard')
        }
      },
    }
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    if (password !== verifyPassword) {
      setAlert('Passwords do not match')
      return
    }

    attemptRegistration({
      variables: { email, lastName, firstName, password },
    })

    if (error) setAlert('Email is already taken')
  }

  return (
    <DefaultLayout title="Register - SDAAMS">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {alert && <Alert variant="warning">{alert}</Alert>}
            <Card className="shadow-sm my-3">
              <Card.Header className="bg-dark text-white">Register</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="justify-content-center">
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          required="true"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(el) => setFirstName(el.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicLastName"
                      >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          required="true"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(el) => setLastName(el.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          required="true"
                          placeholder="Enter email"
                          value={email}
                          onChange={(el) => setEmail(el.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          required="true"
                          placeholder="Password"
                          value={password}
                          onChange={(el) => setPassword(el.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicVerifyPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          required="true"
                          placeholder="Confirm Password"
                          value={verifyPassword}
                          onChange={(el) => setVerifyPassword(el.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
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

export default Register
