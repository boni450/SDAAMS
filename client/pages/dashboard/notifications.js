import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Context } from '@/lib/context'
import Loader from '@/components/loader'
import DefaultLayout from '@/layouts/default'
import { useQuery, useMutation } from '@apollo/client'
import { GET_NOTIFICATIONS } from '@/lib/graphql/queries'
import { Container, Table, Button } from 'react-bootstrap'
import { UPDATE_NOTIFICATION } from '@/lib/graphql/mutations'

const Notifications = () => {
  const router = useRouter()
  const { state } = useContext(Context)
  const { data, loading } = useQuery(GET_NOTIFICATIONS, {
    fetchPolicy: 'no-cache',
    variables: { orderBy: 'DESC', userId: state?.user?.id },
  })
  const [attemptUpdatingNotification, updateNotificationMutation] = useMutation(
    UPDATE_NOTIFICATION,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        router.push(data?.updateNotification?.link)
      },
    }
  )

  const viewNotification = (id) => {
    attemptUpdatingNotification({
      variables: { id: Number.parseInt(id), isSeen: true },
    })
  }

  if (loading)
    return (
      <DefaultLayout title="Notifications - SDAAMS">
        <Container>
          <Loader size={10} />
        </Container>
      </DefaultLayout>
    )
  if (data)
    return (
      <DefaultLayout title="Notifications - SDAAMS">
        <Container>
          <h2>Notifications</h2>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Message</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.notifications.map((notification, index) => {
                let a = new Date()
                a.setTime(notification?.createdAt)

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{notification?.message}</td>
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
                      {!notification?.isSeen && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => viewNotification(notification?.id)}
                        >
                          View
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </DefaultLayout>
    )
  return <>loading...</>
}

export default Notifications
