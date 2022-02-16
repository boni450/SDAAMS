import Link from 'next/link'
import { useMutation } from '@apollo/client'
import { Table, Button } from 'react-bootstrap'
import { DELETE_APPOINTMENT, UPDATE_APPOINTMENT } from '@/lib/graphql/mutations'

const AppointmentTable = ({ state, refetch, appointments }) => {
	const [attemptUpdatingAppointment, updateAppointmentMutation] = useMutation(
		UPDATE_APPOINTMENT,
		{
			errorPolicy: 'all',
			onCompleted: (data) => {
				if (data?.updateAppointment) refetch()
			},
		}
	)
	const [attemptDeletingAppointment, deleteAppointmentMutation] = useMutation(
		DELETE_APPOINTMENT,
		{
			errorPolicy: 'all',
			onCompleted: (data) => {
				if (data?.deleteAppointment) refetch()
			},
		}
	)
	const deleteAppointment = (id) => {
		if (confirm('You are about to delete an event :('))
			attemptDeletingAppointment({ variables: { id: Number.parseInt(id) } })
	}
	const approveAppointment = (id, isApproved = true) => {
		attemptUpdatingAppointment({
			variables: { id: Number.parseInt(id), isApproved },
		})
	}

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
												<Button
													size="sm"
													variant="secondary"
													onClick={() =>
														approveAppointment(appointment?.id, false)
													}
												>
													Disapprove
												</Button>
											) : (
												<Button
													size="sm"
													variant="primary"
													onClick={() => approveAppointment(appointment?.id)}
												>
													Approve
												</Button>
											)}{' '}
										</>
									)}
									{state?.user?.id === appointment?.ownerId && (
										<Button
											size="sm"
											variant="warning"
											onClick={() => deleteAppointment(appointment?.id)}
										>
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
