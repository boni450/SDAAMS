import Link from 'next/link'
import Loader from '@/components/loader'
import { useQuery } from '@apollo/client'
import AdminLayout from '@/layouts/admin'
import { Container } from 'react-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { GET_APPOINTMENTS } from '@/lib/graphql/queries'

const Appointments = () => {
  const { data, loading } = useQuery(GET_APPOINTMENTS)

  if (loading)
    return (
      <AdminLayout title="All Appointments - SDAAMS">
        <Container>
          <Loader size={10} />
        </Container>
      </AdminLayout>
    )
  if (data)
    return (
      <AdminLayout title="All Appointments - SDAAMS">
        <Container>
          <h2>All Appointments</h2>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Author</th>
                <th>Time Span</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.appointments.map((appointment, index) => {
                let a = new Date()
                let b = new Date()
                a.setTime(appointment?.startDate)
                b.setTime(appointment?.endDate)

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{appointment?.name}</td>
                    <td>{appointment?.description}</td>
                    <td>
                      {appointment?.owner?.firstName}{' '}
                      {appointment?.owner?.lastName}
                    </td>
                    <td>
                      <small>
                        Start:{' '}
                        {a.toLocaleString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                        <br />
                        Stop:{' '}
                        {b.toLocaleString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </small>
                    </td>
                    <td>
                      <Link href={'/appointment/' + appointment?.id}>
                        <a className="btn btn-sm btn-primary">View</a>
                      </Link>{' '}
                      <Button variant="success" size="sm">
                        Edit
                      </Button>{' '}
                      <Button variant="warning" size="sm">
                        Delete
                      </Button>{' '}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </AdminLayout>
    )
}

export default Appointments
