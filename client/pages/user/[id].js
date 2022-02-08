import {
  Row,
  Col,
  Tab,
  Nav,
  Badge,
  Alert,
  ListGroup,
  Container,
} from 'react-bootstrap'
import { Context } from '@/lib/context'
import { useRouter } from 'next/router'
import Loader from '@/components/loader'
import { useContext, useState } from 'react'
import Calendar from '@/components/calendar'
import DefaultLayout from '@/layouts/default'
import { ADD_CHAT } from '@/lib/graphql/mutations'
import { ComposeMessageForm } from '@/components/chat/add'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_WITH_APPOINTMENTS } from '@/lib/graphql/queries'

const User = () => {
  const router = useRouter()
  const { state } = useContext(Context)
  const [alert, setAlert] = useState('')
  const { data } = useQuery(GET_USER_WITH_APPOINTMENTS, {
    variables: { id: Number.parseInt(router.query.id) || 0 },
    fetchPolicy: 'network-only',
  })
  const [attemptSavingChat, saveChatMutation] = useMutation(ADD_CHAT, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data?.addChat) {
        setAlert('')
        console.log(data?.addChat)
      } else setAlert('Email not found')
    },
  })

  const saveMessage = ({ email, message }) => {
    attemptSavingChat({
      variables: { email, message, senderId: state?.user?.id },
    })
  }

  if (data?.user)
    return (
      <DefaultLayout
        fluid={true}
        title={data?.user.firstName + ' ' + data?.user.lastName + ' - SDAAMS'}
      >
        <Container fluid className="mb-4">
          <Tab.Container id="user-profile-tabs" defaultActiveKey="1">
            <Row className="justify-content-center">
              <Col md={2}>
                <h4 className="text-truncate">
                  {data?.user.firstName} {data?.user.lastName}
                </h4>
                <h6 className="text-truncate">{data?.user.email}</h6>
                <hr />
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="1">Calendar</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="2">Appointments</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="3">Contact</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={10}>
                {alert && <Alert variant="warning">{alert}</Alert>}
                <Tab.Content>
                  <Tab.Pane eventKey="1">
                    <Calendar state={state} data={data?.appointments || []} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <h2>
                      {data?.user.firstName} {data?.user.lastName}'s
                      appointments
                    </h2>
                    <ListGroup as="ol" numbered>
                      {data?.appointments.map((item, id) => (
                        <ListGroup.Item
                          action
                          as="li"
                          key={id}
                          className="d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.name}</div>
                            {item.description}
                          </div>
                          <Badge bg="light" className="text-dark" pill>
                            14
                          </Badge>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab.Pane>
                  <Tab.Pane eventKey="3">
                    <h2>Leave a message</h2>
                    <ComposeMessageForm saveMessage={saveMessage} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </DefaultLayout>
    )
  else
    return (
      <DefaultLayout title="User - SDAAMS">
        <Container fluid>
          <Loader size={16} />
        </Container>
      </DefaultLayout>
    )
}

export default User
