import Link from 'next/link'
import Loader from '@/components/loader'
import AdminLayout from '@/layouts/admin'
import { useQuery } from '@apollo/client'
import { GET_ANNOUNCEMENTS } from '@/lib/graphql/queries'
import { Container, Table, Button } from 'react-bootstrap'

const Announcements = () => {
  const { data, loading } = useQuery(GET_ANNOUNCEMENTS)

  if (loading)
    return (
      <AdminLayout title="All Announcements - SDAAMS">
        <Container>
          <Loader size={10} />
        </Container>
      </AdminLayout>
    )
  if (data)
    return (
      <AdminLayout title="All Announcements - SDAAMS">
        <Container>
          <div className="d-flex justify-content-between mb-2">
            <h2 className="d-inline m-0">All Announcements</h2>
            <Link href="/dashboard/admin/announcement/create">
              <a className="btn btn-primary rounded-pill">
                &#8889; Announcement
              </a>
            </Link>
          </div>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Message</th>
                <th>Author</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.announcements?.map((item, index) => {
                let a = new Date()
                a.setTime(item?.createdAt)

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.message}</td>
                    <td>
                      {item?.user?.firstName} {item?.user?.lastName}
                    </td>
                    <td>
                      <small>
                        {a.toLocaleString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </small>
                    </td>
                    <td>
                      <Link href="#">
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
  return <>loading...</>
}

export default Announcements
