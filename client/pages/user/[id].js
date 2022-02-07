import { useContext } from 'react'
import { Context } from '@/lib/context'
import { useRouter } from 'next/router'
import Loader from '@/components/loader'
import { useQuery } from '@apollo/client'
import DefaultLayout from '@/layouts/default'
import {
  GET_USER_WITH_APPOINTMENTS,
  GET_APPOINTMENTS,
} from '@/lib/graphql/queries'
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap'
import Calendar from '@/components/calendar'

const User = () => {
  const router = useRouter()
  const { state } = useContext(Context)
  const { data } = useQuery(GET_USER_WITH_APPOINTMENTS, {
    variables: { id: Number.parseInt(router.query.id) || 0 },
    fetchPolicy: 'network-only',
  })

  if (data?.user)
    return (
      <DefaultLayout fluid={true} title="User - SDAAMS">
        <Container fluid className="mb-4">
          <Tab.Container id="user-profile-tabs" defaultActiveKey="first">
            <Row className="justify-content-center">
              <Col md={2}>
                <h4 className="text-truncate">
                  {data?.user.firstName} {data?.user.lastName}
                </h4>
                <h6 className="text-truncate">{data?.user.email}</h6>
                <hr />
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Calendar</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Appointments</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Calendar state={state} data={data?.appointments || []} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">second</Tab.Pane>
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
