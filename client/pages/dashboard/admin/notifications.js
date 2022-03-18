import Link from 'next/link'
import Loader from '@/components/loader'
import AdminLayout from '@/layouts/admin'
import { useQuery, useMutation } from '@apollo/client'
import { GET_NOTIFICATIONS } from '@/lib/graphql/queries'
import { Container, Table, Button } from 'react-bootstrap'
import { DELETE_NOTIFICATION } from '@/lib/graphql/mutations'

const Notifications = () => {
	const { data, loading, refetch } = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'no-cache',
	})
	const [attemptDeletingNotification, deleteNotificationMutation] = useMutation(
		DELETE_NOTIFICATION,
		{
			errorPolicy: 'all',
			onCompleted: (data) => {
				if (data?.deleteNotification) refetch()
			},
		}
	)

	const deleteNotification = (id) => {
		if (confirm('You are about to delete a notification :('))
			attemptDeletingNotification({ variables: { id: Number.parseInt(id) } })
	}

	if (loading)
		return (
			<AdminLayout title="All Notifications - SDAAMS">
				<Container>
					<Loader size={10} />
				</Container>
			</AdminLayout>
		)
	if (data)
		return (
			<AdminLayout title="All Notifications - SDAAMS">
				<Container>
					<h2>All Notifications</h2>
					<Table striped bordered hover responsive className="shadow-sm">
						<thead>
							<tr>
								<th>#</th>
								<th>Message</th>
								<th>User</th>
								<th>Seen</th>
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
											<Link href={'/user/' + notification?.userId}>
												<a>
													{notification?.user?.firstName}{' '}
													{notification?.user?.lastName}
												</a>
											</Link>
										</td>
										<td>{notification?.isSeen ? 'true' : 'false'}</td>
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
											<Link href={notification?.link}>
												<a className="btn btn-sm btn-primary">View</a>
											</Link>{' '}
											<Button variant="success" size="sm">
												Edit
											</Button>{' '}
											<Button
												size="sm"
												variant="warning"
												onClick={() => deleteNotification(notification?.id)}
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

export default Notifications
