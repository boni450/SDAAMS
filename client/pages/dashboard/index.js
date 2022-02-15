import Link from 'next/link'
import { Context } from '@/lib/context'
import Loader from '@/components/loader'
import { useContext, useState } from 'react'
import Calendar from '@/components/calendar'
import DefaultLayout from '@/layouts/default'
import { useQuery, useLazyQuery } from '@apollo/client'
import AppointmentTable from '@/components/appointment/table'
import { GET_APPOINTMENTS, USER_SEARCH } from '@/lib/graphql/queries'
import { Tab, Tabs, Container, Form, Button, Table } from 'react-bootstrap'

const Dashboard = () => {
  const { state } = useContext(Context)
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

  const handleSubmit = (event) => {
    event.preventDefault()
    searchUser({ variables: { keyword: keyword.trim() } })
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
              <AppointmentTable
                state={state}
                appointments={data?.appointments || []}
              />
            </Tab>
            <Tab eventKey="3" title="Request Appointment">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    value={keyword}
                    required={true}
                    placeholder="Search person by name, email..."
                    onChange={(el) => setKeyword(el.target.value)}
                  />
                </Form.Group>
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
                            <a className="btn btn-sm btn-primary">
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
