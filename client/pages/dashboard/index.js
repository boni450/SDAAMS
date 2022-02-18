import {
  USER_SEARCH,
  PRINT_ACTIVITY,
  GET_APPOINTMENTS,
} from '@/lib/graphql/queries'
import Link from 'next/link'
import { Context } from '@/lib/context'
import Loader from '@/components/loader'
import { useContext, useState } from 'react'
import Calendar from '@/components/calendar'
import DefaultLayout from '@/layouts/default'
import { useQuery, useLazyQuery } from '@apollo/client'
import AppointmentTable from '@/components/appointment/table'
import { Tab, Tabs, Form, Table, Button, Container } from 'react-bootstrap'

const Dashboard = () => {
  const { state } = useContext(Context)
  const [range, setRange] = useState('all')
  const [keyword, setKeyword] = useState('')
  const { loading, data, refetch } = useQuery(GET_APPOINTMENTS, {
    variables: {
      userId: state?.user?.id,
      orderCol: 'startDate',
      orderBy: 'ASC',
    },
    fetchPolicy: 'network-only',
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
    printActivity({ variables: { userId: state?.user?.id, range } })
  }

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
      <DefaultLayout title="Dashboard - SDAAMS">
        <Container>
          <Tabs
            defaultActiveKey="1"
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
                <Form.Select
                  value={range}
                  className="me-2 ms-auto w-25"
                  onChange={(el) => setRange(el.target.value)}
                >
                  <option value="all">All Activities</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </Form.Select>
                <Button variant="secondary" type="submit">
                  Print
                </Button>
              </Form>
              <AppointmentTable
                state={state}
                refetch={refetch}
                appointments={data?.appointments || []}
              />
            </Tab>
            <Tab eventKey="3" title="Request Appointment">
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
          </Tabs>
        </Container>
      </DefaultLayout>
    )
}

export default Dashboard
