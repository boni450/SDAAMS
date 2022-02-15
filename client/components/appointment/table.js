import Link from 'next/link'
import { Table, Button } from 'react-bootstrap'

const AppointmentTable = ({ appointments, state }) => {
	return (
		<Table hover bordered responsive className="shadow-sm">
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Description</th>
					<th>Author</th>
					<th>Time Span</th>
					{state?.user?.id && <th>Action</th>}
				</tr>
			</thead>
			<tbody>
				{appointments.map((appointment, index) => {
					let a = new Date()
					let b = new Date()
					a.setTime(appointment?.startDate)
					b.setTime(appointment?.endDate)

					return (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{appointment?.name}</td>
							<td>{appointment?.description}</td>
							<td>
								<small>
									Owner:{' '}
									<Link href={'/user/' + appointment?.ownerId}>
										<a>
											{appointment?.owner?.firstName}{' '}
											{appointment?.owner?.lastName}
										</a>
									</Link>
									<br />
									Approver:{' '}
									<Link href={'/user/' + appointment?.approverId}>
										<a>
											{appointment?.approver?.firstName}{' '}
											{appointment?.approver?.lastName}
										</a>
									</Link>
								</small>
							</td>
							<td>
								<small>
									Start:{' '}
									{a.toLocaleString('en-US', {
										day: 'numeric',
										month: 'short',
										year: 'numeric',
										hour: 'numeric',
										minute: '2-digit',
									})}
									<br />
									Stop:{' '}
									{b.toLocaleString('en-US', {
										day: 'numeric',
										month: 'short',
										year: 'numeric',
										hour: 'numeric',
										minute: '2-digit',
									})}
								</small>
							</td>
							{state?.user?.id && (
								<td>
									{state?.user?.id == appointment?.approverId && (
										<>
											{appointment?.isApproved ? (
												<Button variant="secondary" size="sm">
													Disapprove
												</Button>
											) : (
												<Button variant="primary" size="sm">
													Approve
												</Button>
											)}{' '}
										</>
									)}
									{state?.user?.id === appointment?.ownerId && (
										<Button variant="warning" size="sm">
											Cancel
										</Button>
									)}
								</td>
							)}
						</tr>
					)
				})}
			</tbody>
		</Table>
	)
}

export default AppointmentTable
