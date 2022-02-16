import Link from 'next/link'
import Loader from '@/components/loader'
import AdminLayout from '@/layouts/admin'
import { useQuery } from '@apollo/client'
import { GET_NOTIFICATIONS } from '@/lib/graphql/queries'
import { Container, Table, Button } from 'react-bootstrap'

const Notifications = () => {
	const { data, loading } = useQuery(GET_NOTIFICATIONS)

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

export default Notifications
