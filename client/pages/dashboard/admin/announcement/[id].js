import Link from 'next/link'
import { Context } from '@/lib/context'
import { useRouter } from 'next/router'
import AdminLayout from '@/layouts/admin'
import { useState, useEffect, useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ANNOUNCEMENT } from '@/lib/graphql/queries'
import { UPDATE_ANNOUNCEMENT } from '@/lib/graphql/mutations'
import { Container, Button, Card, Form } from 'react-bootstrap'
import Loader from '@/components/loader'

const Edit = () => {
  const router = useRouter()
  const { state } = useContext(Context)
  const [message, setMessage] = useState('')
  const { data } = useQuery(GET_ANNOUNCEMENT, {
    variables: { id: Number.parseInt(router.query.id) || 0 },
    fetchPolicy: 'network-only',
  })
  const [attemptUpdatingAnnouncement, { error }] = useMutation(
    UPDATE_ANNOUNCEMENT,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data?.updateAnnouncement)
          router.push('/dashboard/admin/announcement')
      },
    }
  )

  useEffect(() => {
    setMessage(data?.announcement?.message)
  }, [data])

  const handleSubmit = (event) => {
    event.preventDefault()
    attemptUpdatingAnnouncement({
      variables: {
        message: message.trim(),
        userId: Number.parseInt(state?.user?.id),
        id: Number.parseInt(data?.announcement?.id),
      },
    })
  }

  if (data?.announcement)
    return (
      <AdminLayout title="Edit Announcement - SDAAMS">
        <Container>
          <Card className="shadow-sm">
            <Card.Header className="bg-dark text-white">
              Edit Annoucement
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={message}
                    onChange={(el) => setMessage(el.target.value)}
                    placeholder="Compose an informative announcement..."
                  />
                </Form.Group>
                <div className="d-grid mt-2">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </AdminLayout>
    )
  else
    return (
      <AdminLayout title="Edit Announcement - SDAAMS">
        <Container>
          <Loader size={8} />
        </Container>
      </AdminLayout>
    )
}

export default Edit
