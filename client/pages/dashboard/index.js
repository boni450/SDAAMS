import {
  USER_SEARCH,
  PRINT_ACTIVITY,
  GET_DASHBOARD_DATA,
} from '@/lib/graphql/queries'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Context } from '@/lib/context'
import Loader from '@/components/loader'
import { useContext, useState } from 'react'
import Calendar from '@/components/calendar'
import DefaultLayout from '@/layouts/default'
import { useQuery, useLazyQuery } from '@apollo/client'
import AppointmentTable from '@/components/appointment-table'
import {
  Row,
  Col,
  Tab,
  Tabs,
  Card,
  Form,
  Table,
  Button,
  Container,
} from 'react-bootstrap'

const Dashboard = () => {
  const { state } = useContext(Context)
  const [range, setRange] = useState('all')
  const [keyword, setKeyword] = useState('')
  const { loading, data, refetch } = useQuery(GET_DASHBOARD_DATA, {
    variables: {
      userId: state?.user?.id,
      orderCol: 'startDate',
      orderBy: 'ASC',
    },
    fetchPolicy: 'no-cache',
  })
  const [searchUser, userSearchQuery] = useLazyQuery(USER_SEARCH)
  const [printActivity, printActivityQuery] = useLazyQuery(PRINT_ACTIVITY, {
    onCompleted: (data) => {
      window.open(process.env.API + data?.printActivity)
    },
  })

  const searchSubmit = (event) => {
    event.preventDefault()
    searchUser({ variables: { keyword: keyword.trim() } })
  }

  const rangeSubmit = (event) => {
    event.preventDefault()
    // printActivity({ variables: { userId: state?.user?.id, range } })

    let divToPrint=document.getElementById("print-table");
    let newWin= window.open("");
    newWin.document.write('<link rel="stylesheet" href="/css/bootstrap.css" />'+divToPrint.outerHTML);

    setTimeout(() => {
      newWin.print();
      newWin.close();
    }, 1500)
  }

  if (state?.user?.role == 'admin') useRouter().push('/dashboard/admin')

  if (loading)
    return (
      <DefaultLayout title="Dashboard - SDAAMS">
        <Container>
          <Loader size={16} />
        </Container>
      </DefaultLayout>
    )
  if (data)
    return (
      <DefaultLayout
        title="Dashboard - SDAAMS"
        notifications={data?.notificationCount}
      >
        <Container>
          <Tabs
            defaultActiveKey={data?.announcements?.length ? '3' : '1'}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="1" title="Calendar">
              <Calendar
                state={state}
                refetch={refetch}
                profile={state?.user}
                data={data?.appointments || []}
              />
            </Tab>
            <Tab
              eventKey="2"
              title={'My Activities (' + data?.appointments?.length + ')'}
            >
              <Form onSubmit={rangeSubmit} className="d-flex mb-2">
                <Button variant="info" type="submit" className="ms-auto me-2">
                  Print Report
                </Button>
                {/*<Form.Select
                  value={range}
                  className="w-25"
                  onChange={(el) => setRange(el.target.value)}
                >
                  <option value="all">All Activities</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </Form.Select>
*/}              </Form>
              <AppointmentTable
                state={state}
                refetch={refetch}
                appointments={data?.appointments || []}
              />
            </Tab>
            <Tab
              eventKey="3"
              title={'Notice Board (' + data?.announcements?.length + ')'}
            >
              <Row className="justify-content-center">
                {data?.announcements.map((item, index) => {
                  let a = new Date()
                  a.setTime(item?.createdAt)

                  return (
                    <Col md={6} key={index}>
                      <Card className="shadow-sm mb-2">
                        <Card.Header className="text-truncate">
                          {item?.user?.firstName} {item?.user?.lastName} -{' '}
                          {a.toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </Card.Header>
                        <Card.Body>{item?.message}</Card.Body>
                      </Card>
                    </Col>
                  )
                })}
              </Row>
            </Tab>
            {state?.user?.role !== 'staff' && (
              <Tab eventKey="4" title="Request Appointment">
                <Form onSubmit={searchSubmit} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={keyword}
                    required={true}
                    className="w-50 me-2"
                    placeholder="Search person by name, email..."
                    onChange={(el) => setKeyword(el.target.value)}
                  />
                  <Button variant="primary" type="submit" className="me-auto">
                    Search
                  </Button>
                </Form>
                {userSearchQuery?.data?.userSearch.length && (
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    className="mt-2 shadow-sm"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userSearchQuery?.data?.userSearch.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user?.firstName}</td>
                          <td>{user?.lastName}</td>
                          <td>{user?.email}</td>
                          <td>
                            <Link href={'/user/' + user?.id}>
                              <a className="btn btn-sm btn-secondary">
                                Book Appointment
                              </a>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Tab>
            )}
          </Tabs>
        </Container>
      </DefaultLayout>
    )
  return <>loading...</>
}

export default Dashboard
