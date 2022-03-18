import Link from 'next/link'
import { useRouter } from 'next/router'
import AdminLayout from '@/layouts/admin'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER } from '@/lib/graphql/queries'
import { UPDATE_USER } from '@/lib/graphql/mutations'
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap'
import Loader from '@/components/loader'

const Edit = () => {
  const router = useRouter()
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const { data } = useQuery(GET_USER, {
    variables: { id: Number.parseInt(router.query.id) || 0 },
    fetchPolicy: 'network-only',
  })
  const [attemptUpdatingUser, { error }] = useMutation(UPDATE_USER, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data?.updateUser) router.push('/dashboard/admin/user')
    },
  })

  useEffect(() => {
    setRole(data?.user?.role || '')
    setEmail(data?.user?.email || '')
    setLastName(data?.user?.lastName || '')
    setFirstName(data?.user?.firstName || '')
  }, [data])

  const handleSubmit = (event) => {
    event.preventDefault()
    attemptUpdatingUser({
      variables: {
        role,
        email,
        lastName,
        firstName,
        id: Number.parseInt(data?.user?.id),
      },
    })
  }

  if (data?.user)
    return (
      <AdminLayout title="Edit User - SDAAMS">
        <Container>
          <Card className="shadow-sm">
            <Card.Header className="bg-dark text-white">Edit User</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        required={true}
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(el) => setFirstName(el.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        required={true}
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(el) => setLastName(el.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
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
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicUserRole">
                      <Form.Label>User Role</Form.Label>
                      <Form.Select
                        required={true}
                        value={role}
                        className="mb-2"
                        onChange={(el) => setRole(el.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </AdminLayout>
    )
  else
    return (
      <AdminLayout title="Edit User - SDAAMS">
        <Container>
          <Loader size={8} />
        </Container>
      </AdminLayout>
    )
}

export default Edit
