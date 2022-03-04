import Link from 'next/link'
import { Context } from '@/lib/context'
import { useRouter } from 'next/router'
import AdminLayout from '@/layouts/admin'
import { useMutation } from '@apollo/client'
import { useState, useContext } from 'react'
import { ADD_ANNOUNCEMENT } from '@/lib/graphql/mutations'
import { Container, Button, Card, Form } from 'react-bootstrap'

import RichEditorExample from '@/components/draft-editor'

const Create = () => {
  const router = useRouter()
  const { state } = useContext(Context)
  const [message, setMessage] = useState('')
  const [attemptSavingAnnouncement, { error }] = useMutation(ADD_ANNOUNCEMENT, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data?.addAnnouncement) router.push('/dashboard/admin/announcement')
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    attemptSavingAnnouncement({
      variables: { userId: state?.user?.id, message: message.trim() },
    })
  }

  return (
    <AdminLayout title="Create Announcements - SDAAMS">
      <Container>
        <Card className="shadow-sm">
          <Card.Header className="bg-dark text-white">
            Create Annoucement
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
              {/*<RichEditorExample />*/}
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
}

export default Create
