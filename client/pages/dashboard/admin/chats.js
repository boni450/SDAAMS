import Loader from '@/components/loader'
import AdminLayout from '@/layouts/admin'
import { GET_CHATS } from '@/lib/graphql/queries'
import { DELETE_CHAT } from '@/lib/graphql/mutations'
import { useQuery, useMutation } from '@apollo/client'
import { Container, Table, Button } from 'react-bootstrap'

const Chats = () => {
  const { data, loading, refetch } = useQuery(GET_CHATS)
  const [attemptDeletingChat, deleteChatMutation] = useMutation(DELETE_CHAT, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data?.deleteChat) refetch()
    },
  })

  const deleteChat = (id) => {
    if (confirm('You are about to delete a chat message :('))
      attemptDeletingChat({ variables: { id: Number.parseInt(id) } })
  }

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
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => deleteChat(chat?.id)}
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

export default Chats
