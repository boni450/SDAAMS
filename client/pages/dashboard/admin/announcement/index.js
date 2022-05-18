import Link from 'next/link'
import Loader from '@/components/loader'
import AdminLayout from '@/layouts/admin'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ANNOUNCEMENTS } from '@/lib/graphql/queries'
import { Container, Table, Button } from 'react-bootstrap'
import { DELETE_ANNOUNCEMENT } from '@/lib/graphql/mutations'

const Announcements = () => {
  const { data, loading, refetch } = useQuery(GET_ANNOUNCEMENTS, {
    fetchPolicy: 'no-cache',
  })
  const [attemptDeletingAnnouncement, deleteAnnouncementMutation] = useMutation(
    DELETE_ANNOUNCEMENT,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data?.deleteAnnouncement) refetch()
      },
    }
  )

  const deleteAnnouncement = (id) => {
    if (confirm('You are about to delete an announcement :('))
      attemptDeletingAnnouncement({ variables: { id: Number.parseInt(id) } })
  }

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
                <th style={{ width: '40%' }}>Message</th>
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
                      <Link href={'/dashboard/admin/announcement/' + item.id}>
                        <a className="btn btn-sm btn-success">Edit</a>
                      </Link>{' '}
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => deleteAnnouncement(item?.id)}
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

export default Announcements
