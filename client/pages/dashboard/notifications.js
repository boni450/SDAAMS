import Link from 'next/link'
import { useContext } from 'react'
import { Context } from '@/lib/context'
import Loader from '@/components/loader'
import { useQuery } from '@apollo/client'
import DefaultLayout from '@/layouts/default'
import { GET_NOTIFICATIONS } from '@/lib/graphql/queries'
import { Container, Table, Button } from 'react-bootstrap'

const Notifications = () => {
	const { state } = useContext(Context)
	const { data, loading } = useQuery(GET_NOTIFICATIONS, {
		variables: { orderBy: 'DESC', userId: state?.user?.id },
	})

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
											<Link href={notification?.link}>
												<a className="btn btn-sm btn-primary">View</a>
											</Link>{' '}
											{!notification?.isSeen && (
												<Button variant="success" size="sm">
													Mark As Read
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
}

export default Notifications
