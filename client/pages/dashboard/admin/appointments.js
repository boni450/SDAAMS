import Link from 'next/link'
import Loader from '@/components/loader'
import AdminLayout from '@/layouts/admin'
import { useQuery, useMutation } from '@apollo/client'
import { GET_APPOINTMENTS } from '@/lib/graphql/queries'
import { Container, Table, Button } from 'react-bootstrap'
import { DELETE_APPOINTMENT } from '@/lib/graphql/mutations'

const Appointments = () => {
  const { data, loading, refetch } = useQuery(GET_APPOINTMENTS)
  const [attemptDeletingAppointment, deleteAppointmentMutation] = useMutation(
    DELETE_APPOINTMENT,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data?.deleteAppointment) refetch()
      },
    }
  )

  const deleteAppointment = (id) => {
    if (confirm('You are about to delete an appointment :('))
      attemptDeletingAppointment({ variables: { id: Number.parseInt(id) } })
  }

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
                    <td>
                      {appointment?.isApproved ? <>&#9989;</> : <>&#10060;</>}{' '}
                      {appointment?.name}
                    </td>
                    <td>{appointment?.description}</td>
                    <td>
                      <small>
                        Owner:{' '}
                        <Link href={'/user/' + appointment?.ownerId}>
                          <a>
                            {appointment?.owner?.firstName}{' '}
                            {appointment?.owner?.lastName}
                          </a>
                        </Link>
                        <br />
                        Approver:{' '}
                        <Link href={'/user/' + appointment?.approverId}>
                          <a>
                            {appointment?.approver?.firstName}{' '}
                            {appointment?.approver?.lastName}
                          </a>
                        </Link>
                      </small>
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
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => deleteAppointment(appointment?.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </AdminLayout>
    )
  return <>loading...</>
}

export default Appointments
