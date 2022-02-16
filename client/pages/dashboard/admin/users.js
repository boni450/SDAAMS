import Link from 'next/link'
import Loader from '@/components/loader'
import AdminLayout from '@/layouts/admin'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '@/lib/graphql/queries'
import { Container, Table, Button } from 'react-bootstrap'

const Users = () => {
  const { data, loading } = useQuery(GET_USERS)

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
                    <Button variant="warning" size="sm">
                      Delete
                    </Button>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </AdminLayout>
    )
}

export default Users
