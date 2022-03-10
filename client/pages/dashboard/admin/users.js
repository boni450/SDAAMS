import Link from 'next/link'
import Loader from '@/components/loader'
import AdminLayout from '@/layouts/admin'
import { GET_USERS } from '@/lib/graphql/queries'
import { DELETE_USER } from '@/lib/graphql/mutations'
import { useQuery, useMutation } from '@apollo/client'
import { Container, Table, Button } from 'react-bootstrap'

const Users = () => {
  const { data, loading, refetch } = useQuery(GET_USERS)
  const [attemptDeletingUser, deleteUserMutation] = useMutation(DELETE_USER, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data?.deleteUser) refetch()
    },
  })

  const deleteUser = (id) => {
    if (confirm('You are about to delete a chat message :('))
      attemptDeletingUser({ variables: { id: Number.parseInt(id) } })
  }

  if (loading)
    return (
      <AdminLayout title="All Users - SDAAMS">
        <Container>
          <Loader size={10} />
        </Container>
      </AdminLayout>
    )
  if (data)
    return (
      <AdminLayout title="All Users - SDAAMS">
        <Container>
          <h2>All Users</h2>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user?.firstName}</td>
                  <td>{user?.lastName}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>
                    <Link href={'/user/' + user?.id}>
                      <a className="btn btn-sm btn-primary">View</a>
                    </Link>{' '}
                    <Button variant="success" size="sm">
                      Edit
                    </Button>{' '}
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => deleteUser(user?.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </AdminLayout>
    )
  return <>loading...</>
}

export default Users
