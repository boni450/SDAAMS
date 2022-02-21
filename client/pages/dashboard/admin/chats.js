import Loader from '@/components/loader'
import AdminLayout from '@/layouts/admin'
import { useQuery } from '@apollo/client'
import { GET_CHATS } from '@/lib/graphql/queries'
import { Container, Table, Button } from 'react-bootstrap'

const Chats = () => {
  const { data, loading } = useQuery(GET_CHATS)

  if (loading)
    return (
      <AdminLayout title="All Chats - SDAAMS">
        <Container>
          <Loader size={10} />
        </Container>
      </AdminLayout>
    )
  if (data)
    return (
      <AdminLayout title="All Chats - SDAAMS">
        <Container>
          <h2>All Chats</h2>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Sender</th>
                <th>Message</th>
                <th>Receiver</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.chats?.map((chat, index) => {
                let a = new Date()
                a.setTime(chat?.createdAt)

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {chat?.sender?.firstName} {chat?.sender?.lastName}
                    </td>
                    <td>{chat?.message}</td>
                    <td>
                      {chat?.receiver?.firstName} {chat?.receiver?.lastName}
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
                      <Button variant="warning" size="sm">
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

export default Chats
