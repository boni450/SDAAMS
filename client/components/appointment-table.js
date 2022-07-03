import Link from 'next/link'
import Image from 'next/image'
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
		<Table hover bordered responsive className="shadow-sm" id='print-table'>
			<thead>
				<tr>
					<th colSpan="2">
						<Image src="/img/auca-logo.png" width="400" height="75" />
					</th>
					<th colSpan="4" className='text-center'>
						<span className='fs-1 py-6 text-uppercase'>Daily Activities Report</span>
					</th>
				</tr>
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
												<>
													<Button
														size="sm"
														variant="secondary"
														onClick={() =>
															approveAppointment(appointment?.id, false)
														}
													>
														Disapprove
													</Button>{' '}
													<Button size="sm" variant="primary" disabled>
														Approve
													</Button>
												</>
											) : (
												<>
													<Button size="sm" variant="secondary" disabled>
														Disapprove
													</Button>{' '}
													<Button
														size="sm"
														variant="primary"
														onClick={() => approveAppointment(appointment?.id)}
													>
														Approve
													</Button>
												</>
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
				<tr>
					<td colSpan="3">Report generated on: { new Date().toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', }) }</td>
					<td colSpan="3">Done by: { state?.user?.firstName + ' ' + state?.user?.lastName }</td>
				</tr>
			</tbody>
		</Table>
	)
}

export default AppointmentTable
